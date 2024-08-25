import React, { useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Box } from "@mui/material";
import Input from "../components/Ui/Input";
import Button from "../components/Ui/Button";

import "../styles/registerPage.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "", // Corrected the typo
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const ChangeHandler = (event) => {
      const { name, value, files } = event.target;
      console.log(event.target.name)
      
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
      console.log(formData)
  };

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log(formData.profileImage);
  };

  const inputFields = [
    {
      label: "First Name",
      onChangeHandler: ChangeHandler,
      name: "firstName", // Changed to match state
    },
    {
      label: "Last Name",
      onChangeHandler: ChangeHandler,
      name: "lastName",
    },
    {
      label: "Email",
      onChangeHandler: ChangeHandler,
      name: "email",
    },
    {
      label: "Password",
      onChangeHandler: ChangeHandler,
      name: "password",
    },
    {
      label: "Confirm Password",
      onChangeHandler: ChangeHandler,
      name: "confirmPassword",
    },
  ];

  return (
    <div className="register">
      <Box
        className="register_container"
        display="flex"
        flexDirection="column"
        width="50vw"
        paddingX="1rem"
        alignItems="center"
      >
        <form onSubmit={submitHandler}>
          {inputFields.map((item) => (
            <Input
              key={item.label}
              onChangeHandler={item.onChangeHandler}
              label={item.label}
              name={item.name}
            />
          ))}
          <input
            type="file"
            id="profileImage" // Added id for the file input
            name="profileImage"
            accept="image/*"
            required
            style={{ display: "none" }}
            onChange={ChangeHandler} // Ensure to call ChangeHandler on change
          />
          <label
            htmlFor="profileImage"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer", // Added cursor for better UX
            }}
          >
            <CloudUploadOutlinedIcon fontSize="large" />
            <span>Upload Profile Photo</span>
          </label>
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{ width: "200px", margin: "1rem auto" }}
          >
            Register
          </Button>
          <Button
            size="small"
            sx={{ fontWeight: "600" }}
            disableRipple
            disableFocusRipple
          >
            Already Have An Account? Login Here
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default RegisterPage;
