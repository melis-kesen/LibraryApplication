import axios from "axios";
const configFile = require("../config/config");
const API = configFile.port + "/api/users";

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
  getUser(userId) {
    return axios
      .get(API + "/" + userId, {
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
  createUser(user) {
    return axios
      .post(
        API,
        {
          withCredentials: true,
        },
        user
      )
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

  borrowBook(obj) {
    return axios
      .post(API + "/" + obj.userId + "/borrow/" + obj.bookId, {
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

  returnBook(obj) {
    return axios
      .post(API + "/" + obj.userId + "/score/" + obj.score, {
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
}

export default new UserService();
