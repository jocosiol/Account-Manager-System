CREATE TABLE IF NOT EXISTS `person` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `document` varchar(255),
  `birthDate` date
);