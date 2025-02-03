import { Formacao } from "types/Formacoes";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchFormacoes = async (): Promise<Formacao[] | undefined> => {
  try {
    const response = await fetch(`${apiUrl}/formacoes`, {
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
      console.error("Erro desconhecido", error);
    }
  }
};

export const fetchFormacaosById = async (formacaoId: number | string | null) => {
  try {
    const response = await fetch(`${apiUrl}/formacoes/${formacaoId}`, {
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
      console.error(`Erro ao buscar dados da turma ${formacaoId}`, {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      console.error("Erro desconhecido", error);
    }
  }
};
