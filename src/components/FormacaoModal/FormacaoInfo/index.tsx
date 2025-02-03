import { TextField } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { FormacaoCompleta } from "types/Formacoes";

interface FormacaoInfoProps {
  formacaoData: FormacaoCompleta | null;
}

export default function FormacaoInfo({ formacaoData }: FormacaoInfoProps) {
  if (formacaoData === null) {
    return <>Não há dados da turma</>;
  }
  return (
    <>
      <TextField
        variant="standard"
        defaultValue={formacaoData.formacao_id}
        label="ID"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "10%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={formacaoData.nome_formacao}
        label="Nome"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "25%", marginRight: "8px", marginBottom: "8px" }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DateField
          variant="standard"
          value={dayjs(formacaoData.data)}
          label="Data"
          sx={{ width: "10%", marginRight: "8px", marginBottom: "8px" }}
        />
      </LocalizationProvider>
      <TextField
        variant="standard"
        defaultValue={formacaoData.carga_horaria}
        label="Horas"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "10%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={formacaoData.local}
        label="Local"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "20%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={formacaoData.modalidade?.toLocaleUpperCase()}
        label="Modalidade"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "20%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={formacaoData.periodo?.toLocaleUpperCase()}
        label="Periodo"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "20%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={formacaoData.descricao}
        label="Descrição"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "36.5%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={formacaoData.turmas.nome_turma}
        label="Turma"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "20%", marginRight: "8px", marginBottom: "8px" }}
      />
      <TextField
        variant="standard"
        defaultValue={formacaoData.turmas.etapa}
        label="Etapa"
        slotProps={{ input: { readOnly: true } }}
        sx={{ width: "20%", marginRight: "8px", marginBottom: "8px" }}
      />
    </>
  );
}
