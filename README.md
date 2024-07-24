# Formulário de Cadastro e Validação

Este projeto é um formulário de cadastro que inclui validação para campos como nome, e-mail, celular e endereço.\
A aplicação utiliza Bootstrap para o estilo, e o código JavaScript gerencia a validação dos campos e a busca de endereço usando o CEP.

## Tecnologias Usadas

HTML5: Estruturação do conteúdo da página.\
CSS3: Estilização da página com Bootstrap.\
JavaScript: Validação dos campos de entrada e interação com a API de CEP.\
Bootstrap: Framework de CSS para design responsivo e estilização.

## Estrutura do Projeto

index.html: Arquivo principal HTML com a estrutura do formulário e inclusão de scripts e estilos.\
css/styles.css: Arquivo CSS para estilização personalizada (se necessário).\
js/scripts.js: Arquivo JavaScript contendo a lógica de validação e manipulação de eventos.

## Funcionalidades

### Validação de Campos

Nome: O campo de nome permite apenas letras e espaços, bloqueando outros caracteres.\
Celular: O campo de celular formata o número no padrão (XX) XXXXX-XXXX e valida se está no formato correto.\
E-mail: Valida se o e-mail está no formato padrão example@example.com.\
CEP: Valida se o CEP tem 8 dígitos e busca automaticamente o endereço correspondente através da API ViaCEP.

###Interações

Botão Fechar: Fecha a mensagem exibida após uma ação (por exemplo, erro ou sucesso).\
Loader: Exibe um indicador de carregamento enquanto busca o endereço ou processa o formulário.\
Mensagens de Feedback: Exibe mensagens de erro ou sucesso dependendo da ação realizada.
