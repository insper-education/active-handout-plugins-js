function translate(text) {
  return text
    .replaceAll("Exercise", "Exercício")
    .replaceAll("Answer", "Resposta");
}

{
  const admonitions = document.querySelectorAll(".admonition");

  for (const admonition of admonitions) {
    const title = admonition.querySelector(".admonition-title");
    const titleText = translate(title.innerHTML);
    title.innerHTML = titleText;
  }
}
