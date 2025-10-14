# Reino Educação - API de Clientes

Esta é a API de Clientes do projeto de avaliação técnica da Reino Educação. A API é responsável por gerenciar os clientes, seus saldos de milhas e outras informações relevantes.

## Tecnologias Utilizadas

Para o desenvolvimento desta API, foram escolhidas as seguintes tecnologias:

- **Node.js**: Um ambiente de execução JavaScript server-side que permite a construção de aplicações de rede escaláveis. A escolha pelo Node.js se deu por sua alta performance em operações de I/O não bloqueante, o que o torna ideal para APIs que lidam com um grande número de requisições simultâneas.
- **Express**: Um framework web minimalista e flexível para Node.js, que fornece um conjunto robusto de recursos para aplicações web e mobile. O Express foi escolhido por sua simplicidade e por ser um dos frameworks mais populares e bem documentados do ecossistema Node.js.
- **TypeScript**: Um superset do JavaScript que adiciona tipagem estática opcional ao código. O TypeScript foi utilizado para aumentar a robustez e a manutenibilidade da aplicação, permitindo a detecção de erros em tempo de compilação e melhorando a autocompletação e a navegação no código.
- **Zod**: Uma biblioteca de validação de esquemas para TypeScript. O Zod foi escolhido por sua integração com o TypeScript, que permite a inferência de tipos a partir dos esquemas de validação, garantindo que os dados que entram na aplicação estejam sempre no formato esperado.

## Design do Projeto e Trade-offs

O projeto foi estruturado de forma a separar as responsabilidades em diferentes camadas:

- **Controllers**: Responsáveis por receber as requisições HTTP, chamar os serviços apropriados e retornar as respostas.
- **Services**: Contêm a lógica de negócio da aplicação.
- **Models**: Representam as entidades de dados da aplicação.
- **Routes**: Mapeiam as rotas da API para os controllers correspondentes.
- **Utils**: Contêm funções utilitárias, como a de validação.

Esta arquitetura, inspirada no padrão Model-View-Controller (MVC), promove a organização e a reutilização de código. No entanto, para uma aplicação de pequeno porte como esta, pode parecer um pouco exagerada. O trade-off aqui foi optar por uma arquitetura mais robusta e escalável, mesmo que isso signifique um pouco mais de boilerplate no início.

## Implementações

Durante o desenvolvimento, foram implementadas as seguintes funcionalidades:

- **CRUD de Clientes**: Criação, leitura, atualização e remoção de clientes.
- **Adição de Milhas**: Funcionalidade para adicionar milhas ao saldo de um cliente.
- **Validação de Dados**: Validação dos dados de entrada para garantir a integridade dos dados.
- **Tratamento de Erros**: Tratamento de erros para retornar mensagens claras e úteis para o cliente da API.
- **Verificação de E-mail Único**: Verificação para garantir que cada cliente tenha um e-mail único.

## Rotas da API

- `GET /clientes`: Retorna uma lista de todos os clientes.
- `GET /clientes/:id`: Retorna um cliente específico com base no ID.
- `POST /clientes`: Cria um novo cliente. Espera um corpo de requisição com os seguintes campos:
    - `nome` (string, obrigatório)
    - `email` (string, obrigatório, único)
    - `cartao` (string, obrigatório, um de: "Gold", "Platinum", "Black", "Infinite")
    - `saldo_milhas` (number, obrigatório)
    - `destino_desejado` (string, obrigatório)
- `PUT /clientes/:id`: Atualiza um cliente existente. Espera um corpo de requisição com os mesmos campos do `POST`.
- `DELETE /clientes/:id`: Remove um cliente existente.
- `POST /clientes/:id/adicionar-milhas`: Adiciona milhas a um cliente existente. Espera um corpo de requisição com o seguinte campo:
    - `quantidade` (number, obrigatório)
- `POST /clientes/:id/retirar-milhas`: Retira milhas de um cliente existente. Espera um corpo de requisição com o seguinte campo:
    - `quantidade` (number, obrigatório)

## Instalação e Configuração

Para instalar e rodar o projeto localmente, siga os seguintes passos:

1.  **Clone o repositório**:

    ```bash
    git clone https://github.com/seu-usuario/reino-educacao-api-ts.git
    ```

2.  **Instale as dependências**:

    ```bash
    cd reino-educacao-api-ts
    npm install
    ```

3.  **Rode o servidor de desenvolvimento**:

    ```bash
    npm run dev
    ```

O servidor estará rodando em `http://localhost:3000`.
