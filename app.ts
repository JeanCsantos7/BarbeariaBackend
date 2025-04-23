import express from 'express';
import cors from 'cors';
import Routes from './routes';
import { swaggerDefinition } from './swagger';  
import swaggerUi from 'swagger-ui-express';  

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition)); 

app.get("/", (req, res) => {
  res.send('Bem-vindo à Rota principal');
});

app.use(Routes);

export default app;
