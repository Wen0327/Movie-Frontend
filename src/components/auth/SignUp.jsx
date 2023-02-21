import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hook";
import { isValidEmail } from "../../utils/helper";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {authInfo} = useAuth();
  const {isLoggedIn} = authInfo

  const {updateNotification} = useNotification();

  const validateUserInfo = ({ name, email, password }) => {

    const isValidName = /^[a-z A-Z 0-9]+$/;

    if (!name.trim()) return { ok: false, error: "Name is missing!" };
    if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail(email))
      return { ok: false, error: "Invalid Email!" };

    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
      return { ok: false, error: "Password must longer than 8 character!" };

    return { ok: true };
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    // url
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification('error',error);

    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);
    

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
    // console.log(response.user);
    // console.log(userInfo);
  };

  useEffect(()=>{
    if(isLoggedIn) navigate('/');
  },[isLoggedIn])

  const { name, email, password } = userInfo;

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign Up</Title>
          <FormInput
            onChange={handleChange}
            value={name}
            label="Name"
            name="name"
          />
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            name="email"
          />
          <FormInput
            onChange={handleChange}
            value={password}
            label="Password"
            name="password"
            type="password"
          />
          <Submit value="Sign Up" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/SignIn">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
