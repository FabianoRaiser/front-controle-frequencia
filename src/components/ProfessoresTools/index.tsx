import { PersonAdd } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import ProfessorInserir from "./ProfessorInserir";

function ProfessoresTools() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const showInsertModal = () => {
    setOpen(true)
  }

  return (
    <Box>
        <Button variant="contained" startIcon={<PersonAdd />} onClick={showInsertModal}>
            Inserir
        </Button>
        <ProfessorInserir open={open} handleClose={handleClose} />
    </Box>
  )
}

export default ProfessoresTools;