import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

interface InformationToCollect {
  field: string;
  type: "text" | "long-text" | "date" | "select";
  required: boolean;
  example?: string;
  options?: string[];
}

interface RequestType {
  id: string;
  requestType: string;
  purpose: string;
  informationToCollect: InformationToCollect[];
  requestTypeOwner: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UserRequestType {
  userId: string;
  requestTypeId: string;
  assignedAt: string;
}

const requestTypesFilePath = path.join(__dirname, "../db/requestTypes.json");
const userRequestTypesFilePath = path.join(
  __dirname,
  "../db/userRequestTypes.json"
);

// Helper function to read JSON from a file
function readJsonFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(data);
}

// Helper function to write JSON to a file
function writeJsonFile(filePath: string, data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Function to add a new RequestType for a user
export function addRequestTypeForUser(
  userId: string,
  requestDetails: RequestType
): RequestType {
  const createdAt = new Date().toISOString();

  console.log("requestDetails:", requestDetails);
  const requestType: RequestType = {
    ...requestDetails,
  };

  // Read the existing requestTypes from the JSON file
  const requestTypes: RequestType[] = readJsonFile(requestTypesFilePath);

  console.log("requestType:", requestType);

  requestTypes["requestTypes"].push(requestType);

  // Write the updated requestTypes back to the JSON file
  writeJsonFile(requestTypesFilePath, requestTypes);

  const userRequestType: UserRequestType = {
    userId,
    requestTypeId: requestDetails?.id,
    assignedAt: requestDetails?.createdAt,
  };

  // Read the existing userRequestTypes from the JSON file
  const userRequestTypes: UserRequestType[] = readJsonFile(
    userRequestTypesFilePath
  );
  userRequestTypes["userRequestTypes"].push(userRequestType);

  // Write the updated userRequestTypes back to the JSON file
  writeJsonFile(userRequestTypesFilePath, userRequestTypes);

  return requestType;
}

export function getAllRequestTypesForUser(userId: string): RequestType[] {
  const userRequestTypes: UserRequestType[] = readJsonFile(
    userRequestTypesFilePath
  );
  const requestTypes: RequestType[] = readJsonFile(requestTypesFilePath);

  const userRequestIds = userRequestTypes["userRequestTypes"]
    .filter((urt) => urt.userId === userId)
    .map((urt) => urt.requestTypeId);

  return requestTypes["requestTypes"].filter((rt) =>
    userRequestIds.includes(rt.id)
  );
}

export function updateRequestTypeForUser(
  userId: string,
  requestTypeId: string,
  updatedData: RequestType
): RequestType | null {
  const requestTypes: RequestType[] = readJsonFile(requestTypesFilePath);
  const userRequestTypes: UserRequestType[] = readJsonFile(
    userRequestTypesFilePath
  );

  // Find the index of the requestType in the list
  const requestTypeIndex = requestTypes["requestTypes"].findIndex(
    (rt) => rt.id === requestTypeId
  );

  console.log("requestTypeIndex:", requestTypeIndex);

  if (requestTypeIndex === -1) {
    return null; // RequestType not found
  }

  // Find the userRequestType to ensure the user is associated with this requestType
  const userRequestType = userRequestTypes["userRequestTypes"].find(
    (urt) => urt.userId === userId && urt.requestTypeId === requestTypeId
  );

  console.log("userRequestType:", userRequestType);

  if (!userRequestType) {
    return null; // The user is not associated with this requestType
  }

  requestTypes["requestTypes"][requestTypeIndex] = { ...updatedData };

  // Write the updated requestTypes back to the JSON file
  writeJsonFile(requestTypesFilePath, requestTypes);

  return updatedData;
}

export function deleteRequestTypeForUser(
  userId: string,
  requestTypeId: string
): boolean {
  const requestTypesData = JSON.parse(
    fs.readFileSync(requestTypesFilePath, "utf-8")
  ) as RequestType[];
  const userRequestTypesData = JSON.parse(
    fs.readFileSync(userRequestTypesFilePath, "utf-8")
  ) as UserRequestType[];

  const requestTypeIndex = requestTypesData["requestTypes"].findIndex(
    (rt) => rt.id === requestTypeId
  );
  const userRequestTypeIndex = userRequestTypesData[
    "userRequestTypes"
  ].findIndex(
    (urt) => urt.userId === userId && urt.requestTypeId === requestTypeId
  );

  if (requestTypeIndex !== -1 && userRequestTypeIndex !== -1) {
    // Remove the request type and user-request type mapping
    requestTypesData["requestTypes"].splice(requestTypeIndex, 1);
    userRequestTypesData["userRequestTypes"].splice(userRequestTypeIndex, 1);

    // Write updated data back to files
    fs.writeFileSync(
      requestTypesFilePath,
      JSON.stringify(requestTypesData, null, 2)
    );
    fs.writeFileSync(
      userRequestTypesFilePath,
      JSON.stringify(userRequestTypesData, null, 2)
    );

    return true;
  }

  return false; // RequestType not found
}
