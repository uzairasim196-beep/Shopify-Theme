(()=>{'use strict';
// Progressive enhancement: content remains visible if animation APIs are unavailable.
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(motion.matches||!('IntersectionObserver' in window))return;
const selector='.hero-v2-copy > *, .center-heading, main .coffee-card, .promo-tile, .story-image, .story-v2-copy, .founder-label > :not(.founder-watermark), .founder-letter, .region-heading, .region-card, .passion-heading, .ritual-card, .passion-bottom, .newsletter-v2-grid > div, .footer-invitation > *, .footer-detail-grid > div';
let observer;
function reveal(el){el.classList.add('is-revealed');observer?.unobserve(el)}
function setup(scope=document){const nodes=[...scope.querySelectorAll(selector)].filter(el=>!el.dataset.revealReady);nodes.forEach((el,i)=>{el.dataset.revealReady='true';el.style.setProperty('--reveal-delay',((el.matches('.coffee-card,.region-card,.ritual-card')?i%3:0)*65)+'ms');el.classList.add('reveal-pending');observer.observe(el)})}
try{
 observer=new window.IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)reveal(entry.target)}),{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
 setup();
 document.addEventListener('focusin',e=>{const target=e.target.closest('.reveal-pending');if(target)reveal(target)});
 document.addEventListener('shopify:section:load',e=>{if(!motion.matches)setup(e.target)});
 motion.addEventListener('change',e=>{if(e.matches){document.querySelectorAll('.reveal-pending').forEach(reveal);observer.disconnect()}});
}catch{
 document.querySelectorAll('.reveal-pending').forEach(el=>{el.classList.remove('reveal-pending');el.style.removeProperty('--reveal-delay')});observer?.disconnect();
}
})();
