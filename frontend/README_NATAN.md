# INTRODUÇÃO

O projeto do desafio para vaga de desenvolvedor consiste em uma aplicação web que permite o upload de arquivos do tipo txt apra usuarios autenticados. O usuario poderá se autenticar pelo login social do google.

Ao acessar a plataforma, caso o usuário não tenha submetido nenhum arquivo ao sistema, aparecerá apenas um botão para upload. Caso o usuário já tenha inserido informações no banco de dados, uma tabela é apresentada. A tabela traz uma listagem dos resgitros de transações cadastrados por esse usaurio, sendo possivel filtrar os dados pelo nome do empreendimento. O usuário pode usar o botão "upload" presente tambem na tabela para inserir mais transações ou pode conferir os saldos dos estabelecimentos listados clicando no botão "saldo" na parte superior da tabela.

Ao clicar em alguma linha da tabela, a informação daquele registro seŕa printada na tela por meio de um modal, onde pode ser conferido a natureza, o tipo, a descrição e outros dados daquela transação.

# SETUP

A aplicação é constituida pelo ReactJS no frontend, e o NodeJS (Express Server) para a criação da api. Existe tambem o diretório testes que traz os testes automatizados feitos com Cypress.

Você pode rodar o projeto usando docker com o seguinte comando:
    1. 
    2. 
    3. 

Ou pode tambem usá-lo sem o docker. Para isso segue um passo a passo do que vede ser feito:
    1. Clonar o projeto do github com git clone ...
    2. Acessar o diretório frontend.
    3. Dentro /frontend rodar o comando npm run setup no seu terminal. Esse comando instala as dependencias necessárias para o projeto e inicializa a aplicação frontend.
    4. Acessar o diretório api.
    5. Preencha o .env seguindo o exemplo do arquivo .env.sample, ambos na raiz do projeto.
    6. Dentro /api rodar o comando npm run setup no seu terminal. Esse comando instala as dependencias necessárias para o projeto, insere as migrações no banco de dados e inicializa a aplicação backend.
    7. Acesse http://localhost:<PORT> e use a aplicação.
    8. Após o setup caso precise inciar a aplicação novamente use npm start para o front e npm run start para o backend.

    obs: será necessario a criação de um banco de dados local Postgres.
    obs: caso a autenticação via google falhe, limpe o cache do seu navegador.