"use strict";
import fs from "fs"
import path from "path";
import {DataTypes, Sequelize} from "sequelize"
import process from "process";
import { DataBaseError } from "../errors/database-error";

const basename = path.basename(__filename);
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
}
// fs.readdirSync(__dirname)
// 	.filter((file:string) => {
// 		return (
// 			file.indexOf(".") !== 0 &&
// 			file !== basename &&
// 			file.slice(-3) === ".ts" &&
// 			file.indexOf(".test.js") === -1
// 		);
// 	})
// 	.forEach((file) => {
// 		const model = require(path.join(__dirname, file))(
// 			sequelize,
			
// 		);
// 		db[model.name] = model;
// 	});

// Object.keys(db).forEach((modelName) => {
// 	if (db[modelName].associate) {
// 		db[modelName].associate(db);
// 	}
// });



module.exports = db;
