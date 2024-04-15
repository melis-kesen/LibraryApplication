import axios from "axios";
const API = `http://localhost:8080/users`

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
};

export default UserService;
