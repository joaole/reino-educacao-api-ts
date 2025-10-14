import { Cliente } from "../models/Cliente";
import type { ClienteSchema } from "../utils/clienteValidator";

type CriarClienteProps = Omit<ConstructorParameters<typeof Cliente>[0], 'id'>;

type AtualizarClienteProps = Partial<ClienteSchema>;

class ClienteService {
    private static instance: ClienteService;
    private clientes: Cliente[] = [];
    private proximoId: number = 1;

    private constructor() {}

    public static getInstance(): ClienteService {
        if (!ClienteService.instance) {
            ClienteService.instance = new ClienteService();
        }
        return ClienteService.instance;
    }

    getAll(): Cliente[] | string {
        if (this.clientes.length === 0) {
            return "Nenhum cliente cadastrado ainda.";
        }
        return this.clientes;
    }

    getById(id: number): Cliente | undefined {
        return this.clientes.find(c => c.id === id);
    }

    getByEmail(email: string): Cliente | undefined {
        return this.clientes.find(c => c.email === email);
    }

    create(data: CriarClienteProps): Cliente | { erro: string } {
        if (this.getByEmail(data.email)) {
            return { erro: 'Este e-mail já está em uso.' };
        }

        const novoCliente = new Cliente({
            id: this.proximoId,
            ...data,
        });
        this.clientes.push(novoCliente);
        this.proximoId++;
        return novoCliente;
    }

    update(id: number, data: AtualizarClienteProps): Cliente | null | { erro: string } {
        const cliente = this.getById(id);
        if (!cliente) {
            return null;
        }

        if (data.email && data.email !== cliente.email) {
            const emailExistente = this.getByEmail(data.email);
            if (emailExistente && emailExistente.id !== id) {
                return { erro: 'Este e-mail já está em uso.' };
            }
        }

        cliente.atualizarDados(data);
        return cliente;
    }

    delete(id: number): boolean {
        const index = this.clientes.findIndex(c => c.id === id);
        if (index === -1) {
            return false;
        }
        this.clientes.splice(index, 1);
        return true;
    }
}

export const clienteService = ClienteService.getInstance();