// ==UserScript==
// @name         PR Helper for Workplace
// @namespace    https://www.storehub.com/
// @version      0.1
// @description  Pre-filled PR info in Workplace
// @author       Hephaest
// @icon         https://avatars.githubusercontent.com/u/37981444?v=4
// @match        https://www.workplace.com/
// @updateURL    https://github.com/Hephaest/helper-scrips/blob/main/workplace-PR-extension.js
// @grant        none
// @license      MIT
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';

  var messageDivElement = null;
  var timer = setInterval(setUpMessageListener, 5000);
  var dataTransfer = new DataTransfer();

   function dispatchPaste(target, text) {
     // this may be 'text/html' if it's required
     dataTransfer.setData('text/plain', text);

     target.dispatchEvent(
       new ClipboardEvent('paste', {
         clipboardData: dataTransfer,
         // need these for the event to reach Draft paste handler
         bubbles: true,
         cancelable: true
       })
     );

     // clear DataTransfer Data
     dataTransfer.clearData();
   }

  function setUpMessageListener() {
    messageDivElement = document.querySelector('div[contenteditable]');
    if (!messageDivElement) return;
    messageDivElement.addEventListener('keyup', function(event) {
      var input = event.target.innerText;
      if (!hasPRCmdTriggered(input)) return;
      setUpPRTemplate(event);
    });
    clearInterval(timer);
  };

  function hasPRCmdTriggered(input) {
    return input === 'PRT' || input === 'prt';
  }

  function setUpPRTemplate(event) {
    var templateText = ":\n" +
                       "PR:\n" +
                       "ChangeLog:\n" +
                       "Reviewers:\n" +
                       "辛苦各位有空的时候帮忙看一下🙏";
    dispatchPaste(event.target, templateText);
  }
})();