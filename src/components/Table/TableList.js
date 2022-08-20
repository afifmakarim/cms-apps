import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import ConfirmationModal from "../Modal/ConfirmationModal";

export default function TableList({ index, data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr key={index}>
        <td>{data.name}</td>
        <td>{data.slugName}</td>
        <td>
          <img
            src={`https://jwt-backend-crud.herokuapp.com/${data.imageUrl}`}
            alt={data.name}
            width="50px"
          />
        </td>
        <td>{data.isActive === 1 ? "Active" : "Inactive"}</td>
        <td>
          <div className="d-flex gap-2 justify-content-center">
            <Link to={`edit-product/${data.id}`}>
              <Button
                className="d-flex align-items-center px-2 py-1 text-white"
                variant="success"
              >
                <i className="bx bx-edit"></i>
              </Button>
            </Link>
            <Button
              className="d-flex align-items-center px-2 py-1 text-white"
              variant="danger"
              onClick={handleShow}
            >
              <i className="bx bx-trash"></i>
            </Button>
          </div>
        </td>
      </tr>
      <ConfirmationModal show={show} handleClose={handleClose} data={data} />
    </>
  );
}
