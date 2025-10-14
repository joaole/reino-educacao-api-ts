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
    const novoCliente = clienteService.create(req.body);
    res.status(201).json(novoCliente);
}

export const atualizarCliente = (req: Request, res: Response) => {
     const id = parseInt(req.params.id!, 10);
    if (!id) {
        return res.status(400).json({ message: 'ID do cliente não fornecido' });
    }
   const clienteAtualizado = clienteService.update(id, req.body);
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
  const { quantidade } = req.body;

  if (typeof quantidade !== 'number' || quantidade <= 0) {
    return res.status(400).json({ message: 'Quantidade de milhas inválida.' });
  }
  
  const cliente = clienteService.getById(id);
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }

  cliente.adicionarMilhas(quantidade);
  
  res.json(cliente);
};