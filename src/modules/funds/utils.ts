export const formatAmountMoney = (vnp_Amount: string | number) => {
  const amount_int = parseFloat(vnp_Amount.toString()) / 100;

  return amount_int.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + 'đ';
};
