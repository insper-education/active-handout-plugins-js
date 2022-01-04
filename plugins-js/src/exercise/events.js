export const ANSWER_FROM_SERVER = "answerFromServer";
export const ANSWER_SUBMITTED = "answerSubmitted";

export function makeAnswerFromServerEvent(slug, answer) {
  return new CustomEvent(ANSWER_FROM_SERVER, {
    detail: {
      slug,
      answer,
    },
  });
}

export function makeAnswerSubmittedEvent(slug, answer) {
  return new CustomEvent(ANSWER_SUBMITTED, {
    detail: {
      slug,
      answer,
    },
  });
}
