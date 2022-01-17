var eventtyp = eventType();

function SumUI() {
  handleSubmit(questionData.sum);
}

function handleSubmit(solution) {
  document.querySelectorAll(".answerBox").forEach((solutionBtn) => {
    solutionBtn.addEventListener(eventtyp.click, (ev) => {
      if (solutionIsCorrect()) {
        //
      }
    });
  });
  //   document.querySelector("form").addEventListener("submit", (ev) => {
  /*     ev.preventDefault();
    document.ev.submitter.id
  }); */
}
