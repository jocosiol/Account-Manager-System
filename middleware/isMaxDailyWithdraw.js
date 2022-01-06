const { getAccountById, dailyWithdraw } = require("../data/account");

async function isMaxDailyWithdraw(req, res, next) {
  const { id, amountWithdraw } = req.body;
  const account = await getAccountById(id);
  const dailyWithdrawlLimit = account.dailyWithdrawlLimit;

  const dailyWithdrawal = await dailyWithdraw(id);

  if (dailyWithdrawlLimit < (-dailyWithdrawal + amountWithdraw)) {
    res.status(404).send("Max withdraw has been met");
    return;
  }
  next();
}

module.exports = { isMaxDailyWithdraw };
