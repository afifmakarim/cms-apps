import React from "react";
import AddNewForm from "../../components/CardForm/AddNewForm";
import SectionLayout from "../../components/Layout/SectionLayout";

export default function CreateData() {
  return (
    <SectionLayout title={"Add New Data"}>
      <AddNewForm />
    </SectionLayout>
  );
}
