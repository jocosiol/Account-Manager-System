const express = require("express");
const router = express.Router();
const {
  createNewPerson,
  createNewAccount,
  newDeposit,
  getBalanceByAccountId,
  newWithdraw,
  blockAccount,
} = require("../data/account");
const { validateBody } = require("../middleware/validateBody");
const {
  validTransactionValue,
} = require("../middleware/validTransactionValue");
const { validAccountId } = require("../middleware/validAccountId");
const Schemas = require("../schemas/allSchemas");

router.post(
  "/create",
  validateBody(Schemas.createNewPersonSchema),
  validateBody(Schemas.createNewAccountSchema),
  async (req, res) => {
    try {
      const { name, document, birthDate, dailyWithdrawlLimit, accountType } =
        req.body;
      const person = await createNewPerson(name, document, birthDate);
      const account = await createNewAccount(
        dailyWithdrawlLimit,
        accountType,
        person.insertId
      );
      res.send("Person and Account successfully created");
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/:id/deposit",
  validateBody(Schemas.newDepositSchema),
  validTransactionValue,
  validAccountId,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { amountDeposit } = req.body;
      const newBalance = await newDeposit(id, amountDeposit);
      res.status(201).send(`${amountDeposit} was deposited successfully`);
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/:id/balance", validAccountId, async (req, res) => {
  try {
    const { id } = req.params;
    const balance = await getBalanceByAccountId(id);
    res.status(201).send(balance);
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/:id/withdraw",
  validateBody(Schemas.newWithdrawSchema),
  validTransactionValue,
  validAccountId,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { amountWithdraw } = req.body;
      const newBalance = await newWithdraw(id, amountWithdraw);
      res
        .status(201)
        .send(`${amountWithdraw} have been withdrawn successfully`);
    } catch (err) {
      console.log(err);
    }
  }
);

router.put("/:id/block", validAccountId, async (req, res) => {
  try {
    const { id } = req.body;
    const blockedAccount = await blockAccount(id);
    res.status(201).send(`Account ${id} has been blocked`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
