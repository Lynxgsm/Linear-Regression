//Loading library
const ml = require('ml-regression')
const csv = require('csvtojson')
const SLR = ml.SLR
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const csvFilePath = "Advertising.csv" //placeholder data
let csvData = [],
    X = [],
    y = [],
    regressionModel

function dressData() {
    csvData.forEach((row) => {
        X.push(f(row.Radio))
        y.push(f(row.Sales))
    })
}

csv().fromFile(csvFilePath).on('json', (jsonObj) => {
    csvData.push(jsonObj)
}).on('done', () => {
    dressData()
    performRegression()
})

function f(s) {
    return parseFloat(s)
}

function performRegression() {
    regressionModel = new SLR(X, y)
    console.log(regressionModel.toString(3))
    predictOutput()
}

function predictOutput() {
    rl.question("Enter input X for prediction: (Press Ctrl + C to exit)", (answer) => {
        console.log(`At X=${answer}, y=${regressionModel.predict(parseFloat(answer))}`)
        predictOutput()
    })
}