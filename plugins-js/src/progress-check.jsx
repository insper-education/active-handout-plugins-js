import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Button from "./components/Button";
import notification from "./notification.js";

const CheckpointContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

{
  const docAddr = document.location.pathname;

  const allCheckpoints = document.querySelectorAll(".admonition.progress");
  if (allCheckpoints.length > 0) {
    hideAllNextSiblings(allCheckpoints[0]);
  }

  const clickHandlers = {};
  allCheckpoints.forEach((item, k) => {
    const text = item.querySelector("p:not(.admonition-title)").innerText;

    const storageKey = getStorageKey(docAddr, k);
    const root = document.createElement("div");
    clickHandlers[storageKey] = makeHandleShowNext(
      root,
      storageKey,
      item.classList.contains("replace-by-line"),
      false
    );
    ReactDOM.render(
      <CheckpointContainer>
        <Button onClick={clickHandlers[storageKey]}>{text}</Button>
      </CheckpointContainer>,
      root
    );

    root.classList.add("checkpoint");
    root.style.display = item.style.display;
    item.parentElement.replaceChild(root, item);
  });

  const allCheckpointContainers = document.querySelectorAll(".checkpoint");
  allCheckpointContainers.forEach((_, k) => {
    const storageKey = getStorageKey(docAddr, k);
    if (localStorage[storageKey] == "true") {
      clickHandlers[storageKey]();
    }
  });
}

function getStorageKey(docAddr, k) {
  return `${docAddr}/checkpoint-${k}`;
}

function hideAllNextSiblings(element) {
  let next = element.nextElementSibling;
  while (next != null) {
    next.style.display = "none";
    next = next.nextElementSibling;
  }
}

function showNextSiblingsUntilCheckpoint(element) {
  let next = element.nextElementSibling;
  while (next != null) {
    next.style.display = "";
    if (next.classList.contains("checkpoint")) {
      return;
    }
    next = next.nextElementSibling;
  }
}

function hasPreviouslyUnansweredQuestion(element) {
  let prev = element.previousElementSibling;
  while (prev != null) {
    if (prev.dataset.answered === "false") {
      return true;
    }
    prev = prev.previousElementSibling;
  }
  return false;
}

function makeHandleShowNext(root, storageKey, replaceByLine, answerRequired) {
  return () => {
    if (answerRequired && hasPreviouslyUnansweredQuestion(root)) {
      notification.toast(
        "Por favor, responda todas as questões antes de continuar.",
        { timeout: 1000 }
      );
    }

    localStorage[storageKey] = true;

    showNextSiblingsUntilCheckpoint(root);

    if (replaceByLine) {
      const hr = document.createElement("HR");
      root.parentElement.replaceChild(hr, root);
    }
    root.remove();
  };
}
