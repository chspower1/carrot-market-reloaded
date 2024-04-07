const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  USERNAME: /^[a-zA-Z0-9]{3,}$/,
};

const ERROR_MESSAGES = {
  EMAIL: "Invalid email",
  PASSWORD:
    "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number",
  PASSWORD_CONFIRM: "Passwords do not match",
  USERNAME: "Username must be at least 3 characters",
};

const MIN_LENGTH = {
  PASSWORD: 8,
  USERNAME: 3,
};
