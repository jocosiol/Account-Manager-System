const express = require("express");
const router = express.Router();
const {
  createNewPerson,
  createNewAccount,
  newDeposit,
  getBalanceByAccountId,
  newWithdraw,
  blockAccount,
  getStatmentByAccountId,
  getStatmentByAccountIdInPeriod,
} = require("../data/account");
const { validateBody } = require("../middleware/validateBody");
const {
  validTransactionValue,
} = require("../middleware/validTransactionValue");
const { validAccountId } = require("../middleware/validAccountId");
const { isMaxDailyWithdraw } = require("../middleware/isMaxDailyWithdraw");
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
      res
        .status(201)
        .json({ personId: person.insertId, accountId: account.insertId });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/deposit",
  validateBody(Schemas.newDepositSchema),
  validTransactionValue,
  validAccountId,
  async (req, res) => {
    try {
      const { id, amountDeposit } = req.body;
      const newBalance = await newDeposit(id, amountDeposit);
      res.status(201).json("Deposited successfully");
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/balance", validAccountId, async (req, res) => {
  try {
    const { id } = req.body;
    const balance = await getBalanceByAccountId(id);
    res.status(201).json(balance);
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/withdraw",
  validateBody(Schemas.newWithdrawSchema),
  validTransactionValue,
  validAccountId,
  isMaxDailyWithdraw,
  async (req, res) => {
    try {
      const { id, amountWithdraw } = req.body;
      const newBalance = await newWithdraw(id, amountWithdraw);
      res
        .status(201)
        .json(`${amountWithdraw} have been withdrawn successfully`);
    } catch (err) {
      console.log(err);
    }
  }
);

router.put("/block", validAccountId, async (req, res) => {
  try {
    const { id } = req.body;
    const blockedAccount = await blockAccount(id);
    res.status(201).json(`Account ${id} has been blocked`);
  } catch (err) {
    console.log(err);
  }
});

router.get("/statment", validAccountId, async (req, res) => {
  try {
    const { id } = req.body;
    const statment = await getStatmentByAccountId(id);
    res.status(201).send(statment);
  } catch (err) {
    console.log(err);
  }
});

router.get("/statment/period", validAccountId, async (req, res) => {
  try {
    const { id, from, to } = req.body;
    const statmentInPeriod = await getStatmentByAccountIdInPeriod(id, from, to);
    res.status(201).send(statmentInPeriod);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
