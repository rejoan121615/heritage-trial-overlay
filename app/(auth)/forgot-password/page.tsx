"use client";

import { InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSnackbar } from "@/components/feedback/SnackbarContext";
import { auth } from "@/firebase/firebaseConfig";
import FormWrapper from "@/components/form/FormWrap";


const LoginSchema = z.object({
  email: z.email("Invalid email address."),
});

type LoginFormTYPE = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  // form hook
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<LoginFormTYPE>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const [submitProgress, setSubmitProgress] = useState<boolean>(false);
  const { showMessage } = useSnackbar();
  const [emailSendAlready, setEmailSendAlready] = useState<boolean>(false);

  // handle submit
  const onSubmit = async (data: LoginFormTYPE) => {
    setSubmitProgress(true);
    console.log("email submit function ", data);
    try {
      await sendPasswordResetEmail(auth, data.email, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      });
      setEmailSendAlready(true);
      showMessage("Password reset email sent successfully.");
      setSubmitProgress(false);
    } catch (error) {
      console.log("error ", error);
      showMessage("Failed to send password reset email.", "error");
      setSubmitProgress(false);
      setEmailSendAlready(false);
    }
  };

  return (
    <FormWrapper
      type="resetPassword"
      submit={handleSubmit(onSubmit)}
      loading={submitProgress}
      disableSubmit={emailSendAlready}
    >
      <TextField
        label="Email"
        placeholder="eb@email.com"
        size="medium"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      {
        emailSendAlready && (
          <Typography sx={{ textAlign: "center", marginTop: '-10px', marginBottom: '-10px' }}>
            If email not found, make sure to check your spam folder.
          </Typography>
        )
      }
    </FormWrapper>
  );
};

export default LoginPage;
