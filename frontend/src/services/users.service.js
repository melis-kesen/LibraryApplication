import axios from "axios";
const configFile = require("../config/config");
const API = configFile.port + "/api/users";
//const API = `http://${HOST}:${PORT}/users`;

const headers = {
  "Access-Control-Allow-Headers":
    "Access-Control-Allow-Headers, Access-Control-Allow-Origin, x-access-token, Origin, Content-Type, Accept",
  "Access-Control-Allow-Origin": "*", // Tüm origin'lere izin vermek istiyorsanız "*" kullanabilirsiniz. Güvenlik gereksinimlerinize göre değiştirebilirsiniz.
  "Content-Type": "application/json", // İsteklerinizin içeriğinin JSON formatında olduğunu belirtiyoruz.
};

class UserService {
  getUsers() {
    return axios
      .get(API, {
        withCredentials: true,
      })
      .then(
        (response) => {
          return response;
        },
        (error) => {
          console.error("Error fetching users:", error);
          throw error;
        }
      );
  }
  /*getUser(userId) {
    try {
      const response = axios.get(API + "/" + userId);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
  createUser() {
    try {
      const response = axios.post(API);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  borrowBook(userId, bookId) {
    try {
      const response = axios.post(API + "/" + userId + "/borrow/" + bookId);
      return response.data;
    } catch (error) {
      console.error("Error borrowing book:", error);
      throw error;
    }
  }
  returnBook(userId, score) {
    try {
      const response = axios.post(API + "/" + userId + "/score/" + score);
      return response.data;
    } catch (error) {
      console.error("Error returning book:", error);
      throw error;
    }
  }*/
}

export default new UserService();
