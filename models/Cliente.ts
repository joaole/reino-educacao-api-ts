type CartaoTipo = "Gold" | "Platinum" | "Black" | "Infinite";

interface ClienteProps {
    id: string;
    nome: string;
    email: string;
    cartao: CartaoTipo;
    saldo_milhas: number;
    destino_desejado: string;
}

export class Cliente {
    id: string;
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
        this.saldo_milhas += quantidade;
    }

    public atualizarDados(dados: Partial<Omit<ClienteProps, 'id'>>): void {
        Object.assign(this, dados);
    }
}