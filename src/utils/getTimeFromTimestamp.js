export const getTime = (string) => {
  let date = string.split('T')[1].split(':');
  date = date[0] + ':' + date[1];

  return date;
};
