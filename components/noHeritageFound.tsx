import React from 'react'
import { Box, Typography } from '@mui/material'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Button from '@mui/material/Button';
import Link from 'next/link';

const noHeritageFound = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column wrap', justifyContent: 'center', alignItems: 'center' }}>
      <PriorityHighIcon color="action" sx={{ fontSize: 100 }} />
      <Typography>No Heritage Found</Typography>
      <Link href="/heritage/new">
        <Button variant="outlined" sx={{ marginTop: '15px'}}>Create your first Heritage</Button>
      </Link>
    </Box>
  )
}

export default noHeritageFound