"use strict";

import { Application } from "express";

const { json, urlencoded } = require("express");
const cors = require("cors");

const expressApp = (app:Application) => {
    app.use(json({ limit: "1mb" }));
    app.use(urlencoded({ extended: true, limit: "1mb" }));
    app.use(cors());
   
  };

module.exports = { expressApp };