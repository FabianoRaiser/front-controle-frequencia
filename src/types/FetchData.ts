import { Dayjs } from "dayjs";

export interface UnidadesPromise {
  id: number;
  created_at: string;
  nome: string;
}

export interface ProfessorInserirData {
    nome: string;
    matricula: number;
    email: string;
    regime: string;
    dataAdmissao: Dayjs | null;
    unidadesCheck: string[];
    situacao: string;
    horasSemanais: string;
    cpf: string;
}
