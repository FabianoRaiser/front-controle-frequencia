import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export const FormacoesFilter = () => {
    const [dataFormacao, setDataFormacao] = useState<Dayjs>()

  return (
    <Box
      sx={{
        paddingBottom: "8px",
        display: "flex",
        maxWidth: '50%'
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
          <TextField label="Turma" variant="outlined" size="small" />
          <TextField
            label="Periodo"
            variant="outlined"
            size="small"
            sx={{ ml: 1, mb: 2 }}
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <DatePicker
              label="Data da Formação"
              defaultValue={dayjs(new Date())}
              value={dataFormacao}
              onChange={(newValue) => setDataFormacao(newValue ? newValue : undefined)}
              sx={{ mr: 1, mb: 2 }}
              slotProps={{
                textField: { size: "small" },
              }}
            />
          </LocalizationProvider>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
