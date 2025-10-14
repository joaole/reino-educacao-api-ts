import { Router } from 'express';
import * as clienteController from '../controllers/clienteController';

const router = Router();
router.get('/', (req, res) => {
    res.send('API de Milhas da Reino Educação está no ar!');
    });
router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/:id', clienteController.obterClientePorId);
router.post('/clientes', clienteController.adicionarCliente);
router.put('/clientes/:id', clienteController.atualizarCliente);
router.delete('/clientes/:id', clienteController.removerCliente);

router.post('/clientes/:id/adicionar-milhas', clienteController.adicionarMilhas);

export default router;