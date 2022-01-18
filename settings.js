function HandleSettings(componentsColl) {
  const components = componentsColl;

  const setTime = (availableTimeSeconds) => {
    components.timer.time = parseInt(availableTimeSeconds);
  };

  return {
    setTime: (availableTimeSeconds) => {
      setTime(availableTimeSeconds);
    },
  };
}
