import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      console.log({ error });
    }
  }
);

export default instance;
