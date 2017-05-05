/* global $*/
$(() => {
  const $screen = $('#screen');
  const $buttons = $('span');
  const calc = 0;
  let operator = '';
  const screenValue = '';
  let calcArray = [];

  const calculator = {
    '+': function add(a, b) {
      const calcResult = a + b;
      calcArray.push(calcResult);
    },
    '-': function subtract(a, b) {
      let calcResult = a - b;
      calcResult = parseFloat(calcResult.toFixed(2));
      calcArray.push(calcResult);
    },
    x: function multiply(a, b) {
      if (a === 0) {
        a = 1;
      }
      let calcResult = a * b;
      calcResult = parseFloat(calcResult.toFixed(2));
      calcArray.push(calcResult);
    },
    '÷': function divide(a, b) {
      if (b === 0) {
        calcArray.push('error');
      } else {
        let calcResult = a / b;
        calcResult = parseFloat(calcResult.toFixed(2));
        calcArray.push(calcResult);
      }
    },
    '/': function divide(a, b) {
      if (b === 0) {
        calcArray.push('error');
      } else {
        let calcResult = a / b;
        calcResult = parseFloat(calcResult.toFixed(2));
        calcArray.push(calcResult);
      }
    },
    '*': function multiply(a, b) {
      let calcResult = a * b;
      calcResult = parseFloat(calcResult.toFixed(2));
      calcArray.push(calcResult);
    },
    '': function restart(a, b) {
      const calcResult = a;
      calcArray.push(calcResult);
    },
  };

  $screen.keyup(function calculateString(e) {
    // press esc
    if (e.which === 27) {
      calcArray = [];
      $screen.val('');
      operator = '+';
      $screen.focus();
      // press enter
    } else if (e.which === 13) {
      $(this).submit();
      calcArray.push(parseFloat($(this)[0].value, 10));
      if (calcArray.length > 1) {
        calculator[operator](calcArray.shift(), calcArray.shift());
      }
      $screen.val(calcArray[0]);
      operator = '';
      // press operator
    } else if ((e.shiftKey && (e.keyCode === 187 || e.keyCode === 56)) ||
    (!e.shiftKey && (e.keyCode === 191 || e.keyCode === 189))) {
      $(this).submit();
      calcArray.push(parseFloat($(this)[0].value, 10));
      if (calcArray.length > 1) {
        calculator[operator](calcArray.shift(), calcArray.shift());
      }

      if (e.shiftKey && e.keyCode === 187) {
        operator = '+';
      }
      if (e.shiftKey && e.keyCode === 56) {
        operator = '*';
      }
      if (!e.shiftKey && e.keyCode === 189) {
        operator = '-';
      }
      if (!e.shiftKey && e.keyCode === 191) {
        operator = '/';
      }
      $screen.val(calcArray[0]);
      $screen.select();
    }
  });
  $buttons.click(function buttonClick() {
    const $buttonValue = $(this).text();
    if ($(this).attr('id') === 'clear') {
      calcArray = [];
      $screen.val('');
      operator = '';
      $screen.focus();
    } else if ($(this).attr('id') === 'equals') {
      calcArray.push(parseFloat($screen[0].value, 10));
      if (calcArray.length > 1) {
        calculator[operator](calcArray.shift(), calcArray.shift());
      }
      $screen.val('');
      $screen.val(calcArray[0]);
      operator = '';
      $screen.focus();
    } else if ($(this).attr('class') === 'operator') {
      calcArray.push(parseFloat($screen[0].value, 10));
      if (calcArray.length > 1) {
        calculator[operator](calcArray.shift(), calcArray.shift());
      }
      operator = $buttonValue;
      $screen.val('');
      $screen.val(calcArray[0]);
      $screen.select();
    } else {
      if ((1 * $screen.val()) === calcArray[0]) {
        $screen.val('');
      }
      $screen.val(($screen.val() + $buttonValue));
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
