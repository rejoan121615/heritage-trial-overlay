"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UserTable from "@/components/admin/UserTable";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { UserTYPE } from "@/types/AllTypes";
import UserSkeleton from "@/components/feedback/UserSkeleton";

const UserListPage = () => {
  const [userList, setUserList] = useState<UserTYPE[] | null>(null);

  // fetch user from db
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userQuery = query(collection(db, "users"));

        const userDocSnapshort = await getDocs(userQuery);

        if (!userDocSnapshort.empty) {
          const userList = userDocSnapshort.docs.map((doc) => {
            return {
              userId: doc.id,
              ...doc.data(),
            } as UserTYPE;
          });

          setUserList(userList);
        } else {
          setUserList([]);
        }
      } catch (error) {
        console.log("getting user failed ", error);
      }
    };

    fetchUsers();
  }, []);

  // handler user actions
  const userStatusHandler = async (
    userId: string,
    action: UserTYPE["status"]
  ) => {
    setUserList((prevState) => {
      const updatedUserState = prevState?.map((user) => {
        if (user.userId === userId) {
          return {
            ...user,
            status: action,
          } as UserTYPE;
        } else {
          return user;
        }
      });

      if (updatedUserState) return updatedUserState;

      return prevState;
    });

    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, { status: action });
    } catch (error) {
      console.log("something went wrong ", error);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        User List:
      </Typography>

      {userList === null ? (
        <UserSkeleton />
      ) : (
        <UserTable userList={userList} onUserStatusChange={userStatusHandler} />
      )}
    </>
  );
};

export default UserListPage;
