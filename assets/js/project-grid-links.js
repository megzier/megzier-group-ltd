(function () {
  function initProjectCardNavigation() {
    document.querySelectorAll(".project-single-box").forEach((card) => {
      const link = card.querySelector(".project-info a");
      if (!link) return;

      card.style.cursor = "pointer";
      card.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;
        window.location.href = link.href;
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectCardNavigation);
  } else {
    initProjectCardNavigation();
  }
})();
