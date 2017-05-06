/* global $*/
$(() => {
  const ESC = 27;
  const ENTER = 13;
  const $screen = $('#screen');
  const $buttons = $('span');
  let operator = '';
  let calcArray = [];

  const calculator = {
    '+': function add(a, b) {
      const calcResult = a + b;
      return calcResult;
    },
    '-': function subtract(a, b) {
      let calcResult = a - b;
      calcResult = parseFloat(calcResult.toFixed(2));
      return calcResult;
    },
    x: function multiply(a, b) {
      let calcResult = a * b;
      calcResult = parseFloat(calcResult.toFixed(2));
      return calcResult;
    },
    '÷': function divide(a, b) {
      if (b === 0) {
        return 'error';
      }
      let calcResult = a / b;
      calcResult = parseFloat(calcResult.toFixed(2));
      return calcResult;
    },
    '/': function divide(a, b) {
      if (b === 0) {
        return 'error';
      }
      let calcResult = a / b;
      calcResult = parseFloat(calcResult.toFixed(2));
      return calcResult;
    },
    '*': function multiply(a, b) {
      let calcResult = a * b;
      calcResult = parseFloat(calcResult.toFixed(2));
      return calcResult;
    },
    '': function restart(a) {
      return a;
    },
  };

  function clear() {
    calcArray = [];
    $screen.val('');
    $screen.focus();
  }

  function calculate() {
    const input = parseFloat($screen[0].value, 10);
    if (!isNaN(input)) {
      calcArray.push(input);
      if (calcArray.length > 1) {
        calcArray.push(calculator[operator](calcArray.shift(), calcArray.shift()));
        operator = '';
      }
    } else {
      calcArray.push('error');
    }
    $screen.val(calcArray[0]);
    $screen.select();
  }
  $screen.keyup((e) => {
    if (e.which === ESC) {
      clear();
    } else if (e.which === ENTER) {
      calculate();
    } else if (calculator[e.key] && !($screen.val() === '' && e.key === '-')) {
      calculate();
      operator = e.key;
    }
  });
  $buttons.click(function buttonClick() {
    const buttonValue = $(this).text();
    if (buttonValue === 'C') {
      clear();
    } else if (buttonValue === '=') {
      calculate();
    } else if (calculator[buttonValue] && !($screen.val() === '' && buttonValue === '-')) {
      calculate();
      operator = buttonValue;
    } else {
      if (parseFloat($screen.val()) === calcArray[0]) {
        $screen.val('');
      }
      $screen.val(($screen.val() + buttonValue));
      $screen.focus();
    }
  });

  $screen.focus();

  // Add input validation to only allow numbers and operators
  $screen.keydown((e) => {
    // Allow: backspace, delete, escape and enter
    if ($.inArray(e.keyCode, [8, 9, 27, 13, 110]) !== -1 ||
    // Allow .
    (!e.shiftKey && e.keyCode === 190) ||
    // Allow: Ctrl+A, Command+A
    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right, down, up
    (e.keyCode >= 35 && e.keyCode <= 40)) {
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
});
