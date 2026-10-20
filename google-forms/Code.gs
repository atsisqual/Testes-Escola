/*
 * Testes-Escola — exportador para Google Forms
 *
 * Utilização:
 * 1. Substitui o valor de QUIZ pelo JSON do teste (JSON é também um objeto JavaScript válido).
 * 2. Abre https://script.google.com e cria um novo projeto.
 * 3. Cola este ficheiro em Code.gs.
 * 4. Executa createGoogleFormQuiz().
 * 5. Autoriza o acesso ao Google Forms quando solicitado.
 *
 * O script cria um Google Form em modo Questionário, com respostas corretas,
 * pontuação e feedback de correção.
 */

const QUIZ = null; // O ChatGPT deve substituir por um objeto de teste válido segundo quiz.schema.json.

function createGoogleFormQuiz() {
  if (!QUIZ || typeof QUIZ !== 'object') {
    throw new Error('Substitui a constante QUIZ pelo objeto JSON do teste antes de executar.');
  }

  validateQuiz_(QUIZ);

  const form = FormApp.create(QUIZ.title);
  form.setIsQuiz(true);

  if (QUIZ.description) {
    form.setDescription(QUIZ.description);
  }

  QUIZ.questions.forEach((question, index) => {
    if (question.type !== 'single_choice') {
      throw new Error(`Pergunta ${index + 1}: o exportador Google Forms suporta atualmente single_choice.`);
    }

    const item = form.addMultipleChoiceItem();
    item.setTitle(`${index + 1}. ${question.prompt}`);

    if (question.sourceRef) {
      item.setHelpText(`Referência: ${question.sourceRef}`);
    }

    const choices = question.options.map(option =>
      item.createChoice(
        `${option.id}. ${option.text}`,
        option.id === question.correctOptionId
      )
    );

    item.setChoices(choices);
    item.setPoints(normalizePoints_(question.points));

    const feedbackText = [
      question.explanation || '',
      question.sourceRef ? `Referência: ${question.sourceRef}` : ''
    ].filter(Boolean).join('\n');

    if (feedbackText) {
      const feedback = FormApp.createFeedback()
        .setText(feedbackText)
        .build();

      item.setFeedbackForCorrect(feedback);
      item.setFeedbackForIncorrect(feedback);
    }
  });

  Logger.log(`Editar formulário: ${form.getEditUrl()}`);
  Logger.log(`Responder ao formulário: ${form.getPublishedUrl()}`);

  return {
    formId: form.getId(),
    editUrl: form.getEditUrl(),
    publishedUrl: form.getPublishedUrl()
  };
}

function normalizePoints_(points) {
  const value = Number(points);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Pontuação inválida: ${points}`);
  }

  // O Google Forms trabalha com pontos inteiros por pergunta.
  return Math.max(1, Math.round(value));
}

function validateQuiz_(quiz) {
  if (!quiz.title || typeof quiz.title !== 'string') {
    throw new Error('O teste precisa de um título.');
  }

  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    throw new Error('O teste precisa de pelo menos uma pergunta.');
  }

  const questionIds = new Set();

  quiz.questions.forEach((question, index) => {
    const number = index + 1;

    if (!question.id || typeof question.id !== 'string') {
      throw new Error(`Pergunta ${number}: id inválido.`);
    }
    if (questionIds.has(question.id)) {
      throw new Error(`Pergunta ${number}: id repetido (${question.id}).`);
    }
    questionIds.add(question.id);

    if (!question.prompt || typeof question.prompt !== 'string') {
      throw new Error(`Pergunta ${number}: enunciado inválido.`);
    }

    if (!Array.isArray(question.options) || question.options.length < 2) {
      throw new Error(`Pergunta ${number}: são necessárias pelo menos duas opções.`);
    }

    const optionIds = new Set();
    question.options.forEach(option => {
      if (!option.id || !option.text) {
        throw new Error(`Pergunta ${number}: opção inválida.`);
      }
      if (optionIds.has(option.id)) {
        throw new Error(`Pergunta ${number}: opção repetida (${option.id}).`);
      }
      optionIds.add(option.id);
    });

    if (!optionIds.has(question.correctOptionId)) {
      throw new Error(`Pergunta ${number}: correctOptionId não corresponde a uma opção existente.`);
    }

    normalizePoints_(question.points);
  });
}
