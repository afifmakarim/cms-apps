import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Card,
  Row,
  Col,
  ProgressBar,
  Button,
  Spinner,
} from "react-bootstrap";

import { errorHandler } from "../../services/errorHandler";
import Toaster from "../Toaster/Toaster";
import FileUploader from "../FileUploader/FileUploader";
import { editProduct, getProductById } from "../../services/crud-services";

export default function EditForm() {
  const [newData, setNewData] = useState({
    id: "",
    name: "",
    slugNmae: "",
    imageUrl: "",
    isActive: "",
  });
  const [currentFile, setCurrentFile] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleSubmit = async (e) => {
    console.log("submit ini ");
    e.preventDefault();
    const newErrors = findFormErrors();

    // checking validation
    if (Object.keys(newErrors).length > 0) {
      console.log("submit ini zxcz");

      setErrors(newErrors);
    } else {
      handleEditData();
    }
  };

  const handleEditData = async () => {
    let currentFile = newData.imageUrl;

    setProgress(0);
    setCurrentFile(currentFile);

    editProduct(newData, newData.id, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then(() => {
        navigate("/product");
        Toaster("success", "Success Edit Data");
      })
      .catch((error) => {
        setProgress(0);

        const handleError = errorHandler(error.response.status, error);
        Toaster("error", handleError);

        setCurrentFile(undefined);
      });
  };

  // get product detail by id
  const getDetailById = async () => {
    setLoading(true);

    try {
      const { data } = await getProductById(id);
      setNewData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailById();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center ">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
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
                            : `https://jwt-backend-crud.herokuapp.com/${newData.imageUrl}`
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
                    value={newData.name}
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
                    value={newData.slugName}
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
                      defaultChecked={newData.isActive === 1 ? true : false}
                    />
                    <Form.Check
                      inline
                      label="Inactive"
                      name="isActive"
                      value="0"
                      type="radio"
                      onChange={Change}
                      defaultChecked={newData.isActive === 0 ? true : false}
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

              <Button
                variant="primary"
                type="submit"
                className="text-white"
                disabled={progress > 0}
                onClick={progress === 0 ? handleSubmit : null}
              >
                {progress > 0 ? "Loading..." : "Edit"}
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
