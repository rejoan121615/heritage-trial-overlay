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