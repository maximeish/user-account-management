import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledAlert,
  StyledLabel,
  StyledTitle,
  Div,
  FormWrapper,
  FormTextWrapper,
} from "../components/formComponents";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

function Signup() {
  const [fn, setFn] = React.useState("");
  const [ln, setLn] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCpassword] = React.useState("");
  const [loading, setLoading] = useState(false);

  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-data")) navigate("/dashboard");
  }, []);

  async function handleSubmit(e) {
    console.log({
      fn,
      ln,
      email,
      password,
    });
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/v1/auth/register", {
        fn,
        ln,
        email,
        password,
      });

      toast.success("Sign up successful", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>Z Platform</StyledTitle>
        <StyledLabel>First name:</StyledLabel>
        <StyledInput
          type="text"
          onChange={(e) => setFn(e.target.value)}
          value={fn}
          required
        />

        <StyledLabel>Last name:</StyledLabel>
        <StyledInput
          type="text"
          onChange={(e) => setLn(e.target.value)}
          value={ln}
          required
        />

        <StyledLabel>Email:</StyledLabel>
        <StyledInput
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <StyledLabel>Password:</StyledLabel>
        <StyledInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <StyledLabel>Confirm Password:</StyledLabel>
        <StyledInput
          type="password"
          onChange={(e) => setCpassword(e.target.value)}
          value={cpassword}
          required
        />

        <Div>
          <StyledButton
            type="submit"
            disabled={!fn || !ln || !cpassword || !password || !email}
          >
            Sign up
          </StyledButton>
          <PuffLoader color="#36d7b7" loading={loading} />
        </Div>
      </StyledForm>
      <FormTextWrapper>
        Already have an account? <Link to="/login">Log in</Link>
      </FormTextWrapper>
    </FormWrapper>
  );
}

export default Signup;
