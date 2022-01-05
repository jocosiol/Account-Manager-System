function validTransactionValue(req, res, next) {
  const { amountDeposit, amountWithdraw } = req.body;
    if (amountDeposit <= 0 || amountWithdraw <= 0) {
      res.status(404).send('The amount of the transaction must be greater than 0');
      return;
    }
    next();
  }
  
  
  module.exports = {validTransactionValue}