import { updateUserPassword } from "../controller/user-controller-service.js";
import { createUser, deleteUserById, emailExists, usernameExists } from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(email, username, passwordHash) {
  const createdUser = await createUser({ email, username, passwordHash });
  return createdUser;
}

export async function ormDeleteUserById(id) {
  const deletedUser = await deleteUserById(id);
  return deletedUser;
}

export async function ormUpdateUserPassword(email, passwordHash) {
  const updatedUser = await updateUser(email, passwordHash);
  return updatedUser;
}

export async function ormUsernameExists(username) {
  const exists = await usernameExists(username);
  return exists;
}

export async function ormEmailExists(email) {
  const exists = await emailExists(email);
  return exists;
}
