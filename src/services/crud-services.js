import axios from "axios";
import toast from "react-hot-toast";

const API_URL = `${process.env.REACT_APP_API_URL}/cms/api/v1/products`;

const localUser = localStorage.getItem("authInfo");
const user = JSON.parse(localUser);

const getAllProduct = () => {
  return axios.get(API_URL);
};

const addNewProduct = (data, onUploadProgress) => {
  return axios.post(API_URL, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": user.accessToken,
      "Access-Control-Allow-Origin": "*",
    },
    onUploadProgress,
  });
};

const editProduct = (data, id, onUploadProgress) => {
  return axios.put(`${API_URL}/${id}`, data, {
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

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Starting resp", JSON.stringify(response, null, 2));

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("status: ", error.response.status);
    if (error.response.status > 300) {
      toast.error(`${error.response.status} ${error.response.message}`, {
        id: "error-toast",
      });
    }
    // console.log("Response:", JSON.stringify(error, null, 2));
  }
);

export {
  getAllProduct,
  addNewProduct,
  deleteProductById,
  editProduct,
  getProductById,
};
