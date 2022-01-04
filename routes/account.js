const express = require("express");
const router = express.Router();
const { createNewPerson, createNewAccount } = require("../data/account");

router.post("/create", async (req, res) => {
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
});

module.exports = router;
