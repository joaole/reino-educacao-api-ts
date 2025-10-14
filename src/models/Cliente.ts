type CartaoTipo = "Gold" | "Platinum" | "Black" | "Infinite";

interface ClienteProps {
    id: number;
    nome: string;
    email: string;
    cartao: CartaoTipo;
    saldo_milhas: number;
    destino_desejado: string;
}

export class Cliente {
    id: number;
    nome: string
    email: string;
    cartao: CartaoTipo
    saldo_milhas: number;
    destino_desejado: string;

    constructor(props: ClienteProps) {
        this.id = props.id;
        this.nome = props.nome;
        this.email = props.email;
        this.cartao = props.cartao;
        this.saldo_milhas = props.saldo_milhas;
        this.destino_desejado = props.destino_desejado;
    }

    public adicionarMilhas(quantidade: number): void {
        if (quantidade <= 0) {
            throw new Error("A quantidade de milhas a ser adicionada deve ser maior que zero.");
        }
        this.saldo_milhas = this.saldo_milhas + quantidade;
    }

    public retirarMilhas(quantidade: number): boolean {
        if (quantidade <= 0) {
            throw new Error("A quantidade de milhas a ser retirada deve ser maior que zero.");
        }
        if (this.saldo_milhas < quantidade) {
            return false;
        }
        this.saldo_milhas = this.saldo_milhas - quantidade;
        return true;
    }

    public atualizarDados(dados: Partial<Omit<ClienteProps, 'id'>>): void {
        Object.assign(this, dados);
    }
}