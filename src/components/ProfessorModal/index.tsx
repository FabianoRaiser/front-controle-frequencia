import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Tab,
  Tabs,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import ProfessorInfo from "./ProfessorInfo";
import ProfessorPresencas from "./ProfessorPresencas";
import ProfessorTurmas from "./ProfessorTurmas";
import { TeacherComplete } from "../../types/Teacher";

const Transition = forwardRef(function Trasition(
  props: TransitionProps & {
    children: ReactElement<unknown, string | JSX.ElementType>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ProfessorModalProps {
  open: boolean;
  handleClose: (
    event: unknown,
    reason: "backdropClick" | "escapeKeyDown"
  ) => void;
  teacherId: string | number | null;
}

function allyProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProfessorModal({
  open,
  handleClose,
  teacherId,
}: ProfessorModalProps) {
  //mudar para a requisição da api
  const [professorData, setProfessorData] = useState<TeacherComplete | null >(null); 
  const [valueTab, setValueTab] = useState(0);
  const url = `${apiUrl}/professores/${teacherId}`;

  const handleChangeTab = (_event: SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setProfessorData(null);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const result = await response.json();
        setProfessorData(result);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Erro ao buscar dados: ", {
            message: error.message,
            name: error.name,
            stack: error.stack
          });
        } else {
          console.error("Error desconhecido", error);
        }
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, teacherId, url]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth='lg'
      scroll="body"
    >
      <DialogTitle sx={{ m: 0 }}>Professor Modal {teacherId}</DialogTitle>
      <Button
        variant="contained"
        startIcon={<Edit />}
        sx={() => ({
          position: "absolute",
          right: 16,
          top: 16,
        })}
      >
        Editar
      </Button>
      <DialogContent dividers>
        <ProfessorInfo professorData={professorData} />
      </DialogContent>
      <DialogContent dividers>
        <Tabs
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="basic tabs"
        >
          <Tab label="Presenças" {...allyProps(0)} />
          <Tab label="Turmas" {...allyProps(1)} />
        </Tabs>
        <CustomTabPanel value={valueTab} index={0}>
          {professorData && <ProfessorPresencas presencas={professorData.presencas}/>}
        </CustomTabPanel>
        <CustomTabPanel value={valueTab} index={1}>
          {professorData && <ProfessorTurmas alocacoes={professorData.alocacoes}/>}
        </CustomTabPanel>
      </DialogContent>
    </Dialog>
  );
}
