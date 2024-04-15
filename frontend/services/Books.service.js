import axios from "axios";
const API = `http://localhost:8080/books`

const UserService = {
  async getBooks() {
    try {
      const response = await axios.get(API);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },
  async getBook(bookId) {
    try {
      const response = await axios.get(API + "/" + bookId);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  },
  async createBook() {
    try {
      const response = await axios.post(API);
      return response.data;
    } catch (error) {
      console.error('Error creating books:', error);
      throw error;
    }
  },
};

export default UserService;
