"use client";

import React, { useState } from "react";
import {
  Paper,
  Stack,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  FormHelperText,
  Box,
  CircularProgress,
} from "@mui/material";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { categoryOptions, HeritageSchema } from "@/utils/HeritageAssist";
import { uploadToCloudinary } from "@/utils/cloudinaryAssistFunction";
import VisuallyHiddenInput from "@/components/CustomComponent/VisuallyHiddenInput";
import { useSnackbar } from "@/components/feedback/SnackbarContext";
import { CloudinaryUploadResponseTYPE } from "@/types/AllTypes";

type HeritageFormDataTYPE = z.infer<typeof HeritageSchema>;

const NewHeritagePage = () => {
  const router = useRouter();
  const { showMessage } = useSnackbar();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<HeritageFormDataTYPE>({
    resolver: zodResolver(HeritageSchema),
    mode: "all",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (data: HeritageFormDataTYPE) => {
    setLoading(true);

    const { title, summary, location, category, image } = data;
    const currentUser = auth.currentUser;

    try {

      let imageUrl: CloudinaryUploadResponseTYPE = {
        success: false,
        imageUrl: null,
        error: undefined,
        publicId: null,
      };

      if (image) {
        imageUrl = await uploadToCloudinary(image, 'heritages');

        console.log('uploaded image details ', imageUrl);
      }

      // upload heritage record into db
      await addDoc(collection(db, "heritages"), {
        title,
        summary,
        location,
        category,
        image:  imageUrl.success ? imageUrl.imageUrl : null,
        imgPublicId:  imageUrl.success ? imageUrl.publicId : null,
        createdAt: serverTimestamp(),
        userId: currentUser?.uid,
      });

      setLoading(false);
      router.push("/heritage");

      showMessage("Heritage record added successfully", "success");

    } catch (error) {
      console.log("something went wrong ", error);
      showMessage("Failed to add heritage record", "error");
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
      <Typography
        component={"h2"}
        sx={{ fontSize: "20px", margin: "0px 0 30px 0" }}
      >
        Add New Heritage
      </Typography>
      <Stack
        rowGap={3}
        component={"form"}
        onSubmit={handleSubmit(submitHandler)}
      >
        <TextField
          id="outlined-basic"
          label="Heritage Title:"
          variant="outlined"
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Heritage Summary: "
          multiline
          rows={5}
          margin="normal"
          fullWidth
          sx={{ margin: "0px" }}
          {...register("summary")}
          error={!!errors.summary}
          helperText={errors.summary?.message}
        />

        <TextField
          id="outlined-basic"
          label="Location:"
          variant="outlined"
          fullWidth
          {...register("location")}
          error={!!errors.location}
          helperText={errors.location?.message}
        />

        <Controller
          name="category"
          control={control}
          defaultValue="ruins"
          render={({ field }) => {
            return (
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="select-category-label">
                  Select Category
                </InputLabel>
                <Select
                  labelId="select-category-label"
                  value={field.value}
                  onChange={field.onChange}
                  sx={{ textTransform: "capitalize" }}
                >
                  {categoryOptions.map((catItem, index) => (
                    <MenuItem
                      key={index}
                      value={catItem}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {catItem}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category ? (
                  <FormHelperText>{errors.category.message}</FormHelperText>
                ) : null}
              </FormControl>
            );
          }}
        />

        <Controller
          name="image"
          control={control}
          render={({ field }) => {
            return (
              <Box
                component="div"
                sx={{ display: "flex", flexFlow: "column wrap" }}
              >
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  size="large"
                  sx={{
                    padding: "15px 0px",
                    color: errors.image ? "#db2f4f" : "#676767",
                    borderColor: errors.image ? "#db2f4f" : "#c4c4c4",
                    "&:hover": { borderColor: "#212121" },
                  }}
                >
                  {field.value
                    ? `Selected File: ${field.value.name}`
                    : "Upload Image"}
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
                {errors.image && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ marginLeft: "15px" }}
                  >
                    {errors.image.message}
                  </Typography>
                )}
              </Box>
            );
          }}
        />

        <Divider />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ padding: "15px" }}
          loading={loading}
          loadingIndicator={<CircularProgress size={28} />}
        >
          Submit
        </Button>
      </Stack>
    </Paper>
  );
};

export default NewHeritagePage;
