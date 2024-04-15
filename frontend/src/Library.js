import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { Sidebar } from "primereact/sidebar";
import { Dialog } from "primereact/dialog";
//import { ProductService } from './service/ProductService';

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
  useEffect(() => {
    //ProductService.getProductsMini().then(data => setProducts(data));
  }, []);
  const editProduct = (product) => {
    setVisibleRight(true);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <Button
        onClick={() => setVisible(true)}
        label="Add"
        icon="pi pi-plus"
        rounded
        raised
      />
      <Button
        onClick={() => setVisible(true)}
        style={{ marginLeft: "1rem" }}
        label="Borrow"
        icon="pi pi-book"
        rounded
        raised
      />
      <Button
        onClick={() => setVisible(true)}
        style={{ marginLeft: "1rem" }}
        label="Return"
        icon="pi pi-arrow-left"
        rounded
        raised
      />
    </div>
  );
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-info"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        {/*<Button icon="pi pi-trash" rounded outlined severity="danger" />*/}
      </React.Fragment>
    );
  };

  return (
    <div className="card">
      <TabView>
        <TabPanel header="Users">
          <DataTable value={users} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
          <br></br>
          {header}
        </TabPanel>
        <TabPanel header="Books">
          <DataTable value={books} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column
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
        <h2>Bamboo Watch</h2>
        <DataTable value={users}>
          <Column field="past" header="Past Books"></Column>
        </DataTable>
        <DataTable value={users}>
          <Column field="present" header="Present Books"></Column>
        </DataTable>
      </Sidebar>
      <div className="card flex justify-content-center">
        <Dialog
          header="Header"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Dialog>
      </div>
    </div>
  );
};
