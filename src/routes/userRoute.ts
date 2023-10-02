import express from "express";

const userRoute = express.Router();

userRoute.get("/", (req, res, next) => {
	res.send("Hello User");
	next();
});

export { userRoute };
