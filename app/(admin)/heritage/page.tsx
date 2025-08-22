"use client";

import React, { useEffect, useState } from "react";
import HeritageCard from "@/components/admin/heritage/HeritageCard";
import { Button, Grid, Paper } from "@mui/material";
import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { FeedbackSnackbarTYPE, HeritageDataTYPE } from "@/types/AllTypes";
import { db } from "@/firebase/firebaseConfig";
import DeleteConfirmationDialog from "@/components/feedback/DeleteConfirmationDialog";
import FeedbackSnackbar from "@/components/feedback/FeedbackSnackbar";
import HeritageEditModal from "@/components/admin/heritage/HeritageEditModal";
import HeritagePageSkeleton from "@/components/skeleton/HeritagePageSkeleton";
import { UserContext } from "@/contexts/UserContext";
import NoHeritageFound from "@/components/noHeritageFound";
import { deleteFromCloudinary } from "@/utils/cloudinaryAssistFunction";

type HeritageViewState = "all" | "my";

const AllHeritage = () => {
  const [heritageDocumentSnapshort, setHeritageDocumentSnapshort] = useState<
    HeritageDataTYPE[] | null
  >(null);
  const [heritageList, setHeritageList] = useState<
    HeritageDataTYPE[] | undefined
  >(undefined);
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
  const [heritageViewState, setHeritageViewState] =
    useState<HeritageViewState>("my");
  const currentUser = React.useContext(UserContext);

  useEffect(() => {
    const fetchHeritageDocs = async () => {
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

          setHeritageDocumentSnapshort(documentList);
        }

        setLoading(false);
      } catch (error) {
        console.error("something went wrong", error);
      }
    };

    fetchHeritageDocs();
  }, []);

  // heritage list state updater
  useEffect(() => {
    if (currentUser && heritageDocumentSnapshort) {
      if (heritageViewState === "my") {
        const myHeritageList = heritageDocumentSnapshort?.filter(
          (item) => item.userId === currentUser?.userId
        );
        setHeritageList(myHeritageList);
      } else {
        setHeritageList(heritageDocumentSnapshort);
      }
    }
  }, [heritageViewState, currentUser, heritageDocumentSnapshort]);

  const showEditHeritageHandler = (id: string) => {
    setShowEdit(true);
    setSelectedHeritage(id);
  };

  const confirmBeforeDeleteHandler = (id: string) => {
    setDeleteConfirmationOpen(true);
    setSelectedHeritage(id);
  };

  const deleteHeritageHandler = async () => {
    if (selectedHeritage && deleteConfirmationOpen) {
      setDeleteConfirmationOpen(false); // hide the confirm box

      // start database operation
      const document = doc(db, "heritages", selectedHeritage);

      // test image delete function
      let selectedHeritageData = heritageList?.find(
        (item) => item.id === selectedHeritage
      );

      // delete image from cloudinary
      if (!selectedHeritageData?.imgPublicId) return;

      try {
        const imgDeleteRes = await deleteFromCloudinary(
          selectedHeritageData?.imgPublicId
        );

        if (imgDeleteRes.success) {
          // delete record from firebase
          await deleteDoc(document);

          setSelectedHeritage(null);
          // delete from local state
          setHeritageList((prevState) => {
            return prevState?.filter((item) => item.id !== selectedHeritage);
          });

          setDeleteFeedback({
            open: true,
            title: "Heritage deleted successfully",
            alertType: "success",
          });
        } else {
          setDeleteFeedback({
            open: true,
            title: imgDeleteRes.error || "Failed to delete heritage image",
            alertType: "error",
          });
        }
      } catch (error) {
        console.error("Error removing document: ", error);
        setDeleteFeedback({
          open: true,
          title: "Error deleting heritage",
          alertType: "error",
        });
      }
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
      {currentUser?.isAdmin && (
        <Paper
          sx={{
            width: "100%",
            borderRadius: "4px",
            marginBottom: "25px",
            padding: "15px",
          }}
          elevation={1}
        >
          <Button
            variant={heritageViewState === "my" ? "contained" : "outlined"}
            sx={{ marginRight: "15px" }}
            onClick={() => setHeritageViewState("my")}
          >
            My Heritages
          </Button>
          <Button
            variant={heritageViewState === "all" ? "contained" : "outlined"}
            onClick={() => setHeritageViewState("all")}
          >
            All Heritages
          </Button>
        </Paper>
      )}

      {/* <HeritagePageSkeleton /> */}
      {loading ? (
        <HeritagePageSkeleton />
      ) : heritageList?.length === 0 ? (
        <NoHeritageFound />
      ) : (
        <Grid container spacing={3}>
          {heritageList?.map((heritage) => {
            return (
              <Grid
                key={heritage.id}
                size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
              >
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
        heritageData={heritageList?.find(
          (item) => item.id === selectedHeritage
        )}
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
