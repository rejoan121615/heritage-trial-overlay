"use client";

import React, { useEffect, useState } from "react";
import HeritageCard from "@/components/admin/heritage/HeritageCard";
import { Grid } from "@mui/material";
import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { FeedbackSnackbarTYPE, HeritageDataTYPE } from "@/types/AllTypes";
import { db } from "@/firebase/firebaseConfig";
import LoadingPage from "@/components/feedback/LoadingPage";
import DeleteConfirmationDialog from "@/components/feedback/DeleteConfirmationDialog";
import FeedbackSnackbar from "@/components/feedback/FeedbackSnackbar";

const AllHeritage = () => {
  const [heritageList, setHeritageList] = useState<HeritageDataTYPE[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [heritageToDelete, setHeritageToDelete] = useState<string | null>(null);
  const [deleteFeedback, setDeleteFeedback] = useState<FeedbackSnackbarTYPE>({
    open: false,
    title: "",
    alertType: "success",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "heritages"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const documentList = querySnapshot.docs.map((queryItem) => {
            return {
              id: queryItem.id,
              ...queryItem.data(),
            } as HeritageDataTYPE;
          });

          setHeritageList(documentList);
        }

        setLoading(false);
      } catch (error) {
        console.error("something went wrong", error);
      }
    };

    fetchPosts();
  }, []);

  const editHeritageHandler = (id: string) => {
    console.log("Edit heritage with id:", id);
  };

  const confirmBeforeDeleteHandler = (id: string) => {
    setDeleteConfirmationOpen(true);
    setHeritageToDelete(id);
  };

  const deleteHeritageHandler = () => {
    if (heritageToDelete && deleteConfirmationOpen) {
      setDeleteConfirmationOpen(false); // hide the confirm box 

      // start database operation 
      const document = doc(db, "heritages", heritageToDelete);

      deleteDoc(document)
        .then(() => {
          setHeritageToDelete(null);
          setHeritageList((prevState) => {
            return prevState?.filter((item) => item.id !== heritageToDelete);
          });

          setDeleteFeedback({
            open: true,
            title: "Heritage deleted successfully",
            alertType: "success",
          });
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          setDeleteFeedback({
            open: true,
            title: "Error deleting heritage",
            alertType: "error",
          });
        });

    }
  };

  const closeSnackbar = () => {
    setDeleteFeedback((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Grid container spacing={3}>
          {heritageList?.map((heritage) => {
            return (
              <Grid key={heritage.id} size={{ xl: 3 }}>
                <HeritageCard
                  data={heritage}
                  edit={editHeritageHandler}
                  delete={confirmBeforeDeleteHandler}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      {/* delete confirmation dialog  */}
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onDelete={deleteHeritageHandler}
      />

      <FeedbackSnackbar
        open={deleteFeedback?.open}
        title={deleteFeedback?.title}
        alertType={deleteFeedback?.alertType}
        setOpen={closeSnackbar}
      />
    </>
  );
};

export default AllHeritage;
