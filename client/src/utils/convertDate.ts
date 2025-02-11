export const convertDate = (dateTime: string | Date) => {
  let date;

  if (typeof dateTime === "string") {
    date = new Date(dateTime);
  } else {
    date = dateTime;
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}.${month < 10 ? "0" + month : month}.${
    day < 10 ? "0" + day : day
  } ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};
