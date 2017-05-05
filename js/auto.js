/* global $*/
$(() => {
  const $screen = $('#screen');
  const $buttons = $('span');
  let calc = 0;
  let operator = '+';
  let screenValue = '';

  const calculator = { '+': function add(b) {
    calc += b;
  },
    '-': function subtract(b) {
      calc -= b;
      calc = parseFloat(calc.toFixed(2));
    },
    x: function multiply(b) {
      if (calc === 0) {
        calc = 1;
      }
      calc *= b;
      calc = parseFloat(calc.toFixed(2));
    },
    '÷': function divide(b) {
      if (b === 0) {
        calc = 'error';
      } else {
        calc /= b;
        calc = parseFloat(calc.toFixed(2));
      }
    },
    '/': function divide(b) {
      if (b === 0) {
        calc = 'error';
      } else {
        calc /= b;
        calc = parseFloat(calc.toFixed(2));
      }
    },
    '*': function multiply(b) {
      if (calc === 0) {
        calc = 1;
      }
      calc *= b;
      calc = parseFloat(calc.toFixed(2));
    },
    '': function restart(b) {
      calc = b;
    },
  };

  $screen.keyup(function calculateString(e) {
    // press esc
    if (e.which === 27) {
      calc = 0;
      $screen.val('');
      operator = '+';
      $screen.focus();
      screenValue = '';
      // press enter
    } else if (e.which === 13) {
      $(this).submit();
      screenValue = parseFloat($(this)[0].value, 10);
      calculator[operator](screenValue);
      $screen.val(calc);
      operator = '';
      // press operator
    } else if ((e.shiftKey && (e.keyCode === 187 || e.keyCode === 56)) ||
    (!e.shiftKey && (e.keyCode === 191 || e.keyCode === 189))) {
      $(this).submit();
      screenValue = parseFloat($(this)[0].value, 10);
      calculator[operator](screenValue);
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
      screenValue = '';
      $screen.val(calc);
      $screen.select();
    }
  });
  $buttons.click(function buttonClick() {
    const $buttonValue = $(this).text();
    if ($(this).attr('id') === 'clear') {
      calc = 0;
      $screen.val('');
      operator = '+';
      $screen.focus();
      screenValue = '';
    } else if ($(this).attr('id') === 'equals') {
      screenValue = parseFloat($screen[0].value, 10);
      calculator[operator](screenValue);
      $screen.val(calc);
      operator = '';
      $screen.focus();
    } else if ($(this).attr('class') === 'operator') {
      screenValue = parseFloat($screen[0].value, 10);
      calculator[operator](screenValue);
      operator = $buttonValue;
      screenValue = '';
      $screen.val(calc);
      $screen.select();
    } else {
      screenValue += $buttonValue;
      $screen.val(screenValue);
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
