import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hook";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_LEN = 6;
let currentOTPIndex;

const isValidOTP = (otp) => {
  // only int and can not be empty
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

export default function EmailVerification() {
  const [otp, setOTP] = useState(new Array(OTP_LEN).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const inputRef = useRef();
  const { updateNotification } = useNotification();

  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();

  const focusNextInputField = (index) => {
    setActiveOTPIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let netIndex;
    const diff = index - 1;
    netIndex = diff !== 0 ? diff : 0;
    setActiveOTPIndex(netIndex);
  };
//check
  const handleOTPChange = ({ target }) => {
    const { value } = target;
    const newOTP = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) {
      focusPrevInputField(currentOTPIndex);
    } else {
      focusNextInputField(currentOTPIndex);
    }

    //   moving block

    setOTP([...newOTP]);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputField(currentOTPIndex);
    }
  };

  //check
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) return updateNotification("error", "Invalid OTP");
    // submit OTP
    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({ OTP: otp.join(""), userId: user.id });
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  //   moving block
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  // user not found
  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn) navigate("/");
  }, [user, isLoggedIn]);

  return (
    <FormContainer className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className={commonModalClasses} onSubmit={handleSubmit}>
          <Title>Please enter the OTP to verify your account.</Title>
          <p className="text-center dark:text-dark-subtle text-light-subtle">
            OTP has been send to your email.
          </p>

          <div className="flex justify-between"></div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOTPIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={handleOTPChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle rounded dark:focus:border-white focus:border-primary bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>

          <Submit value="Verify Account" />
        </form>
      </Container>
    </FormContainer>
  );
}
