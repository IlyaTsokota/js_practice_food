!function(t){var e={};function o(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(n,s,function(e){return t[e]}.bind(null,s));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelectorAll(".tabheader__item"),e=document.querySelectorAll(".tabcontent");function o(){e.forEach(t=>{t.classList.add("hide"),t.classList.remove("show","fade")}),t.forEach(t=>t.classList.remove("tabheader__item_active"))}function n(o=0){e[o].classList.add("show","fade"),e[o].classList.remove("hide"),t[o].classList.add("tabheader__item_active")}document.querySelector(".tabheader__items").addEventListener("click",e=>{const s=e.target;s&&s.classList.contains("tabheader__item")&&t.forEach((t,e)=>{s===t&&(o(),n(e))})}),o(),n();const s=t=>t<10?`0${t}`:t;!function(t,e){const o=document.querySelector(t),n=o.querySelector("#days"),a=o.querySelector("#hours"),r=o.querySelector("#minutes"),c=o.querySelector("#seconds"),i=setInterval(l,1e3);function l(){const t=function(t){const e=Date.parse(t)-Date.parse(new Date);return{total:e,days:Math.floor(e/864e5),hours:Math.floor(e/36e5%24),minutes:Math.floor(e/6e4%60),seconds:Math.floor(e/1e3%60)}}(e);t.total<=0&&clearInterval(i),n.innerHTML=s(t.days),a.innerHTML=s(t.hours),r.innerHTML=s(t.minutes),c.innerHTML=s(t.seconds)}l()}(".timer","2021-05-11");const a=document.querySelectorAll("[data-modal]"),r=document.querySelector(".modal"),c=setTimeout(i,3e4,r);function i(t){t.classList.add("show"),t.classList.remove("hide"),t.classList.add("fade"),document.body.style.overflow="hidden",clearInterval(c)}function l(t){t.classList.remove("show"),t.classList.remove("fade"),t.classList.add("hide"),document.body.style.overflow=""}a.forEach(t=>{t.addEventListener("click",()=>{i(r)})}),r.addEventListener("click",t=>{(t.target&&t.target===r||""===t.target.getAttribute("data-close"))&&l(r)}),document.addEventListener("keydown",t=>{r.classList.contains("show")&&"Escape"===t.code&&l(r)}),window.addEventListener("scroll",(function t(){window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight&&(i(r),window.removeEventListener("scroll",t))}));class d{constructor(t,e,o,n,s,a,...r){this.src=t,this.alt=e,this.title=o,this.desc=n,this.price=s,this.classes=r,this.transfer=27,this.parent=document.querySelector(a),this.changeToUAH()}changeToUAH(){this.price*=this.transfer}render(){const t=document.createElement("div");0===this.classes.length?(this.classes="menu__item",t.classList.add(this.classes)):this.classes.forEach(e=>t.classList.add(e)),t.innerHTML=`\n\t\t\t\t\t<img src="${this.src}" alt="${this.alt}">\n\t\t\t\t\t<h3 class="menu__item-subtitle">${this.title}</h3>\n\t\t\t\t\t<div class="menu__item-descr">${this.desc}</div>\n\t\t\t\t\t<div class="menu__item-divider"></div>\n\t\t\t\t\t<div class="menu__item-price">\n\t\t\t\t\t\t<div class="menu__item-cost">Цена:</div>\n\t\t\t\t\t\t<div class="menu__item-total"><span>${this.price}</span> грн/день</div>\n\t\t\t\t\t</div>\n\t\t\t`,this.parent.append(t)}}(async t=>{const e=await fetch(t);if(!e.ok)throw new Error(`Could not fetch ${t}, status: ${e.status}`);return await e.json()})("http://localhost:3000/menu").then(t=>function(t){t.forEach(({img:t,altimg:e,title:o,descr:n,price:s})=>{new d(t,e,o,n,s,".menu .container").render()})}(t));const u=document.querySelectorAll("form"),m="img/spinner.svg",h="Спасибо! Скоро мы с вами свяжемся",f="Что-то пошло не так...";u.forEach(t=>{var e;(e=t).addEventListener("submit",t=>{t.preventDefault();const o=JSON.stringify(Object.fromEntries(new FormData(e).entries())),n=document.createElement("img");n.style.cssText="\n\t\t\t\tdisplay: block;\n\t\t\t\tmargin: 0 auto;\n\t\t\t",n.setAttribute("src",m),e.insertAdjacentElement("afterend",n),(async(t,e)=>{const o=await fetch(t,{method:"POST",headers:{"Content-type":"application/json"},body:e});return await o.json()})("http://localhost:3000/requests",o).then(t=>{console.log(t),g(h),n.remove()}).catch(()=>{g(f)}).finally(()=>{e.reset()})})});function g(t){const e=document.querySelector(".modal__dialog"),o=e.parentElement;e.classList.add("hide"),i(o);const n=document.createElement("div");n.classList.add("modal__dialog"),n.innerHTML=`\n\t\t\t<div class="modal__content">\n\t\t\t\t<div data-close class="modal__close">&times;</div>\n\t\t\t\t<div class="modal__title">${t}</div>\n\t\t\t</div>\n\t\t`,document.querySelector(".modal").append(n),setTimeout(()=>{n.remove(),e.classList.remove("hide"),l(o)},4e3)}const _=document.querySelectorAll(".offer__slide"),v=document.querySelector(".offer__slider"),y=document.querySelector(".offer__slider-prev"),p=document.querySelector(".offer__slider-next"),L=document.querySelector("#total"),S=document.querySelector("#current"),b=document.querySelector(".offer__slider-wrapper"),E=document.querySelector(".offer__slider-inner"),w=parseInt(window.getComputedStyle(b).width);let q=0;b.style.overflow="hidden",E.style.display="flex",E.style.transition="0.5s all",E.style.width=100*_.length+"%",_.forEach(t=>{t.style.width=w+"px"});const x=t=>t<=9?`0${t}`:t;L.textContent=x(_.length),S.textContent=x(q/w+1),v.style.position="relative";const A=document.createElement("ol"),M=[];A.classList.add("carousel-indicators"),v.append(A);for(let t=0;t<_.length;t++){const e=document.createElement("li");e.setAttribute("data-slide-to",t),e.classList.add("dot"),A.append(e),M.push(e)}function I(t,e){let o=e/t;S.textContent=x(o+1),E.style.transform=`translateX(-${e}px)`,M.forEach(t=>t.style.opacity=".5"),M[o].style.opacity=1}M[q/parseInt(w)].style.opacity=1,y.addEventListener("click",()=>{0===q?q=w*(_.length-1):q-=w,I(w,q)}),p.addEventListener("click",()=>{q===w*(_.length-1)?q=0:q+=w,I(w,q)}),M.forEach(t=>{t.addEventListener("click",()=>{q=t.getAttribute("data-slide-to")*w,I(w,q)})});const T=document.querySelector(".calculating__result span");let j,k,O,$,H;function C(t,e){document.querySelectorAll(t).forEach(t=>{t.classList.remove(e),t.getAttribute("id")===localStorage.getItem("sex")&&t.classList.add(e),t.getAttribute("data-ratio")===localStorage.getItem("ratio")&&t.classList.add(e)})}function D(){T.textContent=j&&k&&O&&$&&H?"female"===j?Math.round((447.6+9.2*O+3.1*k-4.3*$)*H):Math.round((88.36+13.4*O+4.8*k-5.7*$)*H):"____"}function P(t,e){const o=document.querySelectorAll(t);o.forEach(t=>{t.addEventListener("click",t=>{t.target.getAttribute("data-ratio")?(H=+t.target.getAttribute("data-ratio"),localStorage.setItem("ratio",H)):(j=t.target.getAttribute("id"),localStorage.setItem("sex",j)),console.log(H,j),o.forEach(t=>t.classList.remove(e)),t.target.classList.add(e),D()})})}function U(t){const e=document.querySelector(t);e.addEventListener("input",()=>{switch(e.value.match(/\D/g)?e.style.border="1px solid red":e.style.border="",e.getAttribute("id")){case"weight":O=+e.value;break;case"height":k=+e.value;break;case"age":$=+e.value}D()})}localStorage.getItem("sex")?j=localStorage.getItem("sex"):(j="female",localStorage.setItem("sex",j)),localStorage.getItem("ratio")?H=localStorage.getItem("ratio"):(H=1.375,localStorage.setItem("ratio",H)),C("#gender div","calculating__choose-item_active"),C(".calculating__choose_big div","calculating__choose-item_active"),D(),P("#gender div","calculating__choose-item_active"),P(".calculating__choose_big div","calculating__choose-item_active"),U("#height"),U("#weight"),U("#age")})}]);
//# sourceMappingURL=script.js.map