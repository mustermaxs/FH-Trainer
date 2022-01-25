export class Estimate {
  constructor() {
    this.data = {
      solution: null,
      questionString: null,
      answersList: null,
    };
  }
  genQuestion() {
    var numberOfSummands = getRandomInt(summandsMin, summandsMax);
    var summandsList = [];
    var operatorsList = [];
    for (var i = 1; i <= numberOfSummands; i++) {
      var randomSummand = getRandomInt(1000, 10000);
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
  }
}
