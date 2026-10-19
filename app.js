(() => {
  const opened = new Set();
  const destinations = {
    "shrinkme": "https://shrinkme.io/ref/118396988380297733112",
    "bicea-display": "https://bicea.org/22/bd1cecbb35eb4d9305672b39d660669a",
    "bicea-14": "https://bicea.org/14/79c001e754f7e31f8042e45db4fa9426",
    "bicea-21": "https://bicea.org/21/6f80554aaa7ab2704ddb25caa41540a6"
  };
  document.querySelectorAll("[data-step]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.step, status = document.getElementById("status-" + id);
    const next = document.querySelector(`[data-continue="${id}"]`);
    const win = window.open(destinations[id], "_blank", "noopener,noreferrer");
    opened.add(id);
    if (status) status.textContent = win ? "নতুন ট্যাব খোলার চেষ্টা করা হয়েছে। ফিরে এসে নিচের বোতামে চাপ দিন।" : "ব্রাউজার নতুন ট্যাব আটকাতে পারে। সরাসরি ব্যানারটি খুলুন, তারপর এখানে ফিরে আসুন।";
    button.textContent = "Link opened ✓"; button.disabled = true;
    if (next) next.disabled = false;
  }));
  document.querySelectorAll("[data-continue]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.continue;
    if (!opened.has(id)) return;
    button.textContent = "Completed ✓"; button.disabled = true;
    const status = document.getElementById("status-" + id);
    if (status) status.textContent = "আপনি ফিরে আসা নিশ্চিত করেছেন। এটি বিজ্ঞাপন দেখা বা ক্লিক যাচাই করে না।";
  }));
})();