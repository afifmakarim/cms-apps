import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Col,
  Row,
  Alert,
  ProgressBar,
} from "react-bootstrap";
import { addNewProduct } from "../../services/crud-services";
import FileUploader from "../FileUploader/FileUploader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
} from "../../redux/types";
import Toaster from "../Toaster/Toaster";
import { errorHandler } from "../../services/errorHandler";

export default function AddNewForm() {
  const [newData, setNewData] = useState({
    isActive: "0",
  });
  const [currentFile, setCurrentFile] = useState(undefined);

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isSuccess, message } = useSelector((state) => state.message);

  const findFormErrors = () => {
    const { name, slugName, imageUrl, isActive } = newData;
    const newErrors = {};
    // name errors
    if (!name || name === "") newErrors.name = "*name cannot be blank!";
    else if (name.length > 30) newErrors.name = "*name is too long!";
    // slugName errors
    if (!slugName || slugName === "")
      newErrors.slugName = "*slugName cannot be blank!";
    // imageUrl errors
    if (!imageUrl | (imageUrl === ""))
      newErrors.imageUrl = "*Please Upload Image";
    // isActive errors
    if (!isActive || isActive === "") newErrors.isActive = "cannot be blank!";

    return newErrors;
  };

  const setFileUpload = (file) => {
    setNewData({ ...newData, imageUrl: file });
  };

  const Change = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });

    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      handleAddData();
    }
  };

  const handleAddData = () => {
    let currentFile = newData.imageUrl;

    setProgress(0);
    setCurrentFile(currentFile);

    addNewProduct(newData, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then(() => {
        navigate("/product");
        dispatch({
          type: SET_SUCCESS_MESSAGE,
          payload: { isSuccess: true, message: "Success Add Data" },
        });
      })
      .catch((error) => {
        setProgress(0);

        const handleError = errorHandler(error.response.status, error);

        dispatch({
          type: SET_ERROR_MESSAGE,
          payload: { isError: true, message: handleError },
        });
        setCurrentFile(undefined);
      });
  };

  if (isSuccess) {
    Toaster("success", message);
    dispatch({
      type: CLEAR_MESSAGE,
      payload: { isSuccess: false },
    });
  }

  if (isError) {
    Toaster("error", message);
    dispatch({
      type: CLEAR_MESSAGE,
      payload: { isError: false },
    });
  }

  return (
    <>
      {isError && <Alert variant="danger">{message}</Alert>}
      {currentFile && (
        <ProgressBar now={progress} label={`${progress}%`} className="my-3" />
      )}
      <Card>
        <Card.Header>Add New Product</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg="6">
                <Form.Group className="mb-3 d-flex flex-column gap-1">
                  <Form.Label>Product Image</Form.Label>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div className="upload-wrapper overflow-hidden">
                      <img
                        className="upload-image rounded-2"
                        src={
                          newData.imageUrl
                            ? URL.createObjectURL(newData.imageUrl)
                            : "https://via.placeholder.com/150x150/b6b6b6"
                        }
                        alt="placeholder"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <FileUploader
                      isInvalid={!!errors.imageUrl}
                      errorData={errors.imageUrl}
                      onFileSelectSuccess={(file) => setFileUpload(file)}
                      onFileSelectError={({ error }) => alert(error)}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" hasValidation>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input Menu Name"
                    name="name"
                    onChange={Change}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Slug Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input Slug Name"
                    name="slugName"
                    onChange={Change}
                    isInvalid={!!errors.slugName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.slugName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      inline
                      label="Active"
                      name="isActive"
                      value="1"
                      type="radio"
                      onChange={Change}
                    />
                    <Form.Check
                      inline
                      label="Inactive"
                      name="isActive"
                      value="0"
                      type="radio"
                      onChange={Change}
                      defaultChecked
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mt-3 d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                className="text-white"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Button variant="primary" type="submit" className="text-white">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
