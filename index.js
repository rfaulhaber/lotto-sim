class Ticket {
  constructor(numbers) {
    if (numbers === undefined) {
      this.numbers = this.init();
    } else {
      this.numbers = numbers;
    }
  }

  init() {
    const list = [];
    for (let i = 0; i < 5; i++) {
      let number = powerball(false);

      if (!list.includes(number)) {
        list.push(number);
      } else {
        number = powerball(false);
        while (list.includes(number)) {
          number = powerball(false);
        }

        list.push(number);
      }
    }

    list.sort(intSort);
    list.push(powerball(true));
    return list;
  }

  isWinner(numbers) {
    if (this.numbers.length !== numbers.length) return false;

    for (let i = 0; i < numbers.length; i++) {
      if (this.numbers[i] !== numbers[i]) {
        return false;
      }
    }

    return true;
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function powerball(isRed) {
  if (isRed) {
    return rand(1, 26); //18, 26
  } else {
    return rand(1, 69);// 48, 69
  }
}

function newDraw() {
  const list = [];
  for (let i = 0; i < 5; i++) {
    let number;
    if (i < 5) {
      number = powerball(false);
    }

    if (!list.includes(number) || i === 5) {
      list.push(number);
    } else if (list.includes(number)) {
      number = powerball(false);
      while (list.includes(number)) {
        number = powerball(false);
      }

      list.push(number);
    }
  }

  list.sort(intSort);
  list.push(powerball(true));
  return list;
}

function intSort(a, b) {
  return a - b;
}

function makeTickets(amount) {
  let tickets = [];
  for (let i = 0; i < amount; i++) {
    tickets.push(new Ticket());
  }

  return tickets;
}

function containsWinner(tickets, draw) {
  let ret = false;
  tickets.forEach((ticket) => {
    if (ticket.isWinner(draw)) {
      ret = true;
    }
  });

  return ret;
}

if (process.argv[2] === undefined) {
  let ticket = new Ticket();
  let draw = newDraw();
  let counter = 1;
  let isWinner = ticket.isWinner(draw);

  console.log("Ticket: ", ticket.numbers, "\tDraw: ", draw, "\tIs winner?", isWinner, "\tCount: ", counter);

  while (!isWinner) {
    ticket = new Ticket();
    draw = newDraw();
    counter++;
    isWinner = ticket.isWinner(draw);
    console.log("Ticket: ", ticket.numbers, "\tDraw: ", draw, "\tIs winner?", isWinner, "\tCount: ", counter);
  }
} else {
  const amount = process.argv[2];
  let tickets = makeTickets(amount);
  let draw = newDraw();
  let counter = 1;

  let isWinner = containsWinner(tickets, draw);

  while (!isWinner) {
    tickets = makeTickets(amount);
    draw = newDraw();
    isWinner = containsWinner(tickets, draw);
    counter++;

    console.log("\tWinners?", isWinner, "\tCount: ", counter);
  }

  console.log("Tickets: ", tickets, "\tDraw: ", draw, "\tIs winner?", isWinner, "\tCount: ", counter);
}
