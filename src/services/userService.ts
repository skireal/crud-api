import { User, users } from '../models/userModel';

export const getUsersService = (): User[] => {
  return users;
};

export const getUserByIdService = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

export const createUserService = (userData: User): User => {
  const newUser: User = {
    id: Date.now().toString(),
    username: userData.username,
    age: userData.age,
    hobbies: userData.hobbies,
  };
  users.push(newUser);
  return newUser;
};

export const updateUserService = (
  id: string,
  userData: Partial<User>,
): User | undefined => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return undefined;

  const userToUpdate = users[userIndex]!;

  const updatedUser: User = {
    id: userToUpdate.id,
    username:
      userData.username !== undefined
        ? userData.username
        : userToUpdate.username,
    age: userData.age !== undefined ? userData.age : userToUpdate.age,
    hobbies:
      userData.hobbies !== undefined ? userData.hobbies : userToUpdate.hobbies,
  };

  users[userIndex] = updatedUser;

  return updatedUser;
};

export const deleteUserService = (id: string): boolean => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return false;

  users.splice(userIndex, 1);
  return true;
};
