import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { Sidebar } from "primereact/sidebar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { UserService } from "../services/Users.service";
import { BookService } from "../services/Books.service";

export const Library = () => {
  const [users, setUsers] = useState([
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
  ]);
  const [books, setBooks] = useState([
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
  ]);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogType, setDialogType] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  useEffect(() => {
    //ProductService.getProductsMini().then(data => setProducts(data));
  }, []);
  const editProduct = (product) => {
    setVisibleRight(true);
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
          onClick={() => editProduct(rowData)}
          tooltip="Use for open details"
        />
        {/*<Button icon="pi pi-trash" rounded outlined severity="danger" />*/}
      </React.Fragment>
    );
  };
  const [value, setValue] = useState("");
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
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );
  return (
    <div className="card">
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
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="bookname">Book Name</label>
            </FloatLabel>
          </div>
        )}
        {dialogType === "Borrow Book" && (
          <div className="card flex flex-wrap justify-content-center">
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="Select a City"
              className="w-full md:w-14rem"
            />
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="Select a City"
              className="w-full md:w-14rem"
            />
          </div>
        )}
        {dialogType === "Return Book" && (
          <div className="card flex flex-wrap justify-content-center">
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="Select a City"
              className="w-full md:w-14rem"
            />
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="Select a City"
              className="w-full md:w-14rem"
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};
