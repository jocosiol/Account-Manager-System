const { query } = require("../lib/db");
const SQL = require("@nearform/sql");

async function createNewPerson(name, document, birthDate) {
  try {
    const sql = SQL`INSERT INTO person (name, document, birthDate) VALUES (${name}, ${document}, STR_TO_DATE(${birthDate}, '%d-%m-%Y'))`;
    const createdPerson = await query(sql);
    return createdPerson;
  } catch (err) {
    console.log(err);
  }
}
async function createNewAccount(dailyWithdrawlLimit, accountType, personId) {
  try {
    const sql = SQL`INSERT INTO account (balance, dailyWithdrawlLimit, activeFlag, accountType, createdDate, personId) VALUES (0, ${dailyWithdrawlLimit}, 1, ${accountType}, CURRENT_DATE(), ${personId})`;
    const createdAccount = await query(sql);
    return createdAccount;
  } catch (err) {
    console.log(err);
  }
}
async function newDeposit(accountId, amountDeposit) {
  try {
    const sql = SQL`INSERT INTO transaction (value, transactionDate, accountId) VALUES (${amountDeposit}, CURRENT_DATE(), ${accountId})`;
    const newTransaction = await query(sql);
    const sqlUpdateBalance = SQL`UPDATE account SET balance = balance + ${amountDeposit} WHERE Id = ${accountId}`;
    const newBalance = await query(sqlUpdateBalance);
    return newBalance;
  } catch (err) {
    console.log(err);
  }
}
async function getAccountById(id) {
  try {
    const sql = SQL`SELECT * FROM account WHERE id=${id}`;
    const rows = await query(sql);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}

async function getBalanceByAccountId(id) {
  try {
    const sql = SQL`SELECT balance FROM account WHERE id=${id}`;
    const rows = await query(sql);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}

async function newWithdraw(accountId, amountWithdraw) {
  try {
    const sql = SQL`INSERT INTO transaction (value, transactionDate, accountId) VALUES (-${amountWithdraw}, CURRENT_DATE(), ${accountId})`;
    const newTransaction = await query(sql);
    const sqlUpdateBalance = SQL`UPDATE account SET balance = balance - ${amountWithdraw} WHERE Id = ${accountId} AND balance >= ${amountWithdraw}`;
    const newBalance = await query(sqlUpdateBalance);
    return newBalance;
  } catch (err) {
    console.log(err);
  }
}

async function dailyWithdraw(accountId) {
  try {
    const sql = SQL`SELECT SUM(value) as total from transaction WHERE accountId=${accountId} AND transactionDate = CURDATE() AND value<0`;
    const dailyWithdraw = await query(sql);
    return dailyWithdraw[0].total;
  } catch (err) {
    console.log(err);
  }
}

async function blockAccount(id) {
  try {
    const sql = SQL`UPDATE account SET activeFlag=0 WHERE id=${id}`;
    const blocked = await query(sql);
    return blocked;
  } catch (err) {
    console.log(err);
  }
}

async function getStatmentByAccountId(id) {
  try {
    const sql = `SELECT id, value, transactionDate from transaction WHERE accountId=${id}`;
    const rows = await query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function getStatmentByAccountIdInPeriod(id, from, to) {
  try {
    const sql = `SELECT id, value, transactionDate from transaction WHERE accountId=${id} AND transactionDate BETWEEN '${from}' AND '${to}';`;
    const rows = await query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function deleteTransaction(accountId) {
  try {
    const sql = `DELETE FROM transaction WHERE accountId=${accountId}`;
    const rows = await query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function deleteAccount(personId) {
  try {
    const sql = `DELETE FROM account WHERE personId=${personId}`;
    const rows = await query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function deletePerson(personId) {
  try {
    const sql = `DELETE FROM person WHERE id=${personId}`;
    const rows = await query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createNewPerson,
  createNewAccount,
  newDeposit,
  getAccountById,
  getBalanceByAccountId,
  newWithdraw,
  dailyWithdraw,
  blockAccount,
  getStatmentByAccountId,
  getStatmentByAccountIdInPeriod,
  deleteTransaction,
  deleteAccount,
  deletePerson,
};
