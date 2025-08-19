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
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { UserTYPE } from "@/types/AllTypes";
import UserSkeleton from "@/components/feedback/UserSkeleton";

const UserListPage = () => {
  const [userList, setUserList] = useState<UserTYPE[] | null>(null);

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

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        User List:
      </Typography>

      {userList === null ? <UserSkeleton /> : <UserTable userList={userList} />}
    </>
  );
};

export default UserListPage;
