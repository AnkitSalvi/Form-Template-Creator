"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestTypeForUser = addRequestTypeForUser;
exports.getAllRequestTypesForUser = getAllRequestTypesForUser;
exports.updateRequestTypeForUser = updateRequestTypeForUser;
exports.deleteRequestTypeForUser = deleteRequestTypeForUser;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const requestTypesFilePath = path_1.default.join(__dirname, "../db/requestTypes.json");
const userRequestTypesFilePath = path_1.default.join(__dirname, "../db/userRequestTypes.json");
// Helper function to read JSON from a file
function readJsonFile(filePath) {
    if (!fs_1.default.existsSync(filePath)) {
        return [];
    }
    const data = fs_1.default.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}
// Helper function to write JSON to a file
function writeJsonFile(filePath, data) {
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
// Function to add a new RequestType for a user
function addRequestTypeForUser(userId, requestDetails) {
    const createdAt = new Date().toISOString();
    console.log("requestDetails:", requestDetails);
    const requestType = Object.assign({}, requestDetails);
    // Read the existing requestTypes from the JSON file
    const requestTypes = readJsonFile(requestTypesFilePath);
    console.log("requestType:", requestType);
    requestTypes["requestTypes"].push(requestType);
    // Write the updated requestTypes back to the JSON file
    writeJsonFile(requestTypesFilePath, requestTypes);
    const userRequestType = {
        userId,
        requestTypeId: requestDetails === null || requestDetails === void 0 ? void 0 : requestDetails.id,
        assignedAt: requestDetails === null || requestDetails === void 0 ? void 0 : requestDetails.createdAt,
    };
    // Read the existing userRequestTypes from the JSON file
    const userRequestTypes = readJsonFile(userRequestTypesFilePath);
    userRequestTypes["userRequestTypes"].push(userRequestType);
    // Write the updated userRequestTypes back to the JSON file
    writeJsonFile(userRequestTypesFilePath, userRequestTypes);
    return requestType;
}
function getAllRequestTypesForUser(userId) {
    const userRequestTypes = readJsonFile(userRequestTypesFilePath);
    const requestTypes = readJsonFile(requestTypesFilePath);
    const userRequestIds = userRequestTypes["userRequestTypes"]
        .filter((urt) => urt.userId === userId)
        .map((urt) => urt.requestTypeId);
    return requestTypes["requestTypes"].filter((rt) => userRequestIds.includes(rt.id));
}
function updateRequestTypeForUser(userId, requestTypeId, updatedData) {
    const requestTypes = readJsonFile(requestTypesFilePath);
    const userRequestTypes = readJsonFile(userRequestTypesFilePath);
    // Find the index of the requestType in the list
    const requestTypeIndex = requestTypes["requestTypes"].findIndex((rt) => rt.id === requestTypeId);
    console.log("requestTypeIndex:", requestTypeIndex);
    if (requestTypeIndex === -1) {
        return null; // RequestType not found
    }
    // Find the userRequestType to ensure the user is associated with this requestType
    const userRequestType = userRequestTypes["userRequestTypes"].find((urt) => urt.userId === userId && urt.requestTypeId === requestTypeId);
    console.log("userRequestType:", userRequestType);
    if (!userRequestType) {
        return null; // The user is not associated with this requestType
    }
    requestTypes["requestTypes"][requestTypeIndex] = Object.assign({}, updatedData);
    // Write the updated requestTypes back to the JSON file
    writeJsonFile(requestTypesFilePath, requestTypes);
    return updatedData;
}
function deleteRequestTypeForUser(userId, requestTypeId) {
    const requestTypesData = JSON.parse(fs_1.default.readFileSync(requestTypesFilePath, "utf-8"));
    const userRequestTypesData = JSON.parse(fs_1.default.readFileSync(userRequestTypesFilePath, "utf-8"));
    const requestTypeIndex = requestTypesData["requestTypes"].findIndex((rt) => rt.id === requestTypeId);
    const userRequestTypeIndex = userRequestTypesData["userRequestTypes"].findIndex((urt) => urt.userId === userId && urt.requestTypeId === requestTypeId);
    if (requestTypeIndex !== -1 && userRequestTypeIndex !== -1) {
        // Remove the request type and user-request type mapping
        requestTypesData["requestTypes"].splice(requestTypeIndex, 1);
        userRequestTypesData["userRequestTypes"].splice(userRequestTypeIndex, 1);
        // Write updated data back to files
        fs_1.default.writeFileSync(requestTypesFilePath, JSON.stringify(requestTypesData, null, 2));
        fs_1.default.writeFileSync(userRequestTypesFilePath, JSON.stringify(userRequestTypesData, null, 2));
        return true;
    }
    return false; // RequestType not found
}
//# sourceMappingURL=request-types-controller.js.map