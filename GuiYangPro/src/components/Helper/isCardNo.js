export function isCardNo(card) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (card) {
    if (reg.test(card) === false) {
      alert('身份证输入不合法');
      return false;
    } else if (reg.test(card) === true) {
      return true;
    }
  }
}
