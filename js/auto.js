/* global $*/
$(() => {
  const $screen = $('#screen');
  const $buttons = $('span');
  let calc = 0;
  let operator = '+';
  let screenValue = '';

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
  function calculate(currOperator, value) {
    const intValue = parseFloat(value, 10);
    if (value === 'ERROR' || calc === 'ERROR') {
      calc = 'ERROR';
      // calculate beginning with negative number
    } else if (value === '') {
      operator = '-';
    } else if (currOperator === '+') {
      calc += intValue;
    } else if (currOperator === '-') {
      calc -= (intValue);
    } else if (currOperator === 'x' || currOperator === '*') {
      if (calc === 0) {
        calc = 1;
      }
      calc *= (intValue);
      // calc = calc.toFixed(2);
    } else if (currOperator === '÷' || currOperator === '/') {
      if (value === '0') {
        calc = 'ERROR';
      } else {
        calc /= (intValue);
        calc = parseFloat(calc.toFixed(2));
      }
    }
  }
  $screen.keyup(function calculateString(e) {
    if (e.which === 27) {
      calc = 0;
      $screen.val('');
      operator = '+';
      $screen.focus();
      screenValue = '';
    } else if (e.which === 13) {
      $(this).submit();
      screenValue = $(this)[0].value;
      calculate(operator, screenValue);
      $screen.val(calc);
      operator = '';
    } else if ((e.shiftKey && (e.keyCode === 187 || e.keyCode === 56)) ||
    (!e.shiftKey && (e.keyCode === 191 || e.keyCode === 189))) {
      $(this).submit();
      screenValue = $(this)[0].value;
      calculate(operator, screenValue);
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
      screenValue = $screen[0].value;
      calculate(operator, screenValue);
      $screen.val(calc);
      operator = '';
      $screen.focus();
    } else if ($(this).attr('class') === 'operator') {
      screenValue = $screen[0].value;
      calculate(operator, screenValue);
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
});
