import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL; // Your base API URL

// Function to get all notices
export const getAllNotices = async () => {
    console.log("Inside getAllNotices function...");
    try {
        let res = await axios.get(`${apiURL}/api/notice/all-notices`);
        console.log("API Response inside getAllNotices:", res); // Log the full response
        return res.data; // Returning the full response data
    } catch (error) {
        console.error("Error fetching notices:", error.response?.data || error);
        return { error: "Failed to fetch notices" };
    }
};



// Function to create a new notice
export const createNotice = async ({ title, description, time }) => {
    let data = { title, description, time };
    try {
        let res = await axios.post(`${apiURL}/api/notice/add-notice`, data, {
            headers: {
                "Content-Type": "application/json", // No Authorization header
            },
        });
        return res.data; // Returns success or error from backend
    } catch (error) {
        console.error("Error creating notice:", error.response?.data || error);
        return { error: "Failed to create notice" };
    }
};

// Function to edit an existing notice
export const editNotice = async (nId, title, description, time) => {
    let data = { nId, title, description, time };
    try {
        let res = await axios.post(`${apiURL}/api/notice/edit-notice`, data);
        return res.data; // Return response data (success or error)
    } catch (error) {
        console.error("Error editing notice:", error.response?.data || error);
        return { error: "Failed to edit notice" };
    }
};

// Function to delete a notice
export const deleteNotice = async (nId) => {
    try {
        let res = await axios.post(`${apiURL}/api/notice/delete-notice`, { nId });
        return res.data; // Return success or error
    } catch (error) {
        console.error("Error deleting notice:", error.response?.data || error);
        return { error: "Failed to delete notice" };
    }
};
