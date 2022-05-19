const { green, yellow, red } = require("colors/safe");

const isPrime = (number) => {
  if (number < 2) return false;

  for (let i = 2; i <= number / 2; i++) {
    if (number % i === 0) return false;
  }

  return true;
};

const coloring = (number, count, colorer) => {
  if (count % 2 === 0) {
    colorer = yellow;
    count ++;
  } else if (count % 3 === 0) {
    colorer = red;
    count = 1;
  } else {
    count ++;
  }
  console.log(colorer(number));
  return count;
}

const isNotNumbers = (number_1, number_2) => {
  number_1 = Number(number_1);
  number_2 = Number(number_2);
  return isNaN(number_1) || isNaN(number_2)
}

const trafficLights = (from, to) => {
  
  let count = 1;
  is_prime_number = false;
  
  if (isNotNumbers(from, to)) {
    console.log(red('Данные аргументы не являются числами'));
    return;
  }
  
  for (let number = from; number <= to; number++) {
    let colorer = green;
  
    if (isPrime(number)) {
      is_prime_number = true;
      count = coloring(number, count, colorer);
    }
  }

  if (!is_prime_number) {
    console.log(red('Данный диапазон не содержит простых чисел'));
    return;
  }
}

//
const from = process.argv[2];
const to = process.argv[3];
trafficLights(from, to);