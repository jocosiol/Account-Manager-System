function validDepositValue(req, res, next) {
  const { amountDeposit } = req.body;
    if (amountDeposit <= 0) {
      res.status(404).send('The amount to deposit must be greater than 0');
      return;
    }
    next();
  }
  
  
  module.exports = {validDepositValue}