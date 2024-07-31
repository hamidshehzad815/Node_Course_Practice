const mail = require("../mail");
const lib = require("../lib");
const db = require("../db");

describe("absolute", () => {
  it("should return a positive if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it("should return a positive if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("Greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Mosh");

    //To specific
    // expect(result).toBe("Welcome Mosh!");

    //General
    // expect(result).toContain("Mosh");
    expect(result).toMatch(/Mosh/);
  });
});

describe("getCurrencies", () => {
  it("should return existing currencies", () => {
    const result = lib.getCurrencies();

    //TOO General
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");

    //Proper Way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    //Ideal WAY
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("should return the product with given Id", () => {
    const result = lib.getProduct(1);

    //Compare refrence
    // expect(result).toBe({ id: 1, price: 10 });

    //this expect exact number of properties and values
    // expect(result).toEqual({ id: 1, price: 10 });

    //this compare if this value and properties or in object or not
    // expect(result).toMatchObject({ id: 1, price: 10 });

    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("Should throw if username is falsy", () => {
    const args = [false, null, 0, undefined, "", NaN];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("Should return a user if valid username is passed", () => {
    const result = lib.registerUser("hamid");
    expect(result).toMatchObject({ username: "hamid" });
    expect(result.id).toBeGreaterThan(0);
  });
});

//Exercise 1
describe("fizzBuzz", () => {
  it("Should throw if input is not number", () => {
    expect(() => lib.fizzBuzz("hamid")).toThrow();
  });

  it("should return fizzbuzz if divisible by 5 or 3", () => {
    expect(lib.fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return Fizz if input is divisible by 3", () => {
    expect(lib.fizzBuzz(3)).toBe("Fizz");
  });

  it("should return Buzz if input is divisible by 5", () => {
    expect(lib.fizzBuzz(5)).toBe("Buzz");
  });

  it("should return input", () => {
    expect(lib.fizzBuzz(1)).toBe(1);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    //using jest mock function
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    // db.getCustomerSync = function (customerId) {
    //   return { email: "a" };
    // };

    // let mailSent = false;
    // mail.send = function (email, message) {
    //   mailSent = true;
    // };

    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
