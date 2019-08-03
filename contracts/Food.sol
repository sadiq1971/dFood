pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;
// import "github.com/ethereum/dapp-bin/library/stringUtils.sol";
//import "./StringUtils.sol";


contract Food {
  struct Item {
    string name;
    uint256 price;
    bool disabled;
  }

  struct Restaurant {
    address owner;
    uint256 fund;
    string name;
    string addr;
    uint256 areaId;
    uint256 itemId;
    mapping(uint256=> Item) items;
    // Item[] items;
  }

  struct User {
    string name;
    string addr;
    uint256 phoneNo;
  }

  struct Order {
    address orderer;
    address deliverer;
    uint256 fund;
    uint256 restaurantId;
    uint256[] items;
    uint256[] quantities;
    uint256 areaId;
    string fullAddress;
    bool isCanceled;
    bool restaurantApproved;
    bool pickupConfirmed;
    bool orderReceived;
  }

  // Admin methods
  address admin = msg.sender;
  string[] areas;
  uint commissionRate = 10;
  uint lockedRate = 2;
  uint256 deliveryFee = 100;

  modifier isAdmin() {
    require(msg.sender == admin);
    _;
  }

  function addArea(string memory area) public isAdmin returns(uint256) {
//    require(!checkAreaExists(area), "Area already exists.");
    areas.push(area);
    return areas.length -1;
  }

  function getArea(uint256 id) public view returns(string memory area){
    return areas[id];
  }

  function getAreas() public view returns(string[] memory){
    // string[] memory areasCopy = new string[](areas.length);
    // for(uint256 i=0; i< areas.length; i++){
    //     areasCopy = areas[i];
    // }
    return areas;
  }

//  function checkAreaExists(string memory area) private returns(bool found){
//    for (uint i=0; i<areas.length; i++) {
//      if(StringUtils.equal(areas[i], area)) return true;
//    }
//    return false;
//  }


  // Restaurant methods
  // mapping(uint256 => Restaurant) restaurants;
  Restaurant[] restaurants;
  uint256 restaurantId;

  function addRestaurant(string memory name, string memory addr, uint256 areaId)
  public payable returns (uint256){
    // Restaurant memory restaurant = Restaurant({
    //     owner: msg.sender, fund: msg.value, name: name, addr: addr, area: area, items: new Item[](0)
    // });
    // restaurants[restaurantId] = restaurant;
    // return restaurantId++;

    Restaurant memory restaurant;
    restaurant.owner = msg.sender;
    restaurant.fund = msg.value;
    restaurant.name = name;
    restaurant.addr = addr;
    restaurant.areaId = areaId;
    restaurants.push(restaurant);
    return restaurants.length -1;
  }

  function addItem(uint256 id, string memory name, uint256 price) public {
    Restaurant storage restaurant = restaurants[id];
    restaurant.items[restaurant.itemId] = Item(name, price, false);
    restaurant.itemId++;
  }

  function getRestaurant(uint256 id) public view
  returns(string memory name, string memory addr, uint256 areaId) {
    return (restaurants[id].name, restaurants[id].addr, restaurants[id].areaId);
  }

  function getItem(uint256 restId, uint256 itemId) public view
  returns (string memory name, uint256 price){
    Item storage item = restaurants[restId].items[itemId];
    return (item.name, item.price);
  }


  // User mathods
  mapping(address => User) users;

  function register(string memory name, string memory addr, uint256 phoneNo) public {
    User memory user = User(name, addr, phoneNo);
    users[msg.sender] = user;
  }

  // Orderer methods
  Order[] orders;

  function placeOrder(uint256[] memory items, uint256[] memory quantities, uint256 areaId,
    string memory fullAddress, uint256 restId) public payable returns(uint256){
    // add requires
    Order memory order;
    order.orderer = msg.sender;
    order.items = items;
    order.quantities = quantities;
    order.areaId = areaId;
    order.fullAddress = fullAddress;
    order.restaurantId = restId;
    // calculate prices
    uint256 price = 0;
    for(uint i=0; i <items.length; i++){
      price += restaurants[restId].items[items[i]].price * quantities[i];
    }
    require(msg.value == price + deliveryFee , "Not enough fund sent.");

    order.fund = price + deliveryFee;
    orders.push(order);
    return orders.length -1;
  }

  function getOrder(uint256 id) public view returns(Order memory){
    return orders[id];
  }

  function cancelOrder(uint256 orderId) public returns(bool){
    // check and return false
    Order storage order = orders[orderId];
    order.isCanceled = true;
    return true;
  }

  function receivedOrder(uint256 orderId) public {
    Order storage order = orders[orderId];
    order.orderReceived = true;
  }

  function approveOrder(uint256 orderId) public {
    Order storage order = orders[orderId];
    order.restaurantApproved = true;
  }

  // Deliverer methods
  function orderIsAvailable(Order memory order) private pure returns(bool){
    return order.restaurantApproved
    && order.deliverer == address(0) && !order.isCanceled;
  }

  function searchArea(uint256 areaId) public view
  returns(uint256[] memory, address[] memory, string[] memory, uint256[] memory){

    uint256 totalMatch = 0;
    for(uint256 i=0; i<orders.length; i++){
      Order storage order = orders[i];
      if(order.areaId == areaId && orderIsAvailable(order)){
        totalMatch++;
      }
    }

    uint256[] memory orderIds = new uint256[](totalMatch);
    address[] memory orderers = new address[](totalMatch);
    string[] memory fullAddrs = new string[](totalMatch);
    uint256[] memory prices = new uint256[](totalMatch);

    totalMatch = 0;
    for(uint256 i=0; i<orders.length; i++){
      Order storage order = orders[i];
      if(order.areaId == areaId && orderIsAvailable(order)){
        orderIds[totalMatch] =i;
        orderers[totalMatch] = order.orderer;
        fullAddrs[totalMatch] = order.fullAddress;
        prices[totalMatch] = order.fund;
        totalMatch++;
      }
    }

    return (orderIds, orderers, fullAddrs, prices);
  }

  function acceptOrder(uint256 orderId) public payable {
    Order storage order = orders[orderId];
    require(orderIsAvailable(order));

    uint256 expected = order.fund - deliveryFee + order.fund/lockedRate;
    require(msg.value ==  expected);

    order.deliverer =  msg.sender;
  }

  function confirmPickup(uint256 orderId) public {
    Order storage order = orders[orderId];
    order.deliverer =  msg.sender;
  }

}