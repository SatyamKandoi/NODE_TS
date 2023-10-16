"use strict";

//Dynamic Env Setup
import dotenv from "dotenv"

dotenv.config({ path: `envs/.env.${process.env.NODE_ENV}` });

import express from "express";
import { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { expressApp } from "./expressApp";
import { DataBaseError } from "./src/errors/database-error";
import { db } from "./src/database/verifyDBConnection";

process.on("uncaughtException", (error: Error) => {
	console.error(
		"uncaughtException " +
			"terminating process now " +
			"EXIT " +
			JSON.stringify({ errorName: error.name, errorMessage: error.message })
	);
	process.exit(1);
});

process.on("unhandledRejection", (error: Error) => {
	console.error(
		"unhandledRejection " +
			"terminating process now " +
			"EXIT " +
			JSON.stringify({ errorName: error.name, errorMessage: error.message })
	);
	process.exit(1);
});

process.on("SIGINT", () => {
	console.error("SIGINT " + "terminating process now " + "EXIT ");
	process.exit(0);
});

const app: Application = express();


app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req: Request, res: Response, next: NextFunction) {
	//set headers to allow cross origin requests.
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE,OPTIONS");
	next();
});

expressApp(app);

const startServer = async () => {
	try {
		db.connect()
		app.listen(parseInt(process.env.SERVER_PORT as string), () => {
			console.info("Server listening on " + process.env.SERVER_PORT);
		});
	} catch (error) {
		throw new DataBaseError("Error Connecting the Server","DB_CONNECTION_ERROR")
	}
};

startServer();
