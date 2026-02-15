import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth tokens if needed
axiosInstance.interceptors.request.use(
    (config) => {
        // Add auth token here if needed in the future
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Global error handling
        const errorMessage = error.response?.data?.message || error.message;
        console.error('API Error:', errorMessage);

        // You can add toast notifications here
        // toast.error(errorMessage);

        return Promise.reject(error);
    }
);

export default axiosInstance;
