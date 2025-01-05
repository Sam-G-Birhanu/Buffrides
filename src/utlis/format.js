// Format date to YYYY-MM-DD (e.g., 2025-01-13)
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure month is 2 digits
  const day = String(date.getDate()).padStart(2, "0"); // Ensure day is 2 digits
  return `${year}-${month}-${day}`;
};

// Format timestamp to "YYYY-MM-DD HH:MM:SS"
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure month is 2 digits
  const day = String(date.getDate()).padStart(2, "0"); // Ensure day is 2 digits
  const hours = String(date.getHours()).padStart(2, "0"); // Ensure hours is 2 digits
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure minutes is 2 digits
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Ensure seconds is 2 digits

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
