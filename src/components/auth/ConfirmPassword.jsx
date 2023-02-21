import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
// get reset id & token
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hook";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ConfirmPassword() {
  // const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  // isValid isVerifying !isValid

  useEffect(()=>{
    isValidToken()
  },[])

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    if (error) return updateNotification("error", error);

    if (!valid) {
      setIsValid(false);
      setIsVerifying(false)
      return navigate("/auth/reset-password", { replace: true });
    }
    setIsValid(true);
    setIsVerifying(true)
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center ">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait for verifying.
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            The token is invalid!
          </h1>
        </Container>
      </FormContainer>
    );

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput label="New Password" name="password" type="password" />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
