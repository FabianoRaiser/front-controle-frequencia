import { GroupAdd } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
// import { useState } from "react";

function TurmasTools() {
    // const [open, setOpen] = useState(false);

    // const handleClose = () => {
    //   setOpen(false);
    // }
  
    // const showInsertModal = () => {
    //   setOpen(true)
    // }
  
    return (
      <Box>
          <Button variant="contained" startIcon={<GroupAdd />}>
              Inserir
          </Button>
      </Box>
    )
}

export default TurmasTools;