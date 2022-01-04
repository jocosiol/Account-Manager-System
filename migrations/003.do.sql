CREATE TABLE IF NOT EXISTS `account` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `balance` float,
  `dailyWithdrawlLimit` float,
  `activeFlag` boolean,
  `accountType` int,
  `createdDate` timestamp,
  `personId` int,
  FOREIGN KEY (personId) REFERENCES person(id)
);