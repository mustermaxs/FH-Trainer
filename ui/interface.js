import { Timer } from "./timer.js";
import { eventType } from "./eventtyp.js";
import { SideNav } from "./sidenav.js";
import { Confirm } from "./popup.js";
export { Timer };
export { eventType };
export { SideNav };
export { Confirm };
export class Quiz {
  constructor(gameflow) {
    this.gameflow = gameflow;
    this.eventtyp = new eventType();
    this.getQuestionTypes;
    this.answerSection = document.querySelector("#answers");
    this.questionSection = document.querySelector("#question");
    this.componentsAreReady = false;

    /*     this.renderQuestion();
    this.renderAnswers(); */
  }

  setDifficutly(difficulty = 1) {
    this.questionData.setDifficulty(1);
  }

  setQuestionType(questionType) {
    switch (true) {
      case questionType === "sum":
        this.questionData = estimateSum();
        this.questionTypeSet = true;
        break;
      case questionType === "percent":
        this.questionData = estimatePercent();
        this.questionTypeSet = true;
        break;
      default:
        this.questionData = null;
        this.questionTypeSet = false;
        break;
    }
  }

  get question() {
    return this.questionData.data;
  }

  nextQuestion() {
    this.questionData.newQuestion();
  }

  get questionIsSet() {
    return this.questionTypeSet;
  }

  resetQuiz() {
    this.setQuestionType();
  }

  removeChildElements(parentNode) {
    while (parentNode.firstChild) {
      parentNode.firstChild.remove();
    }
  }
  renderQuestion() {
    this.questionsReady = false;

    this.removeChildElements(this.questionSection);
    var task = document.createElement("SPAN");
    task.setAttribute("class", "task");
    task.setAttribute("id", "question");
    task.textContent = this.questionData.data.questionString;
    this.questionSection.appendChild(task);
    this.questionsReady = true;
  }
  renderAnswers() {
    this.answersReady = false;
    this.removeChildElements(this.answerSection);
    for (const solution of this.questionData.data.answersList) {
      var elem = document.createElement("BUTTON");
      elem.setAttribute("class", "answerBox");
      elem.setAttribute("type", "button");
      elem.setAttribute("name", "solution");
      elem.setAttribute("value", solution);
      elem.textContent = solution;
      this.answerSection.appendChild(elem);
    }
    this.answersReady = true;
  }

  handleSubmit() {
    this.componentsBuilt().then(() => {
      document.querySelectorAll(".answerBox").forEach((answerBox) => {
        answerBox.addEventListener(this.eventtyp.click, (ev) => {
          if (this.gameflow.timeIsUp) {
            return;
          }
          this.gameflow.answerSubmitted = true;
          if (!this.answerIsCorrect(ev.target.value)) {
            ev.target.classList.add("wrong");
          }
          this.showSolution();
          setTimeout(() => {
            this.gameflow.publish("newRound");
            return;
          }, 0);
          //   }
        });
      });
    });
  }

  showSolution() {
    document
      .querySelector(`button[value="${this.questionData.data.solution}"]`)
      .classList.add("correct");
  }

  answerIsCorrect(submittedSolution) {
    var s = parseInt(submittedSolution);
    console.log(s);
    console.log(this.questionData.data.solution);
    if (submittedSolution == this.questionData.data.solution) {
      return true;
    }
    return false;
  }

  componentsBuilt() {
    return new Promise((res) => {
      if (this.answersReady && this.questionsReady) {
        res();
      }
    });
  }

  render() {
    this.gameflow.answerSubmitted = false;
    this.renderQuestion();
    this.renderAnswers();
    this.handleSubmit();
  }
}

/* function GameFlow() {
  this.registeredComponents = [];
  this.questionCounter = 0;
  this.numberOfQuestions = 10;
  const stopQuiz = () => {};
  const newRound = () => {
    if (this.questionCounter < this.numberOfQuestions - 1) {
      this.rowCounter += 1;
      this.registeredComponents.forEach((c) => {
        c();
      });
    }
  };
  const registerComponent = (component) => {
    this.registeredComponents.push(component);
  };
  return {
    register: (component) => {
      registerComponent(component);
    },
    questionIsDone: () => {
      newRound();
    },
    stopQuiz: () => {
      stopQuiz();
    },
  };
} */

function HandleAnswers() {}
export function Controller() {
  //
  var pubsubList = [];
  this.quizShouldPause = false;
  this.timeIsUp;

  const getTopicObj = (topic) => {
    for (var i = 0; i < pubsubList.length; i++) {
      if (pubsubList[i].topic === topic) {
        return i;
      }
    }
    return false;
  };

  var register = (topic, foo) => {
    var topicIndex = getTopicObj(topic);
    if (topicIndex === false) {
      var newTopicObj = {};
      newTopicObj.topic = topic;
      newTopicObj.foos = [];
      pubsubList.push(newTopicObj);
      topicIndex = pubsubList.length - 1;
    }
    pubsubList[topicIndex].foos.push(foo);
    console.log(pubsubList);
  };

  var publish = (topic) => {
    var topicIndex = getTopicObj(topic);
    pubsubList[topicIndex].foos.forEach((foo) => {
      foo();
    });
    /*     for (var i = 0; i < pubsubList.length; i++) {
          if (pubsubList[i].topic == topic) {
            pubsubList[i].foos.forEach((foo) => {
              foo();
            });
          }
        } */
  };

  return {
    register: (topic, foo) => {
      register(topic, foo);
    },
    publish: (topic) => {
      publish(topic);
    },
  };
}
