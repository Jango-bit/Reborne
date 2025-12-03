import toast from "react-hot-toast";

export const handleError = (error) => {
  // Check if error response contains 'data' and 'message'
  if (error?.response?.data?.message) {
    const messageContent = error.response.data.message;
    // If 'message' is an object containing an 'error' array
    if (
      typeof messageContent === "object" &&
      Array.isArray(messageContent.error)
    ) {
      // Iterate over each error message and display it
      messageContent.error.forEach((msg) => {
        toast.error(msg);
      });
    } else if (typeof messageContent === "string") {
      // If 'message' is a direct string, show it
      toast.error(messageContent);
    } else {
      // Handle cases where message is an object, but not an array (for any additional structures)
      Object.keys(messageContent).forEach((key) => {
        const msg = messageContent[key];
        toast.error(`${key?.length > 2 ? key + "" : ""} ${msg}`);
      });
    }
  } else if (error?.response?.data?.error) {
    // Handle cases where 'error' key exists instead of 'message'
    toast.error(error.response.data.error);
  } else if (error?.message) {
    // Fallback for generic errors (like network issues)
    toast.error(`Error: ${error.message}`);
  }
};
