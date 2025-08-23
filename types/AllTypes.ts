import { Timestamp } from 'firebase/firestore'


export type HeritageDataTYPE = {
    id: string;
    title: string;
    summary: string;
    location: string;
    category: string;
    image: string;
    imgPublicId: string;
    userId: string;
    createdAt: Timestamp;
}

export type CameraContextTYPE = {
  heritageData: HeritageDataTYPE | null;
};

export type FeedbackSnackbarTYPE = {
  open: boolean;
  title: string;
  alertType: "success" | "error" | "warning" | "info" ;
};

export type UserTYPE = {
  userId: string;
  name: string;
  email: string;
  image: string;
  imgPublicId: string;
  totalHeritage: number;
  status: "pending" | "block" | "active";
  isAdmin: boolean;
  createdAt: Timestamp;
}

export type CloudinaryUploadResponseTYPE = {
  success: boolean;
  imageUrl: string | null;
  publicId: string | null;
  error?: string;
};

export type CloudinaryDeleteResponseTYPE = {
  success: boolean
  error?: string
}