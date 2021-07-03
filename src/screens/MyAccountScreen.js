import React, { useEffect, useState } from "react";
import Banner from "react-js-banner";

import {
  ListItem,
  List,
  TextField,
  Avatar,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { UpdateUser } from "../redux/users";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { set } from "date-fns";

function MyAccountScreen() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.users);
  const [email, setEmail] = useState(currentUser.Email);
  const [mobile, setMobile] = useState(currentUser.Mobile);
  const [validemail, setValidEmail] = useState("");
  const [validmobile, setValidMobile] = useState("");
  const [Banner, setBanner] = useState("");

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const mobileRegex = /^\d{10}$/;
  useEffect(() => {
    validateMobile();
    validateEmail();
  }, []);

  const updateHandler = () => {
    if (validemail === "" && validmobile === "") {
      const data = dispatch(UpdateUser(currentUser._id, email, mobile));
      data.then(result => {
        if (result.success === true) setBanner("green");
        setTimeout(() => {
          setBanner("");
        }, 3000);
      });
    } else if (validemail !== "") {
      setBanner("email");
      setTimeout(() => {
        setBanner("");
      }, 3000);
    } else if (validmobile !== "") {
      setBanner("mobile");
      setTimeout(() => {
        setBanner("");
      }, 3000);
    }
  };

  const initialsFun = () => {
    const { First_Name, Last_Name } = currentUser;
    return First_Name[0].toUpperCase() + Last_Name[0].toUpperCase();
  };

  const validateEmail = () => {
    if (!emailRegex.test(email)) setValidEmail("Email is not valid");
    else setValidEmail("");
  };
  const validateMobile = () => {
    if (!mobileRegex.test(mobile)) setValidMobile("Mobile is not valid");
    else setValidMobile("");
  };
  const BannerCss = {
    banner1Css: { color: "#FFF", backgroundColor: "green" },
    banner2Css: { color: "#000", backgroundColor: "grey", fontFamily: "arial" },
    banner3Css: { color: "#FFF", backgroundColor: "red", fontSize: 20 },
  };
  return (
    <>
      <NavBar />
      {currentUser && (
        <div className="my_account_screen">
          {Banner === "green" && (
            <div className={"banner1Cs"}>User Updated</div>
          )}
          {Banner === "email" && (
            <div
              className={"banner1Cs"}
              style={{ background: "rgba(255, 0, 0, 0.336)" }}
            >
              Email Is Not Valid
            </div>
          )}
          {Banner === "mobile" && (
            <div
              className={"banner1Cs"}
              style={{ background: "rgba(255, 0, 0, 0.336)" }}
            >
              Mobile Is Not Valid
            </div>
          )}
          <div className="frame">
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar className="avatar_name">{initialsFun()}</Avatar>
              <h1 className="name">
                {`${currentUser.First_Name} ${currentUser.Last_Name}`}
              </h1>
            </span>
            <h3 className="organization-name">
              {currentUser.Organization_Name}
            </h3>

            <List
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 2rem",
              }}
            >
              <ListItem>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  name="Mail"
                  label="User Email"
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    validateEmail();
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdEmail />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              {validemail !== "" && (
                <small
                  style={{
                    color: "red",
                    textAlign: "start",
                    marginLeft: "1rem",
                  }}
                >
                  {validemail}
                </small>
              )}
              <ListItem>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  name="Phone"
                  label="User Phone"
                  type="tel"
                  value={mobile}
                  autoComplete="off"
                  onChange={e => {
                    setMobile(e.target.value);
                    validateMobile();
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdLocalPhone />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              {validmobile !== "" && (
                <small
                  style={{
                    color: "red",
                    textAlign: "start",
                    marginLeft: "1rem",
                  }}
                >
                  {validmobile}
                </small>
              )}
              <Button
                onClick={updateHandler}
                variant="contained"
                color="primary"
                style={{
                  alignSelf: "center",
                  marginTop: "1rem",
                  width: "90%",
                  padding: "0.5rem 0.5rem",
                }}
              >
                Update
              </Button>
            </List>
          </div>
        </div>
      )}
    </>
  );
}

export default MyAccountScreen;
