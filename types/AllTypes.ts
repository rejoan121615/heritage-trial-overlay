import { Timestamp } from 'firebase/firestore'


export type HeritageDataTYPE = {
    id: string;
    title: string;
    summary: string;
    location: string;
    category: string;
    image: string;
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
  totalHeritage: number;
  status: "pending" | "block" | "active";
  isAdmin: boolean;
  createdAt: Timestamp;
}