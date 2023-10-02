"use strict";

require("dotenv").config({ path: `envs/.env.dev` });
// Solve the Issue For Dynamic Env Setup like COTS
const express = require("express");
import { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { expressApp } from "./expressApp";

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
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
	next();
});

expressApp(app);

const startServer = async () => {
	try {
		//   await verifyDBConnection();
		//   await syncDB();

		app.listen(parseInt(process.env.SERVER_PORT as string), () => {
			console.info("Server listening on " + process.env.SERVER_PORT);
		});
	} catch (error) {
		process.on("unhandledRejection", (error: Error) => {
			console.info(
				"unhandledRejection " +
					"terminating process now " +
					"EXIT " +
					JSON.stringify({ errorName: error.name, errorMessage: error.message })
			);
			process.exit(1);
		});
		process.on("SIGINT", () => {
			console.info("SIGINT " + "terminating process now " + "EXIT ");
			process.exit(0);
		});
	}
};

startServer();
