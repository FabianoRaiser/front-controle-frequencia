import { Box, Divider } from "@mui/material";
import { FormacoesFilter } from "components/FormacoesFilter";
import { FormacoesLista } from "components/FormacoesLista";
import { FormacoesTools } from "components/FormacoesTools";

function FormacoesPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormacoesFilter />
        <FormacoesTools />
      </Box>
      <Divider />
      <FormacoesLista />
    </>
  );
}

export default FormacoesPage;
