import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SideBar from "../components/SideBar/SideBar";

export default function HomePage() {
  return (
    <Layout>
      <SideBar />
      <Outlet />
    </Layout>
  );
}
