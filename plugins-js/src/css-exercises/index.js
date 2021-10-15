import report from "../report.js";
import { findAncestorByClass, samePositionAndSize } from "./css-utils";

{
  const documentAddr = document.location.pathname;

  function disableAll(elements) {
    for (let element of elements) {
      element.setAttribute("disabled", true);
    }
  }

  const cssExerciseDivs = document.getElementsByClassName("css-exercise");
  for (let cssExerciseDiv of cssExerciseDivs) {
    const cssCodeBlock =
      cssExerciseDiv.getElementsByClassName("css-code-block")[0];
    const styleContainer =
      cssExerciseDiv.getElementsByClassName("style-container")[0];
    const cssAncestorCodeBlock = findAncestorByClass(
      cssCodeBlock,
      "code-block"
    );

    const storageBaseKey = documentAddr + "/" + cssExerciseDiv.id;

    const eyeOnSpans = cssExerciseDiv.getElementsByClassName("eye-on");
    for (let eyeOnSpan of eyeOnSpans) {
      eyeOnSpan.onclick = function (event) {
        const codeBlock = findAncestorByClass(event.target, "code-block");
        if (codeBlock) {
          codeBlock.classList.remove("show-lines");
          codeBlock.classList.add("hide-lines");
          resetCSS();
        }
      };
    }
    const eyeOffSpans = cssExerciseDiv.getElementsByClassName("eye-off");
    for (let eyeOffSpan of eyeOffSpans) {
      eyeOffSpan.onclick = function (event) {
        const codeBlock = findAncestorByClass(event.target, "code-block");
        if (codeBlock) {
          codeBlock.classList.remove("hide-lines");
          codeBlock.classList.add("show-lines");
          resetCSS();
        }
      };
    }

    const cssSelects = cssExerciseDiv.getElementsByClassName("css-selects")[0];
    const selects = cssSelects ? cssSelects.getElementsByTagName("select") : [];

    // Initialize values from localStorage
    const inputs = cssExerciseDiv.getElementsByClassName("code-input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value =
        localStorage.getItem(`${storageBaseKey}-input${i}`) || "";
    }
    for (let i = 0; i < selects.length; i++) {
      const value = localStorage.getItem(`${storageBaseKey}-option${i}`);
      if (value) selects[i].value = value;
    }

    function closeTest() {
      disableAll(cssExerciseDiv.getElementsByTagName("select"));
      disableAll(cssExerciseDiv.getElementsByTagName("input"));
      disableAll(cssExerciseDiv.getElementsByTagName("textarea"));
      cssExerciseDiv.classList.add("success");

      const solvedKey = `${storageBaseKey}-solved`;
      const previouslySolved = localStorage.getItem(solvedKey);
      if (!previouslySolved) {
        report
          .sendAnswer(
            cssExerciseDiv.id,
            1,
            { passed: "1/1" },
            {
              css: styleContainer.getElementsByTagName("style")[0].innerHTML,
            }
          )
          .then(function () {
            localStorage.setItem(solvedKey, "true");
          });
      }
    }

    function runTests() {
      const testsJSON = cssExerciseDiv.getAttribute("data-tests");
      if (!testsJSON) return;

      let passedCount = 0;
      const tests = JSON.parse(testsJSON);
      for (let test of tests) {
        const testElements = cssExerciseDiv.getElementsByClassName(
          test.testClass
        );
        const expectedElements = cssExerciseDiv.getElementsByClassName(
          test.expectedClass
        );
        let passedTestElements = 0;
        for (let i = 0; i < expectedElements.length; i++) {
          const testElement = testElements[i];
          const expectedElement = expectedElements[i];
          if (samePositionAndSize(testElement, expectedElement))
            passedTestElements++;
        }
        if (passedTestElements === expectedElements.length) passedCount++;
      }
      const passedAll = passedCount === tests.length;
      if (passedAll) closeTest();
    }

    function resetCSS() {
      let cssCode = cssExerciseDiv.getAttribute("data-css-code-block");
      let cssData = cssExerciseDiv.getAttribute("data-css-block");

      let linesToHide = JSON.parse(
        cssExerciseDiv.getAttribute("data-css-lines-to-hide")
      );
      const showLines = cssAncestorCodeBlock.classList.contains("show-lines");
      const cssLines = cssCode.split("\n");
      const cssLinesToShow = [];
      for (let i = 0; i < cssLines.length; i++) {
        if (showLines || linesToHide.indexOf(i) < 0)
          cssLinesToShow.push(cssLines[i]);
      }
      cssCode = cssLinesToShow.join("\n");

      for (let i = 0; i < selects.length; i++) {
        cssCode = cssCode.replaceAll(`$option${i}$`, selects[i].value);
        cssData = cssData.replaceAll(`$option${i}$`, selects[i].value);
        localStorage.setItem(`${storageBaseKey}-option${i}`, selects[i].value);
      }

      const prevInputs = cssExerciseDiv.getElementsByClassName("code-input");
      const prevInputValues = [];
      let focusedInput = -1;
      for (let i = 0; i < prevInputs.length; i++) {
        const input = prevInputs[i];
        cssData = cssData.replace(
          `$${input.tagName.toLowerCase()}$`,
          input.value
        );
        prevInputValues.push(input.value);
        if (input === document.activeElement) focusedInput = i;
      }

      cssCodeBlock.innerHTML = cssCode;
      const newStyle = document.createElement("style");
      newStyle.innerHTML = cssData;
      styleContainer.replaceChild(
        newStyle,
        styleContainer.getElementsByTagName("style")[0]
      );

      const newInputs = cssExerciseDiv.getElementsByClassName("code-input");
      for (let i = 0; i < newInputs.length; i++) {
        const input = newInputs[i];
        input.value = prevInputValues[i];
        input.oninput = resetCSS;
        if (i === focusedInput) input.focus();
        localStorage.setItem(`${storageBaseKey}-input${i}`, input.value);
      }

      runTests();
    }

    for (let select of selects) {
      select.onchange = resetCSS;
    }
    resetCSS();
  }
}
