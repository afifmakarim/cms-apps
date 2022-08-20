import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Card,
  Row,
  Col,
  ProgressBar,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  CLEAR_MESSAGE,
} from "../../redux/types";
import { errorHandler } from "../../services/errorHandler";
import Toaster from "../Toaster/Toaster";
import FileUploader from "../FileUploader/FileUploader";
import { editProduct, getProductById } from "../../services/crud-services";

export default function EditForm() {
  const [currentData, setCurrentData] = useState({});
  const [newData, setNewData] = useState({});
  const [currentFile, setCurrentFile] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isError, isSuccess, message } = useSelector((state) => state.message);

  //   console.log("current data ", currentData);
  //   console.log("new data ", newData);

  const findFormErrors = () => {
    const { name, slugName, imageUrl, isActive } = currentData;
    const newErrors = {};
    // name errors
    if (!name || name === "") newErrors.name = "*name cannot be blank!";
    else if (name.length > 30) newErrors.name = "*name is too long!";
    // slugName errors
    if (!slugName || slugName === "")
      newErrors.slugName = "*slugName cannot be blank!";
    // imageUrl errors
    if (!imageUrl || imageUrl === "")
      newErrors.imageUrl = "*Please Upload Image";
    // isActive errors
    if (!isActive || isActive === "") newErrors.isActive = "cannot be blank!";

    return newErrors;
  };

  // set file upload to imageUrl
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
    const newErrors = findFormErrors();

    // checking validation
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      handleEditData();
    }
  };

  const handleEditData = () => {
    let currentFile = newData.imageUrl;

    setProgress(0);
    setCurrentFile(currentFile);

    editProduct(newData, currentData.id, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then(() => {
        navigate("/product");
        dispatch({
          type: SET_SUCCESS_MESSAGE,
          payload: { isSuccess: true, message: "Success Edit Data" },
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

  // get product detail by id
  const getDetailById = async () => {
    setLoading(true);

    try {
      const { data } = await getProductById(id);
      console.log(data);
      setCurrentData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailById();

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
  }, [isSuccess, isError]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center ">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      {isError && <Alert variant="danger">{message}</Alert>}
      {currentFile && (
        <ProgressBar now={progress} label={`${progress}%`} className="my-3" />
      )}
      <Card>
        <Card.Header>Edit Product</Card.Header>
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
                          typeof newData.imageUrl === "object"
                            ? URL.createObjectURL(newData.imageUrl)
                            : `https://jwt-backend-crud.herokuapp.com/${currentData.imageUrl}`
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
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input Menu Name"
                    name="name"
                    onChange={Change}
                    isInvalid={!!errors.name}
                    defaultValue={currentData.name}
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
                    defaultValue={currentData.slugName}
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
                      defaultChecked={currentData.isActive === 1 ? true : false}
                    />
                    <Form.Check
                      inline
                      label="Inactive"
                      name="isActive"
                      value="0"
                      type="radio"
                      onChange={Change}
                      defaultChecked={currentData.isActive === 0 ? true : false}
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
                Edit
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
