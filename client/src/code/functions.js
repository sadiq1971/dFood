
const GAS_COST: number = 3000000;

export async function addArea(area: string, contract, account) {
  try {
    const response = await contract.methods.addArea(area).send({from: account, gas: GAS_COST});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function getArea(areaId: number, contract): string {
  try {
    const result = await contract.methods.getArea(areaId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack)
  }
  return null;
}

export async function getAreas(contract): string[]{
  try {
    const result = await contract.methods.getAreas().call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function addRestaurant(name: string, address: string, areaId: number, contract, account){
  try {
    const response = await contract.methods.addRestaurant(name, address, areaId).send({ from: account, gas: GAS_COST});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function getRestaurant(restuarentId: number, contract): any {
  try {
    const result = await contract.methods.getRestaurant(restuarentId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
    return null;
  }
}

export async function addItem(restuarentId: number, name: string, price: number, contract, account){
  try {
    const response = await contract.methods.addItem(restuarentId, name, price).send({from: account, gas: GAS_COST});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}
export async function getItem(restuarentId: number, itemId: number, contract): number{
  try {
    const result = await contract.methods.getItem(restuarentId, itemId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function register(name: string, addr: string, phoneNo: number, contract, account){
  try {
    const response = await contract.methods.register(name, addr, phoneNo).send({from: account, gas: GAS_COST});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}
export async function placeOrder(
  items: number[], quantities: number[], areaId: number, fullAddress: string, restId: number, price: number, contract, account){
  try {
    const response = await contract.methods.placeOrder(items, quantities, areaId,
      fullAddress, restId).send({from: account, gas: GAS_COST, value: price});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function getOrder(orderId: number, contract): any {
  try {
    const result = await contract.methods.getOrder(orderId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}
export async function cancelOrder(orderId: number, contract, account): any {
  try {
    const result = await contract.methods.cancelOrder(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}
export async function receiveOrder(orderId: number, contract, account): any {
  try {
    const result = await contract.methods.receiveOrder(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function approveOrder(orderId: number, contract, account): any {
  try {
    const result = await contract.methods.approveOrder(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function reclaim(orderId: number, contract, account): any {
  try {
    const result = await contract.methods.reclaim(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function searchAreaRestaurant(areaId: number, contract): any {
  try {
    const result = await contract.methods.searchAreaRestaurant(areaId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function searchAreaOrder(areaId: number, contract): any {
  try {
    const result = await contract.methods.searchAreaOrder(areaId).call();
    console.log(result);
    return result;
  }catch (e) {
    console.log(e.stack);
  }
  return null;
}

export async function getLockedBalanceForDelivery(orderId: number, contract) {
  try {
    const result = await contract.methods.getLockedBalanceForDelivery(orderId).call();
    console.log(result);
  }catch (e) {
    console.log(e);
  }
}

export async function acceptOrder(orderId: number, fund: number, contract, account) {
  try {
    const result = await contract.methods.acceptOrder(orderId).send({from: account, gas: GAS_COST, value: fund});
    console.log(result);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function confirmPickup(orderId: number, contract, account) {
  try {
    const result = await contract.methods.confirmPickup(orderId).send({from: account, gas: GAS_COST});
    console.log(result);
  }catch (e) {
    console.log(e.stack);
  }
}

export function lisenEvent(contract) {
  // contract.events.newRestaurant({
  //   filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  //   fromBlock: 0
  // }, function(error, event){ console.log(event); })
  //   .on('data', function(event){
  //     console.log(event); // same results as the optional callback above
  //   })
  //   .on('changed', function(event){
  //     // remove event from local database
  //   })
  //   .on('error', console.error);
// watch for changes
  var event = contract.newRestaurant();
  event.watch(function (error, result) {
    // result will contain various information
    // including the argumets given to the `Deposit`
    // call.
    if (!error)
      console.log(result);
  });
}