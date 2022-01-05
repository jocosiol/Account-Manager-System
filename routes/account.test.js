const request = require("supertest");
const app = require("../server");

describe("AMS API", () => {
  it("POST /account/create --> message", () => {
    return request(app)
      .post("/account/create")
      .send({
        name: "Jon Bon",
        document: "176987235",
        birthDate: "10-12-1991",
        dailyWithdrawlLimit: 500,
        accountType: 100,
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it("POST /account/deposit --> message", () => {
    return request(app)
      .post("/account/deposit")
      .send({
        id: 7,
        amountDeposit: 1000,
      })
      .expect(201);
  });

  it('GET /account/balance --> Object { "balance": number}', () => {
    return request(app)
      .get("/account/balance")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({ balance: expect.any(Number) })
        );
      });
  });

  it("POST /account/:id/withdraw --> message", () => {
    return request(app)
      .post("/account/:id/withdraw")
      .send({
        id: 1,
        amountWithdraw: 100,
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it("PUT /account/:id/block --> message", () => {
    return request(app)
      .put("/account/:id/block")
      .send({
        id: 1,
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it('GET /account/:id/statement --> Array of Object [{"id": 20, "value": 2000, "transactionDate": "2022-01-04T22:00:00.000Z"},...]', () => {
    return request(app)
      .get("/account/:id/statement")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              value: expect.any(Number),
              transactionDate: expect.any(String),
            }),
          ])
        );
      });
  });

  it('GET /account/:id/statement/period --> Array of Object [{"id": 20, "value": 2000, "transactionDate": "2022-01-04T22:00:00.000Z"},...]', () => {
    return request(app)
      .get("/account/:id/statement/period")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              value: expect.any(Number),
              transactionDate: expect.any(String),
            }),
          ])
        );
      });
  });
});
