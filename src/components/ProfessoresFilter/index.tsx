import { ArrowDropDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, TextField, Typography } from "@mui/material";

function ProfessoresFilter() {
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
          id="filters-professores"
        >
          <Typography>Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Unidade de Ensino"
            variant="outlined"
            size="small"
          />
          <TextField label="Turma" variant="outlined" size="small" />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ProfessoresFilter;
