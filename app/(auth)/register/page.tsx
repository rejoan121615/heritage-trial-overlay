"use client";

import { TextField, InputAdornment } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import FormWrapper from "@/components/form/FormWrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { redirect, useRouter } from 'next/navigation'
import { UserTYPE } from "@/types/AllTypes";


const RegisterSchema = z
  .object({
    name: z.string().min(3, "Full name must be at least 3 character."),
    email: z.email("Invalid email address."),
    password: z.string().min(8, "Password must be atleast 8 character."),
    confirmPassword: z.string().min(8, "Password must be atleast 8 character."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormTYPE = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormTYPE>({
    resolver: zodResolver(RegisterSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormTYPE) => {
    const { name, email, password } = data;
    try {
      // create new user and update name
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });

      // store user in database
      await setDoc(doc(db, "users", res.user.uid), {
        userId: res.user.uid,
        name,
        email,
        totalHeritage: 0,
        status: 'pending',
        createdAt: serverTimestamp(),
        isAdmin: false,
      } as UserTYPE);

      // redirect 
      router.replace('/heritage')
    } catch (error) {
      if (error instanceof FirebaseError ) {
        if (error.code === "auth/email-already-in-use") {
          redirect('/login');
        }
      }
    }
  };

  return (
    <FormWrapper
      type="register"
      submit={handleSubmit(onSubmit)}
      loading={false}
    >
      <TextField
        label="Full Name"
        placeholder="Mohd Rejoan"
        size="medium"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          },
        }}
      />
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
        {...register("email")}
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
        {...register("password")}
      />
      <TextField
        label="Confirm Password"
        placeholder="Ex: 1@dfeE898o"
        size="medium"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          },
        }}
        {...register("confirmPassword")}
      />
    </FormWrapper>
  );
};

export default RegisterPage;
