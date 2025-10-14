import type { Request, Response } from 'express';
import { clienteService } from '../services/clienteService';
import { z } from 'zod';
import { atualizarClienteSchema, clienteSchema } from '../utils/clienteValidator';

export const listarClientes = (req: Request, res: Response) => {
  const clientes = clienteService.getAll();
  res.json(clientes);
};

export const obterClientePorId = (req: Request, res: Response) => {
  const id = parseInt(req.params.id!, 10);
  if (!id) return res.status(400).json({ message: 'ID do cliente não fornecido' });

  const cliente = clienteService.getById(id);
  if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });

  res.json(cliente);
};

export const adicionarCliente = (req: Request, res: Response) => {
  const result = clienteSchema.safeParse(req.body);
  if (!result.success) {
    const treeified = z.treeifyError(result.error);
    return res.status(400).json({ erros: treeified });
  }

  const novoCliente = clienteService.create(result.data);
  if ('erro' in novoCliente) return res.status(409).json(novoCliente);

  res.status(201).json(novoCliente);
};

export const atualizarCliente = (req: Request, res: Response) => {
  const id = parseInt(req.params.id!, 10);
  if (!id) return res.status(400).json({ message: 'ID do cliente não fornecido' });

  const result = atualizarClienteSchema.safeParse(req.body);
  if (!result.success) {
    const treeified = z.treeifyError(result.error);
    return res.status(400).json({ erros: treeified });
  }

  const data = Object.fromEntries(
    Object.entries(result.data).filter(([_, v]) => v !== undefined)
  );

  const clienteAtualizado = clienteService.update(id, data);
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
  if (!id) return res.status(400).json({ message: 'ID do cliente não fornecido' });

  const sucesso = clienteService.delete(id);
  if (!sucesso) return res.status(404).json({ message: 'Cliente não encontrado' });

  res.status(204).send();
};

export const adicionarMilhas = (req: Request, res: Response) => {
  const id = parseInt(req.params.id!, 10);
  if (!id) return res.status(400).json({ message: 'ID do cliente não fornecido' });

  const quantidade = parseInt(req.body.quantidade, 10);
  if (isNaN(quantidade) || quantidade <= 0) {
    return res.status(400).json({ message: 'Quantidade de milhas inválida.' });
  }

  const cliente = clienteService.getById(id);
  if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });

  cliente.adicionarMilhas(quantidade);
  
  res.json(cliente);
};
