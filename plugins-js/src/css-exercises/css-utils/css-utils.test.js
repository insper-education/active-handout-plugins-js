import { findAncestorByClass, samePositionAndSize } from ".";
import { boundingRects, htmlString } from "./test-data/flex-parent";

const initMocks = (container) => {
  Object.entries(boundingRects).forEach(([className, rects]) => {
    const elements = container.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      elements[i].getBoundingClientRect = jest.fn(() => rects[i]);
    }
  });
};

const initDOM = () => {
  const div = document.createElement("div");
  div.innerHTML = htmlString;

  initMocks(div);

  return div;
};

describe("css exercises", () => {
  test("find correct ancestor for each element", async () => {
    const container = initDOM();

    for (let classGroup of ["expected", "user"]) {
      const parentClassName = `parent-${classGroup}`;
      for (let grandchild of container.getElementsByClassName(
        `grandchild-${classGroup}`
      )) {
        const ancestor = findAncestorByClass(grandchild, parentClassName);
        expect(ancestor.className).toContain(parentClassName);
      }
    }
  });

  test("blocks should be considered equal", async () => {
    const container = initDOM();

    const grandchildsUser = container.getElementsByClassName("grandchild-user");
    const grandchildsExpected = container.getElementsByClassName(
      "grandchild-expected"
    );
    for (let i = 0; i < grandchildsUser.length; i++) {
      const user = grandchildsUser[i];
      const expected = grandchildsExpected[i];
      expect(samePositionAndSize(user, expected)).toBe(true);
    }
  });
});
