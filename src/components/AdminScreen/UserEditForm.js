import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ActionButtons from "./ActionButtons";
import {
  MdEmail,
  MdLocalPhone,
  MdAccountCircle,
  MdCardTravel,
  MdPieChart,
} from "react-icons/md";
import { InputAdornment } from "@material-ui/core";

function UserEditForm({ user, onFormSubmit, onCancel, formValues }) {
  const [userDetails, setUserDetails] = useState({
    lastName: user?.lastName || "",
    firstName: user?.firstName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    usertype: user?.usertype || "",
    organization: user?.organization || "",
  });

  const handleFormSubmit = () => {
    onFormSubmit(formValues);
  };

  const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      fullWidth
      {...input}
      {...custom}
    />
  );

  return (
    <form>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem 0 3rem 0",
        }}
      >
        <ListItem>
          <div className="form-field">
            <Field
              value
              name="firstName"
              component={renderTextField}
              label="First Name"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="lastName"
              component={renderTextField}
              label="Last Name"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="username"
              component={renderTextField}
              label="Username"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field name="email" component={renderTextField} label="Email" />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field name="mobile" component={renderTextField} label="Mobile" />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="organization"
              component={renderTextField}
              label="Organization"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="usertype"
              component={renderTextField}
              label="User Type"
            />
          </div>
        </ListItem>
      </List>
      <ActionButtons onOk={handleFormSubmit} onCancel={onCancel} />
    </form>
  );
}

const validate = values => {
  const errors = {};
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "username",
    "mobile",
    "usertype",
    "organization",
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const mapStateToProps = ({ form, users }) => ({
  users,
  formValues: form.userForm.values,
});

export default reduxForm({
  form: "userForm",
  validate,
})(connect(mapStateToProps)(UserEditForm));
