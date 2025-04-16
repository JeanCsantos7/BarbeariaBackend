import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "API de agendamento de horários barbearia",
      description:
        "API pra realizar agendamento de horários, escolha de serviços e autenticação com base em regras de permissão.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://barbearia-backend-six.vercel.app/",
      },
    ],
  },
  apis: ["./routes/*.ts"], 
};

const swaggerDefinition = swaggerJSDoc(options);

export { swaggerDefinition };
