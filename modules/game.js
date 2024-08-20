export class game {
  constructor(name, complexity, infoTimer) {
    this._name = name;
    this._complexity = complexity;

    if (complexity === 'easy') {
      this.colMine = 5;
      this.lengthField = 8;
    } else if (complexity === 'normal') {
      this.colMine = 20;
      this.lengthField = 10;
    } else {
      this.colMine = 75;
      this.lengthField = 15;
    }

    this._mines = [];

    this.generateMine();
    this.generateNumber();

    this._colFindMine = 0;
    this._status = 'init';

    this._openField = Array(this.lengthField).fill().map(() => Array(this.lengthField));

    this._sec = 0;
    this.timerElement = infoTimer;

    this._score = 0;
  }

  get status() {
    return this._status;
  }

  get name() {
    return this._name;
  }
  get complexity() {
    return this._complexity;
  }

  get field() {
    return this._field;
  }

  get colFindMine() {
    return this._colFindMine;
  }

  get openField() {
    return this._openField;
  }

  get score() {
    return this._score;
  }

  get time() {
    return this._sec;
  }

  get mines() {
    return this._mines;
  }

  generateMine() {
    const m = this.colMine;
    const n = this.lengthField;
    let mine = Array(n).fill().map(() => Array(n));
    for (let i = 0; i < m; i += 1) {
      let row = getRandom(n);
      let col = getRandom(n);
      while (mine[row][col] === true) {
        row = getRandom(n);
        col = getRandom(n);
      }
      mine[row][col] = true;
      this._mines.push({ row, col });
    }
    this._field = mine;
  }

  generateNumber() {
    const m = this.colMine;
    const n = this.lengthField;
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        if (this._field[i][j] !== true) {
          this._field[i][j] = this.countNearMine(i, j);
        }
      }
    }
  }

  countNearMine(i, j) {
    const n = this.lengthField - 1;
    let col = 0;
    if (i !== 0) {
      if (j !== 0) {
        if (this._field[i - 1][j - 1] === true) { col += 1; }
      }
      if (this._field[i - 1][j] === true) { col += 1; }
      if (j !== n) {
        if (this._field[i - 1][j + 1] === true) { col += 1; }
      }
    }
    if (j !== n) {
      if (this._field[i][j + 1] === true) { col += 1; }
    }
    if (i !== n) {
      if (j !== n) {
        if (this._field[i + 1][j + 1] === true) { col += 1; }
      }
      if (this._field[i + 1][j] === true) { col += 1; }
      if (j !== 0) {
        if (this._field[i + 1][j - 1] === true) { col += 1; }
      }
    }
    if (j !== 0) {
      if (this._field[i][j - 1] === true) { col += 1; }
    }
    return col;
  }

  generateNearCell(i, j) {
    const n = this.lengthField - 1;
    let nearCells = [];
    let col = 0;
    if (i !== 0) {
      if (j !== 0) {
        nearCells.push([i - 1, j - 1]);
      }
      nearCells.push([i - 1, j]);
      if (j !== n) {
        nearCells.push([i - 1, j + 1]);
      }
    }
    if (j !== n) {
      nearCells.push([i, j + 1]);
    }
    if (i !== n) {
      if (j !== n) {
        nearCells.push([i + 1, j + 1]);
      }
      nearCells.push([i + 1, j]);
      if (j !== 0) {
        nearCells.push([i + 1, j - 1]);
      }
    }
    if (j !== 0) {
      nearCells.push([i, j - 1]);
    }
    return nearCells;
  }

  openCells(i, j) {
    if (this._openField[i][j] !== true && (this._openField[i][j] !== 1)) {
      if (this._field[i][j] === true) { return; }
      if (this._field[i][j] !== 0 && this.field[i][j] !== true) {
        this._openField[i][j] = true;
        { return }
      }
      if (this._field[i][j] === 0) {
        this._openField[i][j] = true;
        let nearCells = this.generateNearCell(i, j);
        for (let i = 0; i < nearCells.length; i += 1) {
          this.openCells(nearCells[i][0], nearCells[i][1]);
        }
      }
    }
  }

  flagCell(i, j) {
    if (this._openField[i][j] !== true) {
      if (this._openField[i][j] === 1) {
        this._openField[i][j] = false;
        this.minusFindMine();
      }
      else {
        this._openField[i][j] = 1;
        this.addFindMine();
      }
    }

    if (this._colFindMine === this.colMine && this.lengthField ** 2 === this._openField.flat().filter(Boolean).length) {
      this.stopGame('win');
    }
  }

  addFindMine() {
    return this._colFindMine += 1;
  }

  minusFindMine() {
    return this._colFindMine -= 1;
  }

  checkMine(i, j) {
    if (this._field[i][j] === true) {
      this.stopGame('lose');
    } else {
      this.openCells(i, j);
      if (this._colFindMine === this.colMine && this.lengthField ** 2 === this._openField.flat().filter(Boolean).length) {
        this.stopGame('win');
      }
    }
  }

  startGame() {
    this._status = 'start';
    this.id = setInterval(this.tic, 1000);
  }

  stopGame = (flag) => {
    clearInterval(this.id);
    if (flag === 'win') {
      this._status = 'win';
      console.log(this._complexity);

      if (this._complexity === 'easy') {
        this._score = (999 - this._sec * 50) < 0 ? 0 : 999 - this._sec * 50;
      }
      if (this._complexity === 'normal') {
        this._score = (999 - this._sec * 20) < 0 ? 0 : 999 - this._sec * 20;
      }
      if (this._complexity === 'difficult') {
        this._score = (999 - this._sec) < 0 ? 0 : 999 - this._sec;
      }
    } else if (flag === 'lose') {
      this._status = 'lose';
      this._score = 0;
    }
  }

  giveUpGame() {
    this.stopGame('lose');
  }

  tic = () => {
    this._sec++;
    if (this._sec > 998) { clearInterval(this.id); }
    this.timerElement.textContent = ('00' + this._sec).slice(-3);
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}