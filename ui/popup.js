import { eventType } from "./eventtyp.js";

export function Confirm(config) {
  const eventtyp = new eventType();
  const jsPath = config.path;
  const confirmBtn = document.querySelector(
    `#${jsPath.id} > button[id=confirm]`
  );
  //   const rejectBtn = document.querySelector(`button[id=${jsPath.id}-reject]`);
  const show = () => {
    jsPath.style.display = "flex";
  };
  const hide = () => {
    jsPath.style.display = "none";
  };

  const setupListeners = () => {
    confirmBtn.addEventListener(eventtyp.click, config.onConfirm);
    // rejectBtn.addEventListener(eventtyp.click, onReject);
  };

  setupListeners();

  return {
    show: () => {
      show();
    },
    hide: () => {
      hide();
    },
  };
}
