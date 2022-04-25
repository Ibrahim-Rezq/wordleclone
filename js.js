const letters = document.querySelectorAll('.letter');
const keys = document.querySelectorAll('.key');
const restart = document.querySelector('.restart');

const words = ['panda', 'super', 'words', 'islam', 'smile', 'party'];

class Game {
  constructor(word) {
    this.gusses = [];
    this.currGusse = [];
    this.word = word;
    this.currBox = 0;
  }

  nextBox = function () {
    this.currBox += 1;
  };
  prevBox = function (letter) {
    if (this.currBox > 0) {
      letter.textContent = '';
      this.currBox -= 1;
      this.currGusse.pop();
    }
  };
  nextRow = function () {
    if (this.gusses[this.gusses.length - 1] == this.word) {
      alert('youwin');
    } else if (this.gusses.length >= 6) alert('Good luck next time');
    else {
      this.currBox = 0;
      this.currGusse = [];
    }
  };
  submitGusse = function () {
    if (
      this.gusses.indexOf(
        this.currGusse.map((letter) => letter.letter).join('')
      ) < 0
    ) {
      this.gusses.push(
        this.currGusse
          .map((gusse, i) => {
            setTimeout(() => {
              gusse.squre.classList.add('go');
            }, 50 * i);
            console.log(this.word);
            if (this.word.indexOf(gusse.letter) != -1) {
              if (this.word.indexOf(gusse.letter) == i) {
                gusse.squre.classList.add('hot');
                gusse.elem.classList.add('hot');
              } else {
                gusse.squre.classList.add('cold');
                gusse.elem.classList.add('cold');
              }
            }
            return gusse.letter;
          })
          .join('')
      );
    } else {
      this.currGusse.map((gusse, i) => {
        gusse.squre.textContent = '';
      });
      alert('you alredy enterd this');
    }
  };
  addLetterToGusse = function (val, elem, squre) {
    return this.currGusse.push({ letter: val, elem: elem, squre: squre });
  };
  getRow = function () {
    return this.currBox + this.gusses.length * 5;
  };
  init = function () {
    this.gusses = [];
    this.currGusse = [];
    this.word = words[getRandomInt(words.length - 1)];
    this.currBox = 0;
    letters.forEach((letter) => {
      letter.textContent = '';
      letter.classList.remove('go', 'hot', 'cold');
    });
    keys.forEach((key) => {
      key.classList.remove('hot', 'cold');
    });
  };
}

const getRandom = (max = 1, min = 0) => {
  return Math.random() * (max - min) + min;
};
const getRandomInt = (max = 1, min = 0) => {
  return Math.floor(getRandom(max, min));
};

const game = new Game(words[getRandomInt(words.length - 1)]);

const handelKeyClick = (e) => {
  const val = e.target.textContent;
  if (val === 'enter' && game.currBox % 5 === 0 && game.currBox !== 0) {
    game.submitGusse();
    game.nextRow();
  } else if (val === 'del') game.prevBox(letters[game.getRow() - 1]);
  else {
    if (
      (game.currBox % 5 !== 0 || game.currBox === 0) &&
      val !== 'enter' &&
      val !== 'del'
    ) {
      letters[game.getRow()].textContent = val.toUpperCase();
      game.nextBox();
      game.addLetterToGusse(val, e.target, letters[game.getRow() - 1]);
    }
  }
};

keys.forEach((key) => {
  key.addEventListener('click', handelKeyClick);
});

restart.addEventListener('click', () => {
  game.init();
});
