export function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const nestedObj = keys.reduce((acc, key) => (acc[key] = acc[key] || {}), obj);
  nestedObj[lastKey] = value;
}

export function transformNonUnicode(value, maxLength) {
  const allowedCharsRegex = /^[0-9A-Z!?#$&*-. ]*$/;
  const transformedValue = value.toUpperCase().slice(0, maxLength);

  return (
    allowedCharsRegex.test(transformedValue) ? transformedValue : ""
  ).toUpperCase();
}

export function transformUnicode(value, maxLength) {
  let transformedValue = "";

  for (
    let i = 0;
    i < value.length && transformedValue.length < maxLength;
    i++
  ) {
    let c = value.charCodeAt(i);
    if (c >= 0x30 && c <= 0x39) {
      // '0' to '9'
      c = 0xff10 + (c - 0x30);
    } else if (c >= 0x41 && c <= 0x5a) {
      // 'A' to 'Z'
      c = 0xff21 + (c - 0x41);
    } else if (c >= 0x61 && c <= 0x7a) {
      // 'a' to 'z'
      c = 0xff41 + (c - 0x61);
    } else if (c === 0x40) {
      // '@'
      c = 0xff20;
    } else if (c === 0x2c) {
      // ','
      c = 0xff0c;
    } else if (c === 0x2e) {
      // '.'
      c = 0xff0e;
    } else if (c === 0x5f) {
      // '_'
      c = 0xff3f;
    }
    transformedValue += String.fromCharCode(c);
  }

  const allowedCharsRegex =
    /^[\uFF20-\uFF3A\uFF41-\uFF5A\uFF10-\uFF19\uFF0C\uFF0E\uFF3F\u3041-\u308D\u308F\u3092\u3093\u30A1-\u30ED\u30EF\u30F2\u30F3\u30FC]*$/;
  return (
    allowedCharsRegex.test(transformedValue) ? transformedValue : ""
  ).toUpperCase();
}
