import{S as p,N as m,P as g}from"./vendor-DUOrjfpR.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const o=document.querySelector('[data-action="open-menu"]'),v=document.querySelectorAll('[data-action="close-menu"]'),a=document.querySelector("[data-menu]"),d=document.querySelector("[data-site-header]"),f=!!document.querySelector(".legal-page"),l=t=>{!a||!o||(a.dataset.visible=t,a.setAttribute("aria-hidden",String(t!=="open")),o.setAttribute("aria-expanded",String(t==="open")),document.body.dataset.menu=t)};a&&o&&(o.addEventListener("click",()=>{l("open")}),v.forEach(t=>{t.addEventListener("click",()=>{l("close")})}),window.addEventListener("keydown",t=>{t.key==="Escape"&&l("close")}));const u=()=>{d&&(d.dataset.scrolled=String(f||window.scrollY>8))};d&&(u(),window.addEventListener("scroll",u,{passive:!0}));const w=[{avatar:"./img/reviews/jason.jpg",name:"Jason P.",text:"Love picking my helper character before each run.",rating:"4.0"},{avatar:"./img/reviews/Melissa.jpg",name:"Melissa H.",text:"Sweet visuals and the boosters feel really powerful.",rating:"4.0"},{avatar:"./img/reviews/puzzle.jpg",name:"PuzzleTeamCaptain",text:"Joining a team completely changed how I play.",rating:"5.0"},{avatar:"./img/reviews/candy.jpg",name:"CandyCrusherPro",text:"Team events make this way more fun than typical match-3s.",rating:"5.0"},{avatar:"./img/reviews/sweet.jpg",name:"SweetTilesFan",text:"Restoring the town after the storm is so satisfying.",rating:"5.0"}];function y(t){const i=Math.round(Number(t));let n="";for(let s=0;s<5;s++){const e=s<i?"":" is-empty";n+=`<svg class="star-icon${e}"><use href="./img/sprite.svg#icon-star"></use></svg>`}return n}const h=document.querySelector(".reviews-list");h.innerHTML=w.map(({avatar:t,name:i,text:n,rating:s})=>`
  <li class="swiper-slide reviews-item">

    <img 
      class="reviews-avatar"
      src="${t}"
      alt="${i}"
    >

    <h3 class="reviews-name">
      ${i}
    </h3>

    <p class="reviews-text">
      ${n}
    </p>

    <div class="reviews-rating">
      <span class="reviews-score">${s}</span>
      <span class="reviews-stars">${y(s)}</span>
    </div>

  </li>
`).join("");new p(".reviews-swiper",{modules:[m,g],centeredSlides:!0,slidesPerView:"auto",spaceBetween:12,navigation:{nextEl:".reviews-btn-next",prevEl:".reviews-btn-prev"},pagination:{el:".reviews-pagination",clickable:!0},breakpoints:{1440:{slidesPerView:3,spaceBetween:102,centeredSlides:!1}}});
//# sourceMappingURL=main-C7psBhAZ.js.map
