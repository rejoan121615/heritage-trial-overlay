"use client";

import React, { useState, useEffect } from "react";
import {
  CloudinaryUploadResponseTYPE,
  HeritageDataTYPE,
} from "@/types/AllTypes";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box,
  DialogActions,
  Divider,
} from "@mui/material";
import z from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VisuallyHiddenInput from "@/components/CustomComponent/VisuallyHiddenInput";
import { categoryOptions, HeritageSchema } from "@/utils/HeritageAssist";
import Image from "next/image";
import { deleteFromCloudinary, uploadToCloudinary } from "@/utils/cloudinaryAssistFunction";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useSnackbar } from "@/components/feedback/SnackbarContext";

const HeritageEditSchema = HeritageSchema.extend({
  image: HeritageSchema.shape.image.optional(),
});

type HeritageFormDataTYPE = z.infer<typeof HeritageEditSchema>;

const HeritageEditModal = ({
  open,
  close,
  heritageData,
  setHeritageList,
}: {
  open: boolean;
  close: () => void;
  heritageData: HeritageDataTYPE | undefined;
  setHeritageList: React.Dispatch<
    React.SetStateAction<HeritageDataTYPE[] | undefined>
  >;
}) => {
  // react form hook
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<HeritageFormDataTYPE>({
    resolver: zodResolver(HeritageEditSchema),
    mode: "all",
    defaultValues: {
      title: "",
      category: "",
      location: "",
      summary: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { showMessage } = useSnackbar();

  // update default value
  useEffect(() => {
    if (heritageData == undefined) return;

    reset({
      title: heritageData.title,
      category: heritageData.category,
      location: heritageData.location,
      summary: heritageData.summary,
    });
  }, [heritageData, reset]);

  // watch image field for change
  const imageField = useWatch({
    control,
    name: "image",
  });

  useEffect(() => {
    if (!imageField) return;
    setPreviewImage(URL.createObjectURL(imageField));
  }, [imageField]);

  // Function to upload image to Cloudinary

  const submitHandler = async (data: HeritageFormDataTYPE) => {
    const { image } = data;

    // close modal
    close();

    // find changed fields except "image"
    const updatedField = Object.keys(data).filter((objKey: string) => {
      if (objKey === "image") return false;
      return (
        data[objKey as keyof typeof data] !==
        heritageData?.[objKey as keyof typeof heritageData]
      );
    });

    // ✅ Case 1: no image and no field change
    if (!image && updatedField.length === 0) {
      console.log("No update made");
      return;
    }

    const dataUpdater = async () => {
      let uploadedImgRes: CloudinaryUploadResponseTYPE = {
        success: false,
        imageUrl: null,
        publicId: null,
        error: "No image uploaded",
      };

      // if image updated → upload it first
      if (image && heritageData?.imgPublicId) {
        uploadedImgRes = await uploadToCloudinary(image, "heritages");
        await deleteFromCloudinary(heritageData.imgPublicId);
        if (!uploadedImgRes.success) {
          console.log("Image upload failed, try again");
          return;
        }
      }

      // object to send to firebase
      let updatePayload: Partial<HeritageDataTYPE> = {};

      // ✅ Case 2: only image
      if (image && updatedField.length === 0) {
        updatePayload = { image: uploadedImgRes.imageUrl! };
      }

      // ✅ Case 3: image + fields
      if (image && updatedField.length > 0) {
        updatedField.forEach((field) => {
          // @ts-expect-error add those updated updated data into updatePayload object
          updatePayload[field as keyof HeritageDataTYPE] =
            data[field as keyof HeritageFormDataTYPE];
        });
        updatePayload.image = uploadedImgRes.imageUrl!;
      }

      // ✅ Case 4: only fields
      if (!image && updatedField.length > 0) {
        updatedField.forEach((field) => {
          // @ts-expect-error add those updated updated data into updatePayload object
          updatePayload[field as keyof HeritageDataTYPE] =
            data[field as keyof HeritageFormDataTYPE];
        });
      }

      // finally update in firebase
      try {
        if (heritageData?.id) {
          const ref = doc(db, "heritages", heritageData?.id);
          await updateDoc(ref, updatePayload);

          // update heritage list state
          setHeritageList((prevState) => {
            if (!prevState?.length) return prevState;

            return prevState.map((item) => {
              if (item.id === heritageData?.id) {
                return { ...item, ...updatePayload };
              }
              return item;
            });
          });

          showMessage("Heritage updated successfully", "success");
        }
      } catch (error) {
        showMessage("Heritage update failed", "error");
        console.log("document update fail, something went wrong", error);
      }

      // reset form into default state
      reset();
      setPreviewImage(null);
    };

    await dataUpdater();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
      maxWidth="md"
      component={"div"}
    >
      <DialogTitle id="scroll-dialog-title">Edit Heritage </DialogTitle>
      <DialogContent sx={{ paddingTop: "20px!important" }}>
        <Stack rowGap={3} component={"form"}>
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

          <Divider />
          {/* Image upload section */}
          {heritageData !== undefined && heritageData.image && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {/* current image  */}
              <Box>
                <Image
                  width={250}
                  height={125}
                  src={heritageData?.image}
                  alt="Heritage Image"
                />
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  sx={{ marginTop: "10px" }}
                >
                  Current Heritage Image:
                </Typography>
              </Box>
              {/* current image  */}
              {previewImage !== null && (
                <Box>
                  <Image
                    width={250}
                    height={125}
                    src={previewImage}
                    alt="Heritage Image"
                  />
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    sx={{ marginTop: "10px" }}
                  >
                    New Heritage Image:
                  </Typography>
                </Box>
              )}
            </Box>
          )}
          <Divider />

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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant="contained" color="error">
          Cancel
        </Button>
        <Button
          sx={{ marginLeft: "20px" }}
          variant="contained"
          color="success"
          onClick={handleSubmit(submitHandler)}
        >
          Submit Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HeritageEditModal;
