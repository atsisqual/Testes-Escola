# Testes-Escola

Motor reutilizável para criar testes de avaliação a partir de matéria escolar, sem guardar uma disciplina específica no repositório.

## Objetivo

Este repositório contém apenas o **motor** do questionário:

- regras para transformar matéria em perguntas de escolha múltipla;
- formato JSON normalizado dos testes;
- pontuação automática;
- resultado final;
- indicação das respostas erradas, resposta correta e explicação;
- aplicação web simples, sem servidor e sem dependências externas.

A matéria escolar é fornecida no momento em que o teste é pedido. Não deve ficar incorporada no motor.

## Como pedir um teste ao ChatGPT

Quando quiseres usar este motor, podes dizer, por exemplo:

> Usa o motor do repositório `atsisqual/Testes-Escola` e cria um teste com 15 perguntas a partir desta matéria. Não mostres as respostas antes de eu terminar.

Depois forneces a matéria em texto, PDF, documento ou outro ficheiro legível.

O ChatGPT deve ler primeiro `SKILL.md` e seguir essas regras como fonte de verdade do motor.

## Estrutura

- `SKILL.md` — especificação consolidada do motor e comportamento esperado.
- `quiz.schema.json` — esquema do ficheiro de teste.
- `web/index.html` — interface tipo formulário para realizar e corrigir um teste.

## Utilização da interface web

1. Abre `web/index.html` num navegador.
2. Carrega um ficheiro JSON de teste ou cola o JSON na caixa de texto.
3. Clica em **Iniciar teste**.
4. Responde às perguntas.
5. Clica em **Terminar e corrigir**.
6. O motor apresenta a pontuação, a percentagem e as perguntas erradas com a resposta correta e a explicação.

A interface funciona totalmente no navegador. O ficheiro JSON não é enviado para nenhum servidor pelo próprio motor.

## Princípio principal

O motor deve ser reutilizável para qualquer disciplina. A matéria fornecida pelo utilizador é a fonte factual principal; se a matéria não suportar uma pergunta, o motor não deve inventar conteúdo apenas para atingir uma quantidade de perguntas.
