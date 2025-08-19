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
} from "@mui/material";
import { UserTYPE } from "@/types/AllTypes";

const UserListPage = ({ userList }: { userList: UserTYPE[] | null }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Total Heritage</TableCell>
            <TableCell>Account Created</TableCell>
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
              <TableCell>
                {user.status === "pending" ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: "10px" }}
                    >
                      Approve
                    </Button>
                    <Button variant="contained" color="error">
                      Reject
                    </Button>
                  </>
                ) : user.status === "active" ? (
                  <Button variant="contained" color="error">
                    Block
                  </Button>
                ) : (
                  <Button variant="contained" color="error">
                    Active
                  </Button>
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
