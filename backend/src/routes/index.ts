import express from "express";
import authRouter from "./auth";
import requestTypesRouter from "./request-types";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/", requestTypesRouter);

export default router;
