export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};
export const getSenderId = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1]?._id : users[0]?._id;
};
export const getReceiver = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1]?._id : users[0]?._id;
};
export const getSenderRole = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1]?.role : users[0]?.role;
};

export const getSenderImage = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id
    ? users[1]?.photo?.url
    : users[0]?.photo?.url;
};
export const getSenderOnline = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id
    ? users[1]?.online
    : users[0]?.online;
};

export const formatTimestamp = (timestamp) => {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine whether it's AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Add leading zeros to minutes if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Create the formatted time string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

  return formattedTime;
};

export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
};
