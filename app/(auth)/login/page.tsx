"use client";

import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormWrapper from "@/components/form/FormWrap";
import { useForm } from "react-hook-form";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserTYPE } from "@/types/AllTypes";
import { useSnackbar } from "@/components/feedback/SnackbarContext";

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
  const { showMessage } = useSnackbar();

  // handle submit
  const onSubmit = async (data: LoginFormTYPE) => {
    setSubmitProgress(true);
    const { email, password } = data;
    try {
      // check user status before signin
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userDocSnapshort = await getDocs(userQuery);
      if (userDocSnapshort.empty) {
        setError("email", {
          message: "Invalid email, check the email address.",
        });
        setSubmitProgress(false);
        showMessage("Invalid email, Account verification failed", "error");
        return;
      }

      const retrivedUserData = userDocSnapshort.docs[0].data() as UserTYPE;

      // account block handler
      if (retrivedUserData.status === "block") {
        setError("email", {
          message: "Your account is blocked. Contact with admin.",
        });
        setSubmitProgress(false);
        return;
      }

      if (retrivedUserData.status === "pending") {
        setError("email", {
          message: "Account waiting for approval.",
        });
        setSubmitProgress(false);
        return;
      }

      // do signin operation
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (res.user) {
        router.push("/heritage");
      }
    } catch (error) {
      console.log("got an error ", error);
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          setSubmitProgress(false);
          setError("email", { message: "Invalid credentials" });
          setError("password", {
            message: "Invalid password, check you password please",
          });
        }
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <FormWrapper
      type="login"
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
  );
};

export default LoginPage;
