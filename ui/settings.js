export function HandleSettings(componentsColl) {
  const components = componentsColl;

  const setTime = (availableTimeSeconds) => {
    var availableTimeSeconds = availableTimeSeconds || 12;
    components.timer.time = parseInt(availableTimeSeconds);
  };
  const setDifficulty = (min, max) => {
    components.quiz.setDifficulty(min, max);
    console.log(`difficulty: min=${min} max =${max}`);
  };
  const setDigits = (digits) => {
    components.quiz.setDigits(digits);
  };
  const checkElement = (elem) => {
    //
    setTime(elem["setTime"]);
    setDifficulty(elem["minsum"], elem["maxsum"]);
    setDigits(elem["setDigits"]);
  };

  return {
    setTime: (availableTimeSeconds) => {
      setTime(availableTimeSeconds);
    },
    set: (elem) => {
      checkElement(elem);
    },
  };
}
