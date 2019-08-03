
export async function addArea(area: String, contract, account) {
  try {
    const result = await contract.methods.addArea(area).send({from: account, gas: 3000000});
    console.log(result);
  }catch (e) {
    console.log(e.stack);
  }
}

export async function getArea(areaId: number, contract, account) {
  try {
    const result = await contract.methods.getArea(areaId).call();
    console.log(result);
  }catch (e) {
    console.log(e.stack);
  }
}