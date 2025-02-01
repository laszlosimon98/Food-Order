export const convertDate = (dateTime: string) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month.toString().length === 1 ? "0" + month : month}-${
    day.toString().length === 1 ? "0" + day : day
  }`;
};
