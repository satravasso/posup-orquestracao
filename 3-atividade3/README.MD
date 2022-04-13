# node-express

Projeto estruturado para aula do módulo Node.js da Universidade Positivo.

Alunos: Sabrina Travasso Ferreira <https://github.com/SabrinaTravasso> & Rafael Otávio Giro <https://github.com/RafaelGiro>

### Requisitos

#### Requisitos Funcionais

Foi escolhido o tema de geração de pedidos de restaurantes, com 3 serviços REST. Categoria, menu e pedido. Onde é registrado a categoria de um item de menu, por exemplo: bebida, lanche, doces... Menu onde é registrado cada item de um menu, contendo categoria_id que referencia a categoria que o item pertence e o pedido que é feito em um json armazenado as informações de um item de menu com o horário inicio do pedido e quando ele foi finalizado.

As demais funcionalidades, pizza, product e user foram funcionalidades realizadas durante a aula.

#### Tecnicos

Realizar a criação de uma aplicação Node.js que contemple os seguintes itens: - 3 Funcionalidades (crud) - 1 Funcionalidade avançada (Exemplo: gerar um pedido, reservar um carro etc) - Ter a separação de rotas - Separar a aplicação em módulos e defender a escolha - Utilizar o banco de dados mysql - Fazer a manipulação de erros e responder com o http status correto

### Instalação

1. Instalar node.js versão 12 ou superior [aqui](https://nodejs.org/en/)
2. Opcional: instalar yarn [aqui](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
3. Cria uma branch no gitHub a partir da [master](https://github.com/SabrinaTravasso/node-express)
4. Clone o projeto criado na sua máquina. Instale o git [aqui](https://git-scm.com/downloads)
5. Configure o ambiente

#### Configurando ambiente

**Com yarn**
`yarn install`

**Com npm**
`npm i`

### Bando de dados

- **Criando os bancos de dados na sua máquina local**
  `yarn prisma:push`

- **com npm**
  `npm prisma:push`

- **É necessário configurar um .env local para a configuração do banco**
  `Foi deixado um arquivo no projeto env.exemplo com o exemplo de configuração do arquivo para mais informações: https://www.prisma.io/docs/guides/development-environment/environment-variables`

### Desenvolvendo

- **Para ambiente de dev utilizar**
  `yarn dev ou npm dev`
