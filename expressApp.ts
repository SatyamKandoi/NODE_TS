"use strict";

import { Application } from "express";
import { json, urlencoded } from "express";
import cors from "cors";
import { initRoutes } from "./initroutes";
import { InvalidPathError } from "./src/errors/invalid-path-error";
import errorHandlingMiddleware from "./src/middlewares/errorHandling";

const expressApp = (app: Application) => {
	app.use(json({ limit: "1mb" }));
	app.use(urlencoded({ extended: true, limit: "1mb" }));
	app.use(cors());

	//---Initialize all Routes -- //

	initRoutes(app);

	app.get("/", (req, res) => {
		res.send("Hello");
	});

	// -- For Invalid Routes -- //

	app.use("*", (req, res, next) => {
		throw new InvalidPathError(`Can't find ${req.originalUrl} on the Server`);
	});

	//Error Handling Middlewares atlast of all the code
	errorHandlingMiddleware(app);

};

export { expressApp };
