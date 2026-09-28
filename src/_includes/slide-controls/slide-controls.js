(function () {
  /**
   * Get the prev/next nav links for the current slide.
   * @returns {{prev: Element|null, next: Element|null}}
   */
  function getCurrentNavLinks() {
    const id =
      window.location.hash.slice(1) || document.querySelector(".slide").id;
    return {
      prev: document.querySelector(
        `#${CSS.escape(id)} .slide__nav-link[rel="prev"]`,
      ),
      next: document.querySelector(
        `#${CSS.escape(id)} .slide__nav-link[rel="next"]`,
      ),
    };
  }

  /**
   * Toggle the disclosure button's expanded state.
   * @param {{target: Element}} event
   */
  function handleClick({ target }) {
    const expanded = target.getAttribute("aria-expanded") === "true";
    target.setAttribute("aria-expanded", String(!expanded));
    target.nextElementSibling.setAttribute("aria-hidden", expanded);
  }

  /**
   * Handle keyboard navigation in slide mode.
   * @param {KeyboardEvent} e
   */
  function handleKeydown(e) {
    if (e.key === "Tab") {
      requestAnimationFrame(() => {
        const targetSlide = document.activeElement?.closest(".slide");
        if (targetSlide) {
          window.location.hash = "#" + targetSlide.id;
          targetSlide.scrollIntoView();
        }
      });
      return;
    }
    if (e.key === " " && document.activeElement?.closest(".slide__nav-link")) {
      e.preventDefault();
      document.activeElement.click();
      return;
    }
    if (e.key === "ArrowLeft") {
      const { prev } = getCurrentNavLinks();
      if (prev && !prev.hasAttribute("inert")) {
        prev.click();
      }
    } else if (e.key === "ArrowRight") {
      const { next } = getCurrentNavLinks();
      if (next && !next.hasAttribute("inert")) {
        next.click();
      }
    }
  }

  /**
   * Enable or disable slide mode.
   * @param {boolean} enabled
   */
  function setSlideMode(enabled) {
    const url = new URL(window.location);
    if (enabled) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeydown);
      const id = window.location.hash.slice(1);
      if (id) {
        document.getElementById(id)?.scrollIntoView();
      }
      url.searchParams.set("mode", "slide");
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
      url.searchParams.delete("mode");
    }
    history.replaceState(null, "", url);
  }

  /**
   * Handle slide mode toggle.
   * @param {{target: HTMLInputElement}} event
   */
  function handleChange({ target }) {
    setSlideMode(target.checked);
  }

  const button = document.querySelector(
    ".slide__controls button[aria-expanded]",
  );
  const slideModeCheck = document.querySelector(
    ".slide__controls input[name='enable']",
  );

  if (!slideModeCheck || !button) {
    return;
  }

  if (!window.location.hash) {
    window.location.hash = "#" + document.querySelector(".slide").id;
  }

  slideModeCheck.checked =
    new URLSearchParams(window.location.search).get("mode") === "slide";
  setSlideMode(slideModeCheck.checked);

  button.addEventListener("click", handleClick);
  slideModeCheck.addEventListener("change", handleChange);
})();
