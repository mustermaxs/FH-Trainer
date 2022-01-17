function estimatePercent() {
  var data = {
    solution: null,
    questionString: null,
    answersList: null,
  };
  var difficulty = 1;

  const setDifficulty = (level) => {
    difficulty = level;
  };
  var equationToString = (config) => {
    return `${config.percent}% von ${config.number} = ?`;
  };

  const genQuestion = () => {
    var randomPercentage = getRandomInt(1, 99);
    var randomNumber = getRandomInt(10, 1000);

    var solution = round(randomNumber * (randomPercentage / 100));
    data.solution = solution;
    var equationString = equationToString({
      percent: randomPercentage,
      number: randomNumber,
    });
    data.questionString = equationString;

    var answersList = genAnswers({
      solution: solution,
      minError: 95,
      maxError: 200,
      roundSolution: "decimal",
    });
    data.answersList = answersList;
    console.log("solution: " + solution);
    console.log("answers: " + answersList);
  };
  return {
    newQuestion: () => {
      genQuestion();
    },
    data: data,
    setDifficulty: (level) => {
      setDifficulty(level);
    },
  };
}
