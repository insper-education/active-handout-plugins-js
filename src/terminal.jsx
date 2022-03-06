import React from "react";
import ReactDOM from "react-dom";
import {Termynal} from "./extras/termynal"


function Terminal({text}) {
  console.log(text);
}

{
  const terminals = document.querySelectorAll(".admonition.terminal");
  terminals.forEach((div, i) => {
    const root = document.createElement("div");
    const termynalId = `termynal__${i}`;
    console.log(`${termynalId}`);

    ReactDOM.render(
      <div id={termynalId} data-termynal>
        <span data-ty="progress"></span>
        <span data-ty>TESTANDOOOOO......</span>
      </div>
      , root);

    div.classList.remove("admonition", "terminal");
    for (const child of div.children) {
      div.removeChild(child);
    }
    div.appendChild(root);

    var termynal = new Termynal(`#${termynalId}`, { startDelay: 600 })
  });

}
