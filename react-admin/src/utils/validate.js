export const validate_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
//验证邮箱
const reg_email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export function validate_email(value) {
  return reg_email.test(value);
}
export function validate_ps(value) {
  return validate_password.test(value);
}
