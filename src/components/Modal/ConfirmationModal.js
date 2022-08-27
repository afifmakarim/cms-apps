import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../redux/actions/crudActions";
import { CLEAR_MESSAGE } from "../../redux/types";
import Toaster from "../Toaster/Toaster";

export default function ConfirmationModal({ show, handleClose, data }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const { isSuccess, isError, message } = useSelector((state) => state.message);

  useEffect(() => {
    if (isSuccess) {
      Toaster("success", "Success Delete Data");
      setLoading(false);
      handleClose();
      dispatch({
        type: CLEAR_MESSAGE,
        payload: { isSuccess: false },
      });
      return;
    }

    if (isError) {
      Toaster("error", message);
      setLoading(false);
      handleClose();
      dispatch({
        type: CLEAR_MESSAGE,
        payload: { isError: false },
      });

      return;
    }
  }, [isSuccess, isError]);

  const handleDelete = async () => {
    console.log("TRIGGER HANDLE DELETE");

    dispatch(deleteData(data.id));
    setLoading(true);
  };

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
