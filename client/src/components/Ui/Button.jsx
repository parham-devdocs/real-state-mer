import { Button } from '@mui/material'
import React from 'react'
const Btn = ({type,size,variant,children,...props}) => {
  return (
      <Button variant={variant} size={size} type={type} {...props}>{children}</Button>
  )
}

export default Btn
