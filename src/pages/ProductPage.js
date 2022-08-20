import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SectionLayout from "../components/Layout/SectionLayout";
import TableProduct from "../components/Table/TableProduct";

export default function ProductPage() {
  return (
    <SectionLayout title={"Product Data"}>
      <Button variant="primary" className="mb-3 ">
        <Link className="text-white" to="/product/add-product">
          Add New Data
        </Link>
      </Button>

      <TableProduct />
    </SectionLayout>
  );
}
