"use strict";
// Configure Dynamic  Env Setup 
require("dotenv").config({ path: `envs/.env.${process.env.NODE_ENV}` }); 

const express = require("express");
import { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { expressApp } from "./expressApp";
import { syncDB, verifyDBConnection } from "./src/database";

//To Configure Unhandled and Uncaught Exceptions and errors
process.on("uncaughtException", (error: Error) => {
	console.error(
		"uncaughtException " +
			"terminating process now " +
			"EXIT " +
			JSON.stringify({ errorName: error.name, errorMessage: error.message })
	);
	process.exit(1);
});

const app: Application = express();

app.use(bodyParser.json());
app.use(cookieParser());


//set headers to allow cross origin requests.
app.use(function (req: Request, res: Response, next: NextFunction) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
	next();
});

//Express App For all Routes and Middleware Setup
expressApp(app);


const startServer = async () => {
	try {
		//   await verifyDBConnection();
		//   await syncDB();

		app.listen(process.env.SERVER_PORT, () => {
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
