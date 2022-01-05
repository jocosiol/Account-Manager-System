const { getAccountById } = require('../data/account');

async function validAccountId (req, res, next) {
  const { id } = req.body;
  const account = await getAccountById(id);
  if (!account) {
    res.status(404).send(`Account with id: ${id} does not exist`);
    return;
  } else if (!account.activeFlag) {
    res.status(404).send(`Account with id: ${id} is not active`);
    return;
  }
  req.body.account = account;
  next();
};


module.exports = {validAccountId}