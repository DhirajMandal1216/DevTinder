const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password.");
  }
};
const validateEditData = (req) => {
  const allowedEditData = [
    "firstName",
    "lastName",
    "age",
    "about",
    "skills",
    "gender",
    "photoUrl",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditData.includes(field)
  );

  return isEditAllowed;
};
module.exports = { validateSignUp, validateEditData };
