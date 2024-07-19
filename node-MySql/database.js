const { createPool } = require("mysql");
const pool = createPool({
  host: "127.0.0.1",
  user: "root",
  password: "mysqlpassword@442004",
  database: "sql_store",
  connectionLimit: 10,
});

// pool.query(
//   `select customer_id,first_name
//    from customers
//    limit 5`,
//   (err, result, fields) => {
//     if (err) return console.log(err);
//     return console.log(result[0].customer_id);
//   }
// );

function createCustomer() {
  pool.query(
    `
        insert into customers
        values(11,'Hamid','Shehzad','2003-04-04','03127846622','house#33','Lahore','LA',1000)`,
    (err, result, fields) => {
      if (err) return console.log(err);
      return console.log(result);
    }
  );
}
createCustomer();
