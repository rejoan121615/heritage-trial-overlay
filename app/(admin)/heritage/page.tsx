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
import HeritageEditModal from "@/components/admin/heritage/HeritageEditModal";
import HeritagePageSkeleton from "@/components/skeleton/HeritagePageSkeleton";

const AllHeritage = () => {
  const [heritageList, setHeritageList] = useState<HeritageDataTYPE[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [selectedHeritage, setSelectedHeritage] = useState<string | null>(null);
  const [deleteFeedback, setDeleteFeedback] = useState<FeedbackSnackbarTYPE>({
    open: false,
    title: "",
    alertType: "success",
  });
  const [showEdit, setShowEdit] = useState<boolean>(false);







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

  const showEditHeritageHandler = (id: string) => {
    setShowEdit(true);
    setSelectedHeritage(id);
  };

  const confirmBeforeDeleteHandler = (id: string) => {
    setDeleteConfirmationOpen(true);
    setSelectedHeritage(id);
  };

  const deleteHeritageHandler = () => {
    if (selectedHeritage && deleteConfirmationOpen) {
      setDeleteConfirmationOpen(false); // hide the confirm box 

      // start database operation 
      const document = doc(db, "heritages", selectedHeritage);

      deleteDoc(document)
        .then(() => {
          setSelectedHeritage(null);
          setHeritageList((prevState) => {
            return prevState?.filter((item) => item.id !== selectedHeritage);
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
        <HeritagePageSkeleton />
      ) : (
        <Grid container spacing={3}>
          {heritageList?.map((heritage) => {
            return (
              <Grid key={heritage.id} size={{ xl: 3 }}>
                <HeritageCard
                  data={heritage}
                  showEditForm={showEditHeritageHandler}
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

      <HeritageEditModal
        open={showEdit}
        close={() => setShowEdit(false)}
        heritageData={heritageList?.find(item => item.id === selectedHeritage)}
        setHeritageList={setHeritageList}
      />

      {/* feedback after completing operation  */}
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
