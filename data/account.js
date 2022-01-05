const { query } = require("../lib/db");
const SQL = require("@nearform/sql");


async function createNewPerson(name, document, birthDate) {
    try {
      const sql = `INSERT INTO person (name, document, birthDate) VALUES ('${name}', '${document}', STR_TO_DATE('${birthDate}', '%d-%m-%Y'))`;
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
  async function newDeposit(accountId, amountDeposit){
    try {
      const sql = SQL `INSERT INTO transaction (value, transactionDate, accountId) VALUES (${amountDeposit}, CURRENT_DATE(), ${accountId})`;
      const newTransaction = await query(sql);
      const sqlUpdateBalance = SQL `UPDATE account SET balance = balance + ${amountDeposit} WHERE Id = ${accountId}`;
      const newBalance = await query(sqlUpdateBalance);
      return newBalance;
    } catch (err) {
      console.log(err);
    }
  }
  async function getAccountById(id) {
    try {
      const sql = `SELECT * FROM account WHERE id='${id}'`;
      const rows = await query(sql);
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }

  async function getBalanceByAccountId(id) {
    try {
      const sql = `SELECT balance FROM account WHERE id='${id}'`;
      const rows = await query(sql);
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }


  module.exports = { createNewPerson, createNewAccount, newDeposit, getAccountById, getBalanceByAccountId };
