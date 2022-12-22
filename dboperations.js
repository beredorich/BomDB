var config = require('./dbconfig');
const sql = require('mssql');

async  function  getOrders() {
    try {
      let  pool = await  sql.connect(config);
      let  products = await  pool.request().query("SELECT * from Orders");
      return  products.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }
  
async  function  getOrder(productId) {
try {
    let  pool = await  sql.connect(config);
    let  product = await  pool.request()
    .input('input_parameter', sql.Int, productId)
    .query("SELECT * from Orders where id = @input_parameter");
    return  product.recordsets;
}
catch (error) {
    console.log(error);
}
}
async  function  addOrder(order) {
try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('id', sql.TinyInt, order.id)
    .input('city', sql.NVarChar, order.city)
    .input('team', sql.NVarChar, order.team)
    .execute('InsertOrders');
    return  insertProduct.recordsets;
}
catch (err) {
    console.log(err);
}
}

module.exports = {
getOrders:  getOrders,
getOrder:  getOrder,
addOrder:  addOrder
}