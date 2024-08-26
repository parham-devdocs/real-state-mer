import React, { useEffect, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Box } from "@mui/material";
import Input from "../components/Ui/Input";
import Button from "../components/Ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/registerPage.scss";

const RegisterPage = () => {
    const [matchPassword, setMatchPassword] = useState(true);
    const [errors, setErrors] = useState({
      firstName: "", // Corrected the typo
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    firstName: "", // Corrected the typo
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
useEffect(() => {
  console.log(formData.password);

  // Reset errors
  const newErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Check for errors
  if (!formData.firstName) {
    newErrors.firstName = "First name is required";
  }

  if (!formData.lastName) {
    newErrors.lastName = "Last name is required";
  }

  if (!formData.email.includes("@")) {
    newErrors.email = "Email is not valid";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.password = "Passwords do not match";
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required";
  }

  // Update errors state
  setErrors(newErrors);
}, [formData]);

  const ChangeHandler = (event) => {
      const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
      console.log(name)
  };

  const submitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission


  

    try {
      if (matchPassword) {
        const formDataToSend = new FormData();
        // Append form data
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/register",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type
            },
          }
        );
          if (res.status === 200) {
            console.log("navigate")
            navigate('/login')
        }
      }
    } catch (error) {
      console.log("registeration failed");
    }
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
      error:"password not matched"
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
            <>
              <Input
                key={item.label}
                onChangeHandler={item.onChangeHandler}
                label={item.label}
                name={item.name}
              />
            </>
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
          {formData.profileImage && (
            <div className="imgContainer">
              <img src={URL.createObjectURL(formData.profileImage)} />
            </div>
          )}
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
        {/* {!matchPassword && <p className="error-message">password must match with confirm password</p>} */}
        {Object.entries(errors).map(
          ([key, error]) =>
            error && (
              <p key={key} className="error-message">
                {error}
              </p>
            )
        )}
      </Box>
    </div>
  );
};

export default RegisterPage;
