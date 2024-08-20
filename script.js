import * as Game from './modules/game.js';

const field = document.querySelector('.field');
const nameUser = document.querySelector('.name');
const infoNameUser = document.querySelector('.info-name > span');
const infoFlag = document.querySelector('.info-flag');
const infoTimer = document.querySelector('.info-timer');

const modalStart = document.querySelector('.wrapper-modal-start');
const modalFinish = document.querySelector('.wrapper-modal-finish');
const modalLeader = document.querySelector('.wrapper-modal-leader');
const game = document.querySelector('.game');

const rbTheme = document.querySelectorAll('input[name="theme"]');
const rbComplexity = document.querySelectorAll('input[name="complexity"]');

const gameField = document.querySelector('.game');

const leaderBoard = document.querySelector('.leader-board');

const buttonStart = document.querySelector('.button-start');
const buttonGiveUp = document.querySelector('.button-give-up');
const buttonLeader = document.querySelector('.button-leader');
const buttonTryAgain = document.querySelector('.button-try-again');
const buttonClose = document.querySelector('.close');

const timer = document.querySelector('.time');
const score = document.querySelector('.score');

let newGame;

function generateField(n) {
  let newField = document.createElement('table');
  newField.classList.add("table");
  for (let i = 0; i < n; i += 1) {
    let row = document.createElement('tr');
    for (let j = 0; j < n; j += 1) {
      let cell = document.createElement('td');
      cell.style.height = `${500 / newGame.lengthField - 2}px`;
      cell.style.width = `${500 / newGame.lengthField - 2}px`;
      cell.classList.add("td");
      row.append(cell);
    }
    newField.append(row);
  }
  return newField;
}

function showField() {
  const table = document.querySelector('.table');
  newGame.openField.forEach((row, indexRow) => {
    row.forEach((cell, indexCol) => {
      if (cell === true) {
        if (newGame.field[indexRow][indexCol] !== 0) {
          table.rows[indexRow].cells[indexCol].textContent = newGame.field[indexRow][indexCol];
        }
        table.rows[indexRow].cells[indexCol].setAttribute('num', newGame.field[indexRow][indexCol]);
      } else if (cell === 1) {
        table.rows[indexRow].cells[indexCol].innerHTML = '&#128681;'
        // insertAdjacentHTML('afterbegin', '&#128681');
        table.rows[indexRow].cells[indexCol].setAttribute('num', 'F');
      } else if (cell === false) {
        table.rows[indexRow].cells[indexCol].textContent = '';
        table.rows[indexRow].cells[indexCol].removeAttribute('num');
      }
    })
  })
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawMine(cell, flag) {
  if (!flag) { // lose 
    cell.setAttribute('num', 'ExpM');
    cell.innerHTML = '&#128165';
  } else {
    cell.setAttribute('num', 'M');
    cell.innerHTML = '&#128205'; //&#10024;
  }
  await delay(100);
}

async function showMines(flag) {
  const table = document.querySelector('.table');

  for (const el of newGame.mines) {
    await drawMine(table.rows[el.row].cells[el.col], flag);
  }

  if (flag) {
    gameField.classList.add('fade-out');
  }

  //const callbacks = [];
  // 
  // for (let i = 0; i < newGame.lengthField; i++) {
  //   for (let j = 0; j < newGame.lengthField; j++) {
  //     if (newGame.field[i][j] === true) {
  //       if (!flag) { // lose
  //         callbacks.push(new Promise((resolve) => {
  //           setTimeout(() => {
  //             table.rows[i].cells[j].setAttribute('num', 'ExpM');
  //             table.rows[i].cells[j].innerHTML = '&#128165';
  //             return resolve('ok');
  //           }, (callbacks.length) * 500);
  //         }))
  //       } else {     // win
  //         callbacks.push(new Promise((resolve) => {
  //           setTimeout(() => {
  //             table.rows[i].cells[j].setAttribute('num', 'M');
  //             table.rows[i].cells[j].innerHTML = '&#128205'; //&#10024;
  //             console.log(i, j)
  //             return resolve('ok');
  //           }, (callbacks.length) * 1000);
  //         }))
  //       }
  //     }
  //   }
  // }
  // if (flag) {
  //   await Promise.all(callbacks);
  //   gameField.classList.add('fade-out');
  // }
  // return await Promise.all(callbacks);

  //

  // await Promise.all(callbacks);
  // setTimeout(() => {
  //   console.log('fff');
  //   modalFinish.classList.remove('hide');
  // }, "1000");

  // for (let i = 0; i < newGame.lengthField; i++) {
  //   for (let j = 0; j < newGame.lengthField; j++) {
  //     if (newGame.field[i][j] === true) {
  //       if (!flag) { // lose
  //         callbacks.push(new Promise((resolve, reject) => {
  //           setTimeout(() => {
  //             table.rows[i].cells[j].setAttribute('num', 'ExpM');
  //             table.rows[i].cells[j].innerHTML = '&#128165';
  //             console.log(i, j);
  //             i++;
  //             return resolve(i, j);
  //           }, (callbacks.length) * 1000);
  //         }))
  //       } else {     // win
  //         setTimeout(() => {
  //           table.rows[indexRow].cells[indexCol].setAttribute('num', 'M');
  //           table.rows[indexRow].cells[indexCol].innerHTML = '&#128205'; //&#10024;
  //         }, (i) * 1000);
  //         i++;
  //         gameField.classList.add('fade-out');
  //       }
  //     }
  //   }
  // }

  // await Promise.all(callbacks);


  // newGame.field.forEach((row, indexRow) => {
  //   row.forEach((cell, indexCol) => {
  //     if (cell === true) {
  //       if (!flag) { // lose
  //         callbacks.push(new Promise((resolve, reject) => {
  //           setTimeout(() => {
  //             table.rows[indexRow].cells[indexCol].setAttribute('num', 'ExpM');
  //             table.rows[indexRow].cells[indexCol].innerHTML = '&#128165';
  //             i++;
  //             return resolve(console.log(i));
  //           }, (i) * 1000);
  //         }))
  //         console.log(indexCol);
  //       } else {     // win
  //         setTimeout(() => {
  //           table.rows[indexRow].cells[indexCol].setAttribute('num', 'M');
  //           table.rows[indexRow].cells[indexCol].innerHTML = '&#128205'; //&#10024;
  //         }, (i) * 500);
  //         i++;
  //         gameField.classList.add('fade-out');
  //       }
  //     }
  //   })
  // });
}

field.addEventListener('click', (e) => {
  // нажатие на ячейку
  if (e.target.tagName == 'TD' && (newGame.status === 'init' || newGame.status === 'start')) {
    if (newGame.status === 'init') {
      newGame.startGame();
    }

    let row = e.target.parentNode.rowIndex;
    let cell = e.target.cellIndex;

    newGame.checkMine(row, cell);

    if (newGame.status === 'lose') {
      buttonGiveUp.setAttribute("disabled", "");
      field.classList.add('shake');

      modalFinish.childNodes[1].childNodes[1].classList.add('lose');

      showMines(false).then(res => { showFinishModal() });

      timer.textContent = ('00' + newGame.time).slice(-3);
      score.textContent = ('00' + newGame.score).slice(-3);
    } else if (newGame.status === 'win') {
      buttonGiveUp.setAttribute("disabled", "");
      showField();
      showMines(true).then(res => { showFinishModal() });

      console.log(newGame.score);

      timer.textContent = ('00' + newGame.time).slice(-3);
      score.textContent = ('00' + newGame.score).slice(-3);

      saveResultGame();
    } else {
      showField();
    }
  }
})

field.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  // нажатие на ячейку правая кнопка
  if (e.target.tagName == 'TD' && (newGame.status === 'init' || newGame.status === 'start')) {
    if (newGame.status === 'init') {
      newGame.startGame();
    }

    let row = e.target.parentNode.rowIndex;
    let cell = e.target.cellIndex;

    newGame.flagCell(row, cell);
    showField();

    infoFlag.textContent = newGame.colMine - newGame.colFindMine;

    if (newGame.status === 'win') {
      showField();
      showMines(true).then(res => { showFinishModal() });
      console.log(newGame.score);
      timer.textContent = ('00' + newGame.time).slice(-3);
      score.textContent = ('00' + newGame.score).slice(-3);

      saveResultGame();
    }
  }
})

async function showFinishModal() {
  await delay(3000);
  modalFinish.classList.remove('hide');
  game.classList.add('hide');
}

function saveSessionStorage(name, theme) {
  sessionStorage.setItem('name', name);
  sessionStorage.setItem('theme', document.querySelector('input[name="theme"]:checked').id);
}

function saveResultGame() {
  let games = [];
  if (localStorage.getItem('games') !== null) { games = JSON.parse(localStorage.getItem('games')); }
  games.push({ score: newGame.score, time: newGame.time, name: newGame.name, level: newGame.complexity });
  games.sort((a, b) => a.score < b.score ? 1 : -1);
  localStorage.setItem('games', JSON.stringify(games.slice(0, 10)));
}

function showLeaders() {
  let users = JSON.parse(localStorage.getItem('games'));
  leaderBoard.replaceChildren();

  let pos = document.createElement("div");
  pos.textContent = '№';
  leaderBoard.append(pos);

  let score = document.createElement("div");
  score.textContent = 'Score';
  leaderBoard.append(score);

  let time = document.createElement("div");
  time.textContent = 'Time';
  leaderBoard.append(time);

  // let date = document.createElement("div");
  // score.textContent = 'Date';
  // leaderBoard.append(date);

  let name = document.createElement("div");
  name.textContent = 'Name';
  leaderBoard.append(name);

  let level = document.createElement("div");
  level.textContent = 'Level';
  leaderBoard.append(level);

  let user;
  for (let i = 0; i < users.length; i++) {
    user = users[i];
    let pos = document.createElement("div");
    pos.textContent = i + 1;
    leaderBoard.append(pos);

    let score = document.createElement("div");
    score.textContent = user.score;
    leaderBoard.append(score);

    let time = document.createElement("div");
    time.textContent = user.time;
    leaderBoard.append(time);

    // let date = document.createElement("div");
    // score.textContent = user.date;
    // leaderBoard.append(date);

    let name = document.createElement("div");
    name.textContent = user.name;
    leaderBoard.append(name);

    let level = document.createElement("div");
    level.textContent = user.level;
    leaderBoard.append(level);
  }
}

buttonGiveUp.addEventListener('click', (e) => {
  buttonGiveUp.setAttribute("disabled", "");
  newGame.giveUpGame();

  field.classList.add('shake');
  modalFinish.childNodes[1].childNodes[1].classList.add('lose');

  showMines(false).then(res => { showFinishModal() });

  timer.textContent = ('00' + newGame.time).slice(-3);
  score.textContent = ('00' + newGame.score).slice(-3);
})

buttonTryAgain.addEventListener('click', (e) => {
  location.reload();
})

rbTheme.forEach(el => {
  el.addEventListener('change', (e) => {
    if (el.checked && el.id === 'google') {
      document.body.removeAttribute('dark');
    } else {
      document.body.setAttribute('dark', '');
    }
  })
});

nameUser.addEventListener('input', () => {
  if (nameUser.value.length > 3) {
    buttonStart.removeAttribute("disabled");
  } else {
    buttonStart.setAttribute("disabled", "true");
  }
})

buttonLeader.addEventListener('click', () => {
  modalLeader.classList.remove('hide');
  modalStart.classList.add('hide');
  if (localStorage.getItem('games') !== null) {
    showLeaders();
  }
})

buttonClose.addEventListener('click', () => {
  modalLeader.classList.add('hide');
  modalStart.classList.remove('hide');
})

buttonStart.addEventListener('click', () => {
  modalStart.classList.add('hide');
  game.classList.remove('hide');

  newGame = new Game.game(nameUser.value,
    document.querySelector('input[name="complexity"]:checked').id,
    infoTimer);

  const newField = generateField(newGame.lengthField);
  field.append(newField);

  infoNameUser.textContent = newGame.name;
  infoFlag.textContent = newGame.colMine;

  saveSessionStorage(newGame.name,);
})

window.addEventListener('load', () => {
  if (sessionStorage.getItem('name') !== null) {
    nameUser.value = sessionStorage.getItem('name');
    if (nameUser.value !== '') { buttonStart.removeAttribute("disabled"); }
  }

  if (sessionStorage.getItem('theme') !== null) {
    if (sessionStorage.getItem('theme') === 'google') {
      rbTheme[0].setAttribute('checked', true);
      rbTheme[1].removeAttribute('checked');

      document.body.removeAttribute('dark');
    } else {
      rbTheme[1].setAttribute('checked', true);
      rbTheme[0].removeAttribute('checked');

      document.body.setAttribute('dark', '');
    }
  }
});


console.log('Самооценка: 60\n1 Вёрстка +10\n2 Логика игры +10\n3 Реализовано завершение игры при достижении игровой цели +10\n4 По окончанию игры выводится её результат +10\n5 Есть таблица результатов - лучшие 10 игр +10\n6 Анимация и настройки игры +10\n7 Очень высокое качество оформления приложения/дополнительный не предусмотренный в задании функционал - переключение тем оформления +10');