import { Turmas } from "./Turmas";

export interface Teacher {
  nome_professor: string;
  matricula: number;
  email: string;
  data_admissao: string;
  unidade_ensino: string;
}

export interface TeacherComplete extends Teacher {
  regime_trabalho: string;
  horas_semanais: string;
  horas_cumpridas: number | null;
  created_at: string;
  created_by: string;
  modified_at: string | null;
  modified_by: string | null;
  presencas: Presenca[] | null;
  alocacoes: Alocacao[] | null;
}

export interface Alocacao {
  id: number;
  ativa: boolean;
  data_final: string | null;
  data_inicio: string;
  turmas: Turmas;

}

export interface Presenca {
  formacoes: {
    data: string;
    turmas: {
      etapa: string;
      nome_turma: string;
    },
    periodo: string;
    modalidade: string;
    carga_horaria: number;
    nome_formacao: string;
  },
  presenca_id: number
}