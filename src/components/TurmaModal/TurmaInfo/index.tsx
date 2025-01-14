import { TextField } from "@mui/material";
import { TurmaCompleta } from "types/Turmas";

interface TurmaInfoProps {
  turmaData: TurmaCompleta | null;
}

export default function TurmaInfo({ turmaData }: TurmaInfoProps) {
  if (turmaData === null) {
    return <>Não há dados da turma</>;
  }

  return (
    <>
      <TextField
        variant="standard"
        defaultValue={turmaData.turma_id}
        label="ID"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "10%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={turmaData.nome_turma}
        label="Nome"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "30%", marginRight: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={turmaData.etapa}
        label="Etapa"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "10%", marginRight: "8px" }}
      />
    </>
  );
}
