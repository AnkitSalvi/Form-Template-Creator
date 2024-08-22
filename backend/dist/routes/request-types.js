"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_types_controller_1 = require("../controllers/request-types-controller");
const router = express_1.default.Router();
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
router.post("/requestTypes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, requestDetails } = req.body;
    // Assuming addRequestTypeForUser is imported
    const newRequestType = (0, request_types_controller_1.addRequestTypeForUser)(userId, requestDetails);
    res.status(200).json(newRequestType);
}));
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
router.get("/requestTypes/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    // Assuming getAllRequestTypesForUser is imported
    const requestTypes = (0, request_types_controller_1.getAllRequestTypesForUser)(userId);
    if (!requestTypes.length) {
        return res.status(404).send("No request types found for this user");
    }
    res.status(200).json(requestTypes);
}));
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
router.put("/requestTypes/:userId/:requestTypeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, requestTypeId } = req.params;
    const updatedData = req.body;
    // Assuming updateRequestTypeForUser is imported
    const updatedRequestType = (0, request_types_controller_1.updateRequestTypeForUser)(userId, requestTypeId, updatedData);
    if (!updatedRequestType) {
        return res.status(404).send("Request type not found");
    }
    res.status(200).json(updatedRequestType);
}));
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
router.delete("/requestTypes/:userId/:requestTypeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, requestTypeId } = req.params;
    // Assuming deleteRequestTypeForUser is imported
    const isDeleted = (0, request_types_controller_1.deleteRequestTypeForUser)(userId, requestTypeId);
    if (isDeleted) {
        res.status(200).send("Request type deleted successfully");
    }
    else {
        res.status(404).send("Request type not found for this user");
    }
}));
exports.default = router;
//# sourceMappingURL=request-types.js.map