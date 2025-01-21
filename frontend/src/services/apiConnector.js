import axios from "axios";

// Create an axios instance with a base URL
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Set the base URL to your API server
});

// Enhanced apiConnector with error handling and logging
export const apiConnector = (method, url, bodyData, headers, params) => {
    // Log the details of the request for debugging
    console.log('Making request with:', { method, url, bodyData, headers, params });

    // Return the axios request promise
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    })
    .then(response => {
        console.log('Response:', response); // Log the successful response
        return response;
    })
    .catch(error => {
        console.error('API request error:', error); // Log the error details
        throw error; // You can handle or throw the error as per your need
    });
};
