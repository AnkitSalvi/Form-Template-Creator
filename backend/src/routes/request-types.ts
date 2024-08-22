import express from "express";

import {
  addRequestTypeForUser,
  getAllRequestTypesForUser,
  updateRequestTypeForUser,
  deleteRequestTypeForUser,
} from "../controllers/request-types-controller";

const router = express.Router();

/**
 * @swagger
 *  /api/requestTypes:
 *  post:
 *      tags:
 *        - requestTypes
 *      summary: Add a new request type for a user
 *      description: Add a new request type for a user
 *      operationId: addRequestType
 *      requestBody:
 *        content:
 *          application/json:
 *           schema:
 *                 $ref: '#/components/schemas/RequestType'
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: Request type created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RequestType'
 *        '405':
 *          description: Invalid input
 */

router.post("/requestTypes", async (req, res) => {
  const { userId, requestDetails } = req.body;

  // Assuming addRequestTypeForUser is imported
  const newRequestType = addRequestTypeForUser(userId, requestDetails);

  res.status(200).json(newRequestType);
});

/**
 * @swagger
 *  /api/requestTypes/{userId}:
 *  get:
 *      tags:
 *        - requestTypes
 *      summary: Get all request types for a user
 *      description: Retrieve all request types associated with a given user
 *      operationId: getAllRequestTypesForUser
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: List of request types
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/RequestType'
 *        '404':
 *          description: User not found
 */

router.get("/requestTypes/:userId", async (req, res) => {
  const { userId } = req.params;

  // Assuming getAllRequestTypesForUser is imported
  const requestTypes = getAllRequestTypesForUser(userId);

  if (!requestTypes.length) {
    return res.status(404).send("No request types found for this user");
  }

  res.status(200).json(requestTypes);
});

/**
 * @swagger
 *  /api/requestTypes/{userId}/{requestTypeId}:
 *  put:
 *      tags:
 *        - requestTypes
 *      summary: Update an existing request type for a user
 *      description: Update an existing request type for a user
 *      operationId: updateRequestTypeForUser
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *        - name: requestTypeId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *           schema:
 *                 $ref: '#/components/schemas/UpdatedRequestType'
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: Request type updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RequestType'
 *        '404':
 *          description: Request type not found
 */

router.put("/requestTypes/:userId/:requestTypeId", async (req, res) => {
  const { userId, requestTypeId } = req.params;
  const updatedData = req.body;

  // Assuming updateRequestTypeForUser is imported
  const updatedRequestType = updateRequestTypeForUser(
    userId,
    requestTypeId,
    updatedData
  );

  if (!updatedRequestType) {
    return res.status(404).send("Request type not found");
  }

  res.status(200).json(updatedRequestType);
});

/**
 * @swagger
 *  /api/requestTypes/{userId}/{requestTypeId}:
 *  delete:
 *      tags:
 *        - requestTypes
 *      summary: Delete a request type for a user
 *      description: Delete a specific request type for a given user
 *      operationId: deleteRequestTypeForUser
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *        - name: requestTypeId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: Request type deleted successfully
 *        '404':
 *          description: Request type not found
 */

router.delete("/requestTypes/:userId/:requestTypeId", async (req, res) => {
  const { userId, requestTypeId } = req.params;

  // Assuming deleteRequestTypeForUser is imported
  const isDeleted = deleteRequestTypeForUser(userId, requestTypeId);

  if (isDeleted) {
    res.status(200).send("Request type deleted successfully");
  } else {
    res.status(404).send("Request type not found for this user");
  }
});

export default router;
