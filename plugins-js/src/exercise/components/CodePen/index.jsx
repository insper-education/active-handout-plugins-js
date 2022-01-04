import React, { useEffect, useState } from "react";
import Answer from "../Answer";

export default function CodePen({
  penUser,
  penSlug,
  exerciseSlug,
  onComplete,
  initialAnswered,
  answerData,
}) {
  const [answered, setAnswered] = useState(!!initialAnswered);
  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin != "https://cdpn.io") return;

        const { slug, passed } = event.data;
        if (slug != exerciseSlug) return;

        onComplete && onComplete(passed);
        setAnswered(true);
      },
      false
    );
  }, []);

  if (!penUser || !penSlug) return null;

  return (
    <>
      <iframe
        height="300"
        style="width: 100%;"
        scrolling="no"
        title={penSlug}
        src={`https://codepen.io/${penUser}/embed/${penSlug}?default-tab=html%2Cresult&editable=true`}
        frameborder="no"
        loading="lazy"
        allowtransparency="true"
        allowfullscreen="true"
      >
        See the Pen{" "}
        <a href={`https://codepen.io/${penUser}/pen/${penSlug}`}>{penSlug}</a>{" "}
        by (<a href={`https://codepen.io/${penUser}`}>@{penUser}</a>) on{" "}
        <a href="https://codepen.io">CodePen</a>.
      </iframe>
      {answerData && <Answer data={answerData} visible={answered} />}
    </>
  );
}
