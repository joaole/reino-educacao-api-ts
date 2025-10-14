import { z } from 'zod';

const CartaoTipoSchema = z.enum(["Gold", "Platinum", "Black", "Infinite"]);

export const clienteSchema = z.object({
  nome: z.string().min(1, { message: 'O nome é obrigatório.' }),
  email: z.string().min(1,{ message: 'O email deve ter um formato válido.' }),
  cartao: CartaoTipoSchema,
  saldo_milhas: z.number().min(0, { message: 'O saldo de milhas deve ser um número não negativo.' }),
  destino_desejado: z.string().min(1, { message: 'O destino desejado é obrigatório.' }),
});

export const atualizarClienteSchema = clienteSchema.partial();

export type ClienteSchema = z.infer<typeof clienteSchema>;
export type AtualizarClienteSchema = z.infer<typeof atualizarClienteSchema>;
