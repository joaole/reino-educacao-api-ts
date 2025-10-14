import type { Request, Response } from 'express';
import { clienteService } from '../services/clienteService';

export const listarClientes = (req: Request, res: Response) => {
    const clientes = clienteService.getAll();
    res.json(clientes);
};

export const obterClientePorId = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!, 10);
    if (!id) {
        return res.status(400).json({ message: 'ID do cliente não fornecido' });
    }
    const cliente = clienteService.getById(id);
    if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(cliente);
}

export const adicionarCliente = (req: Request, res: Response) => {
    const { saldo_milhas, ...rest } = req.body;
    const novoCliente = clienteService.create({
        ...rest,
        saldo_milhas: parseInt(saldo_milhas, 10)
    });
    res.status(201).json(novoCliente);
}

export const atualizarCliente = (req: Request, res: Response) => {
     const id = parseInt(req.params.id!, 10);
    if (!id) {
        return res.status(400).json({ message: 'ID do cliente não fornecido' });
    }
   const { saldo_milhas, ...rest } = req.body;
   const clienteAtualizado = clienteService.update(id, {
        ...rest,
        saldo_milhas: parseInt(saldo_milhas, 10)
   });
    if (!clienteAtualizado) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(clienteAtualizado);
};

export const removerCliente = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!, 10);
    if (!id) {
        return res.status(400).json({ message: 'ID do cliente não fornecido' });
    }
    const sucesso = clienteService.delete(id);
    if (!sucesso) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(204).send();
};

export const adicionarMilhas = (req: Request, res: Response) => {
   const id = parseInt(req.params.id!, 10);
    if (!id) {
        return res.status(400).json({ message: 'ID do cliente não fornecido' });
    }
  const quantidade  = parseInt(req.body.quantidade, 10);

  if (isNaN(quantidade) || quantidade <= 0) {
    return res.status(400).json({ message: 'Quantidade de milhas inválida.' });
  }
  
  const cliente = clienteService.getById(id);
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }

  cliente.adicionarMilhas(quantidade);
  
  res.json(cliente);
};