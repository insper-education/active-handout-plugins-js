{
  let admonitions_for_counting = ["exercise"];
  if (window.ihandout_config["counter"]) {
    admonitions_for_counting = window.ihandout_config["counter"];
  }

  for (const admonition_type of admonitions_for_counting) {
    const elements = document.querySelectorAll(
      ".admonition." + admonition_type
    );
    let count = 1;
    for (const element of elements) {
      const title = element.querySelector(".admonition-title");
      const titleText = `${title.innerHTML} ${count}`;
      title.innerHTML = titleText;
      count++;
    }
  }
}
