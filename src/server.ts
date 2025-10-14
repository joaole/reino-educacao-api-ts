import * as express from 'express';
import clienteRoutes from './routes/clienteRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir que o Express entenda JSON no corpo das requisições
app.use(express.json());

// Define um prefixo para todas as rotas de clientes
app.use('/api', clienteRoutes);

// Rota raiz simples para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('API de Milhas da Reino Educação está no ar!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});