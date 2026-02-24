
// DOM ELEMENT
let screen = document.querySelector("#inputBox");
let buttons = document.querySelectorAll("button");

// STATE
let currValue = "";
let prevValue = "";
let operation = "";
let expression = "";

// CALCULATION FUNCTION
function calculate(a, b, op) {
  a = Number(a);
  b = Number(b);

  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b !== 0 ? a / b : "Error";
  if (op === "%") return a % b;
}

// HANDLE INPUT
function handleInput(value) {

  // Numbers & decimal
  if (!isNaN(value) || value === ".") {
    if (value === "." && currValue.includes(".")) return;
    if (value === "." && currValue === "") currValue = "0";

    currValue += value;
    expression += value;
    screen.value = expression;
  }

  // Clear All
  else if (value === "AC") {
    currValue = "";
    prevValue = "";
    operation = "";
    expression = "";
    screen.value = "";
  }

  // Delete
  else if (value === "DEL") {
    expression = expression.slice(0, -1);
    currValue = currValue.slice(0, -1);
    screen.value = expression;
  }

  // Operators
  else if (["+", "-", "*", "/", "%"].includes(value)) {
    if (currValue === "") return;

    if (prevValue !== "") {
      prevValue = calculate(prevValue, currValue, operation).toString();
    } else {
      prevValue = currValue;
    }

    operation = value;
    currValue = "";
    expression = prevValue + " " + operation + " ";
    screen.value = expression;
  }

  // Equal
  else if (value === "=") {
    if (prevValue === "" || currValue === "") return;

    let result = calculate(prevValue, currValue, operation);

    screen.value = prevValue + " " + operation + " " + currValue + " = " + result;

    currValue = result.toString();
    prevValue = "";
    operation = "";
    expression = currValue;
  }
}

// BUTTON CLICKS
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    handleInput(btn.innerText);
  });
});

// KEYBOARD SUPPORT
document.addEventListener("keydown", (e) => {
  let key = e.key;

  if (!isNaN(key) || key === ".") {
    handleInput(key);
  }

  else if (["+", "-", "*", "/", "%"].includes(key)) {
    handleInput(key);
  }

  else if (key === "Enter" || key === "=") {
    handleInput("=");
  }

  else if (key === "Backspace") {
    handleInput("DEL");
  }

  else if (key === "Escape") {
    handleInput("AC");
  }
});