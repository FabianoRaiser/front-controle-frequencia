import { Close, Save } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
  ChangeEvent,
  ReactElement,
  Ref,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import {
  fecthUnidades,
  fetchPostInserirProf,
} from "api/ProfessorData.ts";
import {
  ProfessorInserirData,
  UnidadesPromise,
} from "types/FetchData";

const Transition = forwardRef(function Trasition(
  props: TransitionProps & {
    children: ReactElement<unknown, string | JSX.ElementType>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ProfessorInserirProps {
  open: boolean;
  handleClose: (
    event: unknown,
    reason: "backdropClick" | "escapeKeyDown" | "submit"
  ) => void;
}

// config select UE
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ProfessorInserir({
  open,
  handleClose,
}: ProfessorInserirProps) {
  const [listaUnidades, setListaUnidades] = useState<
    UnidadesPromise[] | undefined
  >([]);

  const [professorInfo, setProfessorInfo] = useState<ProfessorInserirData>({
    nome: "",
    matricula: 0,
    email: "",
    regime: "",
    dataAdmissao: dayjs(new Date()),
    unidadesCheck: [],
    situacao: "",
    horasSemanais: "",
    cpf: "",
  });

  const handleChangeInfo = (
    field: keyof ProfessorInserirData,
    value: unknown
  ) => {
    setProfessorInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUnidadesChange = (
    event: SelectChangeEvent<typeof professorInfo.unidadesCheck>
  ) => {
    const {
      target: { value },
    } = event;
    handleChangeInfo(
      "unidadesCheck",
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    const fetchListaUnidades = async () => {
      const fetchLista = await fecthUnidades();
      if (!fetchLista) {
        console.error("Erro ao buscar unidades");
      } else {
        setListaUnidades(fetchLista);
      }
    };

    fetchListaUnidades();
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="insert-professor"
      maxWidth="md"
      scroll="body"
    >
      <DialogTitle sx={{ m: 0 }}>Inserir Novo Professor</DialogTitle>
      <DialogContent dividers>
        {/* Nome */}
        <TextField
          required
          value={professorInfo.nome}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeInfo("nome", event.target.value);
          }}
          label="Nome do Professor"
          sx={{ mr: 1, mb: 2 }}
          size="small"
        />
        {/* Matricula */}
        <TextField
          required
          value={professorInfo.matricula}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeInfo("matricula", Number(event.target.value));
          }}
          label="Matricula"
          sx={{ mr: 1, width: 100 }}
          size="small"
        />
        {/* Email */}
        <TextField
          required
          value={professorInfo.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeInfo("email", event.target.value);
          }}
          label="Email do Professor"
          sx={{ mr: 1, width: 295 }}
          size="small"
        />
        {/* Regime de trabalho */}
        <TextField
          required
          value={professorInfo.regime}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeInfo("regime", event.target.value);
          }}
          select
          label="Regime de Trabalho"
          defaultValue={"contrato"}
          sx={{ mr: 1, width: 165 }}
          size="small"
        >
          <MenuItem key={0} value={"contrato"}>
            Contrato
          </MenuItem>
          <MenuItem key={1} value={"efetivo"}>
            Efetivo
          </MenuItem>
          <MenuItem key={2} value={"estagiario"}>
            Estagiário
          </MenuItem>
        </TextField>
        {/* Data de admissão */}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DatePicker
            label="Data Admissão"
            defaultValue={dayjs(new Date())}
            value={dayjs(professorInfo.dataAdmissao)}
            onChange={(newValue) => handleChangeInfo("dataAdmissao", newValue)}
            sx={{ mr: 1, mb: 2 }}
            slotProps={{
              textField: { size: "small" },
            }}
          />
        </LocalizationProvider>
        {/* Unidade de Ensino */}
        <FormControl sx={{ mr: 1, width: 300 }} size="small" required>
          <InputLabel id="select-ue-label">Unidade de Ensino</InputLabel>
          <Select
            labelId="select-ue-label"
            id="select-multiple-checkbox"
            multiple
            value={professorInfo.unidadesCheck}
            onChange={handleUnidadesChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {listaUnidades !== undefined ? (
              listaUnidades.map((unidade) => (
                <MenuItem key={unidade.id} value={unidade.nome}>
                  <Checkbox
                    checked={professorInfo.unidadesCheck.includes(unidade.nome)}
                  />
                  <ListItemText primary={unidade.nome} />
                </MenuItem>
              ))
            ) : (
              <>Erro ao carregar unidades</>
            )}
          </Select>
        </FormControl>
        {/* Situação */}
        <TextField
          required
          value={professorInfo.situacao}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeInfo("situacao", event.target.value);
          }}
          label="Situação"
          sx={{ mr: 1, width: 230 }}
          size="small"
        />
        {/* Horas semanais */}
        <TextField
          required
          value={professorInfo.horasSemanais}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeInfo("horasSemanais", event.target.value);
          }}
          select
          label="Horas semanais"
          defaultValue={"contrato"}
          sx={{ mr: 1, width: 165 }}
          size="small"
        >
          <MenuItem key={0} value={"20hrs"}>
            20 Horas
          </MenuItem>
          <MenuItem key={1} value={"40hrs"}>
            40 Horas
          </MenuItem>
        </TextField>
        {/* CPF */}
        <TextField
          required
          value={professorInfo.cpf}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeInfo("cpf", event.target.value);
          }}
          label="CPF do professor"
          sx={{ mr: 1, width: 230 }}
          size="small"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" startIcon={<Close />}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => {
            fetchPostInserirProf(professorInfo);
            handleClose(event, "submit");
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
