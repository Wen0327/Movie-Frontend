import React, { useEffect, useState } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { useAuth, useNotification } from "../../hook";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/helper";

const validateUserInfo = ({email, password }) => {
  
  
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) 
    return { ok: false, error: "Invalid Email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must longer than 8 character!" };

  return { ok: true };
};

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const {updateNotification} = useNotification();
  const {handleLogin,authInfo} = useAuth();
  const {isPending,isLoggedIn} = authInfo;


  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    // url
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification('error',error);

    handleLogin(userInfo.email,userInfo.password)
  };

  useEffect(()=>{
    if(isLoggedIn) navigate('/');
  },[isLoggedIn])

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign In</Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            name="email"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            name="password"
            type="password"
          />
          <Submit value="Sign In" busy={isPending}/>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/SignUp">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
