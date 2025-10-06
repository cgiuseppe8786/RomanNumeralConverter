// ============================================================
// THEME TOGGLE (persistenza + preferenza OS)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      body.dataset.theme = savedTheme;
      themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      body.dataset.theme = prefersDark ? "dark" : "light";
      themeToggle.textContent = prefersDark ? "☀️" : "🌙";
    }

    function toggleTheme() {
      const isDark = body.dataset.theme === "dark";
      body.dataset.theme = isDark ? "light" : "dark";
      localStorage.setItem("theme", body.dataset.theme);
      themeToggle.textContent = isDark ? "🌙" : "☀️";
    }

    themeToggle.addEventListener("click", toggleTheme);
    themeToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") toggleTheme();
    });
  }

  // ============================================================
  // ROMAN NUMERAL CONVERTER (FCC user stories)
  // ============================================================
  const input = document.getElementById("number");
  const button = document.getElementById("convert-btn");
  const output = document.getElementById("output");

  // Se per qualunque motivo gli elementi non ci sono, fermiamoci qui
  if (!input || !button || !output) return;

  const romanMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  function toRoman(num) {
    let n = num;
    let res = "";
    for (const { value, symbol } of romanMap) {
      while (n >= value) {
        res += symbol;
        n -= value;
      }
      if (n === 0) break;
    }
    return res;
  }

  function setOutput(message, isError) {
    output.textContent = message;
    output.classList.toggle("err", !!isError);
    output.classList.toggle("ok", !isError && message !== "");
  }

  function handleConvert() {
    // ATTENZIONE: con <input type="number">, .value può essere "" se non valido
    const raw = input.value.trim();

    // 1) No value inserito
    if (raw === "") {
      setOutput("Please enter a valid number", true);
      return;
    }

    // 2) Non numero o non intero
    // (FCC si aspetta che 3.14, "abc", ecc. siano "valid number" error)
    const num = Number(raw);
    if (!Number.isFinite(num) || !Number.isInteger(num)) {
      setOutput("Please enter a valid number", true);
      return;
    }

    // 3) Minimo
    if (num < 1) {
      setOutput("Please enter a number greater than or equal to 1", true);
      return;
    }

    // 4) Massimo
    if (num >= 4000) {
      setOutput("Please enter a number less than or equal to 3999", true);
      return;
    }

    // 5) OK
    setOutput(toRoman(num), false);
  }

  // Click su bottone
  button.addEventListener("click", handleConvert);

  // Invio su input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleConvert();
  });
});
