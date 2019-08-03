import React, { Component } from "react";
import FoodieContract from "./contracts/Food";
import getWeb3 from "./utils/getWeb3";
import  * as functions from  "./code/functions"

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {

      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FoodieContract.networks[networkId];

      const instance = new web3.eth.Contract(
        FoodieContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log("waiting for response");

      //testing smart contract ....
      //All functions test....

      //functions.addArea("demo", instance, accounts[0]);
      //functions.getArea(0, instance);
      functions.getAreas(instance);
      //functions.addRestaurant("Test Name", "demo", 0, instance, accounts[0]);
      //functions.getRestaurant(5, instance);
      //functions.addItem(5, "Fish", 200, instance, accounts[0]);
      //functions.getItem(5, 0, instance);
      //functions.register("User 1", "Adress 1",0 , instance, accounts[0]);
      // functions.placeOrder([0], [1], 0, " Adress 1, India",
      //   5,300, instance, accounts[0]);
      //functions.getOrder(0, instance);
      // await functions.cancelOrder(0, instance, accounts[0]);
      // await functions.getOrder(0, instance);
      //functions.receiveOrder(1, instance, accounts[0]);
      //functions.approveOrder(1, instance, accounts[0]);
      //functions.searchAreaRestaurant(1, instance);
      //functions.searchAreaOrder(0, instance);
      //functions.getLockedBalanceForDelivery(1, instance);
      //functions.acceptOrder(1, );
      //functions.lisenEvent(contract);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    // const { accounts, contract } = this.state;
    //
    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    //
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    // console.log(response);
    //
    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
