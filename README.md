# Controle de Jornada de Trabalho (Backend) - Projeto para seleção Proveu

* Objetivo: 

Fazer a contabilidade de uma jornada de trabalho recebidos pelo frontend, onde o usuário informa um nome, uma data de entrada, um horário de entrada, uma data de saída e um horário de saída. 

* Lógica: 

O código executa 4 casos diferentes: O usuário que trabalha no período diurno (entre 5h e 22h), o usuário que trabalha no perído noturno (entre 22h e 5h), o usuário que entra em um período diurno e sai em um periodo noturno (entre 5h de uma data e depois de 5h da data seguinte) e o usuário que entra no período noturno e sai em um período diurno ( entre 22h e depois das 5h do dia seguinte)

* Linguagem:

O código está escrito em typescript, usando a lib Express.js para criar um server e permitir a criação de um endpoint que recebe a requição do frontend e devolve as informações necessárias.

* Como rodar?

Para rodar é necessário estar com o repositório clonado em sua máquina e ter o node.js instalado. Após clonar o repositório, acessar a pasta raiz do backend com o terminal e dar o comando "npm install" para instalar as dependencias necessárias. Após isso é só rodar o comando "npm run dev" que o servidor começa rodar automaticamente e já está pronto para receber e responder as requisições que chegarem.