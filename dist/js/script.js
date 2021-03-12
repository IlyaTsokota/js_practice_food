/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //tabs

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabheaderItemsContainer = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(content => {
      content.classList.add('hide');
      content.classList.remove('show', 'fade');
    });
    tabs.forEach(tab => tab.classList.remove('tabheader__item_active'));
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add('tabheader__item_active');
  }

  tabheaderItemsContainer.addEventListener('click', e => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  hideTabContent();
  showTabContent(); //Timer

  const deadline = '2021-05-11';

  function getTimeRemaining(endtime) {
    const time = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(time / (1000 * 60 * 60 * 24)),
          hours = Math.floor(time / (1000 * 60 * 60) % 24),
          minutes = Math.floor(time / (1000 * 60) % 60),
          seconds = Math.floor(time / 1000 % 60);
    return {
      'total': time,
      days,
      hours,
      minutes,
      seconds
    };
  }

  const setZero = val => val < 10 ? `0${val}` : val;

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds"),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const time = getTimeRemaining(endtime);

      if (time.total <= 0) {
        clearInterval(timeInterval);
      }

      days.innerHTML = setZero(time.days);
      hours.innerHTML = setZero(time.hours);
      minutes.innerHTML = setZero(time.minutes);
      seconds.innerHTML = setZero(time.seconds);
    }
  }

  setClock('.timer', deadline); //Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modalTimerId = setTimeout(openModal, 5000, modal);

  function openModal(modal) {
    modal.classList.add('show');
    modal.classList.remove('hide');
    modal.classList.add('fade');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal(modal) {
    modal.classList.remove('show');
    modal.classList.remove('fade');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(modal);
    });
  });
  modalCloseBtn.addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', e => {
    if (e.target && e.target === modal) {
      closeModal(modal);
    }
  });
  document.addEventListener('keydown', e => {
    if (modal.classList.contains('show') && e.code === "Escape") {
      closeModal(modal);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modal);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
});
'use strict'; // function User(name, id) {
// 	this.name = name;
// 	this.id = id;
// 	this.human = true;
// 	this.hello = function () {
// 		console.log(`Hello ! ${this.name}`);
// 	};
// }


function sayName(surname) {
  console.log(this);
  console.log(this.name + ' ' + surname);
}

const user = {
  name: 'John'
};
sayName.call(user, 'Smith');
sayName.apply(user, ['Smith']);

function count(num) {
  return this * num;
}

const double = count.bind(2);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map