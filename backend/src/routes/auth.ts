import express from "express";

const router = express.Router();

import { login } from "../controllers/auth-controller";

import { addRequestTypeForUser } from "../controllers/request-types-controller";

/**
 * @swagger
 *  /api/auth/login:
 *  post:
 *      tags:
 *        - auth
 *      summary: login for an user
 *      description: login for a user
 *      operationId: login
 *      requestBody:
 *        content:
 *          application/json:
 *           schema:
 *                 $ref: '#/components/schemas/login'
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/login'
 *        '405':
 *          description: Invalid input
 */

//Method to login for a created user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Assuming login function is imported
  const user = login(email, password);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  res.status(200).json({ ...user, isLogin: true });
});

export default router;
