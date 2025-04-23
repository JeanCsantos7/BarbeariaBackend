import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "API de agendamento de horários barbearia",
      description:
        "API para realizar agendamento de horários, escolha de serviços e autenticação com base em regras de permissão.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Servidor local para desenvolvimento",
      },
    ],
    paths: {
      "/registrarClientes": {
        post: {
          summary: "Realiza o Cadastro da conta de um novo cliente.",
          tags: ["Clientes"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["nome", "email", "senha"],
                  properties: {
                    nome: { type: "string", description: "Nome completo do cliente" },
                    email: { type: "string", description: "Endereço de e-mail do cliente" },
                    senha: { type: "string", description: "Senha do cliente" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Cliente cadastrado com sucesso" },
            400: { description: "Erro na validação ou dados faltando" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/loginClientes": {
        post: {
          summary: "Realiza o Login do cliente.",
          tags: ["Clientes"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "senha"],
                  properties: {
                    email: { type: "string" },
                    senha: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Cliente logado com sucesso" },
            400: { description: "Email ou senha incorretos" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/admin/barbeiros": {
        post: {
          summary: "Login de um barbeiro com perfil admin.",
          tags: ["Admin"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "senha"],
                  properties: {
                    email: { type: "string" },
                    senha: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Barbeiro logado com sucesso" },
            400: { description: "Email ou senha incorretos" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/registrarHorarios": {
        post: {
          summary: "Criação de horários disponíveis por barbeiros.",
          tags: ["Horarios"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["id", "data", "horario", "barbeiro"],
                  properties: {
                    id: { type: "integer" },
                    data: { type: "string", format: "date" },
                    horario: { type: "string", format: "time" },
                    barbeiro: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Data e horário cadastrados com sucesso" },
            400: { description: "Erro de dados ou dados inválidos" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/agendamentoRealizado": {
        post: {
          summary: "Cliente realiza agendamento com barbeiro.",
          tags: ["Horarios"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["id", "data", "horario", "barbeiro"],
                  properties: {
                    id: { type: "integer" },
                    data: { type: "string", format: "date" },
                    horario: { type: "string", format: "time" },
                    barbeiro: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Agendamento realizado com sucesso" },
            400: { description: "Erro de dados ou dados inválidos" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/agendamentoBarbeiro/{barbeiro}": {
        get: {
          summary: "Consulta os horários disponíveis de um barbeiro.",
          tags: ["Agendamento"],
          parameters: [
            {
              in: "path",
              name: "barbeiro",
              required: true,
              schema: {
                type: "string",
                example: "Duh",
              },
              description: "Nome do barbeiro",
            },
          ],
          responses: {
            200: { description: "Sucesso ao consultar horários" },
            400: { description: "Erro na consulta" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/Clientes": {
        get: {
          summary: "Lista todos os clientes cadastrados.",
          tags: ["Clientes"],
          responses: {
            200: { description: "Sucesso ao consultar clientes" },
            400: { description: "Erro na consulta" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/horariosClientes/{nome}": {
        get: {
          summary: "Consulta horários agendados por um cliente.",
          tags: ["Horarios"],
          parameters: [
            {
              in: "path",
              name: "nome",
              required: true,
              schema: { type: "string" },
              description: "Nome do cliente",
            },
          ],
          responses: {
            200: { description: "Sucesso ao consultar horários" },
            400: { description: "Erro na consulta" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/listaHorarios/{barbeiro}": {
        get: {
          summary: "Lista horários disponíveis de um barbeiro.",
          tags: ["Horarios"],
          parameters: [
            {
              in: "path",
              name: "barbeiro",
              required: true,
              schema: { type: "string" },
              description: "Nome do barbeiro",
            },
          ],
          responses: {
            200: { description: "Sucesso ao consultar horários" },
            400: { description: "Erro na consulta" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/editarHorarios/{id}": {
        put: {
          summary: "Edita data/horário a partir do ID.",
          tags: ["Horarios"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["id"],
                  properties: {
                    id: { type: "integer" },
                  },
                },
              },
            },
          },
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID do horário",
            },
          ],
          responses: {
            200: { description: "Sucesso ao editar horários" },
            400: { description: "Erro na edição" },
            500: { description: "Erro no servidor" },
          },
        },
      },
      "/deletarHorarios/{id}": {
        delete: {
          summary: "Deleta horário pelo ID.",
          tags: ["Horarios"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID do horário a ser deletado",
            },
          ],
          responses: {
            200: { description: "Sucesso ao deletar horários" },
            400: { description: "Erro na exclusão" },
            500: { description: "Erro no servidor" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.ts"],
};

const swaggerDefinition = swaggerJSDoc(options);

export { swaggerDefinition };
