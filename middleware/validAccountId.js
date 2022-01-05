const { getAccountById } = require('../data/account');

async function validAccountId (req, res, next) {
  const { id } = req.params;
  const user = await getAccountById(id);
  if (!user) {
    res.status(404).send(`User with id: ${id} does not exist`);
    return;
  }
  req.body.user = user;
  next();
};


module.exports = {validAccountId}