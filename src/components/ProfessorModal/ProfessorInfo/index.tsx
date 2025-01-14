import { TextField } from "@mui/material";
import { TeacherComplete } from "../../../types/Teacher";

interface ProfessorInfoProps {
    professorData: TeacherComplete | null;
}

export default function ProfessorInfo({ professorData }: ProfessorInfoProps) {

  if ( professorData === null) {
    return <>Não há dados do professor</>
  }

  return (
    <>
      <TextField
        variant="standard"
        defaultValue={professorData.matricula}
        label="Matricula"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "10%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={professorData.nome_professor}
        label="Nome"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "30%", marginRight: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={professorData.email}
        label="Email"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "30%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={professorData.horas_semanais}
        label="Horas semanais"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "10%", marginRight: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={professorData.regime_trabalho.toUpperCase()}
        label="Regime"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "15%", marginRight: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={professorData.unidade_ensino}
        label="Unidade de Ensino"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "50%", marginRight: "8px", marginBottom: "8px" }}
      />
    </>
  );
}
