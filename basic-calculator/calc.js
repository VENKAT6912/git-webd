const display = document.getElementById("display");
const toggle = document.getElementById("themeToggle");

function append(value) {
  if (display.value === "Error") {
    display.value = "";
  }
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const result = eval(display.value);
    display.value = Number.isFinite(result) ? result : "Error";
  } catch (error) {
    display.value = "Error";
  }
}

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", toggle.checked);
});