/* class SideNav {
  constructor() {
    this.sideNavDOM = document.querySelector(".sidemenu");

    this.isOpen = false;
  }
  open() {
    //
  }
  close() {
    //
  }
  toggle() {}

  getContent() {
     switch(content) {
            case "menu":
                this.
                break;
            case "settings":
                this.content = sideNavContent.settings;
                break;
            default:
                //show menu
        } 
  }

  render(content) {
    document.querySelectorAll(".sidenavcontent").forEach((sidenavcontent) => {
      if (sidenavcontent.id !== content) {
        sidenavcontent.style.display = "none";
        return;
      }
      sidenavcontent.style.display = "block";
    });
  }
} */

function SideNav() {
  const settings = HandleSettings({ timer: timer });
  const sideNavDOM = document.querySelector(".sidemenu");
  var content;

  var isOpen = false;

  const open = () => {
    setContent("menu");
    sideNavDOM.classList.add("open");
    isOpen = true;
  };
  const close = () => {
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
        settings.setTime(inputElem.value);
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
  };
}
