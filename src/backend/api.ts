import axios from "axios";

// Define the Transaction type

// Define the User type
export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  profilePicture: string;
  history?: Transaction[];
};

export type Transaction = {
  date: string;
  description: string;
  amount: string;
  type: string;    // e.g. "Credit" or "Debit"
  balance: string;
};



// JSON Bin setup
const BIN_ID = "68614c738561e97a502e2292";
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const headers = {
  "X-Master-Key": API_KEY,
  "Content-Type": "application/json",
};

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(BASE_URL, { headers });
  return response.data.record.users || [];
};

// Add a new user
export const addUser = async (user: User): Promise<void> => {
  const users = await getUsers();
  users.push(user);
  await axios.put(BASE_URL, { users }, { headers });
};

// Update a user
export const updateUser = async (index: number, updatedUser: User): Promise<void> => {
  const users = await getUsers();
  users[index] = updatedUser;
  await axios.put(BASE_URL, { users }, { headers });
};

// Delete a user
export const deleteUser = async (index: number): Promise<void> => {
  const users = await getUsers();
  users.splice(index, 1);
  await axios.put(BASE_URL, { users }, { headers });
};

// Fetch history for the logged-in user
export const fetchHistoryForLoggedUser = async (email: string): Promise<Transaction[]> => {
  const users = await getUsers();
  const me = users.find((u: User) => u.email === email);
  return me?.history || [];
};
