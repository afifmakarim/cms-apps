import React, { useRef } from "react";
import { Form } from "react-bootstrap";

export default function FileUploader({
  isInvalid,
  errorData,
  onFileSelectSuccess,
  onFileSelectError,
}) {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    if (file.size > 1000000)
      onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    else onFileSelectSuccess(file);
  };

  return (
    <>
      <label
        className="file-uploader btn btn-primary text-white"
        onClick={(e) => fileInput.current && fileInput.current.click()}
        htmlFor="upload"
      >
        Upload Image
      </label>

      <Form.Control
        id="upload"
        type="file"
        onChange={handleFileInput}
        accept="image/png, image/gif, image/jpeg"
        isInvalid
      />
      <Form.Control.Feedback
        type="invalid"
        className="d-flex justify-content-center"
      >
        {errorData}
      </Form.Control.Feedback>
    </>
  );
}
