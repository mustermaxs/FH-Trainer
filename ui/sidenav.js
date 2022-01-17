/* class SideNav {
  constructor() {
    this.sideNavDOM = document.querySelector(".sidemenu");

    this.sideNavIsOpen = false;
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
  const sideNavDOM = document.querySelector(".sidemenu");
  var menuContent = "menu";

  var sideNavIsOpen = false;

  const open = () => {
    sideNavDOM.classList.add("open");
    sideNavIsOpen = true;
  };
  const close = () => {
    sideNavDOM.classList.remove("open");
    sideNavIsOpen = false;
  };

  const render = (content) => {
    document.querySelectorAll(".sidenavcontent").forEach((sidenavcontent) => {
      if (sidenavcontent.id !== content) {
        sidenavcontent.style.display = "none";
        return;
      }
      sidenavcontent.style.display = "block";
    });
  };

  const setContent = (content) => {
    menuContent = content;
  };

  return {
    toggle: () => {
      sideNavIsOpen ? close() : open();
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
    setContent: (content) => {
      setContent(content);
    },
  };
}
