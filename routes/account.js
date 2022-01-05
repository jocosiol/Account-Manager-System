const express = require("express");
const router = express.Router();
const {
  createNewPerson,
  createNewAccount,
  newDeposit,
} = require("../data/account");
const { validateBody } = require("../middleware/validateBody");
const { validDepositValue } = require("../middleware/validDepositValue");
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
  validDepositValue,
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

module.exports = router;
