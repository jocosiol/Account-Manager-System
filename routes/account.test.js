const request = require("supertest");
const app = require("../server");
const {
  createNewPerson,
  createNewAccount,
  deleteTransaction,
  deleteAccount,
  deletePerson,
} = require("../data/account");

describe("AMS API", () => {
  let newAccount;
  let personId;
  let accountId;

  beforeAll(async () => {
    newAccount = {
      name: "James",
      document: "007",
      birthDate: "10-12-1990",
      dailyWithdrawlLimit: 500,
      accountType: 100,
    };
  });

  afterAll(async () => {
    await deleteTransaction(accountId);
    await deleteAccount(personId);
    await deletePerson(personId);
  });

  it("POST /account/create --> Object {personId, accountId}", () => {
    return request(app)
      .post("/account/create")
      .send(newAccount)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        personId = res.body.personId;
        accountId = res.body.accountId;

        expect(res.body).toEqual(
          expect.objectContaining({
            personId: expect.any(Number),
            accountId: expect.any(Number),
          })
        );
      });
  });

  it("POST /account/deposit --> message", () => {
    return request(app)
      .post("/account/deposit")
      .send({
        id: accountId,
        amountDeposit: 1000,
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it('GET /account/balance --> Object { "balance": number}', () => {
    return request(app)
      .get("/account/balance")
      .send({
        id: accountId,
      })
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({ balance: expect.any(Number) })
        );
      });
  });

  it("POST /account/withdraw --> message", () => {
    return request(app)
      .post("/account/withdraw")
      .send({
        id: accountId,
        amountWithdraw: 100,
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it('GET /account/statement --> Array of Object [{"id": 20, "value": 2000, "transactionDate": "2022-01-04T22:00:00.000Z"},...]', () => {
    return request(app)
      .get("/account/statment")
      .send({
        id: accountId,
      })
      .expect(201)
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

  it('GET /account/statment/period --> Array of Object [{"id": 20, "value": 2000, "transactionDate": "2022-01-04T22:00:00.000Z"},...]', () => {
    return request(app)
      .get("/account/statment/period")
      .send({
        id: 166,
        from: "2022-01-01",
        to: "2022-01-10"
      })
      .expect(201)
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

  it("PUT /account/block --> message", () => {
    return request(app)
      .put("/account/block")
      .send({
        id: accountId,
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });
});
