const { query } = require("../lib/db");
const SQL = require("@nearform/sql");


async function createNewPerson(name, document, birthDate) {
    try {
      const sql = `INSERT INTO person (name, document, birthDate) VALUES ('${name}', '${document}', STR_TO_DATE('${birthDate}', '%m-%d-%Y'))`;
      const createdPerson = await query(sql);
      return createdPerson;
    } catch (err) {
      console.log(err);
    }
  }
  async function createNewAccount(dailyWithdrawlLimit, accountType, personId) {
    try {
      const sql = `INSERT INTO account (balance, dailyWithdrawlLimit, activeFlag, accountType, createdDate, personId) VALUES (0, ${dailyWithdrawlLimit}, 1, ${accountType}, CURRENT_DATE(), ${personId})`;
      const createdAccount = await query(sql);
      return createdAccount;
    } catch (err) {
      console.log(err);
    }
  }


  module.exports = { createNewPerson, createNewAccount };
