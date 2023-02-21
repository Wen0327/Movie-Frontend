import React, { useState } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { forgetPassword } from "../../api/auth";
import { isValidEmail } from "../../utils/helper";
import { useNotification } from "../../hook";

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const {updateNotification} = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    // url
    e.preventDefault();
    if(!isValidEmail(email)) return updateNotification('error', 'Invalid Email')
    const {error,message}= await forgetPassword(email);
    if(error) return updateNotification('error',error)
    updateNotification('success', message)
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Please Enter your Email</Title>
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            name="email"
            />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/SignIn">Sign In</CustomLink>
            <CustomLink to="/auth/SignUp">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
