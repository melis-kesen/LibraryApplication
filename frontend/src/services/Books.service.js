import axios from "axios";
const configFile = require("../config/config");
const API = configFile.port + "/books";

class BookService  {
   getBooks() {
    return axios
      .get(API, {
        withCredentials: true,
      })
      .then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.error("Error fetching users:", error);
          throw error;
        }
      );
  }
   getBook(bookId) {
    return axios
    .get(API +"/" + bookId, {
      withCredentials: true,
    })
    .then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.error("Error fetching users:", error);
        throw error;
      }
    );
  }
  createBook(book) {
    return axios
    .post(API,book, {
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
};

export default new BookService();
