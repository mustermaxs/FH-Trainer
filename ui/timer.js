class Timer {
  constructor(gameflow) {
    this.gameflow = gameflow;
    this.progress;
    this.timerIsStopped = true;
    this.availableTimeSeconds = 10;
    this.timePastSeconds = 0;
    this.timeRemainingSeconds = 0;
    this.timePercentage = 0;
    this.timerprogressDOM = document.querySelector("#timerfull");
  }

  set time(availableTimeSeconds) {
    this.availableTimeSeconds = availableTimeSeconds;
  }

  start() {
    //
    // this.reset();
    this.timerIsStopped = true;
    this.gameflow.timeIsUp = false;
    this.render();

    this.cycle = setInterval(() => {
      if (
        this.timePastSeconds >= this.availableTimeSeconds &&
        !this.gameflow.answerSubmitted
      ) {
        this.gameflow.timeIsUp = true;
        console.log("CYCLE ");
        console.log("av.time: " + this.availableTimeSeconds);
        // this.reset();
        this.gameflow.publish("newRound");
      } else {
        this.render();
        this.timePastSeconds += 0.1;
      }
    }, 100);
  }
  stop() {
    //
  }
  get percentage() {
    return Math.round((this.timePastSeconds / this.availableTimeSeconds) * 100);
  }
  reset() {
    clearInterval(this.cycle);
    this.timerIsStopped = !this.timerIsStopped;
    this.timePastSeconds = 0;
    this.render();
  }
  render() {
    /*     this.progress = getPercentage(
        this.timePastSeconds,
        this.availableTimeSeconds
      );
      this.timerprogressDOM.style.width = `${this.progress}%`; */

    this.timerprogressDOM.style.width = `${this.percentage}%`;
  }
}

export { Timer };
