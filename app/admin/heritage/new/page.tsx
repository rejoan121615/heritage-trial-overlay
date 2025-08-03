"use client";

import React, { useState, ChangeEvent } from "react";
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
  SelectChangeEvent,
} from "@mui/material";

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

type InputStateTYPE = {
  title: string;
  description: string;
  image: File | undefined;
  location: string;
  category: string;
};

const NewHeritagePage = () => {
  const [inputValue, setInputValue] = useState<InputStateTYPE>({
    title: "",
    description: "",
    image: undefined,
    location: "",
    category: "",
  });


  const changeHandler = (
    key: keyof InputStateTYPE,
    input: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> 
  ) => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [key]: input.target.value,
      };
    });
  };

  const categoryChangeHandler = (event: SelectChangeEvent) => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        ["category"]: event.target.value as string,
      };
    });
  };

  const changeImghandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files?.[0];
    if (files) {
      setInputValue((prevState) => {
        return {
          ...prevState,
          ["image"]: files,
        };
      });
    }
  };


  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.checkValidity());
  }

  return (
    <Paper sx={{ padding: "20px", borderRadius: "12px" }}>
      <Typography
        component={"h2"}
        sx={{ fontSize: "20px", margin: "0px 0 30px 0" }}
      >
        Update your heritage
      </Typography>
      <Stack rowGap={3} component={'form'} onSubmit={submitHandler}>
        <TextField
          id="outlined-basic"
          label="Heritage Title:"
          variant="outlined"
          name="title"
          value={inputValue.title}
          onChange={(e) => changeHandler("title", e)}
          fullWidth
        />
        <TextField
          label="Short Description (optional): "
          multiline
          rows={5}
          margin="normal"
          name="description"
          value={inputValue.description}
          onChange={(e) => changeHandler("description", e)}
          fullWidth
          sx={{ margin: "0px" }}
        />

        <TextField
          id="outlined-basic"
          label="Location:"
          variant="outlined"
          name="location"
          value={inputValue.location}
          onChange={(e) => changeHandler("location", e)}
          fullWidth
        />

        {/* category  */}
        <FormControl fullWidth>
          <InputLabel>Select Category</InputLabel>

          <Select
            value={inputValue.category}
            name="category"
            onChange={categoryChangeHandler}
          >
            {categoryOptions.map((catItem, index) => (
              <MenuItem key={index} value={catItem.trim().replaceAll(" ", "_")}>
                {catItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* heritage img file  */}
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          size="large"
          sx={{
            padding: "15px 0px",
            color: "#676767",
            borderColor: "#c4c4c4",
            "&:hover": { borderColor: "#212121" },
          }}
        >
          { inputValue.image ? `Selected File: ${inputValue.image.name}` : 'Upload Image' }
          <VisuallyHiddenInput
            type="file"
            onChange={changeImghandler}
          />
        </Button>

        <Divider />

        {/* submit button  */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ padding: "15px", fontSize: "18px" }}
        >
          Submit
        </Button>
      </Stack>
    </Paper>
  );
};

export default NewHeritagePage;
