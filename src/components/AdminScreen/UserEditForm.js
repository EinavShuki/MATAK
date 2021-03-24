import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import { formValueSelector } from "redux-form";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import ActionButtons from "./ActionButtons";
import {
  MdEmail,
  MdLocalPhone,
  MdAccountCircle,
  MdCardTravel,
  MdPieChart,
} from "react-icons/md";
import {
  InputAdornment,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@material-ui/core";

const renderTextField = ({
  label,
  input,
  type,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    type={type}
    fullWidth
    {...input}
    {...custom}
  />
);

function UserEditForm({
  user,
  onFormSubmit,
  onCancel,
  formValues,
  pristine,
  invalid,
}) {
  const [userDetails, setUserDetails] = useState({
    lastName: user?.lastName || "",
    firstName: user?.firstName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    usertype: user?.usertype || "",
    organization: user?.organization || "",
  });

  const { results, loading } = useSelector(state => state.users);

  const handleFormSubmit = () => {
    console.log(formValues);
    // onFormSubmit({...formValues, User_Type: +formValues.User_Type});
  };

  const radioButton = ({ input, ...rest }) => (
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel value="0" control={<Radio />} label="Arbel" />
        <FormControlLabel value="1" control={<Radio />} label="Matak" />
        <FormControlLabel value="2" control={<Radio />} label="Admin" />
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
              value
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
              <Radio value={0} label="Arbel" />
              <Radio value={1} label="Matak" />
              <Radio value={2} label="Admin" />
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
      {loading === 'pending' && <div className="form-message"><CircularProgress/></div>}
      {results && <div className="form-message">User created successfuly</div>}
    </form>
  );
}

const validate = values => {
  const errors = {};
  const requiredFields = [
    "First_Name",
    "Last_Name",
    "Email",
    "Username",
    "Mobile",
    "User_Type",
    "Organization_Name",
    "Password",
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