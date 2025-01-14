import { Box, Divider } from "@mui/material";
import ProfessoresFilter from "../components/ProfessoresFilter";
import ProfessoresTools from "../components/ProfessoresTools";
import ProfessoresLista from "../components/ProfessoresLista";

function ProfessoresPage() {
  return (
    <>
      <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
        <ProfessoresFilter />
        <ProfessoresTools />
      </Box>
      <Divider />
      <ProfessoresLista />
    </>
  );
}

export default ProfessoresPage;
