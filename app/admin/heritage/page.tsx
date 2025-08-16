"use client";

import React, { useEffect, useState } from "react";
import HeritageCard from "@/components/admin/heritage/HeritageCard";
import { HeritageListData } from "./AllHeritage-data";
import { Grid } from "@mui/material";
import { collection, query, getDocs } from "firebase/firestore";
import { HeritageDataTYPE } from "@/types/AllTypes";
import { db } from "@/firebase/firebaseConfig";
import LoadingPage from "@/components/feedback/LoadingPage";

const AllHeritage = () => {
  const [heritageList, setHeritageList] = useState<HeritageDataTYPE[]>();
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Grid container spacing={3}>
          {heritageList?.map((heritage) => {
            return (
              <Grid key={heritage.id} size={{ xl: 3 }}>
                <HeritageCard data={heritage} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default AllHeritage;
