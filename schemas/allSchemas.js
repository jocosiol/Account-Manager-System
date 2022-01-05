const S = require('fluent-json-schema');

exports.createNewPersonSchema = S.object()
.prop('name', S.string().required())
.prop('document', S.string().required())
.prop('birthDate', S.string().required())
.valueOf();

exports.createNewAccountSchema = S.object()
.prop('dailyWithdrawlLimit', S.number().required())
.prop('accountType', S.number().required())
.valueOf();

exports.newDepositSchema = S.object()
.prop('id', S.number().required())
.prop('amountDeposit', S.number().required())
.valueOf();

exports.newWithdrawSchema = S.object()
.prop('id', S.number().required())
.prop('amountWithdraw', S.number().required())
.valueOf();