import {
  Quiz as Quiz,
  eventType as eventType,
  Timer as Timer,
  Controller as Controller,
  SideNav as SideNav,
  Confirm as Confirm,
} from "./ui/interface.js";
var eventtyp = new eventType();
var gameflow = new Controller();
var timer = new Timer(gameflow);
// const settings = new HandleSettings({ timer: timer });
const sidemenu = SideNav({ timer: timer }, eventtyp);
var openMenuBtn = document.querySelector("#opensidemenu");
var closeMenuBtn = document.querySelector("#closesidemenu");
openMenuBtn.addEventListener(eventtyp.click, sidemenu.toggle);
closeMenuBtn.addEventListener(eventtyp.click, sidemenu.toggle);
sidemenu.setContent("menu");
sidemenu.render();
sidemenu.onOpen(resetQuiz);
const startwindow = Confirm({
  path: document.querySelector(".confirmwindow"),
  onConfirm: onConfirm,
});

gameflow.quizShouldPause = false;
function onConfirm() {
  startwindow.hide();
  gameflow.quizShouldPause = false;
  startQuiz();
}

const log = console.log;

var quizIF = new Quiz(gameflow);
quizIF.setQuestionType("sum");
quizIF.setDifficutly(1);

var gameIteration;
gameflow.register("newRound", startQuiz);
function startQuiz() {
  timer.reset();
  /*         if (sidemenu.isOpen()) {
            log("sidemenu open: "+sidemenu.isOpen())
            gameflow.quizShouldPause = true
            timer.reset();
            return
        } */
  gameIteration = setTimeout(() => {
    quizIF.nextQuestion();
    quizIF.render();

    timer.start();
  }, 2500);
}

function resetQuiz() {
  quizIF.resetQuiz();
  timer.reset();
}

(function handleHash() {
  // set initial hash-values on first page load
  window.location.hash = "#menu=menu";

  var previousQueries = {
    menu: "",
    quizType: "",
  };

  const getQueries = (hash) => {
    var queryTypePattern = /([a-z]+)=/;
    var queryPattern = /=([a-z]+)/;

    var queryType = hash.match(queryTypePattern);
    var query = hash.match(queryPattern);
    return {
      ref: queryType[1],
      query: query[1],
    };
  };
  const compareQueries = (queries) => {
    if (previousQueries.menu !== queries.menu) {
      previousQueries.menu = queries.menu;
      sidemenu.setContent(queries.menu);
    }
    if (previousQueries.quizType !== queries.quizType) {
      previousQueries.quizType = queries.quizType;
      quizIF.setQuestionType(queries.quizType);
      gameflow.publish("newRound");
    }
  };
  const reactToQuery = (queries) => {
    switch (queries.ref) {
      case "menu":
        sidemenu.setContent(queries.query);

        break;
      case "quiz":
        quizIF.setQuestionType(queries.query);
        startwindow.show();
        sidemenu.close();

        // quizIF.render()
        // gameflow.publish("newRound")

        break;
      default:
        break;
    }
  };
  const replaceHash = (queries) => {
    var newHashValueForURL = `#menu=${queries.menu}&quiz=${queries.quizType}`;
    window.location.hash = newHashValueForURL;
  };
  window.addEventListener("hashchange", (ev) => {
    ev.preventDefault();
    var hashValue = location.hash.split("#")[1];
    var queries = getQueries(hashValue);
    // compareQueries(queries)
    reactToQuery(queries);
    // replaceHash(queries);
  });
})();
