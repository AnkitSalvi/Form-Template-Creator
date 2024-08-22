import express from "express";
import indexRouter from "./routes";
import { swaggerOptions } from "./swagger/swagger";
import bodyParser from "body-parser";
import cors from "cors";

const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "*", // Replace with your React app's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies
  optionsSuccessStatus: 204, // Set the pre-flight request status code to 204
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
};

app.use(cors(corsOptions));

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api", indexRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
