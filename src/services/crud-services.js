import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/cms/api/v1/products`;
const user = JSON.parse(localStorage.getItem("authInfo"));

const getAllProduct = () => {
  return axios.get(API_URL);
};

const addNewProduct = (data, onUploadProgress) => {
  const payload = data;

  return axios.post(API_URL, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": user.accessToken,
      "Access-Control-Allow-Origin": "*",
    },
    onUploadProgress,
  });
};

const editProduct = (data, id, onUploadProgress) => {
  const payload = data;

  return axios.put(`${API_URL}/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": user.accessToken,
      "Access-Control-Allow-Origin": "*",
    },
    onUploadProgress,
  });
};

const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.accessToken,
    },
  });
};

const deleteProductById = (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.accessToken,
    },
  });
};

axios.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

export {
  getAllProduct,
  addNewProduct,
  deleteProductById,
  editProduct,
  getProductById,
};
