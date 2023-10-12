"use strict";
import { Sequelize , DataTypes} from "sequelize"
import process from "process";
import { DataBaseError } from "../errors/database-error";
import { Model } from "sequelize-typescript";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.ts")[env];

let sequelize:Sequelize;
try {
	if (config.use_env_variable) {
		sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
	} else {
		sequelize = new Sequelize(
			config.database,
			config.username,
			config.password,
			config
		);
	}
} catch (error) {
	console.error("Error connecting to the database: ", error);
	throw new DataBaseError(
		"Error connecting to the database.",
		"DB_CONNECTION_ERROR"
	);
}

const db = {
		sequelize,
		Sequelize,
		// Add New Models Here By importing Model Files And Requiring them 
		//   User: require("./user.model")(sequelize, DataTypes),

}


// Establish associations after importing all models

// Object.values(db).forEach(model => {
// 	if (model.associate) {
// 	  model.associate(db);
// 	}
//   });

module.exports = db;
