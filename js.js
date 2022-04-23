const Game = {
    gusses: [],
    word: [],
    Theworde: 'print',
    squreNum: 0,
    AddSqure: function () {
        this.squreNum += 1
    },
    RemoveSqure: function (letter) {
        if (this.squreNum > 0) {
            letter.textContent = ''
            this.squreNum -= 1
            this.word.pop()
        }
    },
    ResetSqure: function () {
        if (this.gusses[this.gusses.length - 1] == this.Theworde) {
            alert('youwin')
        } else {
            this.squreNum = 0
            this.word = []
        }
    },
    AddGusse: function () {
        this.gusses.push(
            this.word
                .map((e, i) => {
                    if (this.Theworde.indexOf(e.letter) != -1) {
                        if (this.Theworde.indexOf(e.letter) == i) {
                            e.squre.style.background = 'green'
                            e.elem.style.background = 'green'
                        } else {
                            e.elem.style.background = 'red'
                            e.squre.style.background = 'red'
                        }
                    }
                    return e.letter
                })
                .join('')
        )
    },
    addToWord: function (val, elem, squre) {
        return this.word.push({ letter: val, elem: elem, squre: squre })
    },
    row: function () {
        return this.squreNum + this.gusses.length * 5
    },
}
const letters = document.querySelectorAll('.letter')
const keys = document.querySelectorAll('.key')
const handelKeyClick = (e) => {
    const val = e.target.textContent
    if (val === 'enter' && Game.squreNum % 5 === 0 && Game.squreNum !== 0) {
        Game.AddGusse()
        console.log(Game.gusses)
        console.log(Game.gusses[Game.gusses.length - 1])
        Game.ResetSqure()
    } else if (val === 'del') Game.RemoveSqure(letters[Game.row() - 1])
    else {
        if (
            (Game.squreNum % 5 !== 0 || Game.squreNum === 0) &&
            val !== 'enter' &&
            val !== 'del'
        ) {
            letters[Game.row()].textContent = val.toUpperCase()
            Game.AddSqure()
            Game.addToWord(val, e.target, letters[Game.row() - 1])
        }
    }
}
keys.forEach((key) => {
    key.addEventListener('click', handelKeyClick)
})
