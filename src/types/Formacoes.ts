export interface Formacao {
  formacao_id: number;
  nome_formacao: string;
  carga_horaria: number;
  data: string;
  local: string;
  modalidade: string | null;
  periodo: string | null;
}

export interface FormacaoCompleta extends Formacao {
  created_at: string;
  modified_at: string | null;
  created_by: { nome: string } | null;
  modified_by: { nome: string } | null;
  turmas: { nome_turma: string; etapa: string | null };
  descricao: string;
  presencas: PresencasFormacao[];
}

export interface PresencasFormacao {
  created_at: string;
  presenca_id: number;
  professores: {
    matricula: number;
    nome_professor: string;
  }
}
