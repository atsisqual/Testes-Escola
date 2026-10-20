# SKILL — Testes-Escola

Versão: 1.0

## Finalidade

Esta skill transforma matéria escolar fornecida pelo utilizador num teste de avaliação reutilizável, normalmente de escolha múltipla, com correção, pontuação e feedback final.

O repositório contém o motor. A matéria varia de pedido para pedido e não deve ser assumida nem inventada.

## Regra de ativação

Quando o utilizador disser para usar o motor, a skill ou o repositório `atsisqual/Testes-Escola`, seguir este ficheiro antes de criar o teste.

## Fonte factual

1. Usar a matéria fornecida pelo utilizador como fonte factual principal.
2. Não introduzir factos externos só para completar o número pedido de perguntas, salvo se o utilizador pedir explicitamente conhecimento adicional.
3. Se a matéria não suportar perguntas suficientes, criar menos perguntas e explicar a limitação.
4. Se uma passagem for ambígua, evitar criar uma pergunta que dependa dessa ambiguidade.
5. As explicações da correção devem ser sustentadas pela matéria fornecida.

## Configuração por defeito

Se o utilizador não especificar:

- 10 perguntas;
- 4 opções por pergunta;
- exatamente 1 resposta correta;
- 1 ponto por pergunta;
- escala final de 0 a 100%;
- aprovação de referência: 50%;
- dificuldade distribuída aproximadamente em 30% fácil, 50% média e 20% difícil;
- perguntas cobrindo partes diferentes da matéria;
- sem mostrar respostas corretas antes da submissão final.

As preferências explícitas do utilizador substituem estes valores.

## Construção das perguntas

Cada pergunta deve:

- testar um conceito relevante da matéria;
- ser clara e ter uma única interpretação razoável;
- ter opções plausíveis e da mesma natureza gramatical;
- evitar pistas óbvias de tamanho, formulação ou repetição;
- evitar opções como “todas as anteriores” e “nenhuma das anteriores”, salvo se forem pedagogicamente necessárias;
- evitar duplicar a mesma aprendizagem com formulações quase iguais;
- incluir uma explicação curta para a resposta correta;
- incluir uma referência à secção, página, título ou excerto da matéria quando isso puder ser identificado.

A posição da resposta correta deve variar ao longo do teste e não seguir um padrão previsível.

## Cobertura

Antes de criar as perguntas, identificar mentalmente os principais tópicos da matéria e distribuir as perguntas por esses tópicos. Dar prioridade aos conceitos centrais e às relações entre conceitos, não apenas à memorização literal.

Quando a matéria permitir, misturar:

- reconhecimento de conceitos;
- compreensão;
- aplicação simples;
- comparação ou distinção entre ideias.

## Modo de entrega

Existem dois modos válidos.

### 1. Modo conversa

Usar quando o utilizador quer fazer o teste diretamente no ChatGPT.

- Apresentar as perguntas e opções sem revelar a solução.
- Aceitar respostas no formato que o utilizador preferir, incluindo algo como `1B, 2C, 3A`.
- Não corrigir parcialmente durante o teste, a menos que o utilizador peça esse modo.
- No fim, corrigir tudo e apresentar o resultado.

### 2. Modo formulário

Usar quando o utilizador quer um questionário reutilizável tipo Google Forms.

- Produzir um JSON válido segundo `quiz.schema.json`.
- O JSON pode ser carregado em `web/index.html`.
- Não incluir HTML específico da matéria; a matéria deve ficar apenas no JSON do teste.

## Correção

A correção final deve calcular:

- pontos obtidos;
- pontos máximos;
- percentagem;
- número de respostas corretas;
- número de respostas erradas;
- número de respostas não respondidas.

Para cada resposta errada ou não respondida, mostrar:

1. número e texto da pergunta;
2. resposta dada pelo utilizador, ou “Sem resposta”;
3. resposta correta;
4. explicação curta;
5. referência à matéria, se disponível.

Não é necessário repetir em detalhe as perguntas que ficaram corretas, salvo pedido do utilizador.

## Resultado

Usar a fórmula:

`percentagem = pontos_obtidos / pontos_maximos * 100`

Arredondar a percentagem a uma casa decimal quando necessário.

Se o teste definir `settings.scoreScaleMax`, também calcular:

`nota_na_escala = percentagem / 100 * scoreScaleMax`

## Formato JSON

Estrutura esperada:

```json
{
  "title": "Título do teste",
  "description": "Descrição opcional",
  "sourceTitle": "Nome da matéria ou documento",
  "settings": {
    "scoreScaleMax": 100,
    "passPercent": 50,
    "shuffleQuestions": false,
    "shuffleOptions": false
  },
  "questions": [
    {
      "id": "q1",
      "type": "single_choice",
      "prompt": "Pergunta",
      "options": [
        {"id": "A", "text": "Opção A"},
        {"id": "B", "text": "Opção B"},
        {"id": "C", "text": "Opção C"},
        {"id": "D", "text": "Opção D"}
      ],
      "correctOptionId": "B",
      "points": 1,
      "explanation": "Explicação baseada na matéria.",
      "sourceRef": "Secção ou página, quando disponível"
    }
  ]
}
```

## Validação antes da entrega

Antes de entregar um teste, confirmar:

- todos os `id` das perguntas são únicos;
- todos os `id` das opções são únicos dentro da pergunta;
- `correctOptionId` corresponde a uma opção existente;
- `points` é superior a zero;
- existe apenas uma resposta correta por pergunta;
- não existem respostas corretas reveladas no enunciado;
- o total de perguntas corresponde ao pedido, exceto quando a matéria não o permite;
- o conteúdo está sustentado pela matéria fornecida.

## Prioridade

A prioridade é avaliar corretamente a matéria, não atingir artificialmente um número de perguntas.
