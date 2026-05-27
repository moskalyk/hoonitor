const gates = {
    'add': (arg1, arg2) => {
      return parseInt(arg1) + parseInt(arg2)
    },
    '@': (arg) => {
      return arg
    }
}
const stairs = `
    return (func) => {
        return (args) => {
            return gates[func](...args)
        }
    }
`
const runes = [':-', '^-']
const caseByCase = (rune) => `case '${rune}': ${stairs} break;`
const runeRunner = eval(`const appendage = (rune) => {switch(rune){${runes.reduce((initial, rune) => {
    return initial + caseByCase(rune)
}, '')}}}; const returnFunc = () => appendage; returnFunc()`)

const compiler = (hoon, depth, verbose) => {
    try {
        const isRune = hoon.slice(0,2)
        const pattern = /(?<rune>\S+)\s{2}(?<func>\w+)\s{2}(?<arg1>.*)\s{2}(?<arg2>.*)/;

        if(runes.includes(isRune)){
            const match = hoon.match(pattern)
            const isRuneArg1 = match.groups.arg1.slice(0,2)
            const isRuneArg2 = match.groups.arg2.slice(0,2)
            
            if(runes.includes(isRuneArg1)){
                verbose && console.log('depth: ', depth+1)
                return runeRunner(match.groups.rune)(match.groups.func)([compiler(match.groups.arg1, depth+1), match.groups.arg2])
            } 
            
            if(!runes.includes(isRuneArg2)){
                const pattern = /(?<rune>\S+)\s{2}(?<func>\w+)\s{2}(?<arg1>\S+)\s{2}(?<arg2>.*)/;
                const match2 = hoon.match(pattern)
                verbose && console.log('depth: ', depth+1)
                return runeRunner(match.groups.rune)(match.groups.func)([match2.groups.arg1, compiler(match2.groups.arg2, depth+1)])
            } 
        } 
        const match2 = hoon.match(pattern)
                // console.log('depth: ', depth+1)

        return runeRunner(match2.groups.rune)(match2.groups.func)([match2.groups.arg1, match2.groups.arg2])
    }catch(err) {
        const pattern = /(?<rune>\S+)\s{2}(?<func>\w+)\s{2}(?<arg1>.*)\s{2}(?<arg2>.*)/;
        const match = hoon.match(pattern)
        verbose && console.log('depth: ', depth+1)
        return runeRunner(match.groups.rune)(match.groups.func)([match.groups.arg1, match.groups.arg2])
    }
}

let text = "^-  @  1";
let hoon1 = ":-  add  1  2";
let hoon2 = ":-  add  1  :-  add  1  2";
let hoon3 = ":-  add  1  :-  add  :-  add  1  :-  add  1  2";// <|>
let hoon5 = ":-  add  :-  add  1  2  2";

const verbose = false
console.log(3 == compiler(hoon1, 0, verbose)) // true
console.log(4 == compiler(hoon2, 0, verbose)) // true
console.log(5 == compiler(hoon3, 0, verbose)) // true
console.log(5 == compiler(hoon5, 0, verbose)) // true

module.exports = {compiler}
