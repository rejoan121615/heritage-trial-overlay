import React from 'react'
import { Skeleton, Stack } from '@mui/material'


const UserSkeleton = () => {
  return (
    <Stack gap={1}>
      <Skeleton variant="rounded" width="100%" height={56} sx={{ borderBottomLeftRadius: '0', borderBottomRightRadius: '0'}} />
      <Skeleton variant="rectangular" width="100%" height={70} />
      <Skeleton variant="rectangular" width="100%" height={70} />
      <Skeleton variant="rounded" width="100%" height={70} sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0'}} />
    </Stack>
  )
}

export default UserSkeleton