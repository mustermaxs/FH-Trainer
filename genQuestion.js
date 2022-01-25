function estimateSum() {
  var data = {
    solution: null,
    questionString: null,
    answersList: null,
  };
  var summandsMin = 2;
  var summandsMax = 2;
  var difficulty = 3;
  var nrOfDigits;
  var digitsMin;
  var digitsMax;

  const setDifficulty = (min, max) => {
    summandsMin = min || summandsMin;
    summandsMax = max || summandsMax;
  };

  const setDigits = (digits) => {
    nrOfDigits = digits;
  };
  const genQuestion = () => {
    var numberOfSummands = getRandomInt(summandsMin, summandsMax);
    var summandsList = [];
    var operatorsList = [];
    for (var i = 1; i <= numberOfSummands; i++) {
      var randomSummand = genNumberWithDigits(nrOfDigits);
      summandsList.push(randomSummand);
      operatorsList.push("+");
    }
    var solution = summandsList.reduce(
      (prevVal, currentVal) => prevVal + currentVal
    );
    var equationString = equationToString({
      summands: summandsList,
      operatorsList: operatorsList,
      solution: solution,
    });
    data.solution = solution;
    data.questionString = equationString;
    data.answersList = genAnswers({
      solution: solution,
      minError: 90,
      maxError: 110,
      roundSolution: "int",
    });
  };

  return {
    newQuestion: () => {
      genQuestion();
    },
    data: data,
    setDifficulty: (min, max) => {
      setDifficulty(min, max);
    },
    setDigits: (digits) => {
      setDigits(digits);
    },
  };
}

function genNumberWithDigits(nrOfDigits) {
  var min = 10 ** (nrOfDigits - 1);
  var max = 10 ** nrOfDigits - 1;
  return getRandomInt(min, max);
}

function equationToString(config) {
  var equationString = "";
  var summandsListLength = config.summands.length;
  for (var i = 0; i < summandsListLength; i++) {
    if (i === summandsListLength - 1) {
      equationString += ` ${config.summands[i].toString()} = ?`;
      return equationString;
    }
    equationString += `${config.summands[i]} ${config.operatorsList[i]} `;
  }
}

function genAnswers(
  config = { solution, minError, maxError, roundSolution: true }
) {
  const numberOfAnswers = 5;
  var answersList = [];
  var slots = [];

  var correctResultIndex = getRandomInt(0, 4);
  console.log(correctResultIndex);

  const genWrongSolution = (correctResult) => {
    var percentage = getRandPercentage(config.minError, config.maxError);
    var wrongSolution = correctResult * percentage;

    switch (config.roundSolution) {
      case "decimal":
        wrongSolution = round(wrongSolution);
        break;
      case "int":
        wrongSolution = Math.round(wrongSolution);
        break;
      default:
        break;
    }
    /*     if (config.roundSolution) {
      wrongSolution = Math.round(wrongSolution);
    } */
    return wrongSolution;
  };

  const sortSolutions = () => {
    for (var i = 0; i < numberOfAnswers; i++) {
      var solution =
        correctResultIndex === i
          ? config.solution
          : genWrongSolution(config.solution);
      answersList[i] = solution;
    }
  };

  sortSolutions();
  return answersList;
}

function round(num) {
  var m = Number((Math.abs(num) * 1).toPrecision(15));
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function getRandPercentage(min, max) {
  return getRandomInt(min, max) / 100;
}

function getPercentage(x, y) {
  return Math.floor((x / y) * 100);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
