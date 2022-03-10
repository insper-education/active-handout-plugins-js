import React from "react";
import ReactDOM from "react-dom";
import {Termynal} from "./extras/termynal"
import "./extras/termynal.css"

{
  function parseConfig(item) {
    var text = item.innerHTML;
    var tokenFirst = text.indexOf(":");
    var tokenLast  = text.lastIndexOf(":");
    var dataTy = '';

    if (tokenFirst != -1 && tokenLast != -1) {
      dataTy = text.substring(tokenFirst+1, tokenLast);
      text = text.substring(tokenLast+1);
    }
    return(<span data-ty={dataTy}>{text}</span>)
  }

  const terminals = document.querySelectorAll(".admonition.terminal");
  terminals.forEach((div, i) => {
    const termynalId = `termynal__${i}`;
    const lines = Array.from(div.getElementsByTagName("li"));

    const root = document.createElement("div");
    ReactDOM.render(
      <div id={termynalId} data-termynal>
        {lines.map(x => parseConfig(x))}
      </div>
      , root);

    div.parentElement.replaceChild(root, div)

    var termynal = new Termynal(`#${termynalId}`, { startDelay: 300 })
  });
}
