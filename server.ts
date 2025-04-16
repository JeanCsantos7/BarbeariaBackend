import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import swaggerUi from "swagger-ui-express";
import { swaggerDefinition } from "./swagger";

const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando em: ${isProd ? 'https://barbearia-backend-six.vercel.app' : `http://localhost:${PORT}`}`);
  console.log(`📚 Documentação disponível em: ${isProd ? 'https://barbearia-backend-six.vercel.app/api-docs' : `http://localhost:${PORT}/api-docs`}`);
});
