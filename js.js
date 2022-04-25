const getData = async () => {
    const res = await fetch(
        'https://random-word-api.herokuapp.com/word?length=5'
    )
    const word = await res.json()

    if (
        word[0].split('').some((v, i, a) => {
            return a.lastIndexOf(v) !== i
        })
    )
        getData()
    else Game.word = word[0]
}
getData()
const letters = document.querySelectorAll('.letter')
const keys = document.querySelectorAll('.key')

const Game = {
    gusses: [],
    currGusse: [],
    word: 'print',
    currBox: 0,
    nextBox: function () {
        this.currBox += 1
    },
    prevBox: function (letter) {
        if (this.currBox > 0) {
            letter.textContent = ''
            this.currBox -= 1
            this.currGusse.pop()
        }
    },
    nextRow: function () {
        if (this.gusses[this.gusses.length - 1] == this.word) {
            alert('youwin')
        } else if (this.gusses.length >= 6) alert('Good luck next time')
        else {
            this.currBox = 0
            this.currGusse = []
        }
    },
    submitGusse: function () {
        this.gusses.push(
            this.currGusse
                .map((gusse, i) => {
                    setTimeout(() => {
                        gusse.squre.className += ' go'
                    }, 50 * i)
                    if (this.word.indexOf(gusse.letter) != -1) {
                        if (this.word.indexOf(gusse.letter) == i) {
                            gusse.squre.style.background = 'hsl(125, 67%, 44%)'
                            gusse.elem.style.background = 'hsl(125, 67%, 44%)'
                        } else {
                            gusse.elem.style.background = 'hsl(13, 88%, 68%)'
                            gusse.squre.style.background = 'hsl(13, 88%, 68%)'
                        }
                    }
                    return gusse.letter
                })
                .join('')
        )
    },
    addLetterToGusse: function (val, elem, squre) {
        return this.currGusse.push({ letter: val, elem: elem, squre: squre })
    },
    getRow: function () {
        return this.currBox + this.gusses.length * 5
    },
}
const handelKeyClick = (e) => {
    const val = e.target.textContent
    if (val === 'enter' && Game.currBox % 5 === 0 && Game.currBox !== 0) {
        Game.submitGusse()
        Game.nextRow()
    } else if (val === 'del') Game.prevBox(letters[Game.row() - 1])
    else {
        if (
            (Game.currBox % 5 !== 0 || Game.currBox === 0) &&
            val !== 'enter' &&
            val !== 'del'
        ) {
            letters[Game.getRow()].textContent = val.toUpperCase()
            Game.nextBox()
            Game.addLetterToGusse(val, e.target, letters[Game.getRow() - 1])
        }
    }
}

keys.forEach((key) => {
    key.addEventListener('click', handelKeyClick)
})
