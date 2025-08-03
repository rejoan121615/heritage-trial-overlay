import React from 'react'
import HeritageCard from '@/components/admin/heritage/HeritageCard'
import { HeritageListData } from './AllHeritage-data';
import { Grid } from '@mui/material'

const AllHeritage = () => {
  return (
   <Grid container spacing={3} >
    {
      HeritageListData.map((heritageItem, index) => {
        return (
          <Grid key={heritageItem.id} size={{ xl: 3}}>
            <HeritageCard data={heritageItem} />
          </Grid>
        )
      })
    }
   </Grid>
  )
}

export default AllHeritage