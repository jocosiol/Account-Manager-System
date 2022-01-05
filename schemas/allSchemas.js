const S = require('fluent-json-schema');

// name, document, birthDate
exports.createNewPersonSchema = S.object()
.prop('name', S.string().required())
.prop('document', S.string().required())
.prop('birthDate', S.string().required())
.valueOf();

//dailyWithdrawlLimit, accountType
exports.createNewAccountSchema = S.object()
.prop('dailyWithdrawlLimit', S.number().required())
.prop('accountType', S.number().required())
.valueOf();

//amountDeposit
exports.newDepositSchema = S.object()
.prop('amountDeposit', S.number().required())
.valueOf();