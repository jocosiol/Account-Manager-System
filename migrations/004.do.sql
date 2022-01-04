CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `value` float,
  `transactionDate` timestamp,
  `accountId` int,
  FOREIGN KEY (accountId) REFERENCES account(id)
);