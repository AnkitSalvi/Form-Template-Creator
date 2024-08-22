import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

function readJsonFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function login(email: string, password: string): User | null {
  const users: User[] = readJsonFile(path.join(__dirname, "../db/users.json"));

  const user = users["users"].find((u) => u.email === email);

  if (!user) {
    return null; // User not found
  }

  // This is just a placeholder for real password checking
  if (user.password === password) {
    return user;
  }

  return null; // Invalid password
}
