import { getFullUrlWithoutQuery } from "./services/request";

{
  let currentDocument = getFullUrlWithoutQuery();
  let lastSlash = currentDocument.lastIndexOf("/");

  let slidePath = "";
  if (lastSlash == currentDocument.length - 1) {
    slidePath = currentDocument + "slides.pdf";
  } else {
    slidePath = currentDocument.substring(0, lastSlash) + "/slides.pdf";
  }

  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function (ev) {
    if (xhr.status == 200) {
      let emb = document.createElement("embed");
      emb.src = slidePath;
      emb.width = 500;
      emb.height = 375;
      emb.type = "application/pdf";

      let divCenter = document.createElement("div");
      divCenter.style = "text-align: center";
      divCenter.className = "no-print";
      divCenter.appendChild(emb);

      document.querySelector("h1").insertAdjacentElement("afterend", divCenter);
    }
  });
  xhr.open("head", slidePath);
  xhr.send();
}
