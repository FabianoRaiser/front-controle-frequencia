export interface Turma {
  turma_id: number;
  nome_turma: string;
  etapa: string | null;
}

export interface TurmaCompleta extends Turma {
  created_at: string;
  created_by: {
    nome: string;
  };
  modified_at: string | null;
  modified_by: {
    nome: string;
  } | null;
  formacoes: Formacao[];
  alocacoes: Alocacao[];
}

export interface Formacao {
  data: string;
  formacao_id: number;
  carga_horaria: number;
  nome_formacao: string;
}

export interface Alocacao {
    id: number;
    ativa: boolean;
    data_inicio: string;
    data_final: string | null;
    professores: {
        matricula: number;
        nome_professor: string;
    }
}
