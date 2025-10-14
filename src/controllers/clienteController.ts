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

import { atualizarClienteSchema, clienteSchema } from '../utils/clienteValidator';

export const adicionarCliente = (req: Request, res: Response) => {
    const result = clienteSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ erros: result.error.flatten().fieldErrors });
    }

    const novoCliente = clienteService.create(result.data);

    if ('erro' in novoCliente) {
        return res.status(409).json(novoCliente);
    }

    res.status(201).json(novoCliente);
}

export const atualizarCliente = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!, 10);
    if (!id) {
        return res.status(400).json({ message: 'ID do cliente não fornecido' });
    }

    const result = atualizarClienteSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ erros: result.error.flatten().fieldErrors });
    }

    const clienteAtualizado = clienteService.update(id, result.data);

    if (clienteAtualizado && 'erro' in clienteAtualizado) {
        return res.status(409).json(clienteAtualizado);
    }

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