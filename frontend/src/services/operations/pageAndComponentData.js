import React from 'react';
// import { toast } from "react-hot-toast"
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

// ================ get Catalog Page Data  ================
export const getCatalogPageData = async (categoryId) => {
  // const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });

    // Check if the response is successful and has the expected data structure
    if (response?.data?.success) {
      console.log("CATALOG PAGE DATA API RESPONSE............", response);
      result = response?.data?.data;
    } else {
      throw new Error("Could not Fetch Category page data");
    }
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);

    // Improved error handling: Safely access error response
    if (error?.response?.data?.message) {
      // toast.error(error.response?.data?.message); // Uncomment for user feedback
    } else {
      console.error("Unexpected error:", error);
    }

    // Handle the result in case of error
    result = error?.response?.data?.data || [];
  }
  
  // toast.dismiss(toastId);
  return result;
};
