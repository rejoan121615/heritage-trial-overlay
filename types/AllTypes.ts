import { Timestamp } from 'firebase/firestore'



export type HeritageDataTYPE = {
    id: string;
    title: string;
    description: string;
    location: string;
    category: string;
    image: string;
    userId: string;
    createdAt: Timestamp;
}