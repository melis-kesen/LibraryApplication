import axios from "axios";
const HOST  = process.env.HOST;
const PORT = process.env.PORT;
const API = `http://${HOST}:${PORT}/users`;

const UserService = {
  async getUsers() {
    try {
      const response = await axios.get(API);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  async getUser(userId) {
    try {
      const response = await axios.get(API + "/" + userId);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
  async createUser() {
    try {
      const response = await axios.post(API);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  async borrowBook(userId, bookId) {
    try {
      const response = await axios.post(API  + "/" + userId  + "/borrow/" + bookId);
      return response.data;
    } catch (error) {
      console.error('Error borrowing book:', error);
      throw error;
    }
  },
  async returnBook(userId, score) {
    try {
      const response = await axios.post(API  + "/" + userId  + "/score/" + score);
      return response.data;
    } catch (error) {
      console.error('Error returning book:', error);
      throw error;
    }
  },
};

export default UserService;
