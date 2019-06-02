// UsersService class - array of all the chat users
class UsersService {
  constructor() {
    this.users = [];
  }
  // all the users
  getAllUsers() {
    return this.users;
  }
  // find a specific user
  getUserById(userId) {
    return this.users.find(user => user.id === userId);
  }
  // add a new user
  addUser(user) {
    this.users = [user, ...this.users];
  }
  // remove existing user by filtering user out
  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
module.exports = UsersService;
