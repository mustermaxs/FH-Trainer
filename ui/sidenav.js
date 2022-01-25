import { HandleSettings } from "./settings.js";

export function SideNav(components, getEventType) {
  const menuOpenEvent = new CustomEvent("menuOpened");
  const menuCloseEvent = new CustomEvent("menuClosed");
  var inputElems = {};

  const eventtyp = getEventType;
  //   const settings = HandleSettings({ timer: timer });
  const timer = components.timer;
  const quiz = components.quiz;
  const settings = HandleSettings({ timer: timer, quiz: quiz });
  const sideNavDOM = document.querySelector(".sidemenu");
  var content;
  var onOpenCallback;

  var isOpen = false;

  const open = () => {
    // dispatch open event
    document.dispatchEvent(menuOpenEvent);
    setContent("menu");
    sideNavDOM.classList.add("open");
    isOpen = true;
  };
  const close = () => {
    // dispatch close event
    settings.set(inputElems);
    document.dispatchEvent(menuCloseEvent);
    sideNavDOM.classList.remove("open");
    isOpen = false;
  };

  const render = () => {
    document.querySelectorAll(".sidenavcontent").forEach((sidenavcontent) => {
      if (sidenavcontent.id !== content) {
        sidenavcontent.style.display = "none";
        return;
      }
      sidenavcontent.style.display = "block";
    });
  };

  const setContent = (contentName) => {
    content = contentName;
    window.location.href = "#menu=" + content;
  };

  const displayInput = (inputElem) => {
    var value = inputElem.value;
    var displayID = "#" + inputElem.name;

    document.querySelector(displayID).textContent = value;
    if (value < 10) {
      document.querySelector(displayID).style.marginRight = "0.2rem";
      return;
    }
    document.querySelector(displayID).style.marginRight = "0rem";
  };

  const setUpSettingsListeners = () => {
    document.querySelectorAll('[data-target="settings"]').forEach((input) => {
      input.addEventListener("input", (ev) => {
        var inputElem = ev.target;
        displayInput(inputElem);
        inputElems[inputElem.id] = parseInt(inputElem.value);
        // inputElems.inputElem.id = inputElem.value;
      });
    });
  };
  setUpSettingsListeners();

  document.querySelector("#app").addEventListener(eventtyp.click, () => {
    isOpen ? close() : null;
  });

  return {
    toggle: () => {
      isOpen ? close() : open();
    },
    open: () => {
      open();
    },
    close: () => {
      close();
    },
    render: () => {
      render();
    },
    setContent: (contentName) => {
      setContent(contentName);
      render();
    },
    isOpen: () => {
      return isOpen;
    },
    onOpen: (callback) => {
      onOpenCallback = callback;
    },
  };
}
