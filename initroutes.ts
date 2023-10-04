import { Application } from "express";
import { userRoute } from "./src/routes/userRoute";


//Initilaze all Routes Here

const initRoutes = (app: Application) => {
	app.use("/api/v1/user", userRoute);
};

export { initRoutes };
