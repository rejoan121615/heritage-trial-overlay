import z from "zod";

export const categoryOptions = [
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


export const HeritageSchema = z.object({
  title: z.string().nonempty("Title is required."),
  summary: z.string().nonempty("Summary is required."),
  location: z.string().nonempty("Location is required."),
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




