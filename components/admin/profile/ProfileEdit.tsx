import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Divider,
  Button,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import HeritageDetailsRow from "../heritage/HeritageDetailsRow";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VisuallyHiddenInput from "@/components/CustomComponent/VisuallyHiddenInput";
import UploadIcon from "@mui/icons-material/Upload";
import { UserContext } from "@/contexts/UserContext";
import { updateEmail, updatePassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useSnackbar } from "@/components/feedback/SnackbarContext";



const ProfileEditSchema = z
  .object({
    image: z
      .instanceof(File, { message: "Please upload a file" })
      .refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "File size must be less than 2MB",
      })
      .refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      })
      .optional(),
    name: z.string().min(2).max(100),
    email: z.email(),
    oldPassword: z
      .union([
        z.literal(""), // allow empty string
        z.string().min(8, "Old Password must be at least 8 characters long"),
      ])
      .optional(),
    password: z
      .union([
        z.literal(""), // allow empty string
        z.string().min(8, "New Password must be at least 8 characters long"),
      ])
      .optional(),
    confirmPassword: z
      .union([
        z.literal(""), // allow empty string
        z
          .string()
          .min(8, "Confirm Password must be at least 8 characters long"),
      ])
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.oldPassword && data.oldPassword.length > 0;
      }
      return true;
    },
    {
      message: "Old password is required to set a new password",
      path: ["oldPassword"],
    }
  );

type ProfileEditTYPE = z.infer<typeof ProfileEditSchema>;

const ProfileEdit = ({ closeEdit }: { closeEdit: () => void }) => {
  // form hooks
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ProfileEditTYPE>({
    resolver: zodResolver(ProfileEditSchema),
    mode: "all",
    defaultValues: {
      image: undefined,
      name: "",
      email: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [preview, setPreview] = useState<File | null>(null);
  const currentUser = useContext(UserContext);
  const { showMessage } = useSnackbar()

  //   form value setter
  useEffect(() => {
    reset({
      name: currentUser?.name,
      email: currentUser?.email,
    });
  }, []);

  const submitHandler = async (data: ProfileEditTYPE) => {
    console.log(data);
  };

  return (
    <Grid
      component={"form"}
      container
      alignItems={"center"}
      sx={{
        rowGap: { sm: "20px" },
        width: "100%",
        maxWidth: "650px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      onSubmit={handleSubmit(submitHandler)}
    >
      {/* title  */}
      <HeritageDetailsRow title="Profile Image">
        <Grid container>
          <Box sx={{ width: "150px", height: "150px", position: "relative" }}>
            <Avatar
              alt="Mohd Rejoan"
              sx={{ width: "150px", height: "150px" }}
              src={preview === null ? "" : URL.createObjectURL(preview)}
            />
            <IconButton
              component={"label"}
              role={"undefined"}
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <UploadIcon />
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const file = e.target.files[0];
                    setPreview(file);
                  }
                }}
              />
            </IconButton>
          </Box>
        </Grid>
      </HeritageDetailsRow>

      <Grid size={12} sx={{ marginTop: { xs: "15px", sm: "0px" } }}>
        <Divider />
      </Grid>

      {/* title  */}
      <HeritageDetailsRow title="Full Name">
        <TextField
          size={"small"}
          variant="outlined"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </HeritageDetailsRow>

      {/* Image  */}
      <HeritageDetailsRow title="Email">
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </HeritageDetailsRow>

      {/* summary  */}
      <HeritageDetailsRow title="Old Password">
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          {...register("oldPassword")}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
        />
      </HeritageDetailsRow>

      {/* summary  */}
      <HeritageDetailsRow title="New Password">
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </HeritageDetailsRow>

      {/* Location  */}
      <HeritageDetailsRow title="Confirm Password">
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
      </HeritageDetailsRow>

      <Grid size={12} sx={{ marginBottom: { xs: "15px", sm: "0px" } }}>
        <Divider />
      </Grid>

      {/* Action buttons  */}
      <HeritageDetailsRow title="">
        <Button variant="contained" color="primary" type="submit">
          Submit Change
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ marginLeft: "15px" }}
          onClick={closeEdit}
        >
          Cancel
        </Button>
      </HeritageDetailsRow>
    </Grid>
  );
};

export default ProfileEdit;
