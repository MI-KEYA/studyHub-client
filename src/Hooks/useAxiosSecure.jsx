import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", // your backend base URL
    withCredentials: true, // if you use cookies for auth
});

const useAxiosSecure = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate("/login"); // redirect to login if unauthorized
                }
                return Promise.reject(error);
            }
        );
    }, [navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
