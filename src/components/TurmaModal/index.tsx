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
import { forwardRef, ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { ReactElement } from "react";
import { Ref } from "react";
import { Edit } from "@mui/icons-material";
import { fetchTurmaById } from "api/TurmaData";
import { TurmaCompleta } from "types/Turmas";
import TurmaInfo from "./TurmaInfo";
import TurmaFormacoes from "./TurmaFormacoes";
import TurmaProfessores from "./TurmaProfessores";

interface TurmaModalProps {
  open: boolean;
  turmaId: string | number | null;
  handleClose: (
    event: unknown,
    reason: "backdropClick" | "escapeKeyDown"
  ) => void;
}

function allyProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: ReactNode,
    index: number;
    value: number;
}

function CustomTabPanel( props: TabPanelProps) {
    const { children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
            >
                {value === index && <Box sx={{ p: 3}}>{children}</Box>}
        </div>
    );
}

const Transition = forwardRef(function Trasition(
  props: TransitionProps & {
    children: ReactElement<unknown, string | JSX.ElementType>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TurmaModal({ open, handleClose, turmaId }: TurmaModalProps) {
  const [turmaData, setTurmaData] = useState<TurmaCompleta | null>(null);
  const [valueTab, setValueTab] = useState(0);

  const handleChangeTab = (_event: SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
        setTurmaData(null)
        const result = await fetchTurmaById(turmaId);
        setTurmaData(result);
    }

    if(open) {
        fetchData();
    }
  }, [open, turmaId])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="lg"
      scroll="body"
    >
      <DialogTitle sx={{ m: 0 }}>Turma Modal {turmaId}</DialogTitle>
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
        <TurmaInfo turmaData={turmaData} />
      </DialogContent>
      <DialogContent dividers>
        <Tabs
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="basic tabs"
        >
            <Tab label="Formações" {...allyProps(0)} />
            <Tab label="Professores" {...allyProps(1)} />
        </Tabs>
        <CustomTabPanel value={valueTab} index={0}>
            {turmaData && <TurmaFormacoes formacoes={turmaData?.formacoes} />}
        </CustomTabPanel>
        <CustomTabPanel value={valueTab} index={1}>
            {turmaData && <TurmaProfessores listaProfessores={turmaData?.alocacoes} />}
        </CustomTabPanel>
      </DialogContent>
    </Dialog>
  );
}

export default TurmaModal;
