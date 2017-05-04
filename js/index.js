/* global $*/
$(() => {
  const $screen = $('#screen');
  const $buttons = $('span');
  let calc = 0;
  let operator = '+';

  $screen.focus();

  // Add input validation to only allow numbers and operators
  $screen.keydown((e) => {
    // Allow: backspace, delete, escape and enter
    if ($.inArray(e.keyCode, [8, 9, 27, 13, 110]) !== -1 ||
    // Allow + and *
    (e.shiftKey && (e.keyCode === 187 || e.keyCode === 56)) ||
    // Allow /, -, and .
    (!e.shiftKey && (e.keyCode === 191 || e.keyCode === 189 || e.keyCode === 190)) ||
    // Allow: Ctrl+A, Command+A
    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right, down, up
    (e.keyCode >= 35 && e.keyCode <= 40)) {
      return;
    }
    // Stop the keypress if not a number
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  function calculate(currOperator, value) {
    // do not calcuate with ERROR as an input
    if (value === 'ERROR' || calc === 'ERROR') {
      calc = 'ERROR';
    // calculate beginning with negative number
    } else if (value === '') {
      operator = '-';
    } else if (currOperator === '+') {
      calc += (parseInt(value, 10));
    } else if (currOperator === '-') {
      calc -= (parseInt(value, 10));
    } else if (currOperator === 'x' || currOperator === '*') {
      if (calc === 0) {
        calc = 1;
      }
      calc *= (parseInt(value, 10));
    } else if (currOperator === '÷' || currOperator === '/') {
      if (value === '0') {
        calc = 'ERROR';
      } else {
        calc /= (parseInt(value, 10));
      }
    }
  }
  $screen.keyup(function calculateString(e) {
    if (e.which === 13) {
      let currValue = '';
      $(this).submit();
      const equation = $(this)[0].value.split('');
      for (let i = 0; i < equation.length; i++) {
        if (equation[i] === '+' || equation[i] === '*'
        || equation[i] === '-' || equation[i] === '/'
        || equation[i] === 'x' || equation[i] === '÷') {
          // calculate using current operator and currValue each time we encounter an operator
          calculate(operator, currValue);
          operator = equation[i];
          currValue = '';
        } else {
          currValue += equation[i];
        }
        // calculate at end of expression
      } calculate(operator, currValue);
      $screen.val(calc.toFixed(4));
      calc = 0;
      operator = '+';
      $screen.focus();
    }
    if (e.which === 27) {
      calc = 0;
      $screen.val('');
      operator = '+';
      $screen.focus();
    }
  });

  $buttons.click(function buttonClick() {
    const $buttonValue = $(this).text();
    if ($(this).attr('id') === 'clear') {
      calc = 0;
      $screen.val('');
      operator = '+';
      $screen.focus();
    } else if ($(this).attr('id') === 'equals') {
      let currValue = '';
      $screen.submit();
      const equation = $screen[0].value.split('');
      for (let i = 0; i < equation.length; i++) {
        if (equation[i] === '+' || equation[i] === '*'
        || equation[i] === '-' || equation[i] === '/'
        || equation[i] === '÷' || equation[i] === 'x') {
          // calculate using current operator and currValue when encounters operator
          calculate(operator, currValue);
          operator = equation[i];
          currValue = '';
        } else {
          currValue += equation[i];
        }
        // calculate at end of expression
      } calculate(operator, currValue);
      $screen.val(calc.toFIxed(4));
      calc = 0;
      $screen.focus();
    } else {
      $screen[0].value += ($buttonValue);
      $screen.focus();
    }
  });
});
