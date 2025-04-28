export function validateEmail(email) {
  // NOTE: THIS REGEX IS NOT 100% ACCURATE
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

export function validateDateOfBirth(birthDate) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(birthDate);
}
