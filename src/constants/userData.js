export function dashCode(code) {
  code = code.toString();
  return code.replace(/(.{4})(?!$)/g, "$1-");
}
