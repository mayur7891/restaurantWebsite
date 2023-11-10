function upValidation(values){
  
    let errors = {};
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (!values.username ) {
    errors.username = "username should not be empty";
  } else {
    errors.username = "";
  }

  if (!values.email) {
    errors.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Invalid email format";
  } else {
    errors.email = "";
  }

  if (!values.password ) {
    errors.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.";
  } else {
    errors.password = "";
  }

  if (!values.confirmPassword ) {
    errors.confirmPassword = "Confirm Password should not be empty";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  } else {
    errors.confirmPassword = "";
  }

  return errors;

}

export default upValidation