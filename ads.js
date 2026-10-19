/* Third-party advertising scripts. Availability depends on the ad provider/browser. */
(() => {
  // Bicea 300x250 display ad
  window.atOptions = { key: "bd1cecbb35eb4d9305672b39d660669a", format: "iframe", height: 250, width: 300, params: {} };
  const display = document.getElementById("bicea-300-slot");
  if (display) {
    const script = document.createElement("script");
    script.src = "https://bicea.org/22/bd1cecbb35eb4d9305672b39d660669a";
    script.async = true; display.replaceChildren(); display.appendChild(script);
  }
  const slot14 = document.getElementById("bicea-14-slot");
  if (slot14) {
    const script = document.createElement("script");
    script.src = "https://bicea.org/14/79c001e754f7e31f8042e45db4fa9426";
    script.async = true; script.dataset.cfasync = "false"; slot14.replaceChildren(); slot14.appendChild(script);
  }
  const slot21 = document.getElementById("bicea-21-slot");
  if (slot21) {
    const container = document.createElement("div"); container.id = "container-6f80554aaa7ab2704ddb25caa41540a6";
    slot21.replaceChildren(container);
    const script = document.createElement("script");
    script.src = "https://bicea.org/21/6f80554aaa7ab2704ddb25caa41540a6";
    script.async = true; script.dataset.cfasync = "false"; slot21.appendChild(script);
  }
})();