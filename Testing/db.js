module.exports.getCustomerSync = function (customerId) {
  console.log("Reading customer from mongoDB");
  return { id: customerId, points: 11 };
};

module.exports.getCustomer = async function () {
  return new Promise((resolve, _) => {
    console.log("Reading customer from mongoDB");
    resolve({ id: 1, points: 11 });
  });
};
