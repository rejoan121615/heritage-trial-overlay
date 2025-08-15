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
  styled,
  Divider,
  FormHelperText,
  Box,
  CircularProgress,
} from "@mui/material";
import z, { string } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from 'next/navigation';




const categoryOptions = [
  "ruins",
  "monastery",
  "palace",
  "mosque",
  "historic town",
  "temple",
  "museum",
  "church",
  "architecture",
  "residence",
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const NewHeritageSchema = z.object({
  title: z.string().min(10, "Title must be atleast 10 character long."),
  description: z.string(),
  location: z.string().nonempty(),
  category: z.enum(categoryOptions, {
    message: "Please select a valid category",
  }),
  image: z
    .instanceof(File, { message: "Please upload a file" })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size must be less than 10MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});

type HeritageDataTYPE = z.infer<typeof NewHeritageSchema>;

const NewHeritagePage = () => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<HeritageDataTYPE>({
    resolver: zodResolver(NewHeritageSchema),
    mode: "all",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Function to upload image to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "heritage_uploads"); // Create this preset in Cloudinary dashboard
    formData.append("folder", "heritage-sites"); // Optional: organize images in folders

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Return the image URL
  };

  const submitHandler = async (data: HeritageDataTYPE) => {
    setLoading(true); // active loading on submit button

    const { title, description, location, category, image } = data;

    try {
      const imageUrl = await uploadToCloudinary(image);

    
      // upload heritage record into db
      await addDoc(collection(db, "heritages"), {
        title: title,
        description: description,
        location: location,
        category: category,
        image: imageUrl,
      });

      setLoading(false);

      // navigate into all heritage page
      router.push('/admin/heritage')
      
    } catch (error) {
      console.log("something went wrong ", error);
    }
  };

  return (
    <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
      <Typography
        component={"h2"}
        sx={{ fontSize: "20px", margin: "0px 0 30px 0" }}
      >
        Update your heritage
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
          label="Short Description (optional): "
          multiline
          rows={5}
          margin="normal"
          fullWidth
          sx={{ margin: "0px" }}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          id="outlined-basic"
          label="Location:"
          variant="outlined"
          fullWidth
          {...register("location")}
          error={!!errors.location}
          helperText={errors.description?.message}
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
