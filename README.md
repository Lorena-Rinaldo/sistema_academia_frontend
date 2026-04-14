# IRON GYM | Check-in

## Visão geral

`IRON GYM | Check-in` é um protótipo de terminal de check-in para academias. A interface simula um terminal de autoatendimento onde o aluno informa seu CPF por meio de um teclado numérico virtual.

O projeto é focado em front-end, com destaque para design, usabilidade e apresentação de dados em tempo real.

## Autoras

- Isabelly Ferreira - https://github.com/isabelly-lima05
- Lorena Rinaldo - https://github.com/Lorena-Rinaldo

## Objetivo

O objetivo principal é demonstrar a construção de uma interface de acesso de alunos com formatação de CPF, botões de teclado numérico e atualização dinâmica de data e hora. É ideal como protótipo ou base para futuras integrações com backend.

## Funcionalidades

- Campo visual de CPF com formatação automática em tempo real.
- Teclado numérico virtual para entrada de dados.
- Botão `AC` para limpar todo o campo.
- Botão para apagar o último dígito digitado.
- Exibição de data e hora atualizadas a cada segundo.
- Layout escuro com estilo premium e tipografia customizada.
- Feedback visual claro para ações de botão.

## Tecnologias utilizadas

- HTML5
- CSS com Tailwind CSS via CDN (`@tailwindcss/browser@4`)
- JavaScript puro

## Arquivos do projeto

- `index.html`
  - Estrutura do layout, botões e o script JavaScript embutido.
  - Contém a lógica de formatação do CPF, controles do teclado virtual e atualização de data/hora.
- `script.js`
  - Arquivo presente no projeto, mas atualmente não contém código ativo.
- `wireframe.excalidraw`
  - Arquivo de wireframe com o planejamento visual da interface.

## Como executar

### Requisitos

- Navegador moderno com JavaScript habilitado.

### Passos

1. Abra o arquivo `index.html` no navegador.
2. Digite o CPF utilizando o teclado numérico exibido na tela.
3. Use o botão `AC` para limpar o campo.
4. Use o botão de apagar para remover o último dígito.
5. Clique em `Confirmar Check-in` para simular o envio.

## Comportamento esperado

- O campo aceita até 11 dígitos.
- A máscara é aplicada automaticamente no formato `000.000.000-00`.
- A data e a hora são atualizadas continuamente.
- O botão de confirmação atua como ação final do fluxo, sem integração com servidor.

## Observações técnicas

- O campo é `readonly` para forçar o uso do teclado virtual.
- A validação de CPF não está implementada nesta versão.
- A lógica do formulário está definida no script dentro de `index.html`.

## Créditos

Desenvolvido por Isabelly Ferreira e Lorena Rinaldo.

> Projeto desenvolvido como exercício de front-end para criar um terminal de check-in funcional e visualmente moderno.

