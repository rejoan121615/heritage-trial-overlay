import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Divider,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import HeritageDetailsRow from "../heritage/HeritageDetailsRow";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VisuallyHiddenInput from "@/components/CustomComponent/VisuallyHiddenInput";
import UploadIcon from "@mui/icons-material/Upload";
import { UserContext } from "@/contexts/UserContext";
import {
  updateEmail,
  updatePassword,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { useSnackbar } from "@/components/feedback/SnackbarContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";
import { CloudinaryUploadResponseTYPE, UserTYPE } from "@/types/AllTypes";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/utils/cloudinaryAssistFunction";

const ProfileEditSchema = z
  .object({
    image: z
      .instanceof(File, { message: "Please upload a file" })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size must be less than 5MB",
      })
      .refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      })
      .optional(),
    name: z.string().min(2).max(100),
    email: z.email(),
    oldPassword: z
      .union([
        z.literal(""),
        z.string().min(8, "Old Password must be at least 8 characters long"),
      ])
      .optional(),
    password: z
      .union([
        z.literal(""),
        z.string().min(8, "New Password must be at least 8 characters long"),
      ])
      .optional(),
    confirmPassword: z
      .union([
        z.literal(""),
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

const ProfileEdit = ({
  closeEdit,
  setApplyEdit,
}: {
  closeEdit: () => void;
  setApplyEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
  const { user, setUser } = useContext(UserContext);
  const { showMessage } = useSnackbar();

  //   form value setter
  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email,
    });
  }, []);

  const submitHandler = async (data: ProfileEditTYPE) => {
    const { image, name, email, oldPassword, password } = data;

    if (!auth.currentUser) return;
    const authUser = auth.currentUser;

    closeEdit();
    setApplyEdit(true);

    try {
      // handle dublicate email
      try {
        await updateEmail(authUser, email);
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          showMessage(
            "Email update failed as it is already attached to another account",
            "error"
          );
          setApplyEdit(false);
        } else {
          showMessage("Email update failed", "error");
          setApplyEdit(false);
        }
        return;
      }

      // update profile name
      if (name && name !== authUser.displayName) {
        await updateProfile(authUser, { displayName: name });
      }

      // update password (reauth required)
      if (oldPassword && password) {
        const credential = EmailAuthProvider.credential(
          authUser.email!, // must be current email from Firebase
          oldPassword
        );
        await reauthenticateWithCredential(authUser, credential);
        await updatePassword(authUser, password);
      }

      // -------- Update Firestore users record -------- //
      const userRef = doc(db, "users", authUser.uid);
      const updatePayload: Partial<UserTYPE> = {};
      let imgUploadRes: CloudinaryUploadResponseTYPE = {
        success: false,
        imageUrl: null,
        publicId: null,
      };

      if (name) updatePayload.name = name;
      if (email) updatePayload.email = email;
      // upload image Cloudinary
      if (image && user?.userId) {
        if (user?.imgPublicId) {
          await deleteFromCloudinary(user.imgPublicId);
        }

        imgUploadRes = await uploadToCloudinary(
          image,
          user.userId,
          "profile"
        );
        console.log(" image upload response ", imgUploadRes);
        if (imgUploadRes.success) {
          updatePayload.image = imgUploadRes.imageUrl
            ? imgUploadRes.imageUrl
            : "";
          updatePayload.imgPublicId = imgUploadRes.publicId
            ? imgUploadRes.publicId
            : "";
        }
      }

      if (Object.keys(updatePayload).length > 0) {
        await updateDoc(userRef, updatePayload);
      }

      showMessage("Profile updated successfully", "success");
      // update user state 
      setUser((prevState) => {
        if (!prevState) return prevState;
        return {
          ...prevState,
          name: updatePayload.name ? updatePayload.name : prevState.name,
          email: updatePayload.email ? updatePayload.email : prevState.email,
          image: updatePayload.image ? updatePayload.image : prevState.image,
          imgPublicId: updatePayload.imgPublicId ? updatePayload.imgPublicId : prevState.imgPublicId,
        }
      });
      setApplyEdit(false);
    } catch (error: any) {
      console.error(error);
      showMessage(error.message || "Profile update failed", "error");
      setApplyEdit(false);
    }
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
      {/* profile image  */}
      <HeritageDetailsRow title="Profile Image">
        <Grid container>
          <Box sx={{ width: "150px", height: "150px", position: "relative" }}>
            <Avatar
              alt="Mohd Rejoan"
              sx={{ width: "150px", height: "150px" }}
              src={
                preview === null
                  ? user?.image
                  : URL.createObjectURL(preview)
              }
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
                    // update form value
                    reset({
                      image: file,
                    });
                  }
                }}
              />
            </IconButton>
          </Box>
        </Grid>

        {!!errors.image?.message && (
          <Typography color="error">{errors.image.message}</Typography>
        )}
      </HeritageDetailsRow>

      <Grid size={12} sx={{ marginTop: { xs: "15px", sm: "0px" } }}>
        <Divider />
      </Grid>

      {/* profile image  */}
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

      {/* profile email  */}
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

      {/* profile old password  */}
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

      {/* profile new password  */}
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

      {/* profile confirm password  */}
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

      {/* profile action buttons  */}
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
