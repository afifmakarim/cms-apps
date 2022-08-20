import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../redux/actions/crudActions";
import { CLEAR_MESSAGE } from "../../redux/types";
import Toaster from "../Toaster/Toaster";

export default function ConfirmationModal({ show, handleClose, data }) {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  const { isSuccess, isError, message } = useSelector((state) => state.message);

  const handleDelete = () => {
    setisLoading(true);
    dispatch(deleteData(data.id));
  };

  useEffect(() => {
    if (isSuccess) {
      setisLoading(false);

      Toaster("success", message);
      handleClose();
      dispatch({
        type: CLEAR_MESSAGE,
        payload: { isSuccess: false },
      });
    }

    if (isError) {
      setisLoading(false);

      Toaster("error", message);
      handleClose();
      dispatch({
        type: CLEAR_MESSAGE,
        payload: { isError: false },
      });
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure to delete {data.name} ?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="text-white"
          >
            Close
          </Button>
          <Button
            variant="danger"
            className="text-white"
            disabled={isLoading}
            onClick={!isLoading ? handleDelete : null}
          >
            {isLoading ? "Loading…" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
