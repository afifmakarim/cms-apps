import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/actions/crudActions";
import { CLEAR_MESSAGE } from "../../redux/types";
import Paginate from "../Paginate/Paginate";
import Toaster from "../Toaster/Toaster";
import TableList from "./TableList";

export default function TableProduct() {
  const dispatch = useDispatch();
  const { dataList, isLoading } = useSelector((state) => state.data);
  const { isError, message } = useSelector((state) => state.message);

  const [number, setNumber] = useState(1);
  const [postPerPage] = useState(6);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  // console.log("last post: ", lastPost);
  // console.log("first post: ", firstPost);

  const tableData = dataList.slice(firstPost, lastPost);

  useEffect(() => {
    dispatch(fetchData());

    // if fetchData error
    if (isError) {
      Toaster("error", message);
      dispatch({
        type: CLEAR_MESSAGE,
        payload: { isError: false },
      });
    }
  }, []);

  console.log("ini data", dataList);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center ">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <Table striped bordered size="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug Name</th>
            <th>Image</th>
            <th>isActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataList &&
            tableData.map((item, index) => (
              <TableList key={index} data={item} />
            ))}
        </tbody>
      </Table>
      <Paginate
        number={number}
        setNumber={setNumber}
        postPerPage={postPerPage}
        tableData={dataList}
      />
    </>
  );
}
