import React from "react";
import { Pagination } from "react-bootstrap";

export default function Paginate({
  number,
  setNumber,
  tableData,
  postPerPage,
}) {
  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };

  const pageNumber = [];
  // getting page numbers dynamically
  for (let i = 1; i <= Math.ceil(tableData.length / postPerPage); i++) {
    pageNumber.push(
      <Pagination.Item
        key={i}
        onClick={() => ChangePage(i)}
        active={i === number}
      >
        {i}
      </Pagination.Item>
    );
  }

  const Prev = () => {
    if (number !== 1) {
      //to restrict going lower than page 1
      setNumber(number - 1);
    } else {
      setNumber(number);
    }
  };

  const Next = () => {
    if (number < pageNumber.length) {
      //to restrict going above page 3 as it the last page of the app
      setNumber(number + 1);
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="my-3 text-center ">
        <Pagination>
          <Pagination.Prev onClick={Prev} />
          {pageNumber}
          <Pagination.Next onClick={Next} />
        </Pagination>
      </div>
    </>
  );
}
