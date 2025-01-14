import { Teacher } from "types/Teacher";
import { ProfessorInserirData, UnidadesPromise } from "../types/FetchData";

const apiUrl = import.meta.env.VITE_API_URL;

export const fecthUnidades = async (): Promise<
  UnidadesPromise[] | undefined
> => {
  try {
    const response = await fetch(`${apiUrl}/unidade-ensino`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar dados: ", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      console.error("Error desconhecido", error);
    }
  }
};

export const fetchProfessores = async (): Promise<Teacher[] | undefined> => {
  try {
    const response = await fetch(`${apiUrl}/professores`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok){
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if(error instanceof Error){
    console.error("Erro ao buscar dados: ", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
  } else {
    console.error("Erro desconhecido", error);
  }
  }
};

export const fetchPostInserirProf = async (
  professorData: ProfessorInserirData
) => {
  try {
    const response = await fetch(`${apiUrl}/professores/novo-professor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome_professor: professorData.nome,
        matricula: professorData.matricula,
        email: professorData.email,
        regime_trabalho: professorData.regime,
        data_admissao: professorData.dataAdmissao,
        unidade_ensino: professorData.unidadesCheck,
        situacao: professorData.situacao,
        horas_semanais: professorData.horasSemanais,
        cpf: professorData.cpf,
      }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`Error ao inserir professor: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao inserir professor: ", {
        error,
      });
      throw error;
    } else {
      console.error("Erro desconhecido: ", error);
    }
  }
};
