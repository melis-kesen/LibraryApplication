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
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const [bookname, setBookname] = useState("");
  const [userId, setUserId] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [score, setScore] = useState(null);
  const [sidebarType, setSidebarType] = useState("");
  const [isAdded, setIdAdded] = useState(false);
  const [presentBook, setPresentBook] = useState([]);
  const [pastBook, setPastBook] = useState([]);
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
    UserService.getUser(rowData.userId).then(
      async (response) => {
        setPresentBook(response.books.present);
        setPastBook(response.books.past);
        setVisibleRight(true);
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
    BookService.getBook(rowData.bookId).then(
      async (response) => {
        setVisibleRight(true);
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
    if (selectedUser.userId === null || selectedBook.bookId === null) {
      toast.current.show({
        severity: "warn",
        summary: "WARNING",
        detail: "User Name and Book Name is required!",
        life: 3000,
      });
    } else {
      const obj = {
        userId: selectedUser.userId,
        bookId: selectedBook.bookId,
      };
      UserService.borrowBook(obj).then(
        async (response) => {
          setVisible(false);
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
      selectedUser.userId === null ||
      selectedBook.bookId === null ||
      score === null
    ) {
      toast.current.show({
        severity: "warn",
        summary: "WARNING",
        detail: "User Name, Book Name and Score is required!",
        life: 3000,
      });
    } else {
      const obj = {
        bookId: selectedUser.userId,
        userId: selectedBook.bookId,
        score: score,
      };
      UserService.returnBook(obj).then(
        async (response) => {
          setVisible(false);
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
  const openSidebar = (product) => {
    setSidebarType(product);
    setVisibleRight(true);
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
            rowData.userId ? () => showUser(rowData) : () => showBook(rowData)
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
        onClick={() => setVisible(false)}
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
            <Column field="userId" header="ID"></Column>
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
            <Column field="bookId" header="ID"></Column>
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
            <h2>Bamboo Watch</h2>
            <DataTable value={users}>
              <Column field="past" header="Past Books"></Column>
            </DataTable>
            <DataTable value={users}>
              <Column field="present" header="Present Books"></Column>
            </DataTable>
          </div>
        )}
        {activeIndex === 1 && (
          <div>
            <h2>Bamboo Watch</h2>
            <DataTable value={books}>
              <Column field="score" header="Average Score"></Column>
            </DataTable>
          </div>
        )}
      </Sidebar>

      <Dialog
        header={dialogType}
        visible={visible}
        //style={{ width: "25vw" }}
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
          <div className="card flex flex-wrap justify-content-center">
            <Dropdown
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.value)}
              options={users}
              optionLabel="name"
              placeholder="Select a User"
              className="w-full md:w-14rem"
            />
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
          <div className="card flex flex-wrap justify-content-center">
            <Dropdown
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.value)}
              options={users}
              optionLabel="name"
              placeholder="Select a User"
              className="w-full md:w-14rem"
            />
            <Dropdown
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.value)}
              options={books}
              optionLabel="name"
              placeholder="Select a Book"
              className="w-full md:w-14rem"
            />

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
