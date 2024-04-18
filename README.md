# Library Application


An application has been developed to manage members and the borrowing of books by members for a library. The operations that the application can perform are listed below:

- Listing users
- Accessing information about a user (their name, books borrowed in the past, and currently borrowed books)
- Creating a new user
- Listing books
- Accessing information about a book (its name and average rating)
- Creating a new book
- Borrowing a book
- Returning a book and giving a rating

## Application

- Developed with the REST API Express.js library.
- JavaScript has been utilized.
- PostgreSQL has been chosen as the database.
- Sequelize has been used as an ORM for database operations.
- Body payloads in API requests have been validated using the Joi validator.
- In case of errors (such as attempting to borrow a book for a non-existent user, attempting to borrow a book already borrowed by someone else, etc.), the application catches the error and indicates an error in the API response (at least 500 Internal Server Error).

#### Frontend development has been done for visualization purposes, utilizing React Hooks.
![](./gif1.gif)

## Installation

Use the package manager [npm](https://www.npmjs.com) to install node modules.

```bash
cd Frontend
npm install 
```

```bash
cd Backend
npm install 
```
##### Frontend:
```bash
cd Frontend
npm start 
```
##### Backend:
```bash
cd Backend
npm run start 
```

## Docker

```bash
cd /path/to/backend
docker build -t backend-image .
```
```bash
cd /path/to/frontend
docker build -t frontend-image .
```
## Usage

```text
## Running the Application

Upon completion of the build, navigate to localhost:3000 in your web browser. As there are no users and books in the database initially, you won't see any data displayed.
User, Book and UserBook tables are automatically populated upon completion of the build
Clicking the add user or add book buttons will open a dialog where you can input the details:

Clicking the Ok button will save the user/book.

### Possible Errors ###

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.


## Stay in touch

- Author - [Melis Keşen](https://www.linkedin.com/in/meliskesen/)
- Website - [https://melis-kesen.github.io/Portfolio/](https://melis-kesen.github.io/Portfolio/)

## License


```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.


## Stay in touch

- Author - [Melis Keşen](https://www.linkedin.com/in/meliskesen/)
- Website - [https://melis-kesen.github.io/Portfolio/](https://melis-kesen.github.io/Portfolio/)

## License
