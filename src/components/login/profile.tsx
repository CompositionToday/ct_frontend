import styled from "@emotion/styled";

interface ErrorMessageProp {
  error: boolean;
}

// Any key with a prefix of 'auth/' is an error that Firebase gives
// Any other errors are developer made errors
export const authErrorList = {
  "auth/wrong-password": "You have entered an invalid email or password",
  "auth/user-not-found": "You have entered an invalid email or password",
  "auth/invalid-email": "Please give a valid email",
  "auth/weak-password": "Password must be at least 6 characters",
  "auth/email-already-in-use":
    "This email is already being used. Please us a different email",
  "Passwords do not match": "Passwords do not match",
  "Please input a password": "Please input a password",
  "Please input an email": "Please input an email",
  "Please give a name": "Please give a name",
};

export const defaultErrorMessage =
  "There seems to be an issue, please try again later";

export const ErrorMessage = styled.div<ErrorMessageProp>`
  text-align: center;
  color: red;
  margin: 15px 0px;
  display: ${(props) => (props.error ? "block" : "none")};
`;

export const ForgetPasswordNotificaton = styled.p``;
