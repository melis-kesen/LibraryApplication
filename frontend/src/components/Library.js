import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { Sidebar } from "primereact/sidebar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

import UserService from "../services/users.service";
import BookService from "../services/books.service";

export const Library = () => {
  const toast = useRef(null);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogType, setDialogType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [username, setUsername] = useState("");
  const [bookname, setBookname] = useState("");
  const [score, setScore] = useState(null);
  const [isAdded, setIdAdded] = useState(false);
  const [presentBook, setPresentBook] = useState([]);
  const [pastBook, setPastBook] = useState([]);
  const [avgScore, setAvgScore] = useState(null);
  const [bookSidebarHeader, setBookSidebarHeader] = useState("");
  const [userSidebarHeader, setUserSidebarHeader] = useState("");
  useEffect(() => {
    getUsers();
    getBooks();
  }, [isAdded]);
  const getUsers = () => {
    UserService.getUsers().then(
      async (response) => {
        setUsers(response);
      },
      (error) => {
        console.log(error.response);
        toast.current.show({
          severity: "error",
          summary: "ERROR",
          detail: error.response.data.message,
          life: 3000,
        });
      }
    );
  };
  const getBooks = () => {
    BookService.getBooks().then(
      async (response) => {
        setBooks(response);
      },
      (error) => {
        console.log(error.response);
        toast.current.show({
          severity: "error",
          summary: "HATA",
          detail: error.response.data.message,
          life: 3000,
        });
      }
    );
  };
  const createUser = () => {
    if (username === "") {
      toast.current.show({
        severity: "warn",
        summary: "WARNING",
        detail: "User Name is required!",
        life: 3000,
      });
    } else {
      const obj = {
        name: username,
      };
      UserService.createUser(obj).then(
        async (response) => {
          setVisible(false);
          setIdAdded(true);
          setUsername("");
        },
        (error) => {
          console.log(error.response);
          toast.current.show({
            severity: "error",
            summary: "ERROR",
            detail: error.response.data.message,
            life: 3000,
          });
        }
      );
      setIdAdded(false);
    }
  };
  const createBook = () => {
    if (bookname === "") {
      toast.current.show({
        severity: "warn",
        summary: "WARNING",
        detail: "Book Name is required!",
        life: 3000,
      });
    } else {
      const obj = {
        name: bookname,
      };
      BookService.createBook(obj).then(
        async (response) => {
          setVisible(false);
          setIdAdded(true);
          setBookname("");
        },
        (error) => {
          console.log(error.response);
          toast.current.show({
            severity: "error",
            summary: "HATA",
            detail: error.response.data.message,
            life: 3000,
          });
        }
      );
      setIdAdded(false);
    }
  };
  const showUser = (rowData) => {
    UserService.getUser(rowData.id).then(
      async (response) => {
        setPresentBook(response.books.present);
        setPastBook(response.books.past);
        setVisibleRight(true);
        setUserSidebarHeader(rowData.name);
      },
      (error) => {
        console.log(error.response);
        toast.current.show({
          severity: "error",
          summary: "HATA",
          detail: error.response.data.message,
          life: 3000,
        });
      }
    );
  };
  const showBook = (rowData) => {
    BookService.getBook(rowData.id).then(
      async (response) => {
        setVisibleRight(true);
        setAvgScore(response.score);
        setBookSidebarHeader(rowData.name);
      },
      (error) => {
        console.log(error.response);
        toast.current.show({
          severity: "error",
          summary: "HATA",
          detail: error.response.data.message,
          life: 3000,
        });
      }
    );
  };
  const borrowBook = () => {
    if (
      selectedUser === null ||
      selectedUser?.id === null ||
      selectedBook === null ||
      selectedBook?.id === null
    ) {
      toast.current.show({
        severity: "warn",
        summary: "WARNING",
        detail: "User Name and Book Name is required!",
        life: 3000,
      });
    } else {
      const obj = {
        userId: selectedUser.id,
        bookId: selectedBook.id,
      };
      UserService.borrowBook(obj).then(
        async (response) => {
          setVisible(false);
          setSelectedBook("");
          setSelectedUser("");
          setScore(null);
          toast.current.show({
            severity: "success",
            summary: "SUCCESS",
            detail: response.message,
            life: 3000,
          });
        },
        (error) => {
          console.log(error.response);
          toast.current.show({
            severity: "error",
            summary: "HATA",
            detail: error.response.data.message,
            life: 3000,
          });
        }
      );
    }
  };
  const returnBook = () => {
    if (
      selectedUser === null ||
      selectedUser?.id === null ||
      selectedBook?.id === null ||
      selectedBook === null ||
      score === null
    ) {
      toast.current.show({
        severity: "warn",
        summary: "WARNING",
        detail: "User Name, Book Name and Score is required!",
        life: 3000,
      });
    } else {
      const userId = selectedUser.id;
      const bookId = selectedBook.id;
      const obj = {
        score: score,
      };
      UserService.returnBook(userId, bookId, obj).then(
        async (response) => {
          setVisible(false);
          setSelectedBook("");
          setSelectedUser("");
          setScore(null);
        },
        (error) => {
          console.log(error.response);
          toast.current.show({
            severity: "error",
            detail: error.response.data.message,
            life: 3000,
          });
        }
      );
    }
  };
  const openDialog = (type) => {
    setDialogType(type);
    setVisible(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-info"
          rounded
          outlined
          className="mr-2"
          onClick={
            activeIndex === 0
              ? () => showUser(rowData)
              : () => showBook(rowData)
          }
          tooltip="Use for open details"
        />
        {/*<Button icon="pi pi-trash" rounded outlined severity="danger" />*/}
      </React.Fragment>
    );
  };
  const selectDialog = (dialogType) => {
    if (dialogType === "Add User") {
      createUser();
    } else if (dialogType === "Add Book") {
      createBook();
    } else if (dialogType === "Borrow Book") {
      borrowBook();
    } else {
      returnBook();
    }
  };
  const clickCancel = () => {
    setVisible(false);
    setUsername("");
    setBookname("");
    setSelectedBook("");
    setSelectedUser("");
    setScore(null);
  };
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <Button
        onClick={() => openDialog(activeIndex === 0 ? "Add User" : "Add Book")}
        label={activeIndex === 0 ? "Add User" : "Add Book"}
        icon="pi pi-plus"
        rounded
        raised
        tooltip={
          activeIndex === 0 ? "Use for adding user" : "Use for adding book"
        }
        tooltipOptions={{ position: "bottom" }}
        style={{ marginLeft: "1rem" }}
      />
      <Button
        onClick={() => openDialog("Borrow Book")}
        visible={activeIndex === 0 ? false : true}
        style={{ marginLeft: "1rem" }}
        label="Borrow Book"
        icon="pi pi-book"
        rounded
        raised
        tooltip="Use for borrowing books"
        tooltipOptions={{ position: "bottom" }}
      />
      <Button
        onClick={() => openDialog("Return Book")}
        visible={activeIndex === 0 ? false : true}
        style={{ marginLeft: "1rem" }}
        label="Return Book"
        icon="pi pi-arrow-left"
        rounded
        raised
        tooltip="Use for returning books"
        tooltipOptions={{ position: "bottom" }}
      />
    </div>
  );
  const footerContent = (
    <div>
      <Button
        label="Cancel"
        rounded
        severity="danger"
        icon="pi pi-times"
        onClick={() => clickCancel()}
        className="p-button-text"
      />
      <Button
        label="OK"
        rounded
        icon="pi pi-check"
        onClick={() => selectDialog(dialogType)}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel header="Users" leftIcon="pi pi-user">
          <DataTable value={users} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column
              header="Details"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
          <br></br>
          {header}
        </TabPanel>
        <TabPanel header="Books" leftIcon="pi pi-book">
          <DataTable value={books} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column
              header="Details"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
          <br></br>
          {header}
        </TabPanel>
      </TabView>
      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "30%" }}
        onHide={() => setVisibleRight(false)}
      >
        {activeIndex === 0 && (
          <div>
            <h2 style={{ textAlign: "center" }}>{userSidebarHeader}</h2>
            <div className="card flex justify-content-center">
              <p>
                <b>Present Books:</b>
              </p>
              <DataTable value={presentBook} tableStyle={{ minWidth: "10rem" }}>
                <Column field="name" header="Name"></Column>
                <Column field="userScore" header="Score"></Column>
              </DataTable>
              <p>
                <b>Past Books:</b>
              </p>
              <DataTable value={pastBook} tableStyle={{ minWidth: "10rem" }}>
                <Column field="name" header="Name"></Column>
                <Column field="userScore" header="Score"></Column>
              </DataTable>
            </div>
          </div>
        )}
        {activeIndex === 1 && (
          <div>
            <h2 style={{ textAlign: "center" }}>{bookSidebarHeader}</h2>
            <div className="card flex justify-content-center">
              <p>
                <b>Average Score: </b>
                {avgScore}
              </p>
            </div>
          </div>
        )}
      </Sidebar>

      <Dialog
        header={dialogType}
        visible={visible}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        {dialogType === "Add User" && (
          <div className="card flex justify-content-center">
            <FloatLabel>
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">User Name</label>
            </FloatLabel>
          </div>
        )}
        {dialogType === "Add Book" && (
          <div className="card flex justify-content-center">
            <FloatLabel>
              <InputText
                id="bookname"
                value={bookname}
                onChange={(e) => setBookname(e.target.value)}
              />
              <label htmlFor="bookname">Book Name</label>
            </FloatLabel>
          </div>
        )}
        {dialogType === "Borrow Book" && (
          <div
            style={{ display: "grid" }}
            className="card flex flex-wrap justify-content-center"
          >
            <Dropdown
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.value)}
              options={users}
              optionLabel="name"
              placeholder="Select a User"
              className="w-full md:w-14rem"
            />
            <br></br>
            <Dropdown
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.value)}
              options={books}
              optionLabel="name"
              placeholder="Select a Book"
              className="w-full md:w-14rem"
            />
          </div>
        )}
        {dialogType === "Return Book" && (
          <div
            style={{ display: "grid" }}
            className="card flex flex-wrap justify-content-center"
          >
            <Dropdown
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.value)}
              options={users}
              optionLabel="name"
              placeholder="Select a User"
              className="w-full md:w-14rem"
            />
            <br></br>
            <Dropdown
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.value)}
              options={books}
              optionLabel="name"
              placeholder="Select a Book"
              className="w-full md:w-14rem"
            />
            <br></br>
            <label htmlFor="score" className="font-bold block mb-2">
              Score
            </label>
            <InputNumber
              inputId="score"
              value={score}
              onValueChange={(e) => setScore(e.value)}
              mode="decimal"
              showButtons
              min={0}
              max={100}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};
