"use client";

import React, { useEffect, useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Chip,
} from "@mui/material";
import { UserTYPE } from "@/types/AllTypes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";

const UserListPage = ({
  userList,
  onUserStatusChange,
}: {
  userList: UserTYPE[] | null;
  onUserStatusChange: (userId: string, action: UserTYPE["status"]) => void;
}) => {
  const [currentUser] = useAuthState(auth);

  useEffect(() => {
    console.log("current user ", currentUser);
  }, [currentUser]);

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Total Heritage</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList?.map((user) => (
            <TableRow
              key={user.userId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.totalHeritage}</TableCell>
              <TableCell>
                {user.createdAt.toDate().toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ textTransform: "capitalize" }}>
                {user.status}
              </TableCell>
              <TableCell>
                {currentUser?.uid === user.userId ? (
                  <Chip label="Your Data" color="secondary"  />
                ) : (
                  <>
                    {user.status === "pending" ? (
                      <>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ marginRight: "10px" }}
                          onClick={() =>
                            onUserStatusChange(user.userId, "active")
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() =>
                            onUserStatusChange(user.userId, "block")
                          }
                        >
                          Reject
                        </Button>
                      </>
                    ) : user.status === "active" ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => onUserStatusChange(user.userId, "block")}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() =>
                          onUserStatusChange(user.userId, "active")
                        }
                      >
                        Activate
                      </Button>
                    )}
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListPage;
