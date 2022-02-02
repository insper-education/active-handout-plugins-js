import { cache } from "./services/auth";
import notification from "./notification";

let REPORT_URL;
if (
  window.ihandout_config["report"] &&
  window.ihandout_config["report"]["url"]
) {
  REPORT_URL = window.ihandout_config["report"]["url"];
} else {
  REPORT_URL = "";
}

function sendAnswer(slug, points, test_results, student_input) {
  if (REPORT_URL === "" || cache.getToken() === "") {
    return false;
  }

  const answer_url = REPORT_URL + slug + "/answers/";
  const answer_data = {
    slug: slug,
    submission_date: Date.now(),
    points: points,
    test_results: test_results,
    student_input: student_input,
  };

  return fetch(answer_url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + cache.getToken(),
    },
    body: JSON.stringify(answer_data),
  })
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((t) => {
      notification.toast(
        "Não foi possível enviar sua resposta. Por favor, avise os professores se o problema persistir.",
        { bgColor: "error", timeout: 2000 }
      );
      return new Promise((resolve, reject) => {
        resolve({ ok: false, reason: "CORS failed" });
      });
    });
}

export default { sendAnswer };
