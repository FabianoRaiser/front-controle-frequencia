import { Edit } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, Slide, Tab, Tabs } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { fetchFormacaosById } from "api/FormacoesData";
import { forwardRef, ReactElement, ReactNode, Ref, SyntheticEvent, useEffect, useState } from "react";
import { FormacaoCompleta } from "types/Formacoes";
import FormacaoInfo from "./FormacaoInfo";
import FormacaoPresencas from "./FormacaoPresencas";

const Transition = forwardRef(function Trasition(
    props: TransitionProps & {
      children: ReactElement<unknown, string | JSX.ElementType>;
    },
    ref: Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

interface FormacaoModalProps {
  open: boolean;
  handleClose: (
    event: unknown,
    reason: "backdropClick" | "escapeKeyDown"
  ) => void;
  formacaoId: string | number | null;
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
        {value === index && <Box sx={{ p: 3}}>{children}</Box>}
    </div>
  );
}

export default function FormacaoModal({
  open,
  handleClose,
  formacaoId,
}: FormacaoModalProps) {

    const [formacaoData, setFormacaoData] = useState<FormacaoCompleta | null>(null);
    const [valueTab, setValueTab] = useState<number>(0);

    const handleChangeTab = (_event: SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            setFormacaoData(null);
            const result = await fetchFormacaosById(formacaoId);
            setFormacaoData(result);
        }

        if(open) {
            fetchData();
        }
    }, [open, formacaoId])

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
                <DialogTitle sx={{m: 0}}>Formação Modal {formacaoId}</DialogTitle>
                <Button variant='contained' startIcon={<Edit />} sx={() => ({ position: "absolute", right: 16, top: 16})} >Editar</Button>
                <DialogContent dividers>
                    <FormacaoInfo formacaoData={formacaoData} />
                </DialogContent>
                <DialogContent dividers>
                    <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs" >
                        <Tab label="Presenças" {...allyProps(0)} />
                    </Tabs>
                    <CustomTabPanel value={valueTab} index={0}>
                        {formacaoData && <FormacaoPresencas presentes={formacaoData.presencas} />}
                    </CustomTabPanel>
                </DialogContent>
            </Dialog>
    )
}
