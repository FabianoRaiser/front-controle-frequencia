const apiUrl = import.meta.env.VITE_API_URL;

export const fetchTurmas = async () => {
  try {
    const response = await fetch(`${apiUrl}/turmas`, {
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
      console.error("Error ao buscar dados:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      console.error("Erro desconhecido", error);
    }
  }
};

export const fetchTurmaById = async (turmaId: string | number | null) => {
  try {
    const response = await fetch(
      `${apiUrl}/turmas/${turmaId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao buscar dados da turma ${turmaId}`, {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      console.error("Erro desconhecido", error);
    }
  }
};
