import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export const FormacoesTools = () => {
  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<Add />}
        // onClick={}
      >
        Inserir
      </Button>
    </Box>
  );
};
