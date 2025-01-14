import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";

function TurmasFilter() {
  return (
    <Box
      sx={{
        paddingBottom: "8px",
        display: "flex",
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDown />}
          aria-controls="filters-content"
          id="filters-turmas"
        >
          <Typography>Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField label="Etapa" variant="outlined" size="small" />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default TurmasFilter;
