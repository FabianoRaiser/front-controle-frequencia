import { Box, Divider } from '@mui/material'
import TurmasLista from 'components/TurmasLista'
import TurmasFilter from 'components/TurmasFilter'
import TurmasTools from 'components/TurmasTools'


function OrdersPage() {
  return (
    <>
      <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
        <TurmasFilter />
        <TurmasTools />   
      </Box>
      <Divider />
      <TurmasLista />
    </>
  )
}

export default OrdersPage