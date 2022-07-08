import { firestore } from "firebase";

export interface Job{
    title: string;
    salary: number;
    createdAt: firestore.FieldValue;
    updatedAt: firestore.FieldValue;
}