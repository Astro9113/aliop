export function enumaKey(obj) {
  const data = {};
  for (const key in obj ) {
    if (obj[key] !== '请选择') {
      data[key] = obj[key];
    }
  }

  return data;
}


export function dictIsNull(obj) {
  const ttLength = [];
  for (const aa in obj) {
    if (obj[aa].length !== 0) {
      ttLength.push(aa);
    }
  }
  return ttLength.length;
}
