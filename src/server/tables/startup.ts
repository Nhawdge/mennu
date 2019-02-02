import mysql from "../mysql";

export default class {
    databaseCheck() {

    };
    createDatabase() {
        var query = databaseCreation;
        mysql.query(query);
    }
}

var databaseCreation =
    `
CREATE DATABASE  IF NOT EXISTS \`mennu\`
USE \`mennu\`;

DROP TABLE IF EXISTS \`ingredient\`;
CREATE TABLE \`ingredient\` (
  \`id\` varchar(36) NOT NULL,
  \`name\` varchar(1000) DEFAULT NULL,
  \`measurement\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS \`meal\`;
CREATE TABLE \`meal\` (
  \`id\` char(36) NOT NULL,
  \`name\` varchar(1000) DEFAULT NULL,
  \`servings\` int(11) DEFAULT '0',
  \`instructions\` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS \`mealingredients\`;
CREATE TABLE \`mealingredients\` (
  \`id\` varchar(36) NOT NULL,
  \`mealId\` varchar(36) NOT NULL,
  \`ingredientId\` varchar(36) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;`;