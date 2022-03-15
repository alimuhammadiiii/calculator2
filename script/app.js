const displayResult = document.querySelector(".calculator-screen");
const outPutOperate = document.querySelector(".data-calculation");
const numberData = document.querySelectorAll(".data-number");
const btnKeys = document.querySelector(".calculator-keys");
const historyMemory = document.querySelector(".sidebar");
const historyView = document.querySelector(".history-calculation");
const memoryView = document.querySelector(".memory-calculation");
const clearAllListMemory = document.querySelector(".trash-bin");
const btnMemory = document.querySelector(".row3");
const historyText = document.querySelector(".item1");
const memoryText = document.querySelector(".item2");
console.log(historyText, memoryText);
let id = 0;
let memoryList = [];
let historyList = [];
const calculator = {
  displayValue: "0",
  firstNumber: null,
  secondNumber: null,
  waitingForSecondOperand: false,
  equal: false,
  operator: null,
  result: null,
};

const inputDigit = (number) => {
  if (calculator.result !== null) {
    clearAll();
  }
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0";
    calculator.secondNumber === null
      ? (calculator.secondNumber = number)
      : (calculator.secondNumber += number);

    calculator.displayValue = calculator.secondNumber;
  } else if (calculator.firstNumber === null) {
    calculator.firstNumber = number;
    calculator.displayValue = calculator.firstNumber;
  } else {
    calculator.firstNumber += number;
    calculator.displayValue = calculator.firstNumber;
  }
};

const deleteLastCharacter = () => {
  // debugger;
  displayResult.innerHTML = displayResult.innerHTML.substring(
    0,
    displayResult.innerHTML.length - 1
  );
  // if (calculator.result !== null) {
  // } else
  if (calculator.secondNumber !== null) {
    calculator.secondNumber = displayResult.innerHTML;
  } else {
    calculator.firstNumber = displayResult.innerHTML;
  }

  calculator.displayValue = displayResult.innerHTML;

  updateDisplay();
};

function inputDecimal() {
  if (!calculator.displayValue.includes(".")) {
    if (calculator.firstNumber === null) {
      calculator.firstNumber = "0.";
      calculator.displayValue = calculator.firstNumber;
    } else if (
      calculator.secondNumber === null &&
      calculator.waitingForSecondOperand === true
    ) {
      calculator.secondNumber = "0.";
      calculator.displayValue = calculator.secondNumber;
    } else {
      if (
        calculator.secondNumber === null &&
        calculator.waitingForSecondOperand === false
      ) {
        calculator.firstNumber += ".";
        calculator.displayValue = calculator.firstNumber;
      } else {
        calculator.secondNumber += ".";
        calculator.displayValue = calculator.secondNumber;
      }
    }
  }

  updateDisplay();
}

const positiveNegative = () => {
  debugger;
  calculator.displayValue = String(calculator.displayValue);
  if (calculator.displayValue.includes("-")) {
    // let digit = String(displayResult.innerHTML);
    calculator.displayValue = calculator.displayValue.replace("-", "");
    calculator.firstNumber;
  } else {
    calculator.displayValue = "-" + calculator.displayValue;
  }
  if (
    calculator.secondNumber !== null &&
    calculator.waitingForSecondOperand === true
  ) {
    calculator.secondNumber = parseFloat(calculator.displayValue);
  }
  updateDisplay();
};

const operatorVal = (operatorValue) => {
  if (operatorValue === "numberPow2") {
    calculator.result = parseFloat(Math.pow(calculator.displayValue, 2));
    outPutOperate.innerHTML = `sqr(${calculator.displayValue}) `;
  } else if (operatorValue === "numberPow3") {
    calculator.result = parseFloat(Math.pow(calculator.displayValue, 3));
    outPutOperate.innerHTML = `sqr(${calculator.displayValue}) `;
  } else if (operatorValue === "sqrt") {
    calculator.result = parseFloat(Math.sqrt(calculator.displayValue));
    outPutOperate.innerHTML = `√(${calculator.displayValue})`;
  } else if (operatorValue === "1/x") {
    calculator.result = parseFloat(1 / calculator.displayValue);
    outPutOperate.innerHTML = `1/(${calculator.displayValue})`;
  } else {
    calculator.operator = operatorValue;
    if (calculator.result !== null) {
      calculator.result = calculator.displayValue;
      calculator.firstNumber = calculator.result;
      calculator.result = null;
    } else {
      calculator.firstNumber = calculator.displayValue;
    }
    outPutOperate.innerHTML = ` ${calculator.firstNumber} ${calculator.operator} `;
  }
  calculator.waitingForSecondOperand = true; // اینو فردا درست کن
  if (calculator.result !== null) {
    calculator.displayValue = calculator.result;
  }
  updateDisplay();
};

const resultOperator = () => {
  if (calculator.secondNumber === null) {
    debugger;
    outPutOperate.innerHTML += "=";
  } else {
    outPutOperate.innerHTML += `${calculator.secondNumber} =`;
  }

  if (calculator.operator === "+") {
    calculator.result =
      parseFloat(calculator.firstNumber) + parseFloat(calculator.secondNumber);
  } else if (calculator.operator === "-") {
    calculator.result =
      parseFloat(calculator.firstNumber) - parseFloat(calculator.secondNumber);
  } else if (calculator.operator === "×") {
    calculator.result =
      parseFloat(calculator.firstNumber) * parseFloat(calculator.secondNumber);
  } else if (calculator.operator === "÷") {
    calculator.result =
      parseFloat(calculator.firstNumber) / parseFloat(calculator.secondNumber);
  }
  calculator.secondNumber = null;
  calculator.displayValue = calculator.result;

  // historyList.push(calculator.result, outPutOperate.innerHTML);
  // console.log(historyList);
  updateHistory();
  updateDisplay();
};

function clearAll() {
  calculator.displayValue = "0";
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  calculator.waitingForSecondOperand = false;
  calculator.equal = false;
  calculator.operator = null;
  calculator.result = null;
  outPutOperate.innerHTML = "";
  updateDisplay();
}

function updateHistoryView() {
  historyView.innerHTML = "";
  if (historyList.length === 0) {
    historyView.innerHTML = "there's no history yet";
  } else {
    historyList.forEach((list) => {
      console.log(list);
      const li = document.createElement("li");
      li.innerHTML = `${list.operationHistory} <br> ${list.resultHistory}`;
      historyView.prepend(li);
    });
  }
}

function updateHistory() {
  const objHistory = {
    idHistory: id++,
    resultHistory: calculator.result,
    operationHistory: outPutOperate.innerHTML,
  };
  historyList.push(objHistory);
  console.log(historyList);
  updateHistoryView();
}

function updateMemory() {
  memoryView.innerHTML = "";
  if (memoryList.length === 0) {
    memoryView.innerHTML = "there nothing save in memory";
  } else {
    memoryList.forEach((number) => {
      const li = document.createElement("li");
      li.innerHTML = number;
      memoryView.prepend(li);
      console.log("rez");
    });
  }
}

function updateDisplay() {
  // if (calculator.displayValue === "0" || calculator.displayValue === "") {
  //   displayResult.innerHTML = "0";
  // }
  displayResult.innerHTML = "0";
  displayResult.innerHTML = calculator.displayValue;
}
updateDisplay();

clearAllListMemory.addEventListener("click", () => {
  console.log(historyView.style.display);

  if (historyView.style.display === "block" && historyList.length !== 0) {
    historyList = [];
    updateHistoryView();
  } else {
    memoryList = [];
    updateMemory();
  }
});

btnKeys.addEventListener("click", (e) => {
  if (e.target.classList.contains("data-number")) {
    inputDigit(e.target.value);
    updateDisplay();
  }

  if (e.target.classList.contains("decimal")) {
    console.log(e.target.value);
    inputDecimal();
  }

  if (e.target.classList.contains("operator")) {
    console.log(e.target.value);
    operatorVal(e.target.value);
    updateDisplay();
  }

  if (e.target.classList.contains("result")) {
    console.log(e.target.value);
    resultOperator();
  }

  if (e.target.classList.contains("positive-negative")) {
    console.log(e.target.value);
    positiveNegative();
  }

  if (e.target.classList.contains("clear-result")) {
    console.log(e.target.value);
    clearAll();
  }

  if (e.target.classList.contains("clear-all")) {
    console.log(e.target.value);
    clearAll();
  }

  if (e.target.classList.contains("delete-number")) {
    console.log(e.target.value);
    deleteLastCharacter();
  }
});

historyMemory.addEventListener("click", (e) => {
  if (e.target.classList.contains("item1")) {
    historyView.style.display = "block";
    memoryView.style.display = "none";
    memoryText.classList.remove("border-bottom");
    historyText.classList.add("border-bottom");
  }
  if (e.target.classList.contains("item2")) {
    memoryView.style.display = "block";
    historyView.style.display = "none";
    historyText.classList.remove("border-bottom");
    memoryText.classList.add("border-bottom");
  }
});

btnMemory.addEventListener("click", (e) => {
  if (e.target.classList.contains("ms")) {
    memoryList.push(calculator.displayValue);
    updateMemory();
  }

  if (e.target.classList.contains("m-")) {
    let lastNumber = memoryList.pop(memoryList[memoryList.length - 1]);
    lastNumber = lastNumber - calculator.displayValue;
    console.log(lastNumber);
    memoryList.push(lastNumber);
    console.log(memoryList);
    updateMemory();
  }

  if (e.target.classList.contains("m+")) {
    let lastNumber = memoryList.pop(memoryList[memoryList.length - 1]);
    lastNumber = parseFloat(lastNumber) + parseFloat(calculator.displayValue);
    console.log(lastNumber);
    memoryList.push(lastNumber);
    console.log(memoryList);
    updateMemory();
  }
  if (e.target.classList.contains("mc")) {
    debugger;
    memoryList = [];
    updateMemory();
  }

  if (e.target.classList.contains("mr")) {
    calculator.firstNumber = memoryList.pop(memoryList[memoryList.length - 1]);
    calculator.displayValue = calculator.firstNumber;
    updateDisplay();
  }
});
