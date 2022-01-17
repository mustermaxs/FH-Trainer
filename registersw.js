// let deferredPrompt;
/* const pwaInstallBanner = document.querySelector("#pwaInstallBanner");
const installBtn = document.querySelector("#install");
const closePWAinstallbanner = document.querySelector("#closeX");
pwaInstallBanner.style.display = "flex";

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  pwaInstallBanner.style.display = "flex";

  installBtn.addEventListener("click", () => {
    // hide our user interface that shows our A2HS button
    pwaInstallBanner.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
      } else {
      }
      deferredPrompt = null;
    });
  });
}); 
closePWAinstallbanner.addEventListener("click", () => {
  pwaInstallBanner.style.display = " none";
});
*/

/* let deferredPrompt;
const addBtn = document.querySelector(".add-button");
addBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "block";

  addBtn.addEventListener("click", () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
}); */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").then(() => {});
  });
}
