const orderCode = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear().toString().slice(-2);
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  let serial = 1;

  return `RY${year}${month}${day}${serial.toString().padStart(6, "0")}`;
};

export default orderCode;
