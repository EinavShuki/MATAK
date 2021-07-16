import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@material-ui/core";

const renderTextField = ({
  label,
  input,
  fieldValue,
  type,
  meta: { touched, invalid, error },
  ...custom
}) => {
  if (input.value === "" && custom.defaultValue) {
    // hack for redux form with material components
    input.onChange(String(custom.defaultValue));
  }
  return (
    <TextField
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      type={type}
      fullWidth
      {...input}
      {...custom}
    />
  );
};

function UserCreateForm({
  onFormSubmit,
  formValues,
  pristine,
  invalid,
  hideModal,
}) {
  const { results, loading, error } = useSelector(state => state.users);

  const handleFormSubmit = () => {
    onFormSubmit(formValues);
  };

  const radioButton = ({ input, ...rest }) => (
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel value="Arbel" control={<Radio />} label="Arbel" />
        <FormControlLabel value="Matak" control={<Radio />} label="Matak" />
        <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
      </RadioGroup>
    </FormControl>
  );

  return (
    <form>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem 0 1rem 0",
        }}
      >
        <ListItem>
          <div className="form-field">
            <Field
              type="text"
              name="First_Name"
 
              component={renderTextField}
              label="First Name"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="Last_Name"
       
              type="text"
              component={renderTextField}
              label="Last Name"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="Username"
        
              type="text"
              component={renderTextField}
              label="Username"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="Email"
 
              type="text"
              component={renderTextField}
              label="Email"
            />
          </div>
        </ListItem>

        <ListItem>
          <div className="form-field">
            <Field
              name="Password"
              type="password"
        
              component={renderTextField}
              label="Password"
            />
          </div>
        </ListItem>

        <ListItem>
          <div className="form-field">
            <Field
              name="Mobile"
              type="text"
       
              component={renderTextField}
              label="Mobile"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              type="text"
              name="Organization_Name"
           
              component={renderTextField}
              label="Organization Name"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field name="User_Type" component={radioButton}>
              <Radio value="Arbel" label="Arbel" />
              <Radio value="Matak" label="Matak" />
              <Radio value="Admin" label="Admin" />
            </Field>
          </div>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={pristine || invalid}
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </ListItem>
      </List>
      {loading === "pending" && (
        <div className="form-message">
          <CircularProgress />
        </div>
      )}
      {results && hideModal()}
      {error && (
        <div className="form-message failure">
          {error?.message ? error.message : error}
        </div>
      )}
    </form>
  );
}

const validate = values => {
  const errors = {};
  const requiredFields = [
    "First_Name",
    "Last_Name",
    "Email",
    "Password",
    "Username",
    "Mobile",
    "User_Type",
    "Organization_Name",
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
})(connect(mapStateToProps)(UserCreateForm));
