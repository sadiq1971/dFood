
const GAS_COST: number = 3000000;

export async function addArea(area: String, contract, account) {
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
    console.log(e.stack);
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

export async function register(name: string, addr: string, phoneNo: string, contract, account){
  try {
    const response = await contract.methods.register(name, addr, phoneNo).send({from: account, gas: GAS_COST});
    console.log(response);
  }catch (e) {
    console.log(e.stack);
  }
}