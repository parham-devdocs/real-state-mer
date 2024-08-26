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
  
    email: "",
    password: "",
 
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({

    email: "",
    password: "",

 
  });
  useEffect(() => {
    console.log(formData.password);

    // Reset errors
    const newErrors = {
  
      email: "",
      password: "",
    
    };

    // Check for errors
  

    if (!formData.email.includes("@")) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
    console.log(name);
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
          "http://localhost:5000/api/v1/auth/login",
          formDataToSend
        );
        
        if (res.status === 200) {
          console.log(res.data);
          navigate("/login");
        }
      }
    } catch (error) {
      console.log("loginn failed");
    }
  };

  const inputFields = [
  
    {
      label: "Email",
      onChangeHandler: ChangeHandler,
      name: "email",
    },
    {
      label: "Password",
      onChangeHandler: ChangeHandler,
      name: "password",
      error: "password not matched",
    },
  
  ];

  return (
    <div className="form">
      <Box
        className="form_container"
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
            Do not have an account ? sign up here
          </Button>
        </form>
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
