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


app.get("/api-docs", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Documentação da API</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          SwaggerUIBundle({
            url: "/swagger.json",
            dom_id: "#swagger-ui"
          });
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando em: ${isProd ? 'https://barbearia-backend-six.vercel.app' : `http://localhost:${PORT}`}`);
  console.log(`📚 Documentação disponível em: ${isProd ? 'https://barbearia-backend-six.vercel.app/api-docs' : `http://localhost:${PORT}/api-docs`}`);
});
