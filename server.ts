import app from "./app";
import dotenv from "dotenv";
import { swaggerDefinition } from "./swagger";

dotenv.config();

const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';


app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDefinition);
});




app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando em: ${isProd ? 'https://barbearia-backend-six.vercel.app' : `http://localhost:${PORT}`}`);
  console.log(`📚 Documentação disponível em: ${isProd ? 'https://barbearia-backend-six.vercel.app/api-docs' : `http://localhost:${PORT}/api-docs`}`);
});
