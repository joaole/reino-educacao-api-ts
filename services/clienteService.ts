import { Cliente } from "../models/Cliente";

type CriarClienteProps = Omit<ConstructorParameters<typeof Cliente>[0], 'id'>;

type AtualizarClienteProps = Partial<CriarClienteProps>;

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

    getAll(): Cliente[] {
        return this.clientes;
    }

    getById(id: string): Cliente | undefined {
        return this.clientes.find(c => c.id === id);
    }

    create(data: CriarClienteProps): Cliente {
        const novoCliente = new Cliente({
            id: this.proximoId.toString(),
            ...data,
        });
        this.clientes.push(novoCliente);
        this.proximoId++;
        return novoCliente;
    }

    update(id: string, data: AtualizarClienteProps): Cliente | null {
        const cliente = this.getById(id);
        if (!cliente) {
            return null;
        }
        cliente.atualizarDados(data);
        return cliente;
    }

    delete(id: string): boolean {
        const index = this.clientes.findIndex(c => c.id === id);
        if (index === -1) {
            return false;
        }
        this.clientes.splice(index, 1);
        return true;
    }
}

export const clienteService = ClienteService.getInstance();