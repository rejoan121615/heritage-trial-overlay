"use client";

import { InputAdornment, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormWrapper from "@/components/form/FormWrap";
import { useForm } from "react-hook-form";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import z, { set } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useAuth } from "@/contexts/AuthContext";
import LoadingPage from "@/components/feedback/LoadingPage";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(8, "Password must be atleast 8 character."),
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
      password: "",
    },
  });

  const router = useRouter();

  const [submitProgress, setSubmitProgress] = useState<boolean>(false);

  // auth status
  const { loading, user } = useAuth();

  // handle submit
  const onSubmit = async (data: LoginFormTYPE) => {
    setSubmitProgress(true);
    const { email, password } = data;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);


      if (res.user) {
        router.push('/admin')
      }


    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          setSubmitProgress(false);
          setError("email", { message: "Invalid credentials" });
          setError("password", { message: "Invalid password, check you password please" });
        }
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <FormWrapper
          title="Login in your account"
          submitTitle="Login"
          helperNode={{
            text: "Does't have an account?",
            link: {
              url: "/register",
              title: "Register",
            },
          }}
          submit={handleSubmit(onSubmit)}
          loading={submitProgress}
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
          <TextField
            label="Password"
            placeholder="Ex: 1@dfeE898o"
            size="medium"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormWrapper>
      )}
    </>
  );
};

export default LoginPage;
