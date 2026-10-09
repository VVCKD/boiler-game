var OV=Object.defineProperty;var kV=(i,t,e)=>t in i?OV(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var qt=(i,t,e)=>kV(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();var Ia="1.3.26";function Wo(i,t,e){return Math.max(i,Math.min(t,e))}function zV(i,t,e){return(1-e)*i+e*t}function HV(i,t,e,n){return zV(i,t,1-Math.exp(-e*n))}function GV(i,t){return(i%t+t)%t}var WV=class{constructor(){qt(this,"isRunning",!1);qt(this,"value",0);qt(this,"from",0);qt(this,"to",0);qt(this,"currentTime",0);qt(this,"lerp");qt(this,"duration");qt(this,"easing");qt(this,"onUpdate")}advance(i){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=i;const e=Wo(0,this.currentTime/this.duration,1);t=e>=1;const n=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=HV(this.value,this.to,this.lerp*60,i),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(i,t,{lerp:e,duration:n,easing:s,onStart:r,onUpdate:a}){this.from=this.value=i,this.to=t,this.lerp=e,this.duration=n,this.easing=s,this.currentTime=0,this.isRunning=!0,r?.(),this.onUpdate=a}};function XV(i,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,i.apply(this,n)},t)}}var YV=class{constructor(i,t,{autoResize:e=!0,debounce:n=250}={}){qt(this,"width",0);qt(this,"height",0);qt(this,"scrollHeight",0);qt(this,"scrollWidth",0);qt(this,"debouncedResize");qt(this,"wrapperResizeObserver");qt(this,"contentResizeObserver");qt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});qt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});qt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=i,this.content=t,e&&(this.debouncedResize=XV(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Xo=class{constructor(){qt(this,"events",{})}emit(i,...t){const e=this.events[i]||[];for(let n=0,s=e.length;n<s;n++)e[n]?.(...t)}on(i,t){return this.events[i]?this.events[i].push(t):this.events[i]=[t],()=>{this.events[i]=this.events[i]?.filter(e=>t!==e)}}off(i,t){this.events[i]=this.events[i]?.filter(e=>t!==e)}destroy(){this.events={}}};const QV=100/6,dn={passive:!1};function Ba(i,t){return i===1?QV:i===2?t:1}var jV=class{constructor(i,t={wheelMultiplier:1,touchMultiplier:1}){qt(this,"touchStart",{x:0,y:0});qt(this,"lastDelta",{x:0,y:0});qt(this,"window",{width:0,height:0});qt(this,"emitter",new Xo);qt(this,"onTouchStart",i=>{const{clientX:t,clientY:e}=i.targetTouches?i.targetTouches[0]:i;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:i})});qt(this,"onTouchMove",i=>{const{clientX:t,clientY:e}=i.targetTouches?i.targetTouches[0]:i,n=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:s},this.emitter.emit("scroll",{deltaX:n,deltaY:s,event:i})});qt(this,"onTouchEnd",i=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:i})});qt(this,"onWheel",i=>{let{deltaX:t,deltaY:e,deltaMode:n}=i;const s=Ba(n,this.window.width),r=Ba(n,this.window.height);t*=s,e*=r,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:i})});qt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=i,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,dn),this.element.addEventListener("touchstart",this.onTouchStart,dn),this.element.addEventListener("touchmove",this.onTouchMove,dn),this.element.addEventListener("touchend",this.onTouchEnd,dn)}on(i,t){return this.emitter.on(i,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,dn),this.element.removeEventListener("touchstart",this.onTouchStart,dn),this.element.removeEventListener("touchmove",this.onTouchMove,dn),this.element.removeEventListener("touchend",this.onTouchEnd,dn)}};const Fa=i=>Math.min(1,1.001-2**(-10*i));var KV=class{constructor({wrapper:i=window,content:t=document.documentElement,eventsTarget:e=i,smoothWheel:n=!0,syncTouch:s=!1,syncTouchLerp:r=.075,touchInertiaExponent:a=1.7,duration:o,easing:l,lerp:V=.1,infinite:h=!1,orientation:u="vertical",gestureOrientation:c=u==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:q=1,autoResize:g=!0,prevent:p,virtualScroll:d,overscroll:E=!0,autoRaf:y=!1,anchors:x=!1,autoToggle:w=!1,allowNestedScroll:b=!1,__experimental__naiveDimensions:C=!1,naiveDimensions:B=C,stopInertiaOnNavigate:v=!1,respectReducedMotion:_=!0}={}){qt(this,"_isScrolling",!1);qt(this,"_isStopped",!1);qt(this,"_isLocked",!1);qt(this,"_preventNextNativeScrollEvent",!1);qt(this,"_resetVelocityTimeout",null);qt(this,"_rafId",null);qt(this,"_isDraggingSelection",!1);qt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));qt(this,"isTouching");qt(this,"isIos");qt(this,"time",0);qt(this,"userData",{});qt(this,"lastVelocity",0);qt(this,"velocity",0);qt(this,"direction",0);qt(this,"options");qt(this,"targetScroll");qt(this,"animatedScroll");qt(this,"animate",new WV);qt(this,"emitter",new Xo);qt(this,"dimensions");qt(this,"virtualScroll");qt(this,"onScrollEnd",i=>{i instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&i.stopPropagation()});qt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});qt(this,"onTransitionEnd",i=>{i.propertyName?.includes("overflow")&&i.target===this.rootElement&&this.checkOverflow()});qt(this,"onClick",i=>{const t=i.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){const n=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(n){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(n.hash);this.scrollTo(r,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});qt(this,"onPointerDown",i=>{i.button===1&&this.reset()});qt(this,"onVirtualScroll",i=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(i)===!1)return;const{deltaX:t,deltaY:e,event:n}=i;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const s=n.type.includes("touch"),r=n.type.includes("wheel");if(s&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=t===0&&e===0;if(this.options.syncTouch&&s&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(a||o)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const V=this.options.prevent,h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(q=>q instanceof HTMLElement&&(typeof V=="function"&&V?.(q)||q.hasAttribute?.("data-lenis-prevent")||h==="vertical"&&q.hasAttribute?.("data-lenis-prevent-vertical")||h==="horizontal"&&q.hasAttribute?.("data-lenis-prevent-horizontal")||s&&q.hasAttribute?.("data-lenis-prevent-touch")||r&&q.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(q,{deltaX:t,deltaY:e}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let u=e;this.options.gestureOrientation==="both"?u=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(u=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const c=s&&this.options.syncTouch,f=s&&n.type==="touchend";f&&(u=Math.sign(u)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+u,{programmatic:!1,...c?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});qt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const i=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-i,this.direction=Math.sign(this.animatedScroll-i),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});qt(this,"raf",i=>{const t=i-(this.time||i);this.time=i,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Ia,window.lenis||(window.lenis={}),window.lenis.version=Ia,u==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!i||i===document.documentElement)&&(i=window),typeof o=="number"&&typeof l!="function"?l=Fa:typeof l=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:i,content:t,eventsTarget:e,smoothWheel:n,syncTouch:s,syncTouchLerp:r,touchInertiaExponent:a,duration:o,easing:l,lerp:V,infinite:h,gestureOrientation:c,orientation:u,touchMultiplier:f,wheelMultiplier:q,autoResize:g,prevent:p,virtualScroll:d,overscroll:E,autoRaf:y,anchors:x,autoToggle:w,allowNestedScroll:b,naiveDimensions:B,stopInertiaOnNavigate:v,respectReducedMotion:_},this.dimensions=new YV(i,t,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new jV(e,{touchMultiplier:f,wheelMultiplier:q}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(i,t){return this.emitter.on(i,t)}off(i,t){return this.emitter.off(i,t)}get overflow(){const i=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[i]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(i){this.isHorizontal?this.options.wrapper.scrollTo({left:i,behavior:"instant"}):this.options.wrapper.scrollTo({top:i,behavior:"instant"})}isTouchOnSelectionHandle(i){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=i.targetTouches[0]??i.changedTouches[0];if(!e)return!1;const n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;const s=n[0],r=n[n.length-1],a=40,o=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=a,l=Math.hypot(e.clientX-r.right,e.clientY-r.bottom)<=a;return o||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(i,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:s=!0,lerp:r=s?this.options.lerp:void 0,duration:a=s?this.options.duration:void 0,easing:o=s?this.options.easing:void 0,onStart:l,onComplete:V,force:h=!1,userData:u}={}){if(this.prefersReducedMotion&&(s?e=!0:(r=1,a=void 0,o=void 0)),(this.isStopped||this.isLocked)&&!h)return;let c=i,f=t;if(typeof c=="string"&&["top","left","start","#"].includes(c))c=0;else if(typeof c=="string"&&["bottom","right","end"].includes(c))c=this.limit;else{let q=null;if(typeof c=="string"?(q=c.startsWith("#")?document.getElementById(c.slice(1)):document.querySelector(c),q||(c==="#top"?c=0:console.warn("Lenis: Target not found",c))):c instanceof HTMLElement&&c?.nodeType&&(q=c),q){if(this.options.wrapper!==window){const x=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?x.left:x.top}const g=q.getBoundingClientRect(),p=getComputedStyle(q),d=this.isHorizontal?Number.parseFloat(p.scrollMarginLeft):Number.parseFloat(p.scrollMarginTop),E=getComputedStyle(this.rootElement),y=this.isHorizontal?Number.parseFloat(E.scrollPaddingLeft):Number.parseFloat(E.scrollPaddingTop);c=(this.isHorizontal?g.left:g.top)+this.animatedScroll-(Number.isNaN(d)?0:d)-(Number.isNaN(y)?0:y)}}if(typeof c=="number"){if(c+=f,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const q=c-this.animatedScroll;q>this.limit/2?c-=this.limit:q<-this.limit/2&&(c+=this.limit)}}else c=Wo(0,c,this.limit);if(c===this.targetScroll){l?.(this),V?.(this);return}if(this.userData=u??{},e){this.animatedScroll=this.targetScroll=c,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),V?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=c),typeof a=="number"&&typeof o!="function"?o=Fa:typeof o=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,c,{duration:a,easing:o,lerp:r,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(q,g)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=q-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=q,this.setScroll(this.scroll),s&&(this.targetScroll=q),g||this.emit(),g&&(this.reset(),this.emit(),V?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(i,{deltaX:t,deltaY:e}){const n=Date.now();i._lenis||(i._lenis={});const s=i._lenis;let r,a,o,l,V,h,u,c,f,q;if(n-(s.time??0)>2e3){s.time=Date.now();const b=window.getComputedStyle(i);if(s.computedStyle=b,r=["auto","overlay","scroll"].includes(b.overflowX),a=["auto","overlay","scroll"].includes(b.overflowY),V=["auto"].includes(b.overscrollBehaviorX),h=["auto"].includes(b.overscrollBehaviorY),s.hasOverflowX=r,s.hasOverflowY=a,!(r||a))return!1;u=i.scrollWidth,c=i.scrollHeight,f=i.clientWidth,q=i.clientHeight,o=u>f,l=c>q,s.isScrollableX=o,s.isScrollableY=l,s.scrollWidth=u,s.scrollHeight=c,s.clientWidth=f,s.clientHeight=q,s.hasOverscrollBehaviorX=V,s.hasOverscrollBehaviorY=h}else o=s.isScrollableX,l=s.isScrollableY,r=s.hasOverflowX,a=s.hasOverflowY,u=s.scrollWidth,c=s.scrollHeight,f=s.clientWidth,q=s.clientHeight,V=s.hasOverscrollBehaviorX,h=s.hasOverscrollBehaviorY;if(!(r&&o||a&&l))return!1;const g=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let p,d,E,y,x,w;if(g==="horizontal")p=Math.round(i.scrollLeft),d=u-f,E=t,y=r,x=o,w=V;else if(g==="vertical")p=Math.round(i.scrollTop),d=c-q,E=e,y=a,x=l,w=h;else return!1;return!w&&(p>=d||p<=0)?!0:(E>0?p<d:p>0)&&y&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const i=this.options.wrapper;return this.isHorizontal?i.scrollX??i.scrollLeft:i.scrollY??i.scrollTop}get scroll(){return this.options.infinite?GV(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(i){this._isScrolling!==i&&(this._isScrolling=i,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(i){this._isStopped!==i&&(this._isStopped=i,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(i){this._isLocked!==i&&(this._isLocked=i,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let i="lenis";return this.options.autoToggle&&(i+=" lenis-autoToggle"),this.isStopped&&(i+=" lenis-stopped"),this.isLocked&&(i+=" lenis-locked"),this.isScrolling&&(i+=" lenis-scrolling"),this.isScrolling==="smooth"&&(i+=" lenis-smooth"),i}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(i=>{this.rootElement.classList.add(i)})}cleanUpClassName(){for(const i of Array.from(this.rootElement.classList))(i==="lenis"||i.startsWith("lenis-"))&&this.rootElement.classList.remove(i)}};const ZV="boiler-game",Mr="kv",JV="lj:";let Ki=null;function $V(){return Ki||(Ki=new Promise((i,t)=>{if(!("indexedDB"in globalThis))return t(new Error("no idb"));const e=indexedDB.open(ZV,1);e.onupgradeneeded=()=>e.result.createObjectStore(Mr),e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error)}),Ki)}function Ns(i,t){return $V().then(e=>new Promise((n,s)=>{const r=e.transaction(Mr,i),a=t(r.objectStore(Mr));r.oncomplete=()=>n(a&&a.result),r.onerror=()=>s(r.error)}))}const Os="bg:",Ss={async get(i){try{const t=await Ns("readonly",e=>e.get(i));if(t!==void 0)return t}catch{}try{const t=localStorage.getItem(Os+i)||localStorage.getItem(JV+i);return t?JSON.parse(t):void 0}catch{return}},async set(i,t){try{localStorage.setItem(Os+i,JSON.stringify(t))}catch{}try{await Ns("readwrite",e=>e.put(t,i))}catch{}},async del(i){try{localStorage.removeItem(Os+i)}catch{}try{await Ns("readwrite",t=>t.delete(i))}catch{}}},Yo=14,Ht=(i,t,e,n="",s={})=>({id:"",mode:"spicy",type:i,tag:t,text:e,description:n,touch:!1,weight:1,enabled:!0,...s}),Yn={enabled:!1},tl=[Ht("story","침대 흑역사","{A}, 지금 생각해도 제일 쪽팔리는 잠자리 흑역사 하나 얘기해.",'언제, 누구랑, 왜 쪽팔렸는지까지. 다 듣고 나머지가 "약하다" 하면 벌주 한 모금.'),Ht("story","예상 못 한 원나잇","{A}, 전혀 예상 못 했는데 원나잇으로 이어진 경험 하나 얘기해.","어디서 시작해서 어떻게 흘러갔는지. 상대 이름은 빼도 돼."),Ht("story","의외의 장소",'{A}, "내가 여기서 하게 될 줄은 몰랐다" 싶었던 제일 의외의 장소 얘기해.',"장소, 상황, 들킬 뻔했는지까지."),Ht("question","최단 기록","{A}, 가장 빨랐던 경우, 만난 지 얼마 만에 잠자리까지 갔는지 말해.","시간 단위로 정확히. 어떻게 그렇게 됐는지 한 줄 덧붙이면 인정."),Ht("story","미친 듯이 끌린 사람","{A}, 하루에도 여러 번 하고 싶을 만큼 끌렸던 사람 썰 얘기해.","뭐가 그렇게 끌렸는지 구체적으로."),Ht("story","취중 행동","{A}, 술 때문에 평소라면 절대 안 했을 행동까지 해본 경험 얘기해.","다음 날 어떻게 수습했는지까지."),Ht("story","예상 밖의 케미",'{A}, "이 사람이랑은 절대 그럴 일 없겠다" 했는데 완전히 다르게 흘러간 썸 얘기해.',"어느 순간에 분위기가 바뀌었는지."),Ht("story","여행지에서","{A}, 여행지에서 겪은 가장 이색적인 잠자리 경험 얘기해.",'"의외의 장소"와 겹쳐서 기본은 꺼둠. 켜려면 편집에서 사용 스위치.',Yn),Ht("story","들킬 뻔","{A}, 누군가에게 들켰거나 거의 들킬 뻔해서 식겁한 경험 얘기해.","누구한테, 어디까지 들켰는지."),Ht("story","나이 차","{A}, 평소 만나던 범위보다 나이 차이가 꽤 큰 상대와 있었던 경험 얘기해.","몇 살 차이였는지는 꼭."),Ht("story","다음 날 아침","{A}, 다음 날 정신 차리고 보니 상황이 제일 황당했던 경험 얘기해.",'"침대 흑역사", "취중 행동"과 겹쳐서 기본은 꺼둠.',Yn),Ht("question","가장 최근","{A}, 가장 최근 잠자리가 언제였는지 말해.","날짜까지. 상대는 안 말해도 돼."),Ht("question","원나잇 횟수","{A}, 원나잇 경험이 몇 번인지, 보통 어떤 경로로 만났는지 말해.",'"예상 못 한 원나잇"과 겹쳐서 기본은 꺼둠.',Yn),Ht("question","야한 메시지","{A}, 야한 메시지 보내본 적 있으면 기억나는 내용 하나 그대로 말해.","원문 그대로 읽어야 인정. 답장이 뭐였는지까지."),Ht("question","들킬 위험","{A}, 다른 사람한테 들킬 수 있는 상황에서 분위기가 올라간 적 있는지 말해.",'YES / NO. "들킬 뻔"과 겹쳐서 기본은 꺼둠.',Yn),Ht("duo","휴지 게임","{X}와 {Y}, 손 쓰지 않고 입으로 휴지를 전달해.","{Z}가 휴지 길이를 정하고 심판. 떨어뜨리면 둘 다 벌주. 라운드가 갈수록 휴지는 짧아져.",{touch:!0,failable:!0}),Ht("duo","무릎 위에서","{X}와 {Y} 중 한 명이 상대 무릎 위에 앉아서 5초 동안 입맞춤해.","누가 앉을지는 둘이 정해. {Z}가 카운트.",{touch:!0,timer:5}),Ht("action","손가락 키스","{A}, 왼쪽 {L}의 손가락을 천천히 애무해.",'"손등 키스"와 겹쳐서 기본은 꺼둠.',{touch:!0,...Yn}),Ht("action","목 옆 속삭임",'{A}, 원하는 사람의 목 옆까지 가까이 가서 "벌려 씨발년아."라고 낮게 속삭여.',"닿지 않게. 상대가 웃으면 상대 벌주."),Ht("action","5초 키스","{A}, {X}의 어깨나 목을 잡고 5초 동안 키스해.","{Z}가 카운트. 5초 전에 떨어지면 둘 다 벌주.",{touch:!0,timer:5}),Ht("action","엉덩이 글자","왼쪽 {L}이 {A}의 엉덩이에 손가락으로 글자 하나를 써. {A}는 무슨 글자인지 맞혀.","한 글자만. 틀리면 {A} 벌주.",{touch:!0}),Ht("action","손 안내","{A}, 원하는 사람의 손을 잡아서 네가 허용하는 신체 부위 한 곳에 직접 올려놔.","올려둔 손은 다음 턴까지 유지.",{touch:!0}),Ht("action","백허그","{A}, 오른쪽 {R}을 뒤에서 가볍게 안고 5초 유지해.","{R}은 가만히. 먼저 놓으면 {A} 벌주.",{touch:!0,timer:5}),Ht("action","다음 턴까지","{A}, 원하는 사람의 엉덩이에 한 손을 두고 다음 턴까지 유지해.","손을 떼면 벌주. 상대가 거부하면 패스.",{touch:!0}),Ht("group","전원 터치","전원, 옆사람한테 제일 만져보고 싶은 신체 부위 한 곳을 골라. 서로 동의하면 셋 세고 동시에 터치해.","거부는 언제나 가능. 거부한 사람은 벌주 없음.",{touch:!0}),Ht("group","감독 돌아가기","전원이 한 번씩 감독을 맡아. 감독은 나머지의 거리, 자세, 시선과 손 위치를 원하는 대로 지정해.",'"감독의 컷"과 겹쳐서 기본은 꺼둠.',{touch:!0,...Yn}),Ht("group","메두사","전원 고개 숙여. {A}가 셋 세면 동시에 고개 들고 아무나 한 명을 봐.","눈이 마주친 둘은 다음 블록을 같이 뽑고 그 미션을 함께 해. 아무도 안 마주치면 전원 한 모금. (서구 Medusa)"),Ht("question","세 곳 중 거짓","{A}, 잠자리 가져본 곳 세 군데를 말해. 하나는 거짓말.","나머지가 거짓인 곳을 찾으면 {A} 벌주, 못 찾으면 전원 벌주. (Two Truths and a Lie)"),Ht("group","총 맞은 사람","{A}, 손가락 총으로 원하는 사람을 쏴. 맞은 사람은 그대로 멈추고, 그 사람 양옆이 동시에 양쪽 귀에 속삭여.","속삭일 문장은 자유. 맞은 사람은 5초 뒤 두 문장을 그대로 공개해. (공공칠빵 성인판)",{touch:!0,timer:5}),Ht("group","접어",'{A}, 잠자리 얘기로 "~해본 사람 접어" 하나 외쳐.',"야한 내용만 인정. 해당하는 사람은 손가락 접고 한 모금. 아무도 안 접으면 {A} 벌주. (손병호 게임, Never Have I Ever)",{physical:!1}),Ht("group","폭탄 돌리기",'{A}부터 "잠자리 해본 장소"를 하나씩 말하면서 폰을 옆으로 넘겨.',"타이머가 끝날 때 폰을 들고 있는 사람 벌주. 막히면 바로 그 사람. (폭탄 게임)",{timer:20,physical:!1}),Ht("question","최근 상대 스펙","{A}, 가장 최근에 잠자리를 가진 사람의 신체 스펙을 말해.","키, 몸, 특히 기억나는 부위까지 구체적으로. 이름은 빼도 돼. 두루뭉술하면 {A} 벌주."),Ht("duo","얼음","{X}, 얼음을 입에 물고 {Y}의 쇄골에 3초 대. 손은 쓰면 안 돼.","{Z}가 카운트. 얼음을 떨어뜨리면 {X} 벌주, {Y}가 피하면 {Y} 벌주.",{touch:!0,timer:3,failable:!0}),Ht("action","옷 안으로","{A}, {X}의 옷자락 안으로 손을 넣어 허리에서 가슴까지 천천히 쓸어올려.",'속도는 {Z}가 정해. "더 천천히"는 두 번까지. 다 올라가면 5초 멈춤. {X}가 웃으면 {X} 벌주.',{touch:!0})].map((i,t)=>({...i,id:`c_${String(t+1).padStart(2,"0")}`})),Sr=[{id:"w_double",kind:"double",tag:"한 단계 더",text:"방금 미션을 한 단계 세게 다시 해. 거리는 절반, 시간은 두 배.",description:"같은 사람, 같은 미션. 더 가까이.",enabled:!0},{id:"w_choose",kind:"choose",tag:"셋 중 하나",text:"{A}가 세 개의 미션 중 하나를 골라.",description:"패스는 언제나 가능해.",enabled:!0},{id:"w_switch",kind:"switch",tag:"조합 교체",text:"조합 교체. 방금과 다른 두 명으로 2인 미션.",description:"{Z}가 감독을 맡아.",enabled:!0},{id:"w_all",kind:"all",tag:"전원 참여",text:"전원이 참여하는 미션.",description:"빠지는 사람 없음.",enabled:!0},{id:"w_rule",kind:"rule",tag:"룰 만들기",text:"{A}가 룰 하나를 정해. 다음 {A} 차례까지 유효해.",description:'예: "야"라고 말하면 벌주, 왼손으로만 마시기, 이름 대신 "자기"라고 부르기. (Kings Cup J)',enabled:!0},{id:"w_thumb",kind:"thumb",tag:"엄지 마스터",text:"{A}가 엄지 마스터. 다음 {A} 차례까지, {A}가 아무 때나 테이블에 엄지를 올리면 전원 따라 올려.",description:"가장 늦게 올린 사람 벌주. 미션 중에 해도 돼. (Thumb Master)",enabled:!0},{id:"w_mate",kind:"mate",tag:"짝 묶기",text:"{X}와 {Y}는 짝. 둘 중 하나가 마시면 같이 마셔.",description:"게임 끝날 때까지. (Kings Cup 8)",enabled:!0},{id:"w_waterfall",kind:"waterfall",tag:"폭포",text:"전원 동시에 마시기 시작. {A}가 멈춰야 {R}이 멈출 수 있고, 그 다음 사람도 마찬가지.",description:"벌주 모드가 꺼져 있으면 손 들기로. (Waterfall)",enabled:!0}],el=["action","duo","group","story","question","wild"],Cs={action:"즉시 행동",duo:"랜덤 2인",group:"전원",story:"썰",question:"질문",wild:"와일드"},ci=i=>JSON.parse(JSON.stringify(i)),Bi=(i="id")=>`${i}_${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`;function Di(){return{id:"default",name:"기본",builtin:!0,rev:Yo,missions:ci(tl),wild:ci(Sr)}}const ks={version:1,settings:{drinking:!0,sound:!1,haptics:!0,tissueAuto:!0,consentSeen:!1,noStory:!1},players:["A","B","C"],packs:[Di()],activePackId:"default"};class nl{constructor(){this.state=ci(ks),this.subs=new Set,this.ready=this.load(),this._t=null}async load(){const t=await Ss.get("state");return t&&t.version===1&&(this.state={...ci(ks),...t,settings:{...ks.settings,...t.settings||{}}},this.state.packs?.length||(this.state.packs=[Di()]),this.state.packs.find(e=>e.id===this.state.activePackId)||(this.state.activePackId=this.state.packs[0].id),this.state.packs=this.state.packs.map(e=>e.builtin&&(e.rev||1)<Yo?{...Di(),id:e.id}:e),this.state.packs.forEach(e=>{e.builtin&&e.name==="DEFAULT"&&(e.name="기본")})),this.emit(),this.state}get(){return this.state}set(t){this.state=typeof t=="function"?t(this.state):{...this.state,...t},this.emit(),this.persist()}update(t){t(this.state),this.emit(),this.persist()}subscribe(t){return this.subs.add(t),()=>this.subs.delete(t)}emit(){this.subs.forEach(t=>t(this.state))}persist(){clearTimeout(this._t),this._t=setTimeout(()=>Ss.set("state",this.state),150)}flush(){return clearTimeout(this._t),Ss.set("state",this.state)}get pack(){return this.state.packs.find(t=>t.id===this.state.activePackId)||this.state.packs[0]}missions(){const t=this.state.settings.noStory;return this.pack.missions.filter(e=>e.enabled!==!1&&!(t&&(e.type==="story"||e.type==="question"||e.physical===!1)))}wilds(){return(this.pack.wild||Sr).filter(t=>t.enabled!==!1)}setPackMissions(t){this.update(e=>{const n=e.packs.find(s=>s.id===e.activePackId);n&&(n.missions=t)})}resetActivePack(){this.update(t=>{const e=t.packs.findIndex(s=>s.id===t.activePackId),n=Di();if(e>=0){const s=t.packs[e];t.packs[e]={...n,id:s.id,name:s.name,builtin:s.builtin}}})}addPack(t,e){const s={...e?ci(e):Di(),id:Bi("pack"),name:t||"내 팩",builtin:!1};return this.update(r=>{r.packs.push(s),r.activePackId=s.id}),s}deletePack(t){this.update(e=>{e.packs.length<=1||(e.packs=e.packs.filter(n=>n.id!==t),e.activePackId===t&&(e.activePackId=e.packs[0].id))})}importPack(t,{replace:e=!1}={}){const n=typeof t=="string"?JSON.parse(t):t,s=Array.isArray(n)?n:n.missions;if(!Array.isArray(s))throw new Error("missions 배열이 없습니다");const r=s.map((l,V)=>Qo(l,V)),a=Array.isArray(n.wild)&&n.wild.length?n.wild:void 0;if(e)return this.update(l=>{const V=l.packs.find(h=>h.id===l.activePackId);V.missions=r,a&&(V.wild=a)}),this.pack;const o={id:Bi("pack"),name:(n.name||"가져온 팩").toString().slice(0,24),builtin:!1,missions:r,wild:a||ci(Sr)};return this.update(l=>{l.packs.push(o),l.activePackId=o.id}),o}exportPack(){const t=this.pack;return JSON.stringify({name:t.name,app:"BOILER GAME",version:1,exportedAt:new Date().toISOString(),missions:t.missions,wild:t.wild},null,2)}}function Qo(i,t=0){const e=["action","duo","group","story","question","wild"],n={id:typeof i.id=="string"&&i.id?i.id:Bi("m"),mode:"spicy",type:e.includes(i.type)?i.type:"action",tag:String(i.tag||"").slice(0,40),text:String(i.text||"").slice(0,400),description:String(i.description||"").slice(0,400),touch:!!i.touch,weight:Number.isFinite(+i.weight)&&+i.weight>0?+i.weight:1,enabled:i.enabled!==!1};return Number.isFinite(+i.timer)&&+i.timer>0&&(n.timer=Math.min(600,Math.round(+i.timer))),i.failable&&(n.failable=!0),i.physical===!1&&(n.physical=!1),Array.isArray(i.options)&&(n.options=i.options.map(s=>String(s).slice(0,200)).filter(Boolean).slice(0,6)),n}const Tt=new nl,il="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAAwAAAg9AG5ubm5ubm5ugYGBgYGBgYGOjo6Ojo6Ojpubm5ubm5ubm6enp6enp6entLS0tLS0tLTAwMDAwMDAwMDNzc3Nzc3Nzdra2tra2tra5ubm5ubm5ubm8/Pz8/Pz8/P//////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkBn8AAAAAAAAIPR+zKY0AAAAAAP/7wMQAAAhMF2b0wAAi0Kmq/zkgSABAOtOzg3J9iQCAEAICI4w4NB8HwcBDEAPh98oCAY5cHz8/zmCBnicEOXB/LggCAIHP/4IA/rBwEOBwfP///y5/ggAAAAYSASJuJO30w6IhAGAYuVBtE9mYACaqoj6G+UqY/MoGEo6wjB4xMQgswCDggImFg8YSCphQNmDwCtkIbHIC14R8G3kRFSDVwauGaNA9IiyZ4zFxiFRkROwpETqRF0JeJwbgckWR5GeFxHzpqkmtGMyTRBi8xOyHEWGWMTX8iJdOE8XCkmRxiXTAyNl/y8TJAUHIsYl0urpUkkUUf+cJ42rLqa0kVf//+k6zFJIyEoLA1rUAAAI1WG34AAAbZMkxQvOiRjLaA5dMHTw4QtDGVOZCSzFR25J4etRklyMTJY27ipW9yp5dS87/NIAqd/+AbGR7qCywU6Gi8yE8RDVjT6c5q9q8MspkxZ/l4kxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqwANZ/QAAAAAT0r3qwogB4hhBnBNqcDRLEXVeYW5ECatAAAotS5KmTFdVVRJIB0QbjuPiPkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgwHLsAAAAAAmnEm0SpBoZ6FcLahYGRwfVYQKZgAACkV2QIcNacbqhDnV4FWvTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgH0AABXfIWkEaYEMI8K5HjkcCmAqmlQyZYs5ClyAa0xxMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqtDvAABTvUEqTC8Mm4QME64ZcoVTbCWD7qPofoQ4trUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//swxOeAxug3P/2zACiFhat5nCQtVVVVVVVVVVVVVVVVVVUWQAAAAx0FvCpIHlSc4l0YMcMiSsqNRDnFTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUW5gAAAxw2OGDwBrxAwAY40TJMQU1FMy45OS41qqqq//sQxPAAw5gfW8w94mhdA+p5hjDEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhGAAAAFvNhb1UxBTUUzLjk5LjVVVVX/+xDE7IDDGBtPzD2A6FEDaLmHsBxVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUGcVgAmNTuPTyKTEFNRTMuOTkuNaqqqv/7EMTmgcIgFTyJvgCoQAMoORwwFKqqqqqqqqqqqqqqqqqqqqpqAMAAAAAAKkoMYwXnlLyIEQyeO6FMIEAAIAAACWEUi2FpEl8jEt4YfBV2kOu5UMhX4BSz9dVMQU1FMy45OS41VVVV//sQxOWBwgQZPIw9gKA6AyYRF7AUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVX/+xDE4oHBrBEyiD8AIC6CZlEDvAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTfAcF4EzKIHYAgF4EmUQEABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxNqDwNQDNIeAACAGAGaA8AAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE2wHAMAMwCIAAIB+BJhKwAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTxAAKYGSyZQAAAgYUloxogAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxNYDwAABpBwAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",sl="data:audio/mpeg;base64,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",rl="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAAwAAAg9AG5ubm5ubm5ugYGBgYGBgYGOjo6Ojo6Ojpubm5ubm5ubm6enp6enp6entLS0tLS0tLTAwMDAwMDAwMDNzc3Nzc3Nzdra2tra2tra5ubm5ubm5ubm8/Pz8/Pz8/P//////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkBn8AAAAAAAAIPbfnNkwAAAAAAP/7wMQAAAkYIWR0wAAi2ypqdzkQCAG01bwJju0IAAgAABBEUMLO2698HwxggCYP6wQDGXB8H8/ygIAgCDpcHwfRKAgCAP8CAh/+CHSD4Pg+fqBAEPgg7/5Q5wfB8HwAAFKJw+FjcMFw6IggDK0EN4pcHGkxOuDBh0NaSsx6gzFAPMYloeA5lxLmGAcMh0EhIw4GTDgbMUAVSkD3C/wNvB9h1mgfGDdYYQhKYjkkcYHSfFaiFTEVqQ4iR0wZZiUhcwpY1IKmTIrVReMTyqRFSkW0i6XSeKRPHSHEW/LCI5xTKSLFsmiecyJo3/kyXTpgUiaWXSGpJJVJTIvf8jnKRMlUyOF4xSR+l//6kWRUklWYxX//2NUAAAAml1+4AAALRGBwcYjBBwV6G11stEVOpgkIGQwoBAKkSgalbQWnStUzSMSI1j8UVKxUihxsZ9/Qm/CoQCY7v/g57tQCREDuvqFCqdC2FsKVKAeLq0Rcj1p4qYbLKkxBTUUzLjk5LjWqqrcgiO0AAAAAJ9tLRkEBg7ETjq5SKDSFduKTJcyHJIGcXgAAE/3Y6X+aiqUsoDhBZqcCVMcbVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVwMsqwAAAAACcb7TLDCXDhC+QsArYLgU/DECmYAAArHXjjKVev6sErop12HjhJTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVEgSIAAAAAAAEXTA4RMW8MpXSD6MQRBh2B52SILAPsmSOCICIFVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRQZQAAV5zYYXRLlUjgI/hhAB5WGp4DPCKcN1UFceSFsdUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//swxOMAx4g7Pf3EgCiHhWt5h7DMVVVVVVVVVVVVVVUZMIAAFecm7gxCYtI6LAEDbyAzxVQSZ8XUIakqTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqh/wAAACLYEwQ5QChbgAGGYFJBVMQU1FMy45OS41VVVV//sQxPEAw7QhWcw8KihfA6o5h5jMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRZQAAACLMKBFUxBTUUzLjk5LjVVVVX/+xDE7QDDEB1NzD0iYFUDKHmHsMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUEUagAEtDLG/gKTEFNRTMuOTkuNaqqqv/7EMTpAcK4GT/G4SCgPgMnEPeMTKqqqqoCAMBgIBAAGE4MJwXrlLyIEQ8zN/Fs0BH0pBgQBgMBAQAAAEwmRi2JRFm+MQZrwiF/iSIpD8kPHlvKhkK/AJEV/XVMQU1FMy45OS41VVVV//sQxOaBwmQZLowlhiA3gubRB7wEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVX/+xDE5AHB7BMujGAAoDACZtEHhBRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTfgcFoETqGoSAgHoInENCMBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxNqDwOgDOoaAACAGAGdA0AAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE2wHAMAM6BoAAIB+BJtKeAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMT3AAMkLzCZQQAAoQmmLyBwAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxNYDwAABpBwAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",al="data:audio/mpeg;base64,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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxN+DwagJTcU8ACgTgWnAphwEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE4IHBnAtNxTzAIB8BabikiARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTkgAHYD0nU8AAgNwFmkzQAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxP+ACxBlM5mlgAAAADSDgAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",ol="data:audio/mpeg;base64,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vWAwIYEnkSeABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxOEBwbAJQ8fgACAhgWh494QEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE34HBgAtNxSQgIBwBKHjWAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTlAAIAD0PVgAAgN4FnEzQAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxP+ACkhlNbmXgAAAADSDgAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",Vl="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAA4AAAjzAGZmZmZmZmZ0dHR0dHR0gICAgICAgIuLi4uLi4uXl5eXl5eXo6Ojo6Ojo66urq6urq66urq6urq6usXFxcXFxcXR0dHR0dHR3d3d3d3d3ejo6Ojo6Oj09PT09PT0/////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkA/EAAAAAAAAI8/MpKSQAAAAAAP/7wMQAAAkcF2lUkAAqNSDqvzkQQQABHU1kv4DbZACAAAQJECBGjDw8PDAAAAAAPDw8f+AAAf8c/0f/84AAAAAjDw94eAAAB+//9gBn//////+GCP4IDw8PD0gAAAAAAAQHRtorYNT4NGYgEAABm2IA1Mmd42c67AMJplwsgoPCAABzKRSQ0wIg2goDQKVgAOH7BQAKLQFlwt5OB6ofqPoiQf4jCsOUgbjlEyYjmkBLw5oYSRRdiYELCyh0jKsmQUmj/y6ZF5IxZSzxDkn/GqbMXSaIsTSK2VpfyZPFEvGReRRLv//8ydZq+LkqAAA1Fnhv+AAAA4GmEDodevplkOGkmoZXFhhECNOSpcJuMOuf+2+l0sCkQVMnSJpHauizDS29RWHN9AAJoSIeA4KIfxi5eYxSHOEhMQL+pGnMBdxmYBR1YfxTVrlRdbcK+SpMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqAAv/7dAAAABxEGFHGVxkDkumNClECIFJmTCrwAI7/AAB0PYCGSIBOhBONRSpgrS6I2tMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVIBqqAAAAAAAAAAAAAAXQODqqBAwIqUpFoPGgPEsEB77gAAAAAAYYF3JNIZJjQYBjNOUVb6GX5UxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAbfwAAAAAAC0GUdpnCYxjFaRIpZAd5RHDKTXeMenPENaWSBUqTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgFKAAAAAAAAIg9kQiQhCTEBIiDYABZQJGWwJ1ZVT2pMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqEQl3AAAAAAAoRPIUh1w43Y1U//sgxPeAxzhDPf3DACieBWg5raQlGISoQGQAiZBcooJNqkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhEKAAAAAAAAKA0rfiyC1t0mXOtiRAAAAAAB7AHMjgIxADMoZQOfr4vlTEFNRTMuOTkuNVVVVf/7EMTvAMNoHVvH4SCgWoOrep4ABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAmuYAAAAAAASpyi2HyGWxj9OmkoKl0AcUFUdIjGo4lVMQU1FMy45OS41VVVV//sQxPGAA7AXVdmQAABlAys7sAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUJ4AAAAyFkqSZBIxJ2AMh1fYiGB8jiVUxBTUUzLjk5LjVVVVX/+xDE6IHChBdZx70iYEACqfj8PA1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUJiQAAAAAAAAtIKAM8asRi0AFfKqxhCIIKTEFNRTMuOTkuNaqqqv/7EMTlgcI8EUfH4MBgMYIp+Le8BKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoJkAAAAAAAABWWLg+Ah4ZIAAJSdC5hutVMQU1FMy45OS41VVVV//sQxOWBwpgVQcw8YmgoAal497QFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUHgAAAAAAAABEaB0ksNSegAAAAAjExMouwMUibKkxBTUUzLjk5LjWqqqr/+xDE6oACVBFB1YAAIFkCZtM0AAEYbDYViQRiMEAAAAAAAMiycCyIpf7UgcMtTAP+ypHxnNJ/hsAg1nrDoRHckbfjrJo77mJR/yeoTDxoJWMygnE/6UI/oTTVTEFNRTMuOTkuNVVVVf/7EMTmAcJ8E0Xc8AAoLYHpuKe8BVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxOGBwXwLPIi94CgpgaehHDwHVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE4oHB7A9LxbwgYCYBZpGMYARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTiAcHEDUnGvYAgJQGpeKe0BFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxOSAAeANQdTwACA1gaYXNAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE+QAIpGU3uYWAAAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==",ll="data:audio/mpeg;base64,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",cl="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAA0AAAiLAGpqampqamp6enp6enp6eoaGhoaGhoaGkpKSkpKSkp6enp6enp6eqqqqqqqqqqq2tra2tra2w8PDw8PDw8PPz8/Pz8/Pz9vb29vb29vn5+fn5+fn5/Pz8/Pz8/Pz/////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkAtMAAAAAAAAIi+D28asAAAAAAP/7wMQAAAmQHV/0wAAqNptr/zsygAAAAAARhJTXfgnxkgEAIAcEg8WL169fcPHgAAI9A7/gB4+OHhgAI/8w8f///xwAAAAADDw9//////8APDw8PSAAA7///zDw8PDwAAAAACCEXhbQjkXbhGMRQGAADp0qTEkQz6SGjSUIgoCzKBwHyEBggFnHAIDwaYLgEYLgoHCsLACoWzUPlD4RCoAsiiYCtSOGWAbsIJAAsJRMkAuCICHyjtG+WSQELKRW6BHENIEMscLhNFEXL8cojSKk6kXkEUTWv8+kbECJkmSGo//zIvGzMpFEu/9QNEq0qgADlSZmb7gAAAwAcD84gPaGkx8IQgItqpk/0eZCt2TPJO/N0sVBOFUk5ixkn1ijZUnWVtfk7IaAHERMzEGcYiLSdATqLIgsiEQWksyOB3Qe53Ys7MVwjQLTU2ZtWJZ3TEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUF/g/wAAAAAFiB5gcTcX23SZuFAIkOCN//FkATgUiLGUYJVJkEQXhMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqBd0AAAAAAAASQbwRLMLihz2ED92gZBJhQuQ6UKCUlUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVG2AAABLChEIgiFg/6AJQfwjGQECsTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgW9vAAAAAAAXqmiJschS1t1h4s4WYPd0AAAAAAAAAAAAAAZRcLQkZHhOREss+Gfc+pMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoH79AAAAAAADVLMQJ8XpDUNcQk//sgxPWAxuRLP/3DACifB2h5raA1FuZAGQpYKokSbJWdWkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoaAAAAD5ZcZmLFEHAATRfQHw+rTEFNRTMuOTkuNVVVVf/7EMTpgcLAG1nMgMYoQ4MruPeYTFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQWAAAAAAAAACoNcVKwXIAAMi+HJiixMQU1FMy45OS41qqqq//sQxOWBwjwRVce94CAzAms48wSEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgsAAAAAAAAACqbjbA4ABOWkHUxBTUUzLjk5LjVVVVX/+xDE4IHBVAtUh7wgOCkB63j3mARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRQAAAADMhDQkAAAZiItTEFNRTMuOTkuNVVVVf/7EMTugAKUEVHVgAAoboLqezIAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUUAAAAAyHCWBFSAE0ZQHAa4+rj0+QGMJkJkHgHgHcfiUBA//sQxOYBwlgRV9zwACgzAek5CLwFAAAArEvE5RPgtyij/oPiwAYkJGIEP+gLT7KBAwMO/IWj1SCa/9DjXAzwqg6v/1QwKzRMTmSJk//9QQY9WNElxSByvP//9x9/dGLDFHYp/50kJWb/+xDE34HBVAtCjGAgMCEBKNGIgAcgABgICFVHhFVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMThAcGcB0nIPAAoJAEpOQwABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxN8BwYQJScgkACAWAOhRgIAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE3QHA8AlEiSQAMBkA6LkhAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTggcD8CUaJJAAwNAIourAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxP+AC/SdQ/m3gAAjASTXhgAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",hl="data:audio/mpeg;base64,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",ul="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAA0AAAilAGlpaWlpaWl4eHh4eHh4eISEhISEhISEkJCQkJCQkJycnJycnJycqKioqKioqKi0tLS0tLS0wMDAwMDAwMDMzMzMzMzMzNjY2NjY2Njk5OTk5OTk5PDw8PDw8PDw/////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkAtMAAAAAAAAIpQsgQ40AAAAAAP/7wMQAAAgEFWW0kAAiiJqqfz2SQAAAAEu45f+ATvIAQAACAoQQbB8HwfPggCAIXeD4Pg+D4OAgCByBwfD/KHPlwfyYIAgGP+XBwEAQBAEAfB8HwfQAAAmL2FWb4DzMFBAEAAAAanYNJgbAZmSQS+YJgQpgmA+jQYRgtAFmBKAYUAQjgCpMAS+IVAWMBMBgMA1MBkBQt835ZUuCapQ+U9s6aVpjnGmgFA2irVlMPSFL6AWWtZgqIx6NZ//rKWdB8bhqtffWrZ///4lVh1wY8/2v1lr////2XSWdnPjL6/////////9aXS67S0uQd/8KgqKHv/////rVAAAkZmaP8AAACIkDTlIjjNTjH8ZjD0IAwFmkuK3saVXfyG33ZC6sAxQywa1osmblM+sfi+ZKCx0B//3/7/YYG4LVzojAneCxBBiCoSh6RExsdImn7hZAqkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoAvf/vAAAAAEdCyQRK2BkJ2QQv5BEYD6Wc3KB9mYggLPiTaoXhPwBwAdVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVB638AAAAAABVQlKhkrAMc4B/mQQtDxIB/ACgCqED2KSqqkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqIL3tAAAAAAADAAQgpo4CoP8WAuYHBIX0AO/wNAMcUOgvhQIUqXOHTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUhzMAAAAAAvsnCRjWgnCQtMrfCsYIMywAAAAAAAAAAAAADwGYiAgYPR4yd72SfDKpMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgGZkAAAAAAAEyQCDBsFEquk//sgxPGAxwBHPf3TACh9hOu5hhidxKjjNMHwANIWeBePqkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqBpAAAAAAAAAKAs4KxqKYJkAAHsmAWm1aTEFNRTMuOTkuNaqqqv/7EMTrAcNMHVvMPQKoPAIqeYeMRaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqh+AAAAUUhsB3fCyAAeFxVVMQU1FMy45OS41VVVV//sQxOcBwtwVVcw94igsAet497wEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRuAAAAVwlwYUGkJAAAorbAuqkxBTUUzLjk5LjWqqqr/+xDE6YHDABlTx72CYDuCqzqeAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoLAAAAAAAAAAe0osjIYAAVobs1TEFNRTMuOTkuNVVVVf/7EMTuAAKAEzyZoAAIbILquzIAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVCQAAAAAAAAArVTFLgJqgAmLSB0GcQy/dPkoEIIgGcGUEYEUXBMAg//sQxOUBwqwVQd2AACAggWiRiAQEAAAAoTfCUhegMAy7P+XHEggxYYMUJ/9c7blAIAQj8XNHuI3v/RVwCvFeH9//EePNF1Ty5Qn//qCDHq/P0uJ6HKyf//7vv7w+w+vCn/nSQKs/1pL/+xDE4gHB2A1HyEBAICMBKTj3gAXCy//rWr//66AQAABgICFVHhFVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTeAcFQCUKMPAAoFIDpIPeABlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxN8BwUAJQIw8ACgcgOh5iAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE34HBmAlJx+AAIBeBKhDXgAZVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTjAcGQCUPMPAAgM4IourAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sgxP+ADQCdO/m3gAAogSTjhgAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==",dl="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAAwAAAfuAGVlZWVlZWVlfHx8fHx8fHyJiYmJiYmJiZeXl5eXl5eXl6SkpKSkpKSksbGxsbGxsbG+vr6+vr6+vr7Ly8vLy8vLy9jY2NjY2NjY5eXl5eXl5eXl8vLy8vLy8vL//////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkBQAAAAAAAAAH7sZHmJ4AAAAAAP/7sMQAAAZIG1W08AAh3BCoPz2AAAAABrJLbtwAo1wJIA6AQAwDImvR5EpOFAQcsHwQdlwfB8H39QJh/4IAh6QQDH5cEPWHwAABSVFhld1ZtrQEAAAAADXPC5MTQFsyxiCzAWBZMD0PYwmwJjBeA9QMKgB0uMEABldwkAsFAADABAKFgBUEyowAU5ZHQO8uOkDku1AD2uDBEqfZ+kFl8tmjMG2b2VBlzKwoM6VBN013ve7/evqw9cleNn8NIKsVAk3ju2/AAABjQZnGaMZgBYsAWprSVuayqVozcnIZy/674HprIfSJAnZdo682RhpKiyp6yOythgA0TCG7uaxaf6KdAsmCCqXKwr2EhwRAJKhNOCztkNZO5R6qB99DVkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqoC3MzMzMAAABeI8glwUBGCFRCw8ckEJTgnSjVjs6/ATbsBqKcFrQ63g0fZmAhtTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVDtAAAAAAAAALKiGKYLA2AAAYGING5rVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUYAAAAAwgNzBIAAAwjlUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRQAAAADCOBgTEFNRTMuOTkuNaqqqqqqqqqq//tAxNmAxuRLPb3DACibBqg5rDAUqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoGAMJMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgYAwkxBTUUzLjk5LjWqqqr/+xDE7QHD0CdRx7EjKDyEKjjwjJWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqBgDCTEFNRTMuOTkuNaqqqv/7EMThgcG4DVfFvGAgIwFpeQwEBKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgkAAAAAAAAABggKmZCQAAK2UgKUOs53aBBDwQpMQU1FMy45OS41qqqq//sQxN0BwPwJSohAADAVgKl5AAAFqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqBjbbYA3TRLDQ3hDgEkaSJViCuiwAKPxL1UxBTUUzLjk5LjVVVVX/+xDE2gPA0AdKiBgAMAWAaUEAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVf/7EMTXg8AsA0oIAAAgBYBpQQAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxNeDwCwDSggAACAFgGlBAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE14PALANKCAAAIAWAaUEAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTkAMFAA0vIAAAgRgKouYeMDFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxOKBwnQZOIe8wHgSASRUwQAGVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE1gPAAAH+AAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==",fl="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAAsAAAeGAGtra2tra2tra4ODg4ODg4ODg5GRkZGRkZGRkZ+fn5+fn5+fn62tra2tra2trbq6urq6urq6usjIyMjIyMjIyNbW1tbW1tbW1uTk5OTk5OTk5PLy8vLy8vLy8v///////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkBGoAAAAAAAAHhriXEqsAAAAAAP/7sMQAAAasFVO08AAiCBVsPz2EgAAAAAo29fwAS9iDgAEgAQBAFgQh4/B8PxAD4fP4nB8/xOD4OHOUdiQEAQBD/wfP4jB8HwfD4AALSNqv6txPm4jDAAAAABrnhlmEgC+Z1hNoqDeFgBkDjCEAlMBMCYwXAKmjGA8APGzBDBQMEMBQZAQRRQrUBMQS37YCALdHWLsLuGCKaspcW3RdYc11weKrYW3B/e/XO8jQIEXbVsw1HoG///3pynpbKqm/3+P////58v5Wrlb/XQoARXhFZ3/4AAAMNAs7nAjKwJX4W+c9QZyURVPts0qCJI3WrI4FG0K5l6BKTU/JY8JSxYyy/SAI0S7y7mIOnEIhgVxmCuMAUnAV4AE9PCEEwJD/JTqBq3RCdXVMQU1FMy45OS41VQK6uoe6AAAAJgpeh2K67H/IDRASIkpjQiOm+yLtJooC5U1dgAKENFA0aRr8YdL4ZigBgBPiTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqGoAFAAdi5DAQwZzx4sAAIiwObp1MQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQsAAAAAAAAABEcB1QkAAAZQtUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFAAAAAIkUV4VTEFNRTMuOTkuNVVVVVVVVVVV//tAxNKAxqw/Qf3EgCCQBij5piScVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQRCvCpMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqBEB7VUxBTUUzLjk5LjVVVVX/+xDE8IDD5C9JzCQlaFcEqXmEJJxVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUHsCIqCIkAAAAAAAAmzKAxDf/7EMTgAcGMC0qHvCAwHQFpUNeEBnJTF6fIhgUDAYDAUCgEAAAAAAGEiFDBAtGAbMeFpArTwtADpPAoZLfjwAvwq/+bjDjDjz/80MzcTAlPygYV/Lw//+U//75MQU1FqqqqrHAwGAoG//sQxN8BwYAJS8awACAWAOj5AwAEAwCAAAAAAADLIFAaT4GqYgAjvCxYMd8BLABy8LkSQcr8C6E9IIW7/C2gtpAHaIz/5dUsxMj34iPFv7RU6s7/1kYi//Z11UxBTUUzLjk5LjVVVVX/+xDE2oPA1AdKhogAMAaAZ8GAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTYA8AwA0oGgAAgBoBnwYAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxNgDwDADSgaAACAGgGkA8AAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE2APANANIB4AAIAYAaUDQAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMT/gAI4EUHVgAAhBA8nNyrQAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxPwACWSDOblGgAAAADSDgAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",pl="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAAgAAAbRAIWFhYWFhYWFhYWFhaSkpKSkpKSkpKSkpLOzs7Ozs7Ozs7Ozs7PCwsLCwsLCwsLCwsLS0tLS0tLS0tLS0tLS4eHh4eHh4eHh4eHh8PDw8PDw8PDw8PDw8P///////////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkBgAAAAAAAAAG0cBxGq0AAAAAAP/7wMQAAAmQEXO0YAAjPCusNzeASAAAAIqpLftuTTYgCAAIQGHBOD73SgIDHNB8+UOAgCAJh/gg7Lh/ggcy4Ph//4P8oc4Pg+D4Pg4CAIBjLg+D71AgCAYeJwfB8HAQBAEAAACAAAGxXc16/ILBgDNT4FIwKWTFgIMBSBcMaATDRM/BTNdEAzJMWFy0jNjEgQyERMDGjCAlE9nSmioDYRIVec7ALP4cVTByJdL27OC9UGl1WDQ0/KGLSW9YExKNwA5N4UA46Z0rhuAnGju6WnjUiylMtd35TDuctqf+94S2PP9D1DAMZazHJHT361iVSqehmrLa1aXSq7jS1sqbF/YZxlNLjVlP/////8Zs1bVu5VpfuWqatS1LuVWlpfx///////91ause1e/Wx3VuZa6lQA/QAAAYyAJa1WkEhQxCRDPruPMuUx8DxCHjKjYM4g0vqAAiYFExQuzFADCxCNPhwBCTFjimUasSHDU8y4Y8VcmNSrXd8//+tat7x/dmjUEAAAAACcAArRtWwEjfQLhMrScOXHEYmZyS7qBpirZTuE9QDOoQK4ksiXi8uH1pVR9wNhETsAAAFaq4oTIi3Jdm9YWKBYnVREB64u2ip7I2YqJA6CJEUj4Er+sOiIyYWFa46bQb1NXcKkeuY8gpv11EDCUqTEFNRTMuOTkOc0d1eNAAAAStx2yGeNWtARBiy0Lk6KEIb0C4yVqOW5L3huRNTEyAW2qV1FB5dSZWkrzBlAHkYsDvlhUSn2cXVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVQzp3Om5AAAABLV4SMVN10O8ILBJQ3CUiycO4Xj57MQDbzey9sEvdcBhU2YKcswnS8AMDl+hxKiVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQCt3dzMAAAABL1BYuODISylpGtK71CEzMQ7wABBXvATGkk3LYn1//tQxNUASexbOv3NACC8h2i9jWCEEYYGYI4OqWlMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUQpAAABUyMQOaqYLKSlUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVf/7EMTzAMRQNVfG4YDog4equKwYNFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxPaAxEQ9VcU9gKB4Bqq4vDBcVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE8gDD2DFVxT2C6GQF6rinmGVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTtAMLEJ1XFPSQoXoMoOYekTVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxN0DwbgLKIxgQCgAAD/AAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE1gPAAAH+AAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==",ql="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAAYAAAY1AJOTk5OTk5OTk5OTk5OTk5OsrKysrKysrKysrKysrKysrLy8vLy8vLy8vLy8vLy8vLzNzc3Nzc3Nzc3Nzc3Nzc3Nze/v7+/v7+/v7+/v7+/v7+/v/////////////////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkBQIAAAAAAAAGNWQup7UAAAAAAP/7wMQAAAlUEXG0YAAi/aKsNzmgUQAAQjE3JtruTuCAACCCAZB8P1gg4EAQLvLg+H6gQDGD5+CAIOl36QQcCAIYnD//+BDnB//B99YEBAEAQDAPg+D4PmgQBAMEAfB/QCAAACAIkS3kgq5R2KAZjHhe8uWTDAyoFR4IkQJKxFDBkUnGHxgYTv40G3lMZBwHEQ3IITNA1iaxFxlrzQIRf98BQWjs5agZKBaQhKZ52Hndgl/H4lCpqF2YqzmJS+07Lbu/G34jDWV2uBRQ1hKpHKJbqKyOXxqk1lVjMZrS6Z7qm7M3qWPzNDSVeQ9jjVrU1NcjWUps1abKtcqXMtUtfn/qtjjjrLKlm5DWtU30tLcptaXvbcUkFRTdhpAdk2yVDoAAAV/AAABrQCXRZrYn0BK5UxUfi85kgqcgFGWHpzx6boipQFCs6ykTbGIygUoZ4TBr/CAKuAIKqqER7iI++UEBBLBkK3t8bg+iXkh57FtOtHEuNia1mUA03cwqDdtzEzPQAAABgxs4KEkAuRPDJfHocNUNKiTzVIWmNhgAzIIjIgBle7Ygog+nNtJqAYJDTQZ+IiybqkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgANyIh3AAAAAYPrqOUKrqS5gQk/xwCt5VMqZAAvHeoYAZXNS64bSlKJVKWVK3tCl3FqB6y7q6oAAAAjLKA4DkOCy9r8qnbEoh90pfDMahr4JJBRMACHqniGgIgGcXhQBAAAAArEPIsyUmECo8C/ox8HMfCzodgyN6u06HYMADUxwxY/qBsYF6DQiBrCfCxcAYWJuABUBegDNjvFwCCBDRxgUHiywMIBCER8ZsvE4QQ1GIDZQQgxOQN9/TTdBBhnCCizhnyDDk//5MF0pF8vFEuf8qIwqCJH/3BUAhkGwC7+m5NySwdBUBEQmAiP/+j/+LhKTEFNRTMuOTkuNaqqqqqqqqqq//swxN4Ax8A1P728gCB4his5N6QsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqSGKloAArADAeEZ7Vrs5DYv9BXQjshvgrorsgrgV4KbFNyCuBVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxPMAxAAxVca9IWBlBen5J6RcVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE7wDDWC9Vxr0k4FoF6fkgPAxVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UMT/gAQwL0vVgwAieRkpvzdASFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE6IPElBMnPMAAKAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==",Al="data:audio/mpeg;base64,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",ml="data:audio/mpeg;base64,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pipMQU1FMy45OS41qqqq//sQxOeBwoQRUce94Cg6gqq5DCREqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqC7kAAAAAAABFlzB5LzDUkGyAAE42hQEzTUxBTUUzLjk5LjVVVVX/+xDE5YHCTBFTx73gIDGCKpD3jA9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVULgAAAAAAAAAYDfB1LKwkAA+GaCqxJTEFNRTMuOTkuNVVVVf/7EMTkgcJME1PHmCQgKgFperAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVR8AAAAV8aCED6CHAAI8NuBpaJVMQU1FMy45OS41VVVV//sQxOyAA1AXR9mQAABKAejTNgABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVEAAAABSGNBbBYAABbRQgukxBTUUzLjk5LjWqqqr/+xDE5YHCYBFN3YAAKC4BqPmMJAWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhQAAAAFA3D1CqqYmQAALKXE2BuDvPICC70chZHJTEFNRTMuOTkuNVVVVf/7EMTigcH4DUnIPMAoJQEo+YeABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVREUgAAFxI1AJqScwTpMQU1FMy45OS41VVVV//sQxOKBwfQPS8wYIiAkASl494AFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVX/+xDE4QHBxAlJyDwAKB6BKFGEgAdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTfgcEwCz6MLCAgIwFn+YYEBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxN4BwQwJQowYADAdASl49YAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE5IDBAAlIiBwAMFOCqLj3pA1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMTcg8GgCyyMPCAoAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxNYDwAAB/gAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",gl="data:audio/mpeg;base64,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",_l="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAAkAAAcfAICAgICAgICAgICAmZmZmZmZmZmZmZmoqKioqKioqKioqLa2tra2tra2tra2xcXFxcXFxcXFxcXU1NTU1NTU1NTU1OLi4uLi4uLi4uLi8fHx8fHx8fHx8fH//////////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkAqUAAAAAAAAHH7ovl/wAAAAAAP/7wMQAAAigQ3G0MwAjWiusvz1gwAGkAIAAfE78LdzP0R93AwMDFvN+P2MIAMBgMmTJnxGD4P4IO/xP8Tg/4Jg+D4PlwQBB0uD7//KA+/xAGPxACAIO//+kEEDyCgACBwAQBfAyIBAMBgDA3AwMBkBAwFQBQgEkMB5RZMAEAQQACszMBkCDIvEAAFysBUwVA/zQzAqR0JgHxGQYmBYB4DQJSGAgAABUAgNigtkBjKWwBq8msBmXgsF6gMCADgEAEAkA4mSCmoGJMKwGBIC4fmNYEQODI/IqkZDpEKh0Qe8XTo5vy6oyIETJFWl1Amjb8ipwmiBGKBNGWZTFv5iiiZE0T2dSddJJFkf+TRPGxkXjpk6KTshoMdZk1//MUnMUkkll0upJJLLoubCaIAs///6Vj/zkABAAAAAaWuKlzAj9LmUyfprTf5LDT0iEVYHPnGd6MxmW/rKVP8vEFjCRhk4qAodApO6L88yGuG/9gSgBAAVfKC3In1iqOo0doAbJESnqUlPLMv/nY8CF5kBr8SMIp91CgA/uIYIBgAAAALWCplaaJCgkNoIZ4qd+SCko39swQ7nZG9QRcdVpYA7+FLEBwAEb7H5a+rYlZ9XSAYgMl2doOrf+cWOuYqN4JNvRYArNE5EBwAAAAZH5WFIwm/2EBBrxLq9gRcH/F6C2wxd3C4NGLQbIAmrAJEAavrZ8nTm8IXQVWvKxGC4/51BChLQjkeADStSAFUxBTUUzLjk5LjVVVVVVVVUgAJoCsQHAAAAAtd4lXHwEuL1nsi2dMD/4so1kt82RaTsyIAAQBUYAWu6fRMjE32BjUkb+t8F1ueF5CxHJpUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWAADbbnCAAAAtf+jZhDjDXRRk+i0c7HqgAAERkgDVrCBET2S60Kq8yVTEFNRTMuOTkuNVVVVVVVVVVV//tAxNUARyRJVd2sgAimCKt40OAIVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUgAABbBgwAAAauIUHaXE/6q2VWRWAAAnHINXA0C7f0eO3aNHVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAAAAlgAoAAAAAatwIh//7juNhkAEwCC0kcgBQIJ0RT/0CFX/4gPEBdQtlUxBTUUzLjk5LjVVVVX/+xDE9ABE4EVf5oHgQI+Iq3zcPNBVCQmswUZoDAgBAAAAAAKHfK6umIO0T/wnBCCtm5J8rSmCp9o3CRRsfSAeLwZ/kyREv/42Gpw2HfxQWFaQAAAA4BAIK0FVTEFNRTMuOTkuNVVVVf/7EMT4AMTIRVHpDeRgiAipONA8DFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxPUAxDxDR+aB4KBuiGh40DwcVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE6oDC7ENXxr1KIEOIarjQNCRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMToAMKQRUnGgaEgPAioENAcJFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxOuAQkhDQeaA4SBgCKXSqFAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDE+IAHWHk3uZOAACYBZKOMAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==",jo={tick:[il,sl,rl],pull:[al,ol,Vl],heavy:[ll,cl,hl,ul],blocked:[dl,fl],click:[pl,ql],sheet:[Al],thud:[ml],glass:[gl,_l]};let yi=null;const Ko=new Map;let Zi=null;const vl=()=>Tt.get().settings.sound;function Er(){if(!vl())return null;if(!yi){const i=globalThis.AudioContext||globalThis.webkitAudioContext;if(!i)return null;yi=new i}return yi.state==="suspended"&&yi.resume(),yi}async function Zo(i){return Zi||(Zi=(async()=>{const t=[...new Set(Object.values(jo).flat())];await Promise.all(t.map(async e=>{try{const n=await(await fetch(e)).arrayBuffer();Ko.set(e,await i.decodeAudioData(n))}catch{}}))})(),Zi)}function Be(i,{gain:t=.8,rate:e=1,delay:n=0,vary:s=.08}={}){const r=Er();if(!r)return;const a=jo[i],o=a[Math.floor(Math.random()*a.length)],l=Ko.get(o);if(!l){Zo(r),xl(i,r);return}const V=r.createBufferSource();V.buffer=l,V.playbackRate.value=e*(1+(Math.random()*2-1)*s);const h=r.createGain();h.gain.value=t,V.connect(h).connect(r.destination),V.start(r.currentTime+n)}function xl(i,t){const e=t.currentTime,n=t.createOscillator(),s=t.createGain(),r={tick:520,pull:380,heavy:120,blocked:110,click:220,sheet:140,thud:90,glass:1800}[i]||300;n.type=i==="glass"?"sine":"triangle",n.frequency.setValueAtTime(r,e),n.frequency.exponentialRampToValueAtTime(r*.45,e+.08),s.gain.setValueAtTime(.18,e),s.gain.exponentialRampToValueAtTime(.001,e+.1),n.connect(s).connect(t.destination),n.start(e),n.stop(e+.12)}const Pe={unlock(){const i=Er();i&&Zo(i)},tick(){Be("tick",{gain:.5})},wood(){Be("pull",{gain:.9}),Be("tick",{gain:.35,delay:.05,rate:.9})},blocked(){Be("blocked",{gain:.6,rate:.8})},click(){Be("click",{gain:.45,rate:.9})},sheet(){Be("sheet",{gain:.7,rate:.85})},timerTick(){Be("click",{gain:.3,rate:1.2,vary:0})},timerEnd(){Be("glass",{gain:.7}),Be("glass",{gain:.4,delay:.12,rate:1.1})},penalty(){Be("thud",{gain:.8,rate:.8}),Be("glass",{gain:.5,delay:.18})},collapse(){for(let i=0;i<6;i++)Be("heavy",{gain:.9-i*.1,delay:i*.09+Math.random()*.05,rate:.85+Math.random()*.3});this.sub(1)},sub(i=.5){const t=Er();if(!t)return;const e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(48,e),n.frequency.exponentialRampToValueAtTime(34,e+.6);const s=t.createGain();s.gain.setValueAtTime(1e-4,e),s.gain.exponentialRampToValueAtTime(.35+i*.3,e+.05),s.gain.exponentialRampToValueAtTime(.001,e+.7+i*.5),n.connect(s).connect(t.destination),n.start(e),n.stop(e+1.4)}};function S(i,t={},...e){const n=document.createElement(i);for(const[s,r]of Object.entries(t||{}))r==null||r===!1||(s==="class"?n.className=r:s==="html"?n.innerHTML=r:s.startsWith("on")&&typeof r=="function"?n.addEventListener(s.slice(2).toLowerCase(),r):s==="style"&&typeof r=="object"?Object.assign(n.style,r):s in n&&typeof r!="string"&&s!=="list"?n[s]=r:n.setAttribute(s,r===!0?"":r));for(const s of e.flat(1/0))s==null||s===!1||n.append(s instanceof Node?s:document.createTextNode(String(s)));return n}const fn=(i,t="")=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${i}</svg>`,qe={gear:fn('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),back:fn('<path d="M15 18l-6-6 6-6"/>'),plus:fn('<path d="M12 5v14M5 12h14"/>'),grip:fn('<circle cx="9" cy="6" r="1.2" fill="currentColor"/><circle cx="15" cy="6" r="1.2" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="18" r="1.2" fill="currentColor"/><circle cx="15" cy="18" r="1.2" fill="currentColor"/>'),more:fn('<circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/>'),x:fn('<path d="M18 6L6 18M6 6l12 12"/>'),chevron:fn('<path d="M9 6l6 6-6 6"/>'),touch:fn('<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 10.5a1.5 1.5 0 0 1 3 0V12M14 11.5a1.5 1.5 0 0 1 3 0V13M17 12.5a1.5 1.5 0 0 1 3 0V17a5 5 0 0 1-5 5h-2.5a5 5 0 0 1-4.1-2.1L5 15.5a1.5 1.5 0 0 1 2.4-1.8L8 15"/>')};let Qn=null,Na=null;function De(i,t=1600){Qn||(Qn=S("div",{class:"toast",role:"status"}),document.body.append(Qn)),Qn.textContent=i,Qn.classList.add("is-on"),clearTimeout(Na),Na=setTimeout(()=>Qn.classList.remove("is-on"),t)}function yr(i,t){return new Promise(e=>{const n=r=>{s.classList.remove("is-on"),setTimeout(()=>s.remove(),220),e(r)},s=S("div",{class:"menu",onClick:r=>{r.target===s&&n(null)}},S("div",{class:"menu__card"},i?S("div",{class:"label",style:{padding:"8px 8px 6px"}},i):null,...t.map(r=>r.sub?S("div",{class:"menu__item"},S("span",{},r.label),S("div",{class:"menu__sub"},...r.sub.map(a=>S("button",{class:"chip",type:"button",onClick:()=>n(a.value)},a.label)))):S("button",{class:`menu__item ${r.danger?"menu__item--danger":""}`,type:"button",onClick:()=>n(r.value)},S("span",{},r.label),S("span",{html:qe.chevron,style:{width:"18px",height:"18px",color:"var(--muted)"}}))),S("button",{class:"btn btn--ghost",type:"button",onClick:()=>n(null),style:{marginTop:"6px"}},"닫기")));document.body.append(s),requestAnimationFrame(()=>s.classList.add("is-on"))})}async function Bn(i,t="확인",e=!0){return await yr(i,[{label:t,value:!0,danger:e}])===!0}let Ml=0;function Jo({height:i=40,color:t="var(--paper)",ring:e="var(--flare)",sub:n="GAME",subColor:s="var(--sap)",rings:r=!1,blur:a=!1}={}){const o=`mb${++Ml}`,l=30,V=42,h=2.9,u=3,c=15.5,q=V+u+11.2,g=[0,1,2].map(x=>{const w=50+(x-1)*6;return`<path d="M${w} ${V}C${(w-3.2).toFixed(1)} ${V-4.5} ${(w+3.2).toFixed(1)} ${l+4.5} ${w} ${l}"/>`}).join(""),p=n?`<text x="50" y="${(q+7.4).toFixed(1)}" text-anchor="middle" font-family="IBM Plex Mono, ui-monospace, monospace" font-weight="500" font-size="5.4" fill="${s}">${n}</text>`:"",E=`${a?`<filter id="${o}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.2 .12"/></filter>`:""}<g${a?` filter="url(#${o})"`:""}>
      <g stroke="${t}" fill="none" stroke-width="${h}" stroke-linecap="butt">${g}</g>
      <text x="50" y="${q.toFixed(2)}" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="${c}" letter-spacing="-.05em" fill="${t}">BOILER</text>
    </g>${p}`,y=document.createElement("span");if(y.className="mark",y.style.height=`${i}px`,y.setAttribute("role","img"),y.setAttribute("aria-label",`BOILER ${n||""}`.trim()),r){const x=n?q+7.4:q,w=50-(l+x)/2,b=[[47,2.6],[42,2.6],[37,2.6]].map(([C,B])=>`<circle cx="50" cy="50" r="${C}" fill="none" stroke="${e}" stroke-width="${B}"/>`).join("");y.innerHTML=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">${b}<g transform="translate(0 ${w.toFixed(2)})">${E}</g></svg>`}else{const x=l-2,w=(n?q+9.5:q+1)-x;y.innerHTML=`<svg viewBox="26 ${x} 48 ${w.toFixed(1)}" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">${E}</svg>`}return y}const zs=2,Oa=8,Ji="ABCDEFGH";class Sl{constructor({onStart:t,onSettings:e}){const n=Tt.get();this.names=[...n.players?.length>=zs?n.players:["A","B","C"]],this.listEl=S("div",{class:"start__players"}),this.addBtn=S("button",{class:"btn btn--secondary btn--sm",type:"button",style:{width:"100%"},onClick:()=>this.add()},"+ 사람 추가"),this.countEl=S("span",{class:"muted",style:{fontSize:"12px"}}),this.drink=S("button",{class:"switch",type:"button",role:"switch","aria-checked":String(n.settings.drinking),"aria-label":"벌주 모드",onClick:()=>this.toggleDrink()}),this.noStory=S("button",{class:"switch",type:"button",role:"switch","aria-checked":String(!!n.settings.noStory),"aria-label":"썰 제외",onClick:()=>this.toggleNoStory()}),this.el=S("section",{class:"screen screen--scroll start",id:"screen-start","data-lenis-prevent":""},S("div",{class:"start__top"},S("button",{class:"btn--icon btn--icon--ghost",type:"button","aria-label":"설정",html:qe.gear,onClick:e})),S("div",{class:"start__hero"},S("h1",{style:{margin:0,lineHeight:0}},Jo({height:176,rings:!0})),S("p",{class:"start__lead"},"블록을 뽑는다. 미션이 올라온다.",S("br"),"빠지는 사람은 없다.")),S("div",{class:"stack"},S("div",{class:"row"},S("div",{class:"label"},"함께하는 사람"),this.countEl),this.listEl,this.addBtn),S("div",{class:"stack",style:{gap:"6px"}},S("div",{class:"toggle"},S("div",{class:"toggle__label"},S("span",{},"벌주 모드"),S("small",{},"벌주는 한 모금. 끄면 벌주 대신 추가 미션.")),this.drink),S("div",{class:"toggle"},S("div",{class:"toggle__label"},S("span",{},"썰 제외"),S("small",{},"썰·질문·말로 하는 카드를 빼고 몸으로 하는 벌칙만.")),this.noStory)),S("button",{class:"btn btn--primary",type:"button",onClick:()=>t(this.players())},"시작"),S("div",{class:"start__foot"},"누구나 패스할 수 있다. 이유는 필요 없다.")),this.renderList()}renderList(){const t=this.names.length;this.inputs=this.names.map((e,n)=>S("input",{type:"text",maxlength:8,placeholder:"이름",value:e===Ji[n]?"":e,"aria-label":`${n+1}번 이름`,autocomplete:"off",enterkeyhint:n<t-1?"next":"done",onInput:s=>{this.names[n]=s.target.value},onKeydown:s=>{s.key==="Enter"&&(s.preventDefault(),(this.inputs[n+1]||s.target).focus(),n===t-1&&s.target.blur())}})),this.listEl.replaceChildren(...this.inputs.map((e,n)=>S("div",{class:"field"},S("span",{class:`badge ${n===0?"badge--accent":""}`},String(n+1)),e,t>zs?S("button",{class:"btn--icon",type:"button","aria-label":`${n+1}번 삭제`,html:qe.x,style:{width:"36px",height:"36px",minHeight:"36px",border:0,background:"transparent"},onClick:()=>this.remove(n)}):null))),this.addBtn.style.display=t>=Oa?"none":"",this.countEl.textContent=`${t}명${t===2?" · 감독 없음":""}`}add(){this.names.length>=Oa||(this.names.push(Ji[this.names.length]),this.renderList(),this.inputs[this.inputs.length-1].focus())}remove(t){this.names.length<=zs||(this.names.splice(t,1),this.names=this.names.map((e,n)=>Ji.includes(e)&&e.length===1?Ji[n]:e),this.renderList())}players(){const t=this.names.map((n,s)=>(n||"").trim().slice(0,8)||`${s+1}번`),e=t.find((n,s)=>t.indexOf(n)!==s);return e&&De(`이름이 겹친다: ${e}`),Tt.set({players:t}),t}toggleDrink(){const t=this.drink.getAttribute("aria-checked")!=="true";this.drink.setAttribute("aria-checked",String(t)),Tt.update(e=>{e.settings.drinking=t})}toggleNoStory(){const t=this.noStory.getAttribute("aria-checked")!=="true";this.noStory.setAttribute("aria-checked",String(t)),Tt.update(e=>{e.settings.noStory=t})}sync(){const t=Tt.get();this.drink.setAttribute("aria-checked",String(t.settings.drinking)),this.noStory.setAttribute("aria-checked",String(!!t.settings.noStory))}}const El=[["action",.42],["duo",.2],["story",.16],["question",.1],["group",.12]];function yl(i){const t=[];for(let e=0;e<i;e++)for(let n=e+1;n<i;n++)t.push([e,n]);return t}const hi=i=>i[Math.floor(Math.random()*i.length)];class Tl{constructor(t=3){this.setPlayers(t),this.reset()}setPlayers(t){this.n=Math.max(2,t),this.pairs=yl(this.n),this.pairCount=this.pairs.map(()=>0),this.lastPair=-1}reset(){this.recent=[],this.bags=new Map,this.pairCount=this.pairs.map(()=>0),this.lastPair=-1}rollType(t){const e=El.filter(([r])=>t.has(r)&&!(r==="group"&&this.n<3)),n=e.reduce((r,[,a])=>r+a,0);let s=Math.random()*n;for(const[r,a]of e)if((s-=a)<=0)return r;return e[e.length-1]?.[0]}draw(t,{type:e=null,exclude:n=[]}={}){const s=t.filter(c=>c.enabled!==!1&&!n.includes(c.id)&&!(this.n<3&&c.type==="group"));if(!s.length)return null;const r=new Set(s.map(c=>c.type)),a=e&&r.has(e)?e:this.rollType(r),o=s.filter(c=>c.type===a);if(!o.length)return null;const l=a;let V=this.bags.get(l);const h=new Set(o.map(c=>c.id));(!V||!V.length||V.some(c=>!h.has(c)))&&(V=this.fillBag(o));let u=null;for(let c=0;c<V.length;c++)if(!this.recent.includes(V[c])||o.length<=2){u=V[c],V.splice(c,1);break}return u||(u=V.shift()),this.bags.set(l,V),this.remember(u),o.find(c=>c.id===u)||o[0]}drawMany(t,e,n={}){const s=[],r=[...n.exclude||[]];for(let a=0;a<e;a++){const o=this.draw(t,{...n,exclude:r});if(!o)break;s.push(o),r.push(o.id)}return s}fillBag(t){const e=[];t.forEach(n=>{const s=Math.max(1,Math.round(n.weight||1));for(let r=0;r<s;r++)e.push(n.id)});for(let n=e.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}remember(t){this.recent.push(t),this.recent.length>5&&this.recent.shift()}pair({avoidLast:t=!0,exclude:e=null}={}){const n=Math.min(...this.pairCount);let s=this.pairs.map((V,h)=>h).filter(V=>this.pairCount[V]===n);if(t&&s.length>1&&(s=s.filter(V=>V!==this.lastPair)),e){const V=s.filter(h=>!(this.pairs[h][0]===e[0]&&this.pairs[h][1]===e[1]));V.length&&(s=V)}s.length||(s=this.pairs.map((V,h)=>h));const r=hi(s);this.pairCount[r]++,this.lastPair=r;const[a,o]=Math.random()<.5?this.pairs[r]:[this.pairs[r][1],this.pairs[r][0]],l=[...Array(this.n).keys()].filter(V=>V!==a&&V!==o);return[a,o,l.length?hi(l):o]}pairExcept(t){const e=t?[Math.min(t[0],t[1]),Math.max(t[0],t[1])]:null;Math.min(...this.pairCount);let n=this.pairs.map((V,h)=>h).filter(V=>!e||!(this.pairs[V][0]===e[0]&&this.pairs[V][1]===e[1]));if(!n.length)return this.pair();const s=Math.min(...n.map(V=>this.pairCount[V]));n=n.filter(V=>this.pairCount[V]===s);const r=hi(n);this.pairCount[r]++,this.lastPair=r;const[a,o]=this.pairs[r],l=[...Array(this.n).keys()].filter(V=>V!==a&&V!==o);return[a,o,l.length?hi(l):o]}mostPair(t){const e=Math.max(...this.pairCount);if(e===0)return"—";const n=this.pairCount.indexOf(e);return`${t[this.pairs[n][0]]} + ${t[this.pairs[n][1]]}`}}function ka(i,t,e,n){const s=t.length,r=[...Array(s).keys()],a=r.filter(u=>u!==e),o=(u,c,f,q,g)=>({A:t[e],X:t[u],Y:t[c],Z:t[f],actors:q,director:g,R:t[(e+1)%s],L:t[(e-1+s)%s],judges:r.filter(p=>p!==e),idx:{A:e,X:u,Y:c,Z:f}});if(n==="duo"||n==="wild"){const[u,c,f]=i.pair(),q=s>=3?f:null;return o(u,c,f,[u,c],q)}if(n==="group"){const u=[...a].sort(()=>Math.random()-.5),c=u[0],f=u[1]??u[0];return o(c,f,f,r,null)}const l=hi(a),V=a.filter(u=>u!==l),h=V.length?hi(V):l;return o(l,h,h,[e,l],V.length?h:null)}const $o=[["이","가"],["은","는"],["을","를"],["과","와"],["아","야"],["으로","로"]],wl=$o.flat().sort((i,t)=>t.length-i.length).join("|"),bl=new RegExp(`\\{([AXYZRL])\\}(${wl})?`,"g");function Cl(i){const t=String(i||"").trim().slice(-1),e=t.charCodeAt(0);return e>=44032&&e<=55203?{has:(e-44032)%28!==0,rieul:(e-44032)%28===8}:/[0-9]/.test(t)?{has:/[0136789]/.test(t),rieul:/[178]/.test(t)}:/[a-zA-Z]/.test(t)?{has:/[lmnr]/i.test(t)&&!/[aeiou]/i.test(t),rieul:/[lr]/i.test(t)}:{has:!1,rieul:!1}}function Rl(i,t){if(!t)return"";const e=$o.find(([r,a])=>r===t||a===t);if(!e)return t;const{has:n,rieul:s}=Cl(i);return e[0]==="으로"?n&&!s?"으로":"로":n?e[0]:e[1]}function Hs(i,t){const e=n=>String(n).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]);return e(i).replace(bl,(n,s,r)=>{const a=t[s];return a==null?`{${s}}${r||""}`:`<strong>${e(a)}</strong>${Rl(a,r)}`})}const pn=()=>Tt.get().settings.haptics&&typeof navigator<"u"&&"vibrate"in navigator,Ge={tick(){pn()&&navigator.vibrate(12)},pull(){pn()&&navigator.vibrate([18,40,36])},blocked(){pn()&&navigator.vibrate([10,30,10])},tense(i=0){pn()&&navigator.vibrate([20+i*40,60,20+i*60,60,30+i*80])},sheet(){pn()&&navigator.vibrate(10)},verdict(i){pn()&&navigator.vibrate(i?[20,50,20]:[60,40,90])},collapse(){pn()&&navigator.vibrate([80,40,120,40,200])},timerEnd(){pn()&&navigator.vibrate([50,50,50])}};const qa="180",Dl=0,za=1,Ll=2,tV=1,eV=2,ln=3,En=0,Te=1,cn=2,Mn=0,di=1,Ha=2,Ga=3,Wa=4,Pl=5,Fn=100,Ul=101,Il=102,Bl=103,Fl=104,Nl=200,Ol=201,kl=202,zl=203,Tr=204,wr=205,Hl=206,Gl=207,Wl=208,Xl=209,Yl=210,Ql=211,jl=212,Kl=213,Zl=214,br=0,Cr=1,Rr=2,pi=3,Dr=4,Lr=5,Pr=6,Ur=7,nV=0,Jl=1,$l=2,Sn=0,tc=1,ec=2,nc=3,iV=4,ic=5,sc=6,rc=7,sV=300,qi=301,Ai=302,Ir=303,Br=304,Us=306,Rs=1e3,On=1001,Fr=1002,Qe=1003,ac=1004,$i=1005,Ze=1006,Gs=1007,kn=1008,tn=1009,rV=1010,aV=1011,Fi=1012,Aa=1013,Hn=1014,hn=1015,Gi=1016,ma=1017,ga=1018,Ni=1020,oV=35902,VV=35899,lV=1021,cV=1022,Xe=1023,Oi=1026,ki=1027,hV=1028,_a=1029,uV=1030,va=1031,xa=1033,Es=33776,ys=33777,Ts=33778,ws=33779,Nr=35840,Or=35841,kr=35842,zr=35843,Hr=36196,Gr=37492,Wr=37496,Xr=37808,Yr=37809,Qr=37810,jr=37811,Kr=37812,Zr=37813,Jr=37814,$r=37815,ta=37816,ea=37817,na=37818,ia=37819,sa=37820,ra=37821,aa=36492,oa=36494,Va=36495,la=36283,ca=36284,ha=36285,ua=36286,oc=3200,Vc=3201,dV=0,lc=1,xn="",Le="srgb",mi="srgb-linear",Ds="linear",Zt="srgb",jn=7680,Xa=519,cc=512,hc=513,uc=514,fV=515,dc=516,fc=517,pc=518,qc=519,Ya=35044,Qa="300 es",Je=2e3,Ls=2001;class _i{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ja=1234567;const Ui=Math.PI/180,zi=180/Math.PI;function vi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ge[i&255]+ge[i>>8&255]+ge[i>>16&255]+ge[i>>24&255]+"-"+ge[t&255]+ge[t>>8&255]+"-"+ge[t>>16&15|64]+ge[t>>24&255]+"-"+ge[e&63|128]+ge[e>>8&255]+"-"+ge[e>>16&255]+ge[e>>24&255]+ge[n&255]+ge[n>>8&255]+ge[n>>16&255]+ge[n>>24&255]).toLowerCase()}function kt(i,t,e){return Math.max(t,Math.min(e,i))}function Ma(i,t){return(i%t+t)%t}function Ac(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function mc(i,t,e){return i!==t?(e-i)/(t-i):0}function Ii(i,t,e){return(1-e)*i+e*t}function gc(i,t,e,n){return Ii(i,t,1-Math.exp(-e*n))}function _c(i,t=1){return t-Math.abs(Ma(i,t*2)-t)}function vc(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function xc(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Mc(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Sc(i,t){return i+Math.random()*(t-i)}function Ec(i){return i*(.5-Math.random())}function yc(i){i!==void 0&&(ja=i);let t=ja+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Tc(i){return i*Ui}function wc(i){return i*zi}function bc(i){return(i&i-1)===0&&i!==0}function Cc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Rc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Dc(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),V=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),c=a((t-n)/2),f=r((n-t)/2),q=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*u,l*c,o*V);break;case"YZY":i.set(l*c,o*h,l*u,o*V);break;case"ZXZ":i.set(l*u,l*c,o*h,o*V);break;case"XZX":i.set(o*h,l*q,l*f,o*V);break;case"YXY":i.set(l*f,o*h,l*q,o*V);break;case"ZYZ":i.set(l*q,l*f,o*h,o*V);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function li(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function xe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ka={DEG2RAD:Ui,RAD2DEG:zi,generateUUID:vi,clamp:kt,euclideanModulo:Ma,mapLinear:Ac,inverseLerp:mc,lerp:Ii,damp:gc,pingpong:_c,smoothstep:vc,smootherstep:xc,randInt:Mc,randFloat:Sc,randFloatSpread:Ec,seededRandom:yc,degToRad:Tc,radToDeg:wc,isPowerOfTwo:bc,ceilPowerOfTwo:Cc,floorPowerOfTwo:Rc,setQuaternionFromProperEuler:Dc,normalize:xe,denormalize:li};class Yt{constructor(t=0,e=0){Yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Wi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],V=n[s+1],h=n[s+2],u=n[s+3];const c=r[a+0],f=r[a+1],q=r[a+2],g=r[a+3];if(o===0){t[e+0]=l,t[e+1]=V,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=c,t[e+1]=f,t[e+2]=q,t[e+3]=g;return}if(u!==g||l!==c||V!==f||h!==q){let p=1-o;const d=l*c+V*f+h*q+u*g,E=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const w=Math.sqrt(y),b=Math.atan2(w,d*E);p=Math.sin(p*b)/w,o=Math.sin(o*b)/w}const x=o*E;if(l=l*p+c*x,V=V*p+f*x,h=h*p+q*x,u=u*p+g*x,p===1-o){const w=1/Math.sqrt(l*l+V*V+h*h+u*u);l*=w,V*=w,h*=w,u*=w}}t[e]=l,t[e+1]=V,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],V=n[s+2],h=n[s+3],u=r[a],c=r[a+1],f=r[a+2],q=r[a+3];return t[e]=o*q+h*u+l*f-V*c,t[e+1]=l*q+h*c+V*u-o*f,t[e+2]=V*q+h*f+o*c-l*u,t[e+3]=h*q-o*u-l*c-V*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,V=o(n/2),h=o(s/2),u=o(r/2),c=l(n/2),f=l(s/2),q=l(r/2);switch(a){case"XYZ":this._x=c*h*u+V*f*q,this._y=V*f*u-c*h*q,this._z=V*h*q+c*f*u,this._w=V*h*u-c*f*q;break;case"YXZ":this._x=c*h*u+V*f*q,this._y=V*f*u-c*h*q,this._z=V*h*q-c*f*u,this._w=V*h*u+c*f*q;break;case"ZXY":this._x=c*h*u-V*f*q,this._y=V*f*u+c*h*q,this._z=V*h*q+c*f*u,this._w=V*h*u-c*f*q;break;case"ZYX":this._x=c*h*u-V*f*q,this._y=V*f*u+c*h*q,this._z=V*h*q-c*f*u,this._w=V*h*u+c*f*q;break;case"YZX":this._x=c*h*u+V*f*q,this._y=V*f*u+c*h*q,this._z=V*h*q-c*f*u,this._w=V*h*u-c*f*q;break;case"XZY":this._x=c*h*u-V*f*q,this._y=V*f*u-c*h*q,this._z=V*h*q+c*f*u,this._w=V*h*u+c*f*q;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],V=e[2],h=e[6],u=e[10],c=n+o+u;if(c>0){const f=.5/Math.sqrt(c+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-V)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+V)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-V)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+V)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,V=e._z,h=e._w;return this._x=n*h+a*o+s*V-r*l,this._y=s*h+a*l+r*o-n*V,this._z=r*h+a*V+n*l-s*o,this._w=a*h-n*o-s*l-r*V,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const V=Math.sqrt(l),h=Math.atan2(V,o),u=Math.sin((1-e)*h)/V,c=Math.sin(e*h)/V;return this._w=a*u+this._w*c,this._x=n*u+this._x*c,this._y=s*u+this._y*c,this._z=r*u+this._z*c,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Za.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Za.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,V=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*V+a*u-o*h,this.y=n+l*h+o*V-r*u,this.z=s+l*u+r*h-a*V,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ws.copy(this).projectOnVector(t),this.sub(Ws)}reflect(t){return this.sub(Ws.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ws=new I,Za=new Wi;class It{constructor(t,e,n,s,r,a,o,l,V){It.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,V)}set(t,e,n,s,r,a,o,l,V){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=V,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],V=n[1],h=n[4],u=n[7],c=n[2],f=n[5],q=n[8],g=s[0],p=s[3],d=s[6],E=s[1],y=s[4],x=s[7],w=s[2],b=s[5],C=s[8];return r[0]=a*g+o*E+l*w,r[3]=a*p+o*y+l*b,r[6]=a*d+o*x+l*C,r[1]=V*g+h*E+u*w,r[4]=V*p+h*y+u*b,r[7]=V*d+h*x+u*C,r[2]=c*g+f*E+q*w,r[5]=c*p+f*y+q*b,r[8]=c*d+f*x+q*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],V=t[7],h=t[8];return e*a*h-e*o*V-n*r*h+n*o*l+s*r*V-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],V=t[7],h=t[8],u=h*a-o*V,c=o*l-h*r,f=V*r-a*l,q=e*u+n*c+s*f;if(q===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/q;return t[0]=u*g,t[1]=(s*V-h*n)*g,t[2]=(o*n-s*a)*g,t[3]=c*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-o*e)*g,t[6]=f*g,t[7]=(n*l-V*e)*g,t[8]=(a*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),V=Math.sin(r);return this.set(n*l,n*V,-n*(l*a+V*o)+a+t,-s*V,s*l,-s*(-V*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Xs.makeScale(t,e)),this}rotate(t){return this.premultiply(Xs.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Xs=new It;function pV(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ps(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Lc(){const i=Ps("canvas");return i.style.display="block",i}const Ja={};function Hi(i){i in Ja||(Ja[i]=!0,console.warn(i))}function Pc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const $a=new It().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),to=new It().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Uc(){const i={enabled:!0,workingColorSpace:mi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Zt&&(s.r=un(s.r),s.g=un(s.g),s.b=un(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Zt&&(s.r=fi(s.r),s.g=fi(s.g),s.b=fi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===xn?Ds:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Hi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Hi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[mi]:{primaries:t,whitePoint:n,transfer:Ds,toXYZ:$a,fromXYZ:to,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:n,transfer:Zt,toXYZ:$a,fromXYZ:to,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),i}const Xt=Uc();function un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Kn;class Ic{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Kn===void 0&&(Kn=Ps("canvas")),Kn.width=t.width,Kn.height=t.height;const s=Kn.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Kn}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ps("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=un(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(un(e[n]/255)*255):e[n]=un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Bc=0;class Sa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bc++}),this.uuid=vi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ys(s[a].image)):r.push(Ys(s[a]))}else r=Ys(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ys(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ic.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fc=0;const Qs=new I;class Se extends _i{constructor(t=Se.DEFAULT_IMAGE,e=Se.DEFAULT_MAPPING,n=On,s=On,r=Ze,a=kn,o=Xe,l=tn,V=Se.DEFAULT_ANISOTROPY,h=xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fc++}),this.uuid=vi(),this.name="",this.source=new Sa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=V,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qs).x}get height(){return this.source.getSize(Qs).y}get depth(){return this.source.getSize(Qs).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sV)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Rs:t.x=t.x-Math.floor(t.x);break;case On:t.x=t.x<0?0:1;break;case Fr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Rs:t.y=t.y-Math.floor(t.y);break;case On:t.y=t.y<0?0:1;break;case Fr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Se.DEFAULT_IMAGE=null;Se.DEFAULT_MAPPING=sV;Se.DEFAULT_ANISOTROPY=1;class Ve{constructor(t=0,e=0,n=0,s=1){Ve.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,V=l[0],h=l[4],u=l[8],c=l[1],f=l[5],q=l[9],g=l[2],p=l[6],d=l[10];if(Math.abs(h-c)<.01&&Math.abs(u-g)<.01&&Math.abs(q-p)<.01){if(Math.abs(h+c)<.1&&Math.abs(u+g)<.1&&Math.abs(q+p)<.1&&Math.abs(V+f+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(V+1)/2,x=(f+1)/2,w=(d+1)/2,b=(h+c)/4,C=(u+g)/4,B=(q+p)/4;return y>x&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=b/n,r=C/n):x>w?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=b/s,r=B/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=B/r),this.set(n,s,r,e),this}let E=Math.sqrt((p-q)*(p-q)+(u-g)*(u-g)+(c-h)*(c-h));return Math.abs(E)<.001&&(E=1),this.x=(p-q)/E,this.y=(u-g)/E,this.z=(c-h)/E,this.w=Math.acos((V+f+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nc extends _i{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ve(0,0,t,e),this.scissorTest=!1,this.viewport=new Ve(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Se(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Sa(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends Nc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class qV extends Se{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Oc extends Se{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xi{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ke):ke.fromBufferAttribute(r,a),ke.applyMatrix4(t.matrixWorld),this.expandByPoint(ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ts.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ts.copy(n.boundingBox)),ts.applyMatrix4(t.matrixWorld),this.union(ts)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ke),ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ti),es.subVectors(this.max,Ti),Zn.subVectors(t.a,Ti),Jn.subVectors(t.b,Ti),$n.subVectors(t.c,Ti),qn.subVectors(Jn,Zn),An.subVectors($n,Jn),bn.subVectors(Zn,$n);let e=[0,-qn.z,qn.y,0,-An.z,An.y,0,-bn.z,bn.y,qn.z,0,-qn.x,An.z,0,-An.x,bn.z,0,-bn.x,-qn.y,qn.x,0,-An.y,An.x,0,-bn.y,bn.x,0];return!js(e,Zn,Jn,$n,es)||(e=[1,0,0,0,1,0,0,0,1],!js(e,Zn,Jn,$n,es))?!1:(ns.crossVectors(qn,An),e=[ns.x,ns.y,ns.z],js(e,Zn,Jn,$n,es))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const sn=[new I,new I,new I,new I,new I,new I,new I,new I],ke=new I,ts=new Xi,Zn=new I,Jn=new I,$n=new I,qn=new I,An=new I,bn=new I,Ti=new I,es=new I,ns=new I,Cn=new I;function js(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Cn.fromArray(i,r);const o=s.x*Math.abs(Cn.x)+s.y*Math.abs(Cn.y)+s.z*Math.abs(Cn.z),l=t.dot(Cn),V=e.dot(Cn),h=n.dot(Cn);if(Math.max(-Math.max(l,V,h),Math.min(l,V,h))>o)return!1}return!0}const kc=new Xi,wi=new I,Ks=new I;class Ea{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):kc.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;wi.subVectors(t,this.center);const e=wi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(wi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ks.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(wi.copy(t.center).add(Ks)),this.expandByPoint(wi.copy(t.center).sub(Ks))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const rn=new I,Zs=new I,is=new I,mn=new I,Js=new I,ss=new I,$s=new I;class AV{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(rn.copy(this.origin).addScaledVector(this.direction,e),rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Zs.copy(t).add(e).multiplyScalar(.5),is.copy(e).sub(t).normalize(),mn.copy(this.origin).sub(Zs);const r=t.distanceTo(e)*.5,a=-this.direction.dot(is),o=mn.dot(this.direction),l=-mn.dot(is),V=mn.lengthSq(),h=Math.abs(1-a*a);let u,c,f,q;if(h>0)if(u=a*l-o,c=a*o-l,q=r*h,u>=0)if(c>=-q)if(c<=q){const g=1/h;u*=g,c*=g,f=u*(u+a*c+2*o)+c*(a*u+c+2*l)+V}else c=r,u=Math.max(0,-(a*c+o)),f=-u*u+c*(c+2*l)+V;else c=-r,u=Math.max(0,-(a*c+o)),f=-u*u+c*(c+2*l)+V;else c<=-q?(u=Math.max(0,-(-a*r+o)),c=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+c*(c+2*l)+V):c<=q?(u=0,c=Math.min(Math.max(-r,-l),r),f=c*(c+2*l)+V):(u=Math.max(0,-(a*r+o)),c=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+c*(c+2*l)+V);else c=a>0?-r:r,u=Math.max(0,-(a*c+o)),f=-u*u+c*(c+2*l)+V;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Zs).addScaledVector(is,c),f}intersectSphere(t,e){rn.subVectors(t.center,this.origin);const n=rn.dot(this.direction),s=rn.dot(rn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const V=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,c=this.origin;return V>=0?(n=(t.min.x-c.x)*V,s=(t.max.x-c.x)*V):(n=(t.max.x-c.x)*V,s=(t.min.x-c.x)*V),h>=0?(r=(t.min.y-c.y)*h,a=(t.max.y-c.y)*h):(r=(t.max.y-c.y)*h,a=(t.min.y-c.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-c.z)*u,l=(t.max.z-c.z)*u):(o=(t.max.z-c.z)*u,l=(t.min.z-c.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,rn)!==null}intersectTriangle(t,e,n,s,r){Js.subVectors(e,t),ss.subVectors(n,t),$s.crossVectors(Js,ss);let a=this.direction.dot($s),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;mn.subVectors(this.origin,t);const l=o*this.direction.dot(ss.crossVectors(mn,ss));if(l<0)return null;const V=o*this.direction.dot(Js.cross(mn));if(V<0||l+V>a)return null;const h=-o*mn.dot($s);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le{constructor(t,e,n,s,r,a,o,l,V,h,u,c,f,q,g,p){le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,V,h,u,c,f,q,g,p)}set(t,e,n,s,r,a,o,l,V,h,u,c,f,q,g,p){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=V,d[6]=h,d[10]=u,d[14]=c,d[3]=f,d[7]=q,d[11]=g,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new le().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ti.setFromMatrixColumn(t,0).length(),r=1/ti.setFromMatrixColumn(t,1).length(),a=1/ti.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),V=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const c=a*h,f=a*u,q=o*h,g=o*u;e[0]=l*h,e[4]=-l*u,e[8]=V,e[1]=f+q*V,e[5]=c-g*V,e[9]=-o*l,e[2]=g-c*V,e[6]=q+f*V,e[10]=a*l}else if(t.order==="YXZ"){const c=l*h,f=l*u,q=V*h,g=V*u;e[0]=c+g*o,e[4]=q*o-f,e[8]=a*V,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-q,e[6]=g+c*o,e[10]=a*l}else if(t.order==="ZXY"){const c=l*h,f=l*u,q=V*h,g=V*u;e[0]=c-g*o,e[4]=-a*u,e[8]=q+f*o,e[1]=f+q*o,e[5]=a*h,e[9]=g-c*o,e[2]=-a*V,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const c=a*h,f=a*u,q=o*h,g=o*u;e[0]=l*h,e[4]=q*V-f,e[8]=c*V+g,e[1]=l*u,e[5]=g*V+c,e[9]=f*V-q,e[2]=-V,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const c=a*l,f=a*V,q=o*l,g=o*V;e[0]=l*h,e[4]=g-c*u,e[8]=q*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-V*h,e[6]=f*u+q,e[10]=c-g*u}else if(t.order==="XZY"){const c=a*l,f=a*V,q=o*l,g=o*V;e[0]=l*h,e[4]=-u,e[8]=V*h,e[1]=c*u+g,e[5]=a*h,e[9]=f*u-q,e[2]=q*u-f,e[6]=o*h,e[10]=g*u+c}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zc,t,Hc)}lookAt(t,e,n){const s=this.elements;return Ce.subVectors(t,e),Ce.lengthSq()===0&&(Ce.z=1),Ce.normalize(),gn.crossVectors(n,Ce),gn.lengthSq()===0&&(Math.abs(n.z)===1?Ce.x+=1e-4:Ce.z+=1e-4,Ce.normalize(),gn.crossVectors(n,Ce)),gn.normalize(),rs.crossVectors(Ce,gn),s[0]=gn.x,s[4]=rs.x,s[8]=Ce.x,s[1]=gn.y,s[5]=rs.y,s[9]=Ce.y,s[2]=gn.z,s[6]=rs.z,s[10]=Ce.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],V=n[12],h=n[1],u=n[5],c=n[9],f=n[13],q=n[2],g=n[6],p=n[10],d=n[14],E=n[3],y=n[7],x=n[11],w=n[15],b=s[0],C=s[4],B=s[8],v=s[12],_=s[1],D=s[5],O=s[9],H=s[13],j=s[2],W=s[6],Y=s[10],Z=s[14],k=s[3],at=s[7],ct=s[11],St=s[15];return r[0]=a*b+o*_+l*j+V*k,r[4]=a*C+o*D+l*W+V*at,r[8]=a*B+o*O+l*Y+V*ct,r[12]=a*v+o*H+l*Z+V*St,r[1]=h*b+u*_+c*j+f*k,r[5]=h*C+u*D+c*W+f*at,r[9]=h*B+u*O+c*Y+f*ct,r[13]=h*v+u*H+c*Z+f*St,r[2]=q*b+g*_+p*j+d*k,r[6]=q*C+g*D+p*W+d*at,r[10]=q*B+g*O+p*Y+d*ct,r[14]=q*v+g*H+p*Z+d*St,r[3]=E*b+y*_+x*j+w*k,r[7]=E*C+y*D+x*W+w*at,r[11]=E*B+y*O+x*Y+w*ct,r[15]=E*v+y*H+x*Z+w*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],V=t[13],h=t[2],u=t[6],c=t[10],f=t[14],q=t[3],g=t[7],p=t[11],d=t[15];return q*(+r*l*u-s*V*u-r*o*c+n*V*c+s*o*f-n*l*f)+g*(+e*l*f-e*V*c+r*a*c-s*a*f+s*V*h-r*l*h)+p*(+e*V*u-e*o*f-r*a*u+n*a*f+r*o*h-n*V*h)+d*(-s*o*h-e*l*u+e*o*c+s*a*u-n*a*c+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],V=t[7],h=t[8],u=t[9],c=t[10],f=t[11],q=t[12],g=t[13],p=t[14],d=t[15],E=u*p*V-g*c*V+g*l*f-o*p*f-u*l*d+o*c*d,y=q*c*V-h*p*V-q*l*f+a*p*f+h*l*d-a*c*d,x=h*g*V-q*u*V+q*o*f-a*g*f-h*o*d+a*u*d,w=q*u*l-h*g*l-q*o*c+a*g*c+h*o*p-a*u*p,b=e*E+n*y+s*x+r*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/b;return t[0]=E*C,t[1]=(g*c*r-u*p*r-g*s*f+n*p*f+u*s*d-n*c*d)*C,t[2]=(o*p*r-g*l*r+g*s*V-n*p*V-o*s*d+n*l*d)*C,t[3]=(u*l*r-o*c*r-u*s*V+n*c*V+o*s*f-n*l*f)*C,t[4]=y*C,t[5]=(h*p*r-q*c*r+q*s*f-e*p*f-h*s*d+e*c*d)*C,t[6]=(q*l*r-a*p*r-q*s*V+e*p*V+a*s*d-e*l*d)*C,t[7]=(a*c*r-h*l*r+h*s*V-e*c*V-a*s*f+e*l*f)*C,t[8]=x*C,t[9]=(q*u*r-h*g*r-q*n*f+e*g*f+h*n*d-e*u*d)*C,t[10]=(a*g*r-q*o*r+q*n*V-e*g*V-a*n*d+e*o*d)*C,t[11]=(h*o*r-a*u*r-h*n*V+e*u*V+a*n*f-e*o*f)*C,t[12]=w*C,t[13]=(h*g*s-q*u*s+q*n*c-e*g*c-h*n*p+e*u*p)*C,t[14]=(q*o*s-a*g*s-q*n*l+e*g*l+a*n*p-e*o*p)*C,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*c+e*o*c)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,V=r*a,h=r*o;return this.set(V*a+n,V*o-s*l,V*l+s*o,0,V*o+s*l,h*o+n,h*l-s*a,0,V*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,V=r+r,h=a+a,u=o+o,c=r*V,f=r*h,q=r*u,g=a*h,p=a*u,d=o*u,E=l*V,y=l*h,x=l*u,w=n.x,b=n.y,C=n.z;return s[0]=(1-(g+d))*w,s[1]=(f+x)*w,s[2]=(q-y)*w,s[3]=0,s[4]=(f-x)*b,s[5]=(1-(c+d))*b,s[6]=(p+E)*b,s[7]=0,s[8]=(q+y)*C,s[9]=(p-E)*C,s[10]=(1-(c+g))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ti.set(s[0],s[1],s[2]).length();const a=ti.set(s[4],s[5],s[6]).length(),o=ti.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ze.copy(this);const V=1/r,h=1/a,u=1/o;return ze.elements[0]*=V,ze.elements[1]*=V,ze.elements[2]*=V,ze.elements[4]*=h,ze.elements[5]*=h,ze.elements[6]*=h,ze.elements[8]*=u,ze.elements[9]*=u,ze.elements[10]*=u,e.setFromRotationMatrix(ze),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Je,l=!1){const V=this.elements,h=2*r/(e-t),u=2*r/(n-s),c=(e+t)/(e-t),f=(n+s)/(n-s);let q,g;if(l)q=r/(a-r),g=a*r/(a-r);else if(o===Je)q=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ls)q=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return V[0]=h,V[4]=0,V[8]=c,V[12]=0,V[1]=0,V[5]=u,V[9]=f,V[13]=0,V[2]=0,V[6]=0,V[10]=q,V[14]=g,V[3]=0,V[7]=0,V[11]=-1,V[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Je,l=!1){const V=this.elements,h=2/(e-t),u=2/(n-s),c=-(e+t)/(e-t),f=-(n+s)/(n-s);let q,g;if(l)q=1/(a-r),g=a/(a-r);else if(o===Je)q=-2/(a-r),g=-(a+r)/(a-r);else if(o===Ls)q=-1/(a-r),g=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return V[0]=h,V[4]=0,V[8]=0,V[12]=c,V[1]=0,V[5]=u,V[9]=0,V[13]=f,V[2]=0,V[6]=0,V[10]=q,V[14]=g,V[3]=0,V[7]=0,V[11]=0,V[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ti=new I,ze=new le,zc=new I(0,0,0),Hc=new I(1,1,1),gn=new I,rs=new I,Ce=new I,eo=new le,no=new Wi;class en{constructor(t=0,e=0,n=0,s=en.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],V=s[5],h=s[9],u=s[2],c=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(c,V),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,V)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,V)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(c,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,V));break;case"YZX":this._z=Math.asin(kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,V),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(c,V),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return eo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(eo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return no.setFromEuler(this),this.setFromQuaternion(no,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}en.DEFAULT_ORDER="XYZ";class ya{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gc=0;const io=new I,ei=new Wi,an=new le,as=new I,bi=new I,Wc=new I,Xc=new Wi,so=new I(1,0,0),ro=new I(0,1,0),ao=new I(0,0,1),oo={type:"added"},Yc={type:"removed"},ni={type:"childadded",child:null},tr={type:"childremoved",child:null};class Ae extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gc++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ae.DEFAULT_UP.clone();const t=new I,e=new en,n=new Wi,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new It}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=Ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ya,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.multiply(ei),this}rotateOnWorldAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.premultiply(ei),this}rotateX(t){return this.rotateOnAxis(so,t)}rotateY(t){return this.rotateOnAxis(ro,t)}rotateZ(t){return this.rotateOnAxis(ao,t)}translateOnAxis(t,e){return io.copy(t).applyQuaternion(this.quaternion),this.position.add(io.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(so,t)}translateY(t){return this.translateOnAxis(ro,t)}translateZ(t){return this.translateOnAxis(ao,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?as.copy(t):as.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(bi,as,this.up):an.lookAt(as,bi,this.up),this.quaternion.setFromRotationMatrix(an),s&&(an.extractRotation(s.matrixWorld),ei.setFromRotationMatrix(an),this.quaternion.premultiply(ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(oo),ni.child=t,this.dispatchEvent(ni),ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Yc),tr.child=t,this.dispatchEvent(tr),tr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),an.multiply(t.parent.matrixWorld)),t.applyMatrix4(an),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(oo),ni.child=t,this.dispatchEvent(ni),ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,t,Wc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,Xc,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let V=0,h=l.length;V<h;V++){const u=l[V];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,V=this.material.length;l<V;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),V=a(t.textures),h=a(t.images),u=a(t.shapes),c=a(t.skeletons),f=a(t.animations),q=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),V.length>0&&(n.textures=V),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),c.length>0&&(n.skeletons=c),f.length>0&&(n.animations=f),q.length>0&&(n.nodes=q)}return n.object=s,n;function a(o){const l=[];for(const V in o){const h=o[V];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ae.DEFAULT_UP=new I(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const He=new I,on=new I,er=new I,Vn=new I,ii=new I,si=new I,Vo=new I,nr=new I,ir=new I,sr=new I,rr=new Ve,ar=new Ve,or=new Ve;class We{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),He.subVectors(t,e),s.cross(He);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){He.subVectors(s,e),on.subVectors(n,e),er.subVectors(t,e);const a=He.dot(He),o=He.dot(on),l=He.dot(er),V=on.dot(on),h=on.dot(er),u=a*V-o*o;if(u===0)return r.set(0,0,0),null;const c=1/u,f=(V*l-o*h)*c,q=(a*h-o*l)*c;return r.set(1-f-q,q,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Vn.x),l.addScaledVector(a,Vn.y),l.addScaledVector(o,Vn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return rr.setScalar(0),ar.setScalar(0),or.setScalar(0),rr.fromBufferAttribute(t,e),ar.fromBufferAttribute(t,n),or.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(rr,r.x),a.addScaledVector(ar,r.y),a.addScaledVector(or,r.z),a}static isFrontFacing(t,e,n,s){return He.subVectors(n,e),on.subVectors(t,e),He.cross(on).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return He.subVectors(this.c,this.b),on.subVectors(this.a,this.b),He.cross(on).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return We.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return We.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return We.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return We.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return We.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;ii.subVectors(s,n),si.subVectors(r,n),nr.subVectors(t,n);const l=ii.dot(nr),V=si.dot(nr);if(l<=0&&V<=0)return e.copy(n);ir.subVectors(t,s);const h=ii.dot(ir),u=si.dot(ir);if(h>=0&&u<=h)return e.copy(s);const c=l*u-h*V;if(c<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(ii,a);sr.subVectors(t,r);const f=ii.dot(sr),q=si.dot(sr);if(q>=0&&f<=q)return e.copy(r);const g=f*V-l*q;if(g<=0&&V>=0&&q<=0)return o=V/(V-q),e.copy(n).addScaledVector(si,o);const p=h*q-f*u;if(p<=0&&u-h>=0&&f-q>=0)return Vo.subVectors(r,s),o=(u-h)/(u-h+(f-q)),e.copy(s).addScaledVector(Vo,o);const d=1/(p+g+c);return a=g*d,o=c*d,e.copy(n).addScaledVector(ii,a).addScaledVector(si,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const mV={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_n={h:0,s:0,l:0},os={h:0,s:0,l:0};function Vr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=Ma(t,1),e=kt(e,0,1),n=kt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Vr(a,r,t+1/3),this.g=Vr(a,r,t),this.b=Vr(a,r,t-1/3)}return Xt.colorSpaceToWorking(this,s),this}setStyle(t,e=Le){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){const n=mV[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=un(t.r),this.g=un(t.g),this.b=un(t.b),this}copyLinearToSRGB(t){return this.r=fi(t.r),this.g=fi(t.g),this.b=fi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return Xt.workingToColorSpace(_e.copy(this),t),Math.round(kt(_e.r*255,0,255))*65536+Math.round(kt(_e.g*255,0,255))*256+Math.round(kt(_e.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.workingToColorSpace(_e.copy(this),e);const n=_e.r,s=_e.g,r=_e.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,V;const h=(o+a)/2;if(o===a)l=0,V=0;else{const u=a-o;switch(V=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=V,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.workingToColorSpace(_e.copy(this),e),t.r=_e.r,t.g=_e.g,t.b=_e.b,t}getStyle(t=Le){Xt.workingToColorSpace(_e.copy(this),t);const e=_e.r,n=_e.g,s=_e.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(_n),this.setHSL(_n.h+t,_n.s+e,_n.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(_n),t.getHSL(os);const n=Ii(_n.h,os.h,e),s=Ii(_n.s,os.s,e),r=Ii(_n.l,os.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _e=new Gt;Gt.NAMES=mV;let Qc=0;class xi extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qc++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=di,this.side=En,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Tr,this.blendDst=wr,this.blendEquation=Fn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jn,this.stencilZFail=jn,this.stencilZPass=jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==di&&(n.blending=this.blending),this.side!==En&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Tr&&(n.blendSrc=this.blendSrc),this.blendDst!==wr&&(n.blendDst=this.blendDst),this.blendEquation!==Fn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==pi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==jn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==jn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==jn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class gV extends xi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=nV,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const he=new I,Vs=new Yt;let jc=0;class $e{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:jc++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ya,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Vs.fromBufferAttribute(this,e),Vs.applyMatrix3(t),this.setXY(e,Vs.x,Vs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=li(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=li(e,this.array)),e}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=li(e,this.array)),e}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=li(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=li(e,this.array)),e}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),s=xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),s=xe(s,this.array),r=xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ya&&(t.usage=this.usage),t}}class _V extends $e{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class vV extends $e{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class zn extends $e{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Kc=0;const Fe=new le,lr=new Ae,ri=new I,Re=new Xi,Ci=new Xi,pe=new I;class Wn extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kc++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pV(t)?vV:_V)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new It().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Fe.makeRotationFromQuaternion(t),this.applyMatrix4(Fe),this}rotateX(t){return Fe.makeRotationX(t),this.applyMatrix4(Fe),this}rotateY(t){return Fe.makeRotationY(t),this.applyMatrix4(Fe),this}rotateZ(t){return Fe.makeRotationZ(t),this.applyMatrix4(Fe),this}translate(t,e,n){return Fe.makeTranslation(t,e,n),this.applyMatrix4(Fe),this}scale(t,e,n){return Fe.makeScale(t,e,n),this.applyMatrix4(Fe),this}lookAt(t){return lr.lookAt(t),lr.updateMatrix(),this.applyMatrix4(lr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ri).negate(),this.translate(ri.x,ri.y,ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zn(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Re.setFromBufferAttribute(r),this.morphTargetsRelative?(pe.addVectors(this.boundingBox.min,Re.min),this.boundingBox.expandByPoint(pe),pe.addVectors(this.boundingBox.max,Re.max),this.boundingBox.expandByPoint(pe)):(this.boundingBox.expandByPoint(Re.min),this.boundingBox.expandByPoint(Re.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ea);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Re.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Ci.setFromBufferAttribute(o),this.morphTargetsRelative?(pe.addVectors(Re.min,Ci.min),Re.expandByPoint(pe),pe.addVectors(Re.max,Ci.max),Re.expandByPoint(pe)):(Re.expandByPoint(Ci.min),Re.expandByPoint(Ci.max))}Re.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(pe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let V=0,h=o.count;V<h;V++)pe.fromBufferAttribute(o,V),l&&(ri.fromBufferAttribute(t,V),pe.add(ri)),s=Math.max(s,n.distanceToSquared(pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let B=0;B<n.count;B++)o[B]=new I,l[B]=new I;const V=new I,h=new I,u=new I,c=new Yt,f=new Yt,q=new Yt,g=new I,p=new I;function d(B,v,_){V.fromBufferAttribute(n,B),h.fromBufferAttribute(n,v),u.fromBufferAttribute(n,_),c.fromBufferAttribute(r,B),f.fromBufferAttribute(r,v),q.fromBufferAttribute(r,_),h.sub(V),u.sub(V),f.sub(c),q.sub(c);const D=1/(f.x*q.y-q.x*f.y);isFinite(D)&&(g.copy(h).multiplyScalar(q.y).addScaledVector(u,-f.y).multiplyScalar(D),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-q.x).multiplyScalar(D),o[B].add(g),o[v].add(g),o[_].add(g),l[B].add(p),l[v].add(p),l[_].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let B=0,v=E.length;B<v;++B){const _=E[B],D=_.start,O=_.count;for(let H=D,j=D+O;H<j;H+=3)d(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const y=new I,x=new I,w=new I,b=new I;function C(B){w.fromBufferAttribute(s,B),b.copy(w);const v=o[B];y.copy(v),y.sub(w.multiplyScalar(w.dot(v))).normalize(),x.crossVectors(b,v);const D=x.dot(l[B])<0?-1:1;a.setXYZW(B,y.x,y.y,y.z,D)}for(let B=0,v=E.length;B<v;++B){const _=E[B],D=_.start,O=_.count;for(let H=D,j=D+O;H<j;H+=3)C(t.getX(H+0)),C(t.getX(H+1)),C(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let c=0,f=n.count;c<f;c++)n.setXYZ(c,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,V=new I,h=new I,u=new I;if(t)for(let c=0,f=t.count;c<f;c+=3){const q=t.getX(c+0),g=t.getX(c+1),p=t.getX(c+2);s.fromBufferAttribute(e,q),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,q),l.fromBufferAttribute(n,g),V.fromBufferAttribute(n,p),o.add(h),l.add(h),V.add(h),n.setXYZ(q,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,V.x,V.y,V.z)}else for(let c=0,f=e.count;c<f;c+=3)s.fromBufferAttribute(e,c+0),r.fromBufferAttribute(e,c+1),a.fromBufferAttribute(e,c+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(c+0,h.x,h.y,h.z),n.setXYZ(c+1,h.x,h.y,h.z),n.setXYZ(c+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pe.fromBufferAttribute(t,e),pe.normalize(),t.setXYZ(e,pe.x,pe.y,pe.z)}toNonIndexed(){function t(o,l){const V=o.array,h=o.itemSize,u=o.normalized,c=new V.constructor(l.length*h);let f=0,q=0;for(let g=0,p=l.length;g<p;g++){o.isInterleavedBufferAttribute?f=l[g]*o.data.stride+o.offset:f=l[g]*h;for(let d=0;d<h;d++)c[q++]=V[f++]}return new $e(c,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Wn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],V=t(l,n);e.setAttribute(o,V)}const r=this.morphAttributes;for(const o in r){const l=[],V=r[o];for(let h=0,u=V.length;h<u;h++){const c=V[h],f=t(c,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const V=a[o];e.addGroup(V.start,V.count,V.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const V in l)l[V]!==void 0&&(t[V]=l[V]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const V=n[l];t.data.attributes[l]=V.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const V=this.morphAttributes[l],h=[];for(let u=0,c=V.length;u<c;u++){const f=V[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const V in s){const h=s[V];this.setAttribute(V,h.clone(e))}const r=t.morphAttributes;for(const V in r){const h=[],u=r[V];for(let c=0,f=u.length;c<f;c++)h.push(u[c].clone(e));this.morphAttributes[V]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let V=0,h=a.length;V<h;V++){const u=a[V];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lo=new le,Rn=new AV,ls=new Ea,co=new I,cs=new I,hs=new I,us=new I,cr=new I,ds=new I,ho=new I,fs=new I;class Ye extends Ae{constructor(t=new Wn,e=new gV){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ds.set(0,0,0);for(let l=0,V=r.length;l<V;l++){const h=o[l],u=r[l];h!==0&&(cr.fromBufferAttribute(u,t),a?ds.addScaledVector(cr,h):ds.addScaledVector(cr.sub(e),h))}e.add(ds)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ls.copy(n.boundingSphere),ls.applyMatrix4(r),Rn.copy(t.ray).recast(t.near),!(ls.containsPoint(Rn.origin)===!1&&(Rn.intersectSphere(ls,co)===null||Rn.origin.distanceToSquared(co)>(t.far-t.near)**2))&&(lo.copy(r).invert(),Rn.copy(t.ray).applyMatrix4(lo),!(n.boundingBox!==null&&Rn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Rn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,V=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,c=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let q=0,g=c.length;q<g;q++){const p=c[q],d=a[p.materialIndex],E=Math.max(p.start,f.start),y=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let x=E,w=y;x<w;x+=3){const b=o.getX(x),C=o.getX(x+1),B=o.getX(x+2);s=ps(this,d,t,n,V,h,u,b,C,B),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const q=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let p=q,d=g;p<d;p+=3){const E=o.getX(p),y=o.getX(p+1),x=o.getX(p+2);s=ps(this,a,t,n,V,h,u,E,y,x),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let q=0,g=c.length;q<g;q++){const p=c[q],d=a[p.materialIndex],E=Math.max(p.start,f.start),y=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let x=E,w=y;x<w;x+=3){const b=x,C=x+1,B=x+2;s=ps(this,d,t,n,V,h,u,b,C,B),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const q=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let p=q,d=g;p<d;p+=3){const E=p,y=p+1,x=p+2;s=ps(this,a,t,n,V,h,u,E,y,x),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function Zc(i,t,e,n,s,r,a,o){let l;if(t.side===Te?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===En,o),l===null)return null;fs.copy(o),fs.applyMatrix4(i.matrixWorld);const V=e.ray.origin.distanceTo(fs);return V<e.near||V>e.far?null:{distance:V,point:fs.clone(),object:i}}function ps(i,t,e,n,s,r,a,o,l,V){i.getVertexPosition(o,cs),i.getVertexPosition(l,hs),i.getVertexPosition(V,us);const h=Zc(i,t,e,n,cs,hs,us,ho);if(h){const u=new I;We.getBarycoord(ho,cs,hs,us,u),s&&(h.uv=We.getInterpolatedAttribute(s,o,l,V,u,new Yt)),r&&(h.uv1=We.getInterpolatedAttribute(r,o,l,V,u,new Yt)),a&&(h.normal=We.getInterpolatedAttribute(a,o,l,V,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const c={a:o,b:l,c:V,normal:new I,materialIndex:0};We.getNormal(cs,hs,us,c.normal),h.face=c,h.barycoord=u}return h}class Mi extends Wn{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],V=[],h=[],u=[];let c=0,f=0;q("z","y","x",-1,-1,n,e,t,a,r,0),q("z","y","x",1,-1,n,e,-t,a,r,1),q("x","z","y",1,1,t,n,e,s,a,2),q("x","z","y",1,-1,t,n,-e,s,a,3),q("x","y","z",1,-1,t,e,n,s,r,4),q("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new zn(V,3)),this.setAttribute("normal",new zn(h,3)),this.setAttribute("uv",new zn(u,2));function q(g,p,d,E,y,x,w,b,C,B,v){const _=x/C,D=w/B,O=x/2,H=w/2,j=b/2,W=C+1,Y=B+1;let Z=0,k=0;const at=new I;for(let ct=0;ct<Y;ct++){const St=ct*D-H;for(let Nt=0;Nt<W;Nt++){const $t=Nt*_-O;at[g]=$t*E,at[p]=St*y,at[d]=j,V.push(at.x,at.y,at.z),at[g]=0,at[p]=0,at[d]=b>0?1:-1,h.push(at.x,at.y,at.z),u.push(Nt/C),u.push(1-ct/B),Z+=1}}for(let ct=0;ct<B;ct++)for(let St=0;St<C;St++){const Nt=c+St+W*ct,$t=c+St+W*(ct+1),ne=c+(St+1)+W*(ct+1),Qt=c+(St+1)+W*ct;l.push(Nt,$t,Qt),l.push($t,ne,Qt),k+=6}o.addGroup(f,k,v),f+=k,c+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function gi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Me(i){const t={};for(let e=0;e<i.length;e++){const n=gi(i[e]);for(const s in n)t[s]=n[s]}return t}function Jc(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function xV(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const $c={clone:gi,merge:Me};var th=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yn extends xi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=th,this.fragmentShader=eh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gi(t.uniforms),this.uniformsGroups=Jc(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class MV extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=Je,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vn=new I,uo=new Yt,fo=new Yt;class Oe extends MV{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=zi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ui*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zi*2*Math.atan(Math.tan(Ui*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(vn.x,vn.y).multiplyScalar(-t/vn.z),vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vn.x,vn.y).multiplyScalar(-t/vn.z)}getViewSize(t,e){return this.getViewBounds(t,uo,fo),e.subVectors(fo,uo)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ui*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,V=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/V,s*=a.width/l,n*=a.height/V}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ai=-90,oi=1;class nh extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Oe(ai,oi,t,e);s.layers=this.layers,this.add(s);const r=new Oe(ai,oi,t,e);r.layers=this.layers,this.add(r);const a=new Oe(ai,oi,t,e);a.layers=this.layers,this.add(a);const o=new Oe(ai,oi,t,e);o.layers=this.layers,this.add(o);const l=new Oe(ai,oi,t,e);l.layers=this.layers,this.add(l);const V=new Oe(ai,oi,t,e);V.layers=this.layers,this.add(V)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const V of e)this.remove(V);if(t===Je)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ls)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const V of e)this.add(V),V.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,V,h]=this.children,u=t.getRenderTarget(),c=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),q=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,V),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,c,f),t.xr.enabled=q,n.texture.needsPMREMUpdate=!0}}class SV extends Se{constructor(t=[],e=qi,n,s,r,a,o,l,V,h){super(t,e,n,s,r,a,o,l,V,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ih extends Gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new SV(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Mi(5,5,5),r=new yn({name:"CubemapFromEquirect",uniforms:gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Te,blending:Mn});r.uniforms.tEquirect.value=e;const a=new Ye(s,r),o=e.minFilter;return e.minFilter===kn&&(e.minFilter=Ze),new nh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class Li extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sh={type:"move"};class hr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Li,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Li,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Li,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,V=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(V&&t.hand){a=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,n),d=this._getHandJoint(V,g);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=V.joints["index-finger-tip"],u=V.joints["thumb-tip"],c=h.position.distanceTo(u.position),f=.02,q=.005;V.inputState.pinching&&c>f+q?(V.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!V.inputState.pinching&&c<=f-q&&(V.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sh)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),V!==null&&(V.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Li;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class rh extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const ur=new I,ah=new I,oh=new It;class Un{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ur.subVectors(n,e).cross(ah.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ur),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||oh.getNormalMatrix(t),s=this.coplanarPoint(ur).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dn=new Ea,Vh=new Yt(.5,.5),qs=new I;class Ta{constructor(t=new Un,e=new Un,n=new Un,s=new Un,r=new Un,a=new Un){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Je,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],V=r[3],h=r[4],u=r[5],c=r[6],f=r[7],q=r[8],g=r[9],p=r[10],d=r[11],E=r[12],y=r[13],x=r[14],w=r[15];if(s[0].setComponents(V-a,f-h,d-q,w-E).normalize(),s[1].setComponents(V+a,f+h,d+q,w+E).normalize(),s[2].setComponents(V+o,f+u,d+g,w+y).normalize(),s[3].setComponents(V-o,f-u,d-g,w-y).normalize(),n)s[4].setComponents(l,c,p,x).normalize(),s[5].setComponents(V-l,f-c,d-p,w-x).normalize();else if(s[4].setComponents(V-l,f-c,d-p,w-x).normalize(),e===Je)s[5].setComponents(V+l,f+c,d+p,w+x).normalize();else if(e===Ls)s[5].setComponents(l,c,p,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Dn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Dn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Dn)}intersectsSprite(t){Dn.center.set(0,0,0);const e=Vh.distanceTo(t.center);return Dn.radius=.7071067811865476+e,Dn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Dn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(qs.x=s.normal.x>0?t.max.x:t.min.x,qs.y=s.normal.y>0?t.max.y:t.min.y,qs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(qs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lh extends Se{constructor(t,e,n,s,r,a,o,l,V){super(t,e,n,s,r,a,o,l,V),this.isCanvasTexture=!0,this.needsUpdate=!0}}class EV extends Se{constructor(t,e,n=Hn,s,r,a,o=Qe,l=Qe,V,h=Oi,u=1){if(h!==Oi&&h!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const c={width:t,height:e,depth:u};super(c,s,r,a,o,l,h,n,V),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Sa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class yV extends Se{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Yi extends Wn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),V=o+1,h=l+1,u=t/o,c=e/l,f=[],q=[],g=[],p=[];for(let d=0;d<h;d++){const E=d*c-a;for(let y=0;y<V;y++){const x=y*u-r;q.push(x,-E,0),g.push(0,0,1),p.push(y/o),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let E=0;E<o;E++){const y=E+V*d,x=E+V*(d+1),w=E+1+V*(d+1),b=E+1+V*d;f.push(y,x,b),f.push(x,w,b)}this.setIndex(f),this.setAttribute("position",new zn(q,3)),this.setAttribute("normal",new zn(g,3)),this.setAttribute("uv",new zn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yi(t.width,t.height,t.widthSegments,t.heightSegments)}}class ch extends xi{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Gt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class hh extends xi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dV,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class uh extends xi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class dh extends xi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class TV extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class fh extends TV{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const dr=new le,po=new I,qo=new I;class ph{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Yt(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ta,this._frameExtents=new Yt(1,1),this._viewportCount=1,this._viewports=[new Ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;po.setFromMatrixPosition(t.matrixWorld),e.position.copy(po),qo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qo),e.updateMatrixWorld(),dr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dr,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(dr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class wV extends MV{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const V=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=V*this.view.offsetX,a=r+V*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class qh extends ph{constructor(){super(new wV(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fr extends TV{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new qh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ah extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class mh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const Ao=new le;class gh{constructor(t,e,n=0,s=1/0){this.ray=new AV(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ya,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ao.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ao),this}intersectObject(t,e=!0,n=[]){return da(t,this,n,e),n.sort(mo),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)da(t[s],this,n,e);return n.sort(mo),n}}function mo(i,t){return i.distance-t.distance}function da(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)da(r[a],t,e,!0)}}function go(i,t,e,n){const s=_h(n);switch(e){case lV:return i*t;case hV:return i*t/s.components*s.byteLength;case _a:return i*t/s.components*s.byteLength;case uV:return i*t*2/s.components*s.byteLength;case va:return i*t*2/s.components*s.byteLength;case cV:return i*t*3/s.components*s.byteLength;case Xe:return i*t*4/s.components*s.byteLength;case xa:return i*t*4/s.components*s.byteLength;case Es:case ys:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ts:case ws:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Or:case zr:return Math.max(i,16)*Math.max(t,8)/4;case Nr:case kr:return Math.max(i,8)*Math.max(t,8)/2;case Hr:case Gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Xr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Yr:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Qr:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case jr:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Kr:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Zr:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Jr:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case $r:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ta:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ea:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case na:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ia:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case sa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ra:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case aa:case oa:case Va:return Math.ceil(i/4)*Math.ceil(t/4)*16;case la:case ca:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ha:case ua:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function _h(i){switch(i){case tn:case rV:return{byteLength:1,components:1};case Fi:case aV:case Gi:return{byteLength:2,components:1};case ma:case ga:return{byteLength:2,components:4};case Hn:case Aa:case hn:return{byteLength:4,components:1};case oV:case VV:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qa);function bV(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function vh(i){const t=new WeakMap;function e(o,l){const V=o.array,h=o.usage,u=V.byteLength,c=i.createBuffer();i.bindBuffer(l,c),i.bufferData(l,V,h),o.onUploadCallback();let f;if(V instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&V instanceof Float16Array)f=i.HALF_FLOAT;else if(V instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(V instanceof Int16Array)f=i.SHORT;else if(V instanceof Uint32Array)f=i.UNSIGNED_INT;else if(V instanceof Int32Array)f=i.INT;else if(V instanceof Int8Array)f=i.BYTE;else if(V instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(V instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+V);return{buffer:c,type:f,bytesPerElement:V.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,V){const h=l.array,u=l.updateRanges;if(i.bindBuffer(V,o),u.length===0)i.bufferSubData(V,0,h);else{u.sort((f,q)=>f.start-q.start);let c=0;for(let f=1;f<u.length;f++){const q=u[c],g=u[f];g.start<=q.start+q.count+1?q.count=Math.max(q.count,g.start+g.count-q.start):(++c,u[c]=g)}u.length=c+1;for(let f=0,q=u.length;f<q;f++){const g=u[f];i.bufferSubData(V,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const V=t.get(o);if(V===void 0)t.set(o,e(o,l));else if(V.version<o.version){if(V.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(V.buffer,o,l),V.version=o.version}}return{get:s,remove:r,update:a}}var xh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Eh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Th=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,bh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ch=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Rh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ph=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Uh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ih=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Wh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Yh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jh="gl_FragColor = linearToOutputTexel( gl_FragColor );",$h=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,eu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,iu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,su=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ru=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,au=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ou=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,du=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,fu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Au=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_u=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Mu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Su=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Eu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ru=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Du=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Uu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Iu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ou=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ku=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ju=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ku=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Zu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ju=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$u=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,td=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ed=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,id=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ad=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,od=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ld=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ud=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,qd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ad=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,md=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_d=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ed=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Td=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,bd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Cd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Rd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ld=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ud=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Id=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Od=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,zd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Hd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Kd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$d=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:xh,alphahash_pars_fragment:Mh,alphamap_fragment:Sh,alphamap_pars_fragment:Eh,alphatest_fragment:yh,alphatest_pars_fragment:Th,aomap_fragment:wh,aomap_pars_fragment:bh,batching_pars_vertex:Ch,batching_vertex:Rh,begin_vertex:Dh,beginnormal_vertex:Lh,bsdfs:Ph,iridescence_fragment:Uh,bumpmap_pars_fragment:Ih,clipping_planes_fragment:Bh,clipping_planes_pars_fragment:Fh,clipping_planes_pars_vertex:Nh,clipping_planes_vertex:Oh,color_fragment:kh,color_pars_fragment:zh,color_pars_vertex:Hh,color_vertex:Gh,common:Wh,cube_uv_reflection_fragment:Xh,defaultnormal_vertex:Yh,displacementmap_pars_vertex:Qh,displacementmap_vertex:jh,emissivemap_fragment:Kh,emissivemap_pars_fragment:Zh,colorspace_fragment:Jh,colorspace_pars_fragment:$h,envmap_fragment:tu,envmap_common_pars_fragment:eu,envmap_pars_fragment:nu,envmap_pars_vertex:iu,envmap_physical_pars_fragment:fu,envmap_vertex:su,fog_vertex:ru,fog_pars_vertex:au,fog_fragment:ou,fog_pars_fragment:Vu,gradientmap_pars_fragment:lu,lightmap_pars_fragment:cu,lights_lambert_fragment:hu,lights_lambert_pars_fragment:uu,lights_pars_begin:du,lights_toon_fragment:pu,lights_toon_pars_fragment:qu,lights_phong_fragment:Au,lights_phong_pars_fragment:mu,lights_physical_fragment:gu,lights_physical_pars_fragment:_u,lights_fragment_begin:vu,lights_fragment_maps:xu,lights_fragment_end:Mu,logdepthbuf_fragment:Su,logdepthbuf_pars_fragment:Eu,logdepthbuf_pars_vertex:yu,logdepthbuf_vertex:Tu,map_fragment:wu,map_pars_fragment:bu,map_particle_fragment:Cu,map_particle_pars_fragment:Ru,metalnessmap_fragment:Du,metalnessmap_pars_fragment:Lu,morphinstance_vertex:Pu,morphcolor_vertex:Uu,morphnormal_vertex:Iu,morphtarget_pars_vertex:Bu,morphtarget_vertex:Fu,normal_fragment_begin:Nu,normal_fragment_maps:Ou,normal_pars_fragment:ku,normal_pars_vertex:zu,normal_vertex:Hu,normalmap_pars_fragment:Gu,clearcoat_normal_fragment_begin:Wu,clearcoat_normal_fragment_maps:Xu,clearcoat_pars_fragment:Yu,iridescence_pars_fragment:Qu,opaque_fragment:ju,packing:Ku,premultiplied_alpha_fragment:Zu,project_vertex:Ju,dithering_fragment:$u,dithering_pars_fragment:td,roughnessmap_fragment:ed,roughnessmap_pars_fragment:nd,shadowmap_pars_fragment:id,shadowmap_pars_vertex:sd,shadowmap_vertex:rd,shadowmask_pars_fragment:ad,skinbase_vertex:od,skinning_pars_vertex:Vd,skinning_vertex:ld,skinnormal_vertex:cd,specularmap_fragment:hd,specularmap_pars_fragment:ud,tonemapping_fragment:dd,tonemapping_pars_fragment:fd,transmission_fragment:pd,transmission_pars_fragment:qd,uv_pars_fragment:Ad,uv_pars_vertex:md,uv_vertex:gd,worldpos_vertex:_d,background_vert:vd,background_frag:xd,backgroundCube_vert:Md,backgroundCube_frag:Sd,cube_vert:Ed,cube_frag:yd,depth_vert:Td,depth_frag:wd,distanceRGBA_vert:bd,distanceRGBA_frag:Cd,equirect_vert:Rd,equirect_frag:Dd,linedashed_vert:Ld,linedashed_frag:Pd,meshbasic_vert:Ud,meshbasic_frag:Id,meshlambert_vert:Bd,meshlambert_frag:Fd,meshmatcap_vert:Nd,meshmatcap_frag:Od,meshnormal_vert:kd,meshnormal_frag:zd,meshphong_vert:Hd,meshphong_frag:Gd,meshphysical_vert:Wd,meshphysical_frag:Xd,meshtoon_vert:Yd,meshtoon_frag:Qd,points_vert:jd,points_frag:Kd,shadow_vert:Zd,shadow_frag:Jd,sprite_vert:$d,sprite_frag:tf},rt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},Ke={basic:{uniforms:Me([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Me([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Me([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Me([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Me([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Me([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Me([rt.points,rt.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Me([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Me([rt.common,rt.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Me([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Me([rt.sprite,rt.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:Me([rt.common,rt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:Me([rt.lights,rt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Ke.physical={uniforms:Me([Ke.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new Yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const As={r:0,b:0,g:0},Ln=new en,ef=new le;function nf(i,t,e,n,s,r,a){const o=new Gt(0);let l=r===!0?0:1,V,h,u=null,c=0,f=null;function q(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function g(y){let x=!1;const w=q(y);w===null?d(o,l):w&&w.isColor&&(d(w,1),x=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(y,x){const w=q(x);w&&(w.isCubeTexture||w.mapping===Us)?(h===void 0&&(h=new Ye(new Mi(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:gi(Ke.backgroundCube.uniforms),vertexShader:Ke.backgroundCube.vertexShader,fragmentShader:Ke.backgroundCube.fragmentShader,side:Te,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,C,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ln.copy(x.backgroundRotation),Ln.x*=-1,Ln.y*=-1,Ln.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ln.y*=-1,Ln.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ef.makeRotationFromEuler(Ln)),h.material.toneMapped=Xt.getTransfer(w.colorSpace)!==Zt,(u!==w||c!==w.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=w,c=w.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(V===void 0&&(V=new Ye(new Yi(2,2),new yn({name:"BackgroundMaterial",uniforms:gi(Ke.background.uniforms),vertexShader:Ke.background.vertexShader,fragmentShader:Ke.background.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),V.geometry.deleteAttribute("normal"),Object.defineProperty(V.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(V)),V.material.uniforms.t2D.value=w,V.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,V.material.toneMapped=Xt.getTransfer(w.colorSpace)!==Zt,w.matrixAutoUpdate===!0&&w.updateMatrix(),V.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||c!==w.version||f!==i.toneMapping)&&(V.material.needsUpdate=!0,u=w,c=w.version,f=i.toneMapping),V.layers.enableAll(),y.unshift(V,V.geometry,V.material,0,0,null))}function d(y,x){y.getRGB(As,xV(i)),n.buffers.color.setClear(As.r,As.g,As.b,x,a)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),V!==void 0&&(V.geometry.dispose(),V.material.dispose(),V=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,x=1){o.set(y),l=x,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,d(o,l)},render:g,addToRenderList:p,dispose:E}}function sf(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=c(null);let r=s,a=!1;function o(_,D,O,H,j){let W=!1;const Y=u(H,O,D);r!==Y&&(r=Y,V(r.object)),W=f(_,H,O,j),W&&q(_,H,O,j),j!==null&&t.update(j,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,x(_,D,O,H),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function l(){return i.createVertexArray()}function V(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function u(_,D,O){const H=O.wireframe===!0;let j=n[_.id];j===void 0&&(j={},n[_.id]=j);let W=j[D.id];W===void 0&&(W={},j[D.id]=W);let Y=W[H];return Y===void 0&&(Y=c(l()),W[H]=Y),Y}function c(_){const D=[],O=[],H=[];for(let j=0;j<e;j++)D[j]=0,O[j]=0,H[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:O,attributeDivisors:H,object:_,attributes:{},index:null}}function f(_,D,O,H){const j=r.attributes,W=D.attributes;let Y=0;const Z=O.getAttributes();for(const k in Z)if(Z[k].location>=0){const ct=j[k];let St=W[k];if(St===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(St=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(St=_.instanceColor)),ct===void 0||ct.attribute!==St||St&&ct.data!==St.data)return!0;Y++}return r.attributesNum!==Y||r.index!==H}function q(_,D,O,H){const j={},W=D.attributes;let Y=0;const Z=O.getAttributes();for(const k in Z)if(Z[k].location>=0){let ct=W[k];ct===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(ct=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(ct=_.instanceColor));const St={};St.attribute=ct,ct&&ct.data&&(St.data=ct.data),j[k]=St,Y++}r.attributes=j,r.attributesNum=Y,r.index=H}function g(){const _=r.newAttributes;for(let D=0,O=_.length;D<O;D++)_[D]=0}function p(_){d(_,0)}function d(_,D){const O=r.newAttributes,H=r.enabledAttributes,j=r.attributeDivisors;O[_]=1,H[_]===0&&(i.enableVertexAttribArray(_),H[_]=1),j[_]!==D&&(i.vertexAttribDivisor(_,D),j[_]=D)}function E(){const _=r.newAttributes,D=r.enabledAttributes;for(let O=0,H=D.length;O<H;O++)D[O]!==_[O]&&(i.disableVertexAttribArray(O),D[O]=0)}function y(_,D,O,H,j,W,Y){Y===!0?i.vertexAttribIPointer(_,D,O,j,W):i.vertexAttribPointer(_,D,O,H,j,W)}function x(_,D,O,H){g();const j=H.attributes,W=O.getAttributes(),Y=D.defaultAttributeValues;for(const Z in W){const k=W[Z];if(k.location>=0){let at=j[Z];if(at===void 0&&(Z==="instanceMatrix"&&_.instanceMatrix&&(at=_.instanceMatrix),Z==="instanceColor"&&_.instanceColor&&(at=_.instanceColor)),at!==void 0){const ct=at.normalized,St=at.itemSize,Nt=t.get(at);if(Nt===void 0)continue;const $t=Nt.buffer,ne=Nt.type,Qt=Nt.bytesPerElement,X=ne===i.INT||ne===i.UNSIGNED_INT||at.gpuType===Aa;if(at.isInterleavedBufferAttribute){const J=at.data,dt=J.stride,Dt=at.offset;if(J.isInstancedInterleavedBuffer){for(let Mt=0;Mt<k.locationSize;Mt++)d(k.location+Mt,J.meshPerAttribute);_.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Mt=0;Mt<k.locationSize;Mt++)p(k.location+Mt);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let Mt=0;Mt<k.locationSize;Mt++)y(k.location+Mt,St/k.locationSize,ne,ct,dt*Qt,(Dt+St/k.locationSize*Mt)*Qt,X)}else{if(at.isInstancedBufferAttribute){for(let J=0;J<k.locationSize;J++)d(k.location+J,at.meshPerAttribute);_.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let J=0;J<k.locationSize;J++)p(k.location+J);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let J=0;J<k.locationSize;J++)y(k.location+J,St/k.locationSize,ne,ct,St*Qt,St/k.locationSize*J*Qt,X)}}else if(Y!==void 0){const ct=Y[Z];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(k.location,ct);break;case 3:i.vertexAttrib3fv(k.location,ct);break;case 4:i.vertexAttrib4fv(k.location,ct);break;default:i.vertexAttrib1fv(k.location,ct)}}}}E()}function w(){B();for(const _ in n){const D=n[_];for(const O in D){const H=D[O];for(const j in H)h(H[j].object),delete H[j];delete D[O]}delete n[_]}}function b(_){if(n[_.id]===void 0)return;const D=n[_.id];for(const O in D){const H=D[O];for(const j in H)h(H[j].object),delete H[j];delete D[O]}delete n[_.id]}function C(_){for(const D in n){const O=n[D];if(O[_.id]===void 0)continue;const H=O[_.id];for(const j in H)h(H[j].object),delete H[j];delete O[_.id]}}function B(){v(),a=!0,r!==s&&(r=s,V(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:B,resetDefaultState:v,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:C,initAttributes:g,enableAttribute:p,disableUnusedAttributes:E}}function rf(i,t,e){let n;function s(V){n=V}function r(V,h){i.drawArrays(n,V,h),e.update(h,n,1)}function a(V,h,u){u!==0&&(i.drawArraysInstanced(n,V,h,u),e.update(h,n,u))}function o(V,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,V,0,h,0,u);let f=0;for(let q=0;q<u;q++)f+=h[q];e.update(f,n,1)}function l(V,h,u,c){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let q=0;q<V.length;q++)a(V[q],h[q],c[q]);else{f.multiDrawArraysInstancedWEBGL(n,V,0,h,0,c,0,u);let q=0;for(let g=0;g<u;g++)q+=h[g]*c[g];e.update(q,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function af(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Xe&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const B=C===Gi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==tn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==hn&&!B)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let V=e.precision!==void 0?e.precision:"highp";const h=l(V);h!==V&&(console.warn("THREE.WebGLRenderer:",V,"not supported, using",h,"instead."),V=h);const u=e.logarithmicDepthBuffer===!0,c=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),q=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=q>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:V,logarithmicDepthBuffer:u,reversedDepthBuffer:c,maxTextures:f,maxVertexTextures:q,maxTextureSize:g,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:E,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:w,maxSamples:b}}function of(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Un,o=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,c){const f=u.length!==0||c||n!==0||s;return s=c,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,c){e=h(u,c,0)},this.setState=function(u,c,f){const q=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,d=i.get(u);if(!s||q===null||q.length===0||r&&!p)r?h(null):V();else{const E=r?0:n,y=E*4;let x=d.clippingState||null;l.value=x,x=h(q,c,y,f);for(let w=0;w!==y;++w)x[w]=e[w];d.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=E}};function V(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,c,f,q){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=l.value,q!==!0||p===null){const d=f+g*4,E=c.matrixWorldInverse;o.getNormalMatrix(E),(p===null||p.length<d)&&(p=new Float32Array(d));for(let y=0,x=f;y!==g;++y,x+=4)a.copy(u[y]).applyMatrix4(E,o),a.normal.toArray(p,x),p[x+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function Vf(i){let t=new WeakMap;function e(a,o){return o===Ir?a.mapping=qi:o===Br&&(a.mapping=Ai),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ir||o===Br)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const V=new ih(l.height);return V.fromEquirectangularTexture(i,a),t.set(a,V),a.addEventListener("dispose",s),e(V.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const ui=4,_o=[.125,.215,.35,.446,.526,.582],Nn=20,pr=new wV,vo=new Gt;let qr=null,Ar=0,mr=0,gr=!1;const In=(1+Math.sqrt(5))/2,Vi=1/In,xo=[new I(-In,Vi,0),new I(In,Vi,0),new I(-Vi,0,In),new I(Vi,0,In),new I(0,In,-Vi),new I(0,In,Vi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],lf=new I;class Mo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=lf}=r;qr=this._renderer.getRenderTarget(),Ar=this._renderer.getActiveCubeFace(),mr=this._renderer.getActiveMipmapLevel(),gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(qr,Ar,mr),this._renderer.xr.enabled=gr,t.scissorTest=!1,ms(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qi||t.mapping===Ai?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qr=this._renderer.getRenderTarget(),Ar=this._renderer.getActiveCubeFace(),mr=this._renderer.getActiveMipmapLevel(),gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:Gi,format:Xe,colorSpace:mi,depthBuffer:!1},s=So(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=So(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cf(r)),this._blurMaterial=hf(r,t,e)}return s}_compileMaterial(t){const e=new Ye(this._lodPlanes[0],t);this._renderer.compile(e,pr)}_sceneToCubeUV(t,e,n,s,r){const l=new Oe(90,1,e,n),V=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,c=u.autoClear,f=u.toneMapping;u.getClearColor(vo),u.toneMapping=Sn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const g=new gV({name:"PMREM.Background",side:Te,depthWrite:!1,depthTest:!1}),p=new Ye(new Mi,g);let d=!1;const E=t.background;E?E.isColor&&(g.color.copy(E),t.background=null,d=!0):(g.color.copy(vo),d=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(l.up.set(0,V[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):x===1?(l.up.set(0,0,V[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,V[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const w=this._cubeSize;ms(s,x*w,y>2?w:0,w,w),u.setRenderTarget(s),d&&u.render(p,l),u.render(t,l)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=f,u.autoClear=c,t.background=E}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===qi||t.mapping===Ai;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ye(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;ms(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,pr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=xo[(s-r-1)%xo.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,V=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ye(this._lodPlanes[s],V),c=V.uniforms,f=this._sizeLods[n]-1,q=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Nn-1),g=r/q,p=isFinite(r)?1+Math.floor(h*g):Nn;p>Nn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Nn}`);const d=[];let E=0;for(let C=0;C<Nn;++C){const B=C/g,v=Math.exp(-B*B/2);d.push(v),C===0?E+=v:C<p&&(E+=2*v)}for(let C=0;C<d.length;C++)d[C]=d[C]/E;c.envMap.value=t.texture,c.samples.value=p,c.weights.value=d,c.latitudinal.value=a==="latitudinal",o&&(c.poleAxis.value=o);const{_lodMax:y}=this;c.dTheta.value=q,c.mipInt.value=y-n;const x=this._sizeLods[s],w=3*x*(s>y-ui?s-y+ui:0),b=4*(this._cubeSize-x);ms(e,w,b,3*x,2*x),l.setRenderTarget(e),l.render(u,pr)}}function cf(i){const t=[],e=[],n=[];let s=i;const r=i-ui+1+_o.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-ui?l=_o[a-i+ui-1]:a===0&&(l=0),n.push(l);const V=1/(o-2),h=-V,u=1+V,c=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,q=6,g=3,p=2,d=1,E=new Float32Array(g*q*f),y=new Float32Array(p*q*f),x=new Float32Array(d*q*f);for(let b=0;b<f;b++){const C=b%3*2/3-1,B=b>2?0:-1,v=[C,B,0,C+2/3,B,0,C+2/3,B+1,0,C,B,0,C+2/3,B+1,0,C,B+1,0];E.set(v,g*q*b),y.set(c,p*q*b);const _=[b,b,b,b,b,b];x.set(_,d*q*b)}const w=new Wn;w.setAttribute("position",new $e(E,g)),w.setAttribute("uv",new $e(y,p)),w.setAttribute("faceIndex",new $e(x,d)),t.push(w),s>ui&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function So(i,t,e){const n=new Gn(i,t,e);return n.texture.mapping=Us,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ms(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function hf(i,t,e){const n=new Float32Array(Nn),s=new I(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:Nn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Eo(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function yo(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function wa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function uf(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,V=l===Ir||l===Br,h=l===qi||l===Ai;if(V||h){let u=t.get(o);const c=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==c)return e===null&&(e=new Mo(i)),u=V?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return V&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Mo(i)),u=V?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const V=6;for(let h=0;h<V;h++)o[h]!==void 0&&l++;return l===V}function r(o){const l=o.target;l.removeEventListener("dispose",r);const V=t.get(l);V!==void 0&&(t.delete(l),V.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function df(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Hi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ff(i,t,e,n){const s={},r=new WeakMap;function a(u){const c=u.target;c.index!==null&&t.remove(c.index);for(const q in c.attributes)t.remove(c.attributes[q]);c.removeEventListener("dispose",a),delete s[c.id];const f=r.get(c);f&&(t.remove(f),r.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,e.memory.geometries--}function o(u,c){return s[c.id]===!0||(c.addEventListener("dispose",a),s[c.id]=!0,e.memory.geometries++),c}function l(u){const c=u.attributes;for(const f in c)t.update(c[f],i.ARRAY_BUFFER)}function V(u){const c=[],f=u.index,q=u.attributes.position;let g=0;if(f!==null){const E=f.array;g=f.version;for(let y=0,x=E.length;y<x;y+=3){const w=E[y+0],b=E[y+1],C=E[y+2];c.push(w,b,b,C,C,w)}}else if(q!==void 0){const E=q.array;g=q.version;for(let y=0,x=E.length/3-1;y<x;y+=3){const w=y+0,b=y+1,C=y+2;c.push(w,b,b,C,C,w)}}else return;const p=new(pV(c)?vV:_V)(c,1);p.version=g;const d=r.get(u);d&&t.remove(d),r.set(u,p)}function h(u){const c=r.get(u);if(c){const f=u.index;f!==null&&c.version<f.version&&V(u)}else V(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function pf(i,t,e){let n;function s(c){n=c}let r,a;function o(c){r=c.type,a=c.bytesPerElement}function l(c,f){i.drawElements(n,f,r,c*a),e.update(f,n,1)}function V(c,f,q){q!==0&&(i.drawElementsInstanced(n,f,r,c*a,q),e.update(f,n,q))}function h(c,f,q){if(q===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,c,0,q);let p=0;for(let d=0;d<q;d++)p+=f[d];e.update(p,n,1)}function u(c,f,q,g){if(q===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<c.length;d++)V(c[d]/a,f[d],g[d]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,c,0,g,0,q);let d=0;for(let E=0;E<q;E++)d+=f[E]*g[E];e.update(d,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=V,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function qf(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Af(i,t,e){const n=new WeakMap,s=new Ve;function r(a,o,l){const V=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let c=n.get(o);if(c===void 0||c.count!==u){let _=function(){B.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var f=_;c!==void 0&&c.texture.dispose();const q=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let x=0;q===!0&&(x=1),g===!0&&(x=2),p===!0&&(x=3);let w=o.attributes.position.count*x,b=1;w>t.maxTextureSize&&(b=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const C=new Float32Array(w*b*4*u),B=new qV(C,w,b,u);B.type=hn,B.needsUpdate=!0;const v=x*4;for(let D=0;D<u;D++){const O=d[D],H=E[D],j=y[D],W=w*b*4*D;for(let Y=0;Y<O.count;Y++){const Z=Y*v;q===!0&&(s.fromBufferAttribute(O,Y),C[W+Z+0]=s.x,C[W+Z+1]=s.y,C[W+Z+2]=s.z,C[W+Z+3]=0),g===!0&&(s.fromBufferAttribute(H,Y),C[W+Z+4]=s.x,C[W+Z+5]=s.y,C[W+Z+6]=s.z,C[W+Z+7]=0),p===!0&&(s.fromBufferAttribute(j,Y),C[W+Z+8]=s.x,C[W+Z+9]=s.y,C[W+Z+10]=s.z,C[W+Z+11]=j.itemSize===4?s.w:1)}}c={count:u,texture:B,size:new Yt(w,b)},n.set(o,c),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let q=0;for(let p=0;p<V.length;p++)q+=V[p];const g=o.morphTargetsRelative?1:1-q;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",V)}l.getUniforms().setValue(i,"morphTargetsTexture",c.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",c.size)}return{update:r}}function mf(i,t,e,n){let s=new WeakMap;function r(l){const V=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==V&&(t.update(u),s.set(u,V)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==V&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,V))),l.isSkinnedMesh){const c=l.skeleton;s.get(c)!==V&&(c.update(),s.set(c,V))}return u}function a(){s=new WeakMap}function o(l){const V=l.target;V.removeEventListener("dispose",o),e.remove(V.instanceMatrix),V.instanceColor!==null&&e.remove(V.instanceColor)}return{update:r,dispose:a}}const CV=new Se,To=new EV(1,1),RV=new qV,DV=new Oc,LV=new SV,wo=[],bo=[],Co=new Float32Array(16),Ro=new Float32Array(9),Do=new Float32Array(4);function Si(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=wo[s];if(r===void 0&&(r=new Float32Array(s),wo[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ue(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function de(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Is(i,t){let e=bo[t];e===void 0&&(e=new Int32Array(t),bo[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function gf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function _f(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2fv(this.addr,t),de(e,t)}}function vf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ue(e,t))return;i.uniform3fv(this.addr,t),de(e,t)}}function xf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4fv(this.addr,t),de(e,t)}}function Mf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(ue(e,n))return;Do.set(n),i.uniformMatrix2fv(this.addr,!1,Do),de(e,n)}}function Sf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(ue(e,n))return;Ro.set(n),i.uniformMatrix3fv(this.addr,!1,Ro),de(e,n)}}function Ef(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(ue(e,n))return;Co.set(n),i.uniformMatrix4fv(this.addr,!1,Co),de(e,n)}}function yf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Tf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2iv(this.addr,t),de(e,t)}}function wf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;i.uniform3iv(this.addr,t),de(e,t)}}function bf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4iv(this.addr,t),de(e,t)}}function Cf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Rf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2uiv(this.addr,t),de(e,t)}}function Df(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;i.uniform3uiv(this.addr,t),de(e,t)}}function Lf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4uiv(this.addr,t),de(e,t)}}function Pf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(To.compareFunction=fV,r=To):r=CV,e.setTexture2D(t||r,s)}function Uf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||DV,s)}function If(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||LV,s)}function Bf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||RV,s)}function Ff(i){switch(i){case 5126:return gf;case 35664:return _f;case 35665:return vf;case 35666:return xf;case 35674:return Mf;case 35675:return Sf;case 35676:return Ef;case 5124:case 35670:return yf;case 35667:case 35671:return Tf;case 35668:case 35672:return wf;case 35669:case 35673:return bf;case 5125:return Cf;case 36294:return Rf;case 36295:return Df;case 36296:return Lf;case 35678:case 36198:case 36298:case 36306:case 35682:return Pf;case 35679:case 36299:case 36307:return Uf;case 35680:case 36300:case 36308:case 36293:return If;case 36289:case 36303:case 36311:case 36292:return Bf}}function Nf(i,t){i.uniform1fv(this.addr,t)}function Of(i,t){const e=Si(t,this.size,2);i.uniform2fv(this.addr,e)}function kf(i,t){const e=Si(t,this.size,3);i.uniform3fv(this.addr,e)}function zf(i,t){const e=Si(t,this.size,4);i.uniform4fv(this.addr,e)}function Hf(i,t){const e=Si(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Gf(i,t){const e=Si(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Wf(i,t){const e=Si(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Xf(i,t){i.uniform1iv(this.addr,t)}function Yf(i,t){i.uniform2iv(this.addr,t)}function Qf(i,t){i.uniform3iv(this.addr,t)}function jf(i,t){i.uniform4iv(this.addr,t)}function Kf(i,t){i.uniform1uiv(this.addr,t)}function Zf(i,t){i.uniform2uiv(this.addr,t)}function Jf(i,t){i.uniform3uiv(this.addr,t)}function $f(i,t){i.uniform4uiv(this.addr,t)}function tp(i,t,e){const n=this.cache,s=t.length,r=Is(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||CV,r[a])}function ep(i,t,e){const n=this.cache,s=t.length,r=Is(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||DV,r[a])}function np(i,t,e){const n=this.cache,s=t.length,r=Is(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||LV,r[a])}function ip(i,t,e){const n=this.cache,s=t.length,r=Is(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||RV,r[a])}function sp(i){switch(i){case 5126:return Nf;case 35664:return Of;case 35665:return kf;case 35666:return zf;case 35674:return Hf;case 35675:return Gf;case 35676:return Wf;case 5124:case 35670:return Xf;case 35667:case 35671:return Yf;case 35668:case 35672:return Qf;case 35669:case 35673:return jf;case 5125:return Kf;case 36294:return Zf;case 36295:return Jf;case 36296:return $f;case 35678:case 36198:case 36298:case 36306:case 35682:return tp;case 35679:case 36299:case 36307:return ep;case 35680:case 36300:case 36308:case 36293:return np;case 36289:case 36303:case 36311:case 36292:return ip}}class rp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Ff(e.type)}}class ap{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=sp(e.type)}}class op{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const _r=/(\w+)(\])?(\[|\.)?/g;function Lo(i,t){i.seq.push(t),i.map[t.id]=t}function Vp(i,t,e){const n=i.name,s=n.length;for(_r.lastIndex=0;;){const r=_r.exec(n),a=_r.lastIndex;let o=r[1];const l=r[2]==="]",V=r[3];if(l&&(o=o|0),V===void 0||V==="["&&a+2===s){Lo(e,V===void 0?new rp(o,i,t):new ap(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new op(o),Lo(e,u)),e=u}}}class bs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Vp(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Po(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const lp=37297;let cp=0;function hp(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Uo=new It;function up(i){Xt._getMatrix(Uo,Xt.workingColorSpace,i);const t=`mat3( ${Uo.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(i)){case Ds:return[t,"LinearTransferOETF"];case Zt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Io(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+hp(i.getShaderSource(t),o)}else return r}function dp(i,t){const e=up(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function fp(i,t){let e;switch(t){case tc:e="Linear";break;case ec:e="Reinhard";break;case nc:e="Cineon";break;case iV:e="ACESFilmic";break;case sc:e="AgX";break;case rc:e="Neutral";break;case ic:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const gs=new I;function pp(){Xt.getLuminanceCoefficients(gs);const i=gs.x.toFixed(4),t=gs.y.toFixed(4),e=gs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Pi).join(`
`)}function Ap(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function mp(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Pi(i){return i!==""}function Bo(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fo(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const gp=/^[ \t]*#include +<([\w\d./]+)>/gm;function fa(i){return i.replace(gp,vp)}const _p=new Map;function vp(i,t){let e=Ft[t];if(e===void 0){const n=_p.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return fa(e)}const xp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function No(i){return i.replace(xp,Mp)}function Mp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Oo(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Sp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tV?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===eV?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ln&&(t="SHADOWMAP_TYPE_VSM"),t}function Ep(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case qi:case Ai:t="ENVMAP_TYPE_CUBE";break;case Us:t="ENVMAP_TYPE_CUBE_UV";break}return t}function yp(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ai&&(t="ENVMAP_MODE_REFRACTION"),t}function Tp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nV:t="ENVMAP_BLENDING_MULTIPLY";break;case Jl:t="ENVMAP_BLENDING_MIX";break;case $l:t="ENVMAP_BLENDING_ADD";break}return t}function wp(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function bp(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Sp(e),V=Ep(e),h=yp(e),u=Tp(e),c=wp(e),f=qp(e),q=Ap(r),g=s.createProgram();let p,d,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,q].filter(Pi).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,q].filter(Pi).join(`
`),d.length>0&&(d+=`
`)):(p=[Oo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,q,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pi).join(`
`),d=[Oo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,q,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+V:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Sn?"#define TONE_MAPPING":"",e.toneMapping!==Sn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Sn?fp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,dp("linearToOutputTexel",e.outputColorSpace),pp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Pi).join(`
`)),a=fa(a),a=Bo(a,e),a=Fo(a,e),o=fa(o),o=Bo(o,e),o=Fo(o,e),a=No(a),o=No(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",e.glslVersion===Qa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=E+p+a,x=E+d+o,w=Po(s,s.VERTEX_SHADER,y),b=Po(s,s.FRAGMENT_SHADER,x);s.attachShader(g,w),s.attachShader(g,b),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function C(D){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(g)||"",H=s.getShaderInfoLog(w)||"",j=s.getShaderInfoLog(b)||"",W=O.trim(),Y=H.trim(),Z=j.trim();let k=!0,at=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,w,b);else{const ct=Io(s,w,"vertex"),St=Io(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+W+`
`+ct+`
`+St)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(Y===""||Z==="")&&(at=!1);at&&(D.diagnostics={runnable:k,programLog:W,vertexShader:{log:Y,prefix:p},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(w),s.deleteShader(b),B=new bs(s,g),v=mp(s,g)}let B;this.getUniforms=function(){return B===void 0&&C(this),B};let v;this.getAttributes=function(){return v===void 0&&C(this),v};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(g,lp)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=cp++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=b,this}let Cp=0;class Rp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Dp(t),e.set(t,n)),n}}class Dp{constructor(t){this.id=Cp++,this.code=t,this.usedTimes=0}}function Lp(i,t,e,n,s,r,a){const o=new ya,l=new Rp,V=new Set,h=[],u=s.logarithmicDepthBuffer,c=s.vertexTextures;let f=s.precision;const q={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return V.add(v),v===0?"uv":`uv${v}`}function p(v,_,D,O,H){const j=O.fog,W=H.geometry,Y=v.isMeshStandardMaterial?O.environment:null,Z=(v.isMeshStandardMaterial?e:t).get(v.envMap||Y),k=Z&&Z.mapping===Us?Z.image.height:null,at=q[v.type];v.precision!==null&&(f=s.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const ct=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,St=ct!==void 0?ct.length:0;let Nt=0;W.morphAttributes.position!==void 0&&(Nt=1),W.morphAttributes.normal!==void 0&&(Nt=2),W.morphAttributes.color!==void 0&&(Nt=3);let $t,ne,Qt,X;if(at){const jt=Ke[at];$t=jt.vertexShader,ne=jt.fragmentShader}else $t=v.vertexShader,ne=v.fragmentShader,l.update(v),Qt=l.getVertexShaderID(v),X=l.getFragmentShaderID(v);const J=i.getRenderTarget(),dt=i.state.buffers.depth.getReversed(),Dt=H.isInstancedMesh===!0,Mt=H.isBatchedMesh===!0,zt=!!v.map,me=!!v.matcap,T=!!Z,ie=!!v.aoMap,Pt=!!v.lightMap,Ct=!!v.bumpMap,At=!!v.normalMap,se=!!v.displacementMap,mt=!!v.emissiveMap,Bt=!!v.metalnessMap,fe=!!v.roughnessMap,ce=v.anisotropy>0,M=v.clearcoat>0,A=v.dispersion>0,U=v.iridescence>0,G=v.sheen>0,K=v.transmission>0,z=ce&&!!v.anisotropyMap,xt=M&&!!v.clearcoatMap,it=M&&!!v.clearcoatNormalMap,gt=M&&!!v.clearcoatRoughnessMap,_t=U&&!!v.iridescenceMap,et=U&&!!v.iridescenceThicknessMap,lt=G&&!!v.sheenColorMap,bt=G&&!!v.sheenRoughnessMap,vt=!!v.specularMap,ot=!!v.specularColorMap,Ut=!!v.specularIntensityMap,R=K&&!!v.transmissionMap,nt=K&&!!v.thicknessMap,st=!!v.gradientMap,ut=!!v.alphaMap,$=v.alphaTest>0,Q=!!v.alphaHash,pt=!!v.extensions;let Lt=Sn;v.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Lt=i.toneMapping);const te={shaderID:at,shaderType:v.type,shaderName:v.name,vertexShader:$t,fragmentShader:ne,defines:v.defines,customVertexShaderID:Qt,customFragmentShaderID:X,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Mt,batchingColor:Mt&&H._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&H.instanceColor!==null,instancingMorph:Dt&&H.morphTexture!==null,supportsVertexTextures:c,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:mi,alphaToCoverage:!!v.alphaToCoverage,map:zt,matcap:me,envMap:T,envMapMode:T&&Z.mapping,envMapCubeUVHeight:k,aoMap:ie,lightMap:Pt,bumpMap:Ct,normalMap:At,displacementMap:c&&se,emissiveMap:mt,normalMapObjectSpace:At&&v.normalMapType===lc,normalMapTangentSpace:At&&v.normalMapType===dV,metalnessMap:Bt,roughnessMap:fe,anisotropy:ce,anisotropyMap:z,clearcoat:M,clearcoatMap:xt,clearcoatNormalMap:it,clearcoatRoughnessMap:gt,dispersion:A,iridescence:U,iridescenceMap:_t,iridescenceThicknessMap:et,sheen:G,sheenColorMap:lt,sheenRoughnessMap:bt,specularMap:vt,specularColorMap:ot,specularIntensityMap:Ut,transmission:K,transmissionMap:R,thicknessMap:nt,gradientMap:st,opaque:v.transparent===!1&&v.blending===di&&v.alphaToCoverage===!1,alphaMap:ut,alphaTest:$,alphaHash:Q,combine:v.combine,mapUv:zt&&g(v.map.channel),aoMapUv:ie&&g(v.aoMap.channel),lightMapUv:Pt&&g(v.lightMap.channel),bumpMapUv:Ct&&g(v.bumpMap.channel),normalMapUv:At&&g(v.normalMap.channel),displacementMapUv:se&&g(v.displacementMap.channel),emissiveMapUv:mt&&g(v.emissiveMap.channel),metalnessMapUv:Bt&&g(v.metalnessMap.channel),roughnessMapUv:fe&&g(v.roughnessMap.channel),anisotropyMapUv:z&&g(v.anisotropyMap.channel),clearcoatMapUv:xt&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:et&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:bt&&g(v.sheenRoughnessMap.channel),specularMapUv:vt&&g(v.specularMap.channel),specularColorMapUv:ot&&g(v.specularColorMap.channel),specularIntensityMapUv:Ut&&g(v.specularIntensityMap.channel),transmissionMapUv:R&&g(v.transmissionMap.channel),thicknessMapUv:nt&&g(v.thicknessMap.channel),alphaMapUv:ut&&g(v.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(At||ce),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!W.attributes.uv&&(zt||ut),fog:!!j,useFog:v.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:dt,skinning:H.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Nt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Lt,decodeVideoTexture:zt&&v.map.isVideoTexture===!0&&Xt.getTransfer(v.map.colorSpace)===Zt,decodeVideoTextureEmissive:mt&&v.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(v.emissiveMap.colorSpace)===Zt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===cn,flipSided:v.side===Te,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:pt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pt&&v.extensions.multiDraw===!0||Mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return te.vertexUv1s=V.has(1),te.vertexUv2s=V.has(2),te.vertexUv3s=V.has(3),V.clear(),te}function d(v){const _=[];if(v.shaderID?_.push(v.shaderID):(_.push(v.customVertexShaderID),_.push(v.customFragmentShaderID)),v.defines!==void 0)for(const D in v.defines)_.push(D),_.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(E(_,v),y(_,v),_.push(i.outputColorSpace)),_.push(v.customProgramCacheKey),_.join()}function E(v,_){v.push(_.precision),v.push(_.outputColorSpace),v.push(_.envMapMode),v.push(_.envMapCubeUVHeight),v.push(_.mapUv),v.push(_.alphaMapUv),v.push(_.lightMapUv),v.push(_.aoMapUv),v.push(_.bumpMapUv),v.push(_.normalMapUv),v.push(_.displacementMapUv),v.push(_.emissiveMapUv),v.push(_.metalnessMapUv),v.push(_.roughnessMapUv),v.push(_.anisotropyMapUv),v.push(_.clearcoatMapUv),v.push(_.clearcoatNormalMapUv),v.push(_.clearcoatRoughnessMapUv),v.push(_.iridescenceMapUv),v.push(_.iridescenceThicknessMapUv),v.push(_.sheenColorMapUv),v.push(_.sheenRoughnessMapUv),v.push(_.specularMapUv),v.push(_.specularColorMapUv),v.push(_.specularIntensityMapUv),v.push(_.transmissionMapUv),v.push(_.thicknessMapUv),v.push(_.combine),v.push(_.fogExp2),v.push(_.sizeAttenuation),v.push(_.morphTargetsCount),v.push(_.morphAttributeCount),v.push(_.numDirLights),v.push(_.numPointLights),v.push(_.numSpotLights),v.push(_.numSpotLightMaps),v.push(_.numHemiLights),v.push(_.numRectAreaLights),v.push(_.numDirLightShadows),v.push(_.numPointLightShadows),v.push(_.numSpotLightShadows),v.push(_.numSpotLightShadowsWithMaps),v.push(_.numLightProbes),v.push(_.shadowMapType),v.push(_.toneMapping),v.push(_.numClippingPlanes),v.push(_.numClipIntersection),v.push(_.depthPacking)}function y(v,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),v.push(o.mask)}function x(v){const _=q[v.type];let D;if(_){const O=Ke[_];D=$c.clone(O.uniforms)}else D=v.uniforms;return D}function w(v,_){let D;for(let O=0,H=h.length;O<H;O++){const j=h[O];if(j.cacheKey===_){D=j,++D.usedTimes;break}}return D===void 0&&(D=new bp(i,_,v,r),h.push(D)),D}function b(v){if(--v.usedTimes===0){const _=h.indexOf(v);h[_]=h[h.length-1],h.pop(),v.destroy()}}function C(v){l.remove(v)}function B(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:x,acquireProgram:w,releaseProgram:b,releaseShaderCache:C,programs:h,dispose:B}}function Pp(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Up(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ko(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function zo(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,c,f,q,g,p){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:c,material:f,groupOrder:q,renderOrder:u.renderOrder,z:g,group:p},i[t]=d):(d.id=u.id,d.object=u,d.geometry=c,d.material=f,d.groupOrder=q,d.renderOrder=u.renderOrder,d.z=g,d.group=p),t++,d}function o(u,c,f,q,g,p){const d=a(u,c,f,q,g,p);f.transmission>0?n.push(d):f.transparent===!0?s.push(d):e.push(d)}function l(u,c,f,q,g,p){const d=a(u,c,f,q,g,p);f.transmission>0?n.unshift(d):f.transparent===!0?s.unshift(d):e.unshift(d)}function V(u,c){e.length>1&&e.sort(u||Up),n.length>1&&n.sort(c||ko),s.length>1&&s.sort(c||ko)}function h(){for(let u=t,c=i.length;u<c;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:V}}function Ip(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new zo,i.set(n,[a])):s>=r.length?(a=new zo,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Bp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Gt};break;case"SpotLight":e={position:new I,direction:new I,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function Fp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Np=0;function Op(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function kp(i){const t=new Bp,e=Fp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let V=0;V<9;V++)n.probe.push(new I);const s=new I,r=new le,a=new le;function o(V){let h=0,u=0,c=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,q=0,g=0,p=0,d=0,E=0,y=0,x=0,w=0,b=0,C=0;V.sort(Op);for(let v=0,_=V.length;v<_;v++){const D=V[v],O=D.color,H=D.intensity,j=D.distance,W=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=O.r*H,u+=O.g*H,c+=O.b*H;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],H);C++}else if(D.isDirectionalLight){const Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Z=D.shadow,k=e.get(D);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize=Z.mapSize,n.directionalShadow[f]=k,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=D.shadow.matrix,E++}n.directional[f]=Y,f++}else if(D.isSpotLight){const Y=t.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(O).multiplyScalar(H),Y.distance=j,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[g]=Y;const Z=D.shadow;if(D.map&&(n.spotLightMap[w]=D.map,w++,Z.updateMatrices(D),D.castShadow&&b++),n.spotLightMatrix[g]=Z.matrix,D.castShadow){const k=e.get(D);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize=Z.mapSize,n.spotShadow[g]=k,n.spotShadowMap[g]=W,x++}g++}else if(D.isRectAreaLight){const Y=t.get(D);Y.color.copy(O).multiplyScalar(H),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[p]=Y,p++}else if(D.isPointLight){const Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){const Z=D.shadow,k=e.get(D);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize=Z.mapSize,k.shadowCameraNear=Z.camera.near,k.shadowCameraFar=Z.camera.far,n.pointShadow[q]=k,n.pointShadowMap[q]=W,n.pointShadowMatrix[q]=D.shadow.matrix,y++}n.point[q]=Y,q++}else if(D.isHemisphereLight){const Y=t.get(D);Y.skyColor.copy(D.color).multiplyScalar(H),Y.groundColor.copy(D.groundColor).multiplyScalar(H),n.hemi[d]=Y,d++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=c;const B=n.hash;(B.directionalLength!==f||B.pointLength!==q||B.spotLength!==g||B.rectAreaLength!==p||B.hemiLength!==d||B.numDirectionalShadows!==E||B.numPointShadows!==y||B.numSpotShadows!==x||B.numSpotMaps!==w||B.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=p,n.point.length=q,n.hemi.length=d,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+w-b,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=C,B.directionalLength=f,B.pointLength=q,B.spotLength=g,B.rectAreaLength=p,B.hemiLength=d,B.numDirectionalShadows=E,B.numPointShadows=y,B.numSpotShadows=x,B.numSpotMaps=w,B.numLightProbes=C,n.version=Np++)}function l(V,h){let u=0,c=0,f=0,q=0,g=0;const p=h.matrixWorldInverse;for(let d=0,E=V.length;d<E;d++){const y=V[d];if(y.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),u++}else if(y.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),f++}else if(y.isRectAreaLight){const x=n.rectArea[q];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),q++}else if(y.isPointLight){const x=n.point[c];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),c++}else if(y.isHemisphereLight){const x=n.hemi[g];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:n}}function Ho(i){const t=new kp(i),e=[],n=[];function s(h){V.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const V={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:V,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function zp(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Ho(i),t.set(s,[o])):r>=a.length?(o=new Ho(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Hp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Wp(i,t,e){let n=new Ta;const s=new Yt,r=new Yt,a=new Ve,o=new uh({depthPacking:Vc}),l=new dh,V={},h=e.maxTextureSize,u={[En]:Te,[Te]:En,[cn]:cn},c=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:Hp,fragmentShader:Gp}),f=c.clone();f.defines.HORIZONTAL_PASS=1;const q=new Wn;q.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ye(q,c),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tV;let d=this.type;this.render=function(b,C,B){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const v=i.getRenderTarget(),_=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Mn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const H=d!==ln&&this.type===ln,j=d===ln&&this.type!==ln;for(let W=0,Y=b.length;W<Y;W++){const Z=b[W],k=Z.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const at=k.getFrameExtents();if(s.multiply(at),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/at.x),s.x=r.x*at.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/at.y),s.y=r.y*at.y,k.mapSize.y=r.y)),k.map===null||H===!0||j===!0){const St=this.type!==ln?{minFilter:Qe,magFilter:Qe}:{};k.map!==null&&k.map.dispose(),k.map=new Gn(s.x,s.y,St),k.map.texture.name=Z.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const ct=k.getViewportCount();for(let St=0;St<ct;St++){const Nt=k.getViewport(St);a.set(r.x*Nt.x,r.y*Nt.y,r.x*Nt.z,r.y*Nt.w),O.viewport(a),k.updateMatrices(Z,St),n=k.getFrustum(),x(C,B,k.camera,Z,this.type)}k.isPointLightShadow!==!0&&this.type===ln&&E(k,B),k.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(v,_,D)};function E(b,C){const B=t.update(g);c.defines.VSM_SAMPLES!==b.blurSamples&&(c.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,c.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Gn(s.x,s.y)),c.uniforms.shadow_pass.value=b.map.texture,c.uniforms.resolution.value=b.mapSize,c.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(C,null,B,c,g,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(C,null,B,f,g,null)}function y(b,C,B,v){let _=null;const D=B.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)_=D;else if(_=B.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=_.uuid,H=C.uuid;let j=V[O];j===void 0&&(j={},V[O]=j);let W=j[H];W===void 0&&(W=_.clone(),j[H]=W,C.addEventListener("dispose",w)),_=W}if(_.visible=C.visible,_.wireframe=C.wireframe,v===ln?_.side=C.shadowSide!==null?C.shadowSide:C.side:_.side=C.shadowSide!==null?C.shadowSide:u[C.side],_.alphaMap=C.alphaMap,_.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,_.map=C.map,_.clipShadows=C.clipShadows,_.clippingPlanes=C.clippingPlanes,_.clipIntersection=C.clipIntersection,_.displacementMap=C.displacementMap,_.displacementScale=C.displacementScale,_.displacementBias=C.displacementBias,_.wireframeLinewidth=C.wireframeLinewidth,_.linewidth=C.linewidth,B.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const O=i.properties.get(_);O.light=B}return _}function x(b,C,B,v,_){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&_===ln)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld);const H=t.update(b),j=b.material;if(Array.isArray(j)){const W=H.groups;for(let Y=0,Z=W.length;Y<Z;Y++){const k=W[Y],at=j[k.materialIndex];if(at&&at.visible){const ct=y(b,at,v,_);b.onBeforeShadow(i,b,C,B,H,ct,k),i.renderBufferDirect(B,null,H,ct,b,k),b.onAfterShadow(i,b,C,B,H,ct,k)}}}else if(j.visible){const W=y(b,j,v,_);b.onBeforeShadow(i,b,C,B,H,W,null),i.renderBufferDirect(B,null,H,W,b,null),b.onAfterShadow(i,b,C,B,H,W,null)}}const O=b.children;for(let H=0,j=O.length;H<j;H++)x(O[H],C,B,v,_)}function w(b){b.target.removeEventListener("dispose",w);for(const B in V){const v=V[B],_=b.target.uuid;_ in v&&(v[_].dispose(),delete v[_])}}}const Xp={[br]:Cr,[Rr]:Pr,[Dr]:Ur,[pi]:Lr,[Cr]:br,[Pr]:Rr,[Ur]:Dr,[Lr]:pi};function Yp(i,t){function e(){let R=!1;const nt=new Ve;let st=null;const ut=new Ve(0,0,0,0);return{setMask:function($){st!==$&&!R&&(i.colorMask($,$,$,$),st=$)},setLocked:function($){R=$},setClear:function($,Q,pt,Lt,te){te===!0&&($*=Lt,Q*=Lt,pt*=Lt),nt.set($,Q,pt,Lt),ut.equals(nt)===!1&&(i.clearColor($,Q,pt,Lt),ut.copy(nt))},reset:function(){R=!1,st=null,ut.set(-1,0,0,0)}}}function n(){let R=!1,nt=!1,st=null,ut=null,$=null;return{setReversed:function(Q){if(nt!==Q){const pt=t.get("EXT_clip_control");Q?pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.ZERO_TO_ONE_EXT):pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.NEGATIVE_ONE_TO_ONE_EXT),nt=Q;const Lt=$;$=null,this.setClear(Lt)}},getReversed:function(){return nt},setTest:function(Q){Q?J(i.DEPTH_TEST):dt(i.DEPTH_TEST)},setMask:function(Q){st!==Q&&!R&&(i.depthMask(Q),st=Q)},setFunc:function(Q){if(nt&&(Q=Xp[Q]),ut!==Q){switch(Q){case br:i.depthFunc(i.NEVER);break;case Cr:i.depthFunc(i.ALWAYS);break;case Rr:i.depthFunc(i.LESS);break;case pi:i.depthFunc(i.LEQUAL);break;case Dr:i.depthFunc(i.EQUAL);break;case Lr:i.depthFunc(i.GEQUAL);break;case Pr:i.depthFunc(i.GREATER);break;case Ur:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ut=Q}},setLocked:function(Q){R=Q},setClear:function(Q){$!==Q&&(nt&&(Q=1-Q),i.clearDepth(Q),$=Q)},reset:function(){R=!1,st=null,ut=null,$=null,nt=!1}}}function s(){let R=!1,nt=null,st=null,ut=null,$=null,Q=null,pt=null,Lt=null,te=null;return{setTest:function(jt){R||(jt?J(i.STENCIL_TEST):dt(i.STENCIL_TEST))},setMask:function(jt){nt!==jt&&!R&&(i.stencilMask(jt),nt=jt)},setFunc:function(jt,nn,je){(st!==jt||ut!==nn||$!==je)&&(i.stencilFunc(jt,nn,je),st=jt,ut=nn,$=je)},setOp:function(jt,nn,je){(Q!==jt||pt!==nn||Lt!==je)&&(i.stencilOp(jt,nn,je),Q=jt,pt=nn,Lt=je)},setLocked:function(jt){R=jt},setClear:function(jt){te!==jt&&(i.clearStencil(jt),te=jt)},reset:function(){R=!1,nt=null,st=null,ut=null,$=null,Q=null,pt=null,Lt=null,te=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,V=new WeakMap;let h={},u={},c=new WeakMap,f=[],q=null,g=!1,p=null,d=null,E=null,y=null,x=null,w=null,b=null,C=new Gt(0,0,0),B=0,v=!1,_=null,D=null,O=null,H=null,j=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,Z=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(k)[1]),Y=Z>=1):k.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),Y=Z>=2);let at=null,ct={};const St=i.getParameter(i.SCISSOR_BOX),Nt=i.getParameter(i.VIEWPORT),$t=new Ve().fromArray(St),ne=new Ve().fromArray(Nt);function Qt(R,nt,st,ut){const $=new Uint8Array(4),Q=i.createTexture();i.bindTexture(R,Q),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let pt=0;pt<st;pt++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,ut,0,i.RGBA,i.UNSIGNED_BYTE,$):i.texImage2D(nt+pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,$);return Q}const X={};X[i.TEXTURE_2D]=Qt(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=Qt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=Qt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=Qt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(pi),Ct(!1),At(za),J(i.CULL_FACE),ie(Mn);function J(R){h[R]!==!0&&(i.enable(R),h[R]=!0)}function dt(R){h[R]!==!1&&(i.disable(R),h[R]=!1)}function Dt(R,nt){return u[R]!==nt?(i.bindFramebuffer(R,nt),u[R]=nt,R===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=nt),R===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function Mt(R,nt){let st=f,ut=!1;if(R){st=c.get(nt),st===void 0&&(st=[],c.set(nt,st));const $=R.textures;if(st.length!==$.length||st[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,pt=$.length;Q<pt;Q++)st[Q]=i.COLOR_ATTACHMENT0+Q;st.length=$.length,ut=!0}}else st[0]!==i.BACK&&(st[0]=i.BACK,ut=!0);ut&&i.drawBuffers(st)}function zt(R){return q!==R?(i.useProgram(R),q=R,!0):!1}const me={[Fn]:i.FUNC_ADD,[Ul]:i.FUNC_SUBTRACT,[Il]:i.FUNC_REVERSE_SUBTRACT};me[Bl]=i.MIN,me[Fl]=i.MAX;const T={[Nl]:i.ZERO,[Ol]:i.ONE,[kl]:i.SRC_COLOR,[Tr]:i.SRC_ALPHA,[Yl]:i.SRC_ALPHA_SATURATE,[Wl]:i.DST_COLOR,[Hl]:i.DST_ALPHA,[zl]:i.ONE_MINUS_SRC_COLOR,[wr]:i.ONE_MINUS_SRC_ALPHA,[Xl]:i.ONE_MINUS_DST_COLOR,[Gl]:i.ONE_MINUS_DST_ALPHA,[Ql]:i.CONSTANT_COLOR,[jl]:i.ONE_MINUS_CONSTANT_COLOR,[Kl]:i.CONSTANT_ALPHA,[Zl]:i.ONE_MINUS_CONSTANT_ALPHA};function ie(R,nt,st,ut,$,Q,pt,Lt,te,jt){if(R===Mn){g===!0&&(dt(i.BLEND),g=!1);return}if(g===!1&&(J(i.BLEND),g=!0),R!==Pl){if(R!==p||jt!==v){if((d!==Fn||x!==Fn)&&(i.blendEquation(i.FUNC_ADD),d=Fn,x=Fn),jt)switch(R){case di:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ha:i.blendFunc(i.ONE,i.ONE);break;case Ga:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case di:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ha:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ga:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}E=null,y=null,w=null,b=null,C.set(0,0,0),B=0,p=R,v=jt}return}$=$||nt,Q=Q||st,pt=pt||ut,(nt!==d||$!==x)&&(i.blendEquationSeparate(me[nt],me[$]),d=nt,x=$),(st!==E||ut!==y||Q!==w||pt!==b)&&(i.blendFuncSeparate(T[st],T[ut],T[Q],T[pt]),E=st,y=ut,w=Q,b=pt),(Lt.equals(C)===!1||te!==B)&&(i.blendColor(Lt.r,Lt.g,Lt.b,te),C.copy(Lt),B=te),p=R,v=!1}function Pt(R,nt){R.side===cn?dt(i.CULL_FACE):J(i.CULL_FACE);let st=R.side===Te;nt&&(st=!st),Ct(st),R.blending===di&&R.transparent===!1?ie(Mn):ie(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);const ut=R.stencilWrite;o.setTest(ut),ut&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),mt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(R){_!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),_=R)}function At(R){R!==Dl?(J(i.CULL_FACE),R!==D&&(R===za?i.cullFace(i.BACK):R===Ll?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):dt(i.CULL_FACE),D=R}function se(R){R!==O&&(Y&&i.lineWidth(R),O=R)}function mt(R,nt,st){R?(J(i.POLYGON_OFFSET_FILL),(H!==nt||j!==st)&&(i.polygonOffset(nt,st),H=nt,j=st)):dt(i.POLYGON_OFFSET_FILL)}function Bt(R){R?J(i.SCISSOR_TEST):dt(i.SCISSOR_TEST)}function fe(R){R===void 0&&(R=i.TEXTURE0+W-1),at!==R&&(i.activeTexture(R),at=R)}function ce(R,nt,st){st===void 0&&(at===null?st=i.TEXTURE0+W-1:st=at);let ut=ct[st];ut===void 0&&(ut={type:void 0,texture:void 0},ct[st]=ut),(ut.type!==R||ut.texture!==nt)&&(at!==st&&(i.activeTexture(st),at=st),i.bindTexture(R,nt||X[R]),ut.type=R,ut.texture=nt)}function M(){const R=ct[at];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function A(){try{i.compressedTexImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function U(){try{i.compressedTexImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function G(){try{i.texSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function K(){try{i.texSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function z(){try{i.compressedTexSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function xt(){try{i.compressedTexSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function it(){try{i.texStorage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function gt(){try{i.texStorage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function _t(){try{i.texImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function et(){try{i.texImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function lt(R){$t.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),$t.copy(R))}function bt(R){ne.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),ne.copy(R))}function vt(R,nt){let st=V.get(nt);st===void 0&&(st=new WeakMap,V.set(nt,st));let ut=st.get(R);ut===void 0&&(ut=i.getUniformBlockIndex(nt,R.name),st.set(R,ut))}function ot(R,nt){const ut=V.get(nt).get(R);l.get(nt)!==ut&&(i.uniformBlockBinding(nt,ut,R.__bindingPointIndex),l.set(nt,ut))}function Ut(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},at=null,ct={},u={},c=new WeakMap,f=[],q=null,g=!1,p=null,d=null,E=null,y=null,x=null,w=null,b=null,C=new Gt(0,0,0),B=0,v=!1,_=null,D=null,O=null,H=null,j=null,$t.set(0,0,i.canvas.width,i.canvas.height),ne.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:dt,bindFramebuffer:Dt,drawBuffers:Mt,useProgram:zt,setBlending:ie,setMaterial:Pt,setFlipSided:Ct,setCullFace:At,setLineWidth:se,setPolygonOffset:mt,setScissorTest:Bt,activeTexture:fe,bindTexture:ce,unbindTexture:M,compressedTexImage2D:A,compressedTexImage3D:U,texImage2D:_t,texImage3D:et,updateUBOMapping:vt,uniformBlockBinding:ot,texStorage2D:it,texStorage3D:gt,texSubImage2D:G,texSubImage3D:K,compressedTexSubImage2D:z,compressedTexSubImage3D:xt,scissor:lt,viewport:bt,reset:Ut}}function Qp(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),V=new Yt,h=new WeakMap;let u;const c=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function q(M,A){return f?new OffscreenCanvas(M,A):Ps("canvas")}function g(M,A,U){let G=1;const K=ce(M);if((K.width>U||K.height>U)&&(G=U/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const z=Math.floor(G*K.width),xt=Math.floor(G*K.height);u===void 0&&(u=q(z,xt));const it=A?q(z,xt):u;return it.width=z,it.height=xt,it.getContext("2d").drawImage(M,0,0,z,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+z+"x"+xt+")."),it}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),M;return M}function p(M){return M.generateMipmaps}function d(M){i.generateMipmap(M)}function E(M){return M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?i.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(M,A,U,G,K=!1){if(M!==null){if(i[M]!==void 0)return i[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let z=A;if(A===i.RED&&(U===i.FLOAT&&(z=i.R32F),U===i.HALF_FLOAT&&(z=i.R16F),U===i.UNSIGNED_BYTE&&(z=i.R8)),A===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(z=i.R8UI),U===i.UNSIGNED_SHORT&&(z=i.R16UI),U===i.UNSIGNED_INT&&(z=i.R32UI),U===i.BYTE&&(z=i.R8I),U===i.SHORT&&(z=i.R16I),U===i.INT&&(z=i.R32I)),A===i.RG&&(U===i.FLOAT&&(z=i.RG32F),U===i.HALF_FLOAT&&(z=i.RG16F),U===i.UNSIGNED_BYTE&&(z=i.RG8)),A===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(z=i.RG8UI),U===i.UNSIGNED_SHORT&&(z=i.RG16UI),U===i.UNSIGNED_INT&&(z=i.RG32UI),U===i.BYTE&&(z=i.RG8I),U===i.SHORT&&(z=i.RG16I),U===i.INT&&(z=i.RG32I)),A===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(z=i.RGB8UI),U===i.UNSIGNED_SHORT&&(z=i.RGB16UI),U===i.UNSIGNED_INT&&(z=i.RGB32UI),U===i.BYTE&&(z=i.RGB8I),U===i.SHORT&&(z=i.RGB16I),U===i.INT&&(z=i.RGB32I)),A===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(z=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(z=i.RGBA16UI),U===i.UNSIGNED_INT&&(z=i.RGBA32UI),U===i.BYTE&&(z=i.RGBA8I),U===i.SHORT&&(z=i.RGBA16I),U===i.INT&&(z=i.RGBA32I)),A===i.RGB&&(U===i.UNSIGNED_INT_5_9_9_9_REV&&(z=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(z=i.R11F_G11F_B10F)),A===i.RGBA){const xt=K?Ds:Xt.getTransfer(G);U===i.FLOAT&&(z=i.RGBA32F),U===i.HALF_FLOAT&&(z=i.RGBA16F),U===i.UNSIGNED_BYTE&&(z=xt===Zt?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT_4_4_4_4&&(z=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(z=i.RGB5_A1)}return(z===i.R16F||z===i.R32F||z===i.RG16F||z===i.RG32F||z===i.RGBA16F||z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),z}function x(M,A){let U;return M?A===null||A===Hn||A===Ni?U=i.DEPTH24_STENCIL8:A===hn?U=i.DEPTH32F_STENCIL8:A===Fi&&(U=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Hn||A===Ni?U=i.DEPTH_COMPONENT24:A===hn?U=i.DEPTH_COMPONENT32F:A===Fi&&(U=i.DEPTH_COMPONENT16),U}function w(M,A){return p(M)===!0||M.isFramebufferTexture&&M.minFilter!==Qe&&M.minFilter!==Ze?Math.log2(Math.max(A.width,A.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?A.mipmaps.length:1}function b(M){const A=M.target;A.removeEventListener("dispose",b),B(A),A.isVideoTexture&&h.delete(A)}function C(M){const A=M.target;A.removeEventListener("dispose",C),_(A)}function B(M){const A=n.get(M);if(A.__webglInit===void 0)return;const U=M.source,G=c.get(U);if(G){const K=G[A.__cacheKey];K.usedTimes--,K.usedTimes===0&&v(M),Object.keys(G).length===0&&c.delete(U)}n.remove(M)}function v(M){const A=n.get(M);i.deleteTexture(A.__webglTexture);const U=M.source,G=c.get(U);delete G[A.__cacheKey],a.memory.textures--}function _(M){const A=n.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),n.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(A.__webglFramebuffer[G]))for(let K=0;K<A.__webglFramebuffer[G].length;K++)i.deleteFramebuffer(A.__webglFramebuffer[G][K]);else i.deleteFramebuffer(A.__webglFramebuffer[G]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[G])}else{if(Array.isArray(A.__webglFramebuffer))for(let G=0;G<A.__webglFramebuffer.length;G++)i.deleteFramebuffer(A.__webglFramebuffer[G]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let G=0;G<A.__webglColorRenderbuffer.length;G++)A.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[G]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const U=M.textures;for(let G=0,K=U.length;G<K;G++){const z=n.get(U[G]);z.__webglTexture&&(i.deleteTexture(z.__webglTexture),a.memory.textures--),n.remove(U[G])}n.remove(M)}let D=0;function O(){D=0}function H(){const M=D;return M>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),D+=1,M}function j(M){const A=[];return A.push(M.wrapS),A.push(M.wrapT),A.push(M.wrapR||0),A.push(M.magFilter),A.push(M.minFilter),A.push(M.anisotropy),A.push(M.internalFormat),A.push(M.format),A.push(M.type),A.push(M.generateMipmaps),A.push(M.premultiplyAlpha),A.push(M.flipY),A.push(M.unpackAlignment),A.push(M.colorSpace),A.join()}function W(M,A){const U=n.get(M);if(M.isVideoTexture&&Bt(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&U.__version!==M.version){const G=M.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(U,M,A);return}}else M.isExternalTexture&&(U.__webglTexture=M.sourceTexture?M.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+A)}function Y(M,A){const U=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){X(U,M,A);return}e.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+A)}function Z(M,A){const U=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){X(U,M,A);return}e.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+A)}function k(M,A){const U=n.get(M);if(M.version>0&&U.__version!==M.version){J(U,M,A);return}e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+A)}const at={[Rs]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[Fr]:i.MIRRORED_REPEAT},ct={[Qe]:i.NEAREST,[ac]:i.NEAREST_MIPMAP_NEAREST,[$i]:i.NEAREST_MIPMAP_LINEAR,[Ze]:i.LINEAR,[Gs]:i.LINEAR_MIPMAP_NEAREST,[kn]:i.LINEAR_MIPMAP_LINEAR},St={[cc]:i.NEVER,[qc]:i.ALWAYS,[hc]:i.LESS,[fV]:i.LEQUAL,[uc]:i.EQUAL,[pc]:i.GEQUAL,[dc]:i.GREATER,[fc]:i.NOTEQUAL};function Nt(M,A){if(A.type===hn&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===Ze||A.magFilter===Gs||A.magFilter===$i||A.magFilter===kn||A.minFilter===Ze||A.minFilter===Gs||A.minFilter===$i||A.minFilter===kn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,at[A.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,at[A.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,at[A.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,ct[A.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,ct[A.minFilter]),A.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,St[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Qe||A.minFilter!==$i&&A.minFilter!==kn||A.type===hn&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const U=t.get("EXT_texture_filter_anisotropic");i.texParameterf(M,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function $t(M,A){let U=!1;M.__webglInit===void 0&&(M.__webglInit=!0,A.addEventListener("dispose",b));const G=A.source;let K=c.get(G);K===void 0&&(K={},c.set(G,K));const z=j(A);if(z!==M.__cacheKey){K[z]===void 0&&(K[z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),K[z].usedTimes++;const xt=K[M.__cacheKey];xt!==void 0&&(K[M.__cacheKey].usedTimes--,xt.usedTimes===0&&v(A)),M.__cacheKey=z,M.__webglTexture=K[z].texture}return U}function ne(M,A,U){return Math.floor(Math.floor(M/U)/A)}function Qt(M,A,U,G){const z=M.updateRanges;if(z.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,A.width,A.height,U,G,A.data);else{z.sort((et,lt)=>et.start-lt.start);let xt=0;for(let et=1;et<z.length;et++){const lt=z[xt],bt=z[et],vt=lt.start+lt.count,ot=ne(bt.start,A.width,4),Ut=ne(lt.start,A.width,4);bt.start<=vt+1&&ot===Ut&&ne(bt.start+bt.count-1,A.width,4)===ot?lt.count=Math.max(lt.count,bt.start+bt.count-lt.start):(++xt,z[xt]=bt)}z.length=xt+1;const it=i.getParameter(i.UNPACK_ROW_LENGTH),gt=i.getParameter(i.UNPACK_SKIP_PIXELS),_t=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,A.width);for(let et=0,lt=z.length;et<lt;et++){const bt=z[et],vt=Math.floor(bt.start/4),ot=Math.ceil(bt.count/4),Ut=vt%A.width,R=Math.floor(vt/A.width),nt=ot,st=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ut),i.pixelStorei(i.UNPACK_SKIP_ROWS,R),e.texSubImage2D(i.TEXTURE_2D,0,Ut,R,nt,st,U,G,A.data)}M.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,it),i.pixelStorei(i.UNPACK_SKIP_PIXELS,gt),i.pixelStorei(i.UNPACK_SKIP_ROWS,_t)}}function X(M,A,U){let G=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(G=i.TEXTURE_3D);const K=$t(M,A),z=A.source;e.bindTexture(G,M.__webglTexture,i.TEXTURE0+U);const xt=n.get(z);if(z.version!==xt.__version||K===!0){e.activeTexture(i.TEXTURE0+U);const it=Xt.getPrimaries(Xt.workingColorSpace),gt=A.colorSpace===xn?null:Xt.getPrimaries(A.colorSpace),_t=A.colorSpace===xn||it===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let et=g(A.image,!1,s.maxTextureSize);et=fe(A,et);const lt=r.convert(A.format,A.colorSpace),bt=r.convert(A.type);let vt=y(A.internalFormat,lt,bt,A.colorSpace,A.isVideoTexture);Nt(G,A);let ot;const Ut=A.mipmaps,R=A.isVideoTexture!==!0,nt=xt.__version===void 0||K===!0,st=z.dataReady,ut=w(A,et);if(A.isDepthTexture)vt=x(A.format===ki,A.type),nt&&(R?e.texStorage2D(i.TEXTURE_2D,1,vt,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,vt,et.width,et.height,0,lt,bt,null));else if(A.isDataTexture)if(Ut.length>0){R&&nt&&e.texStorage2D(i.TEXTURE_2D,ut,vt,Ut[0].width,Ut[0].height);for(let $=0,Q=Ut.length;$<Q;$++)ot=Ut[$],R?st&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,ot.width,ot.height,lt,bt,ot.data):e.texImage2D(i.TEXTURE_2D,$,vt,ot.width,ot.height,0,lt,bt,ot.data);A.generateMipmaps=!1}else R?(nt&&e.texStorage2D(i.TEXTURE_2D,ut,vt,et.width,et.height),st&&Qt(A,et,lt,bt)):e.texImage2D(i.TEXTURE_2D,0,vt,et.width,et.height,0,lt,bt,et.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){R&&nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,vt,Ut[0].width,Ut[0].height,et.depth);for(let $=0,Q=Ut.length;$<Q;$++)if(ot=Ut[$],A.format!==Xe)if(lt!==null)if(R){if(st)if(A.layerUpdates.size>0){const pt=go(ot.width,ot.height,A.format,A.type);for(const Lt of A.layerUpdates){const te=ot.data.subarray(Lt*pt/ot.data.BYTES_PER_ELEMENT,(Lt+1)*pt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,Lt,ot.width,ot.height,1,lt,te)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ot.width,ot.height,et.depth,lt,ot.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,vt,ot.width,ot.height,et.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?st&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ot.width,ot.height,et.depth,lt,bt,ot.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,vt,ot.width,ot.height,et.depth,0,lt,bt,ot.data)}else{R&&nt&&e.texStorage2D(i.TEXTURE_2D,ut,vt,Ut[0].width,Ut[0].height);for(let $=0,Q=Ut.length;$<Q;$++)ot=Ut[$],A.format!==Xe?lt!==null?R?st&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ot.width,ot.height,lt,ot.data):e.compressedTexImage2D(i.TEXTURE_2D,$,vt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?st&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,ot.width,ot.height,lt,bt,ot.data):e.texImage2D(i.TEXTURE_2D,$,vt,ot.width,ot.height,0,lt,bt,ot.data)}else if(A.isDataArrayTexture)if(R){if(nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,vt,et.width,et.height,et.depth),st)if(A.layerUpdates.size>0){const $=go(et.width,et.height,A.format,A.type);for(const Q of A.layerUpdates){const pt=et.data.subarray(Q*$/et.data.BYTES_PER_ELEMENT,(Q+1)*$/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,et.width,et.height,1,lt,bt,pt)}A.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,lt,bt,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,vt,et.width,et.height,et.depth,0,lt,bt,et.data);else if(A.isData3DTexture)R?(nt&&e.texStorage3D(i.TEXTURE_3D,ut,vt,et.width,et.height,et.depth),st&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,lt,bt,et.data)):e.texImage3D(i.TEXTURE_3D,0,vt,et.width,et.height,et.depth,0,lt,bt,et.data);else if(A.isFramebufferTexture){if(nt)if(R)e.texStorage2D(i.TEXTURE_2D,ut,vt,et.width,et.height);else{let $=et.width,Q=et.height;for(let pt=0;pt<ut;pt++)e.texImage2D(i.TEXTURE_2D,pt,vt,$,Q,0,lt,bt,null),$>>=1,Q>>=1}}else if(Ut.length>0){if(R&&nt){const $=ce(Ut[0]);e.texStorage2D(i.TEXTURE_2D,ut,vt,$.width,$.height)}for(let $=0,Q=Ut.length;$<Q;$++)ot=Ut[$],R?st&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,lt,bt,ot):e.texImage2D(i.TEXTURE_2D,$,vt,lt,bt,ot);A.generateMipmaps=!1}else if(R){if(nt){const $=ce(et);e.texStorage2D(i.TEXTURE_2D,ut,vt,$.width,$.height)}st&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,bt,et)}else e.texImage2D(i.TEXTURE_2D,0,vt,lt,bt,et);p(A)&&d(G),xt.__version=z.version,A.onUpdate&&A.onUpdate(A)}M.__version=A.version}function J(M,A,U){if(A.image.length!==6)return;const G=$t(M,A),K=A.source;e.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+U);const z=n.get(K);if(K.version!==z.__version||G===!0){e.activeTexture(i.TEXTURE0+U);const xt=Xt.getPrimaries(Xt.workingColorSpace),it=A.colorSpace===xn?null:Xt.getPrimaries(A.colorSpace),gt=A.colorSpace===xn||xt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const _t=A.isCompressedTexture||A.image[0].isCompressedTexture,et=A.image[0]&&A.image[0].isDataTexture,lt=[];for(let Q=0;Q<6;Q++)!_t&&!et?lt[Q]=g(A.image[Q],!0,s.maxCubemapSize):lt[Q]=et?A.image[Q].image:A.image[Q],lt[Q]=fe(A,lt[Q]);const bt=lt[0],vt=r.convert(A.format,A.colorSpace),ot=r.convert(A.type),Ut=y(A.internalFormat,vt,ot,A.colorSpace),R=A.isVideoTexture!==!0,nt=z.__version===void 0||G===!0,st=K.dataReady;let ut=w(A,bt);Nt(i.TEXTURE_CUBE_MAP,A);let $;if(_t){R&&nt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Ut,bt.width,bt.height);for(let Q=0;Q<6;Q++){$=lt[Q].mipmaps;for(let pt=0;pt<$.length;pt++){const Lt=$[pt];A.format!==Xe?vt!==null?R?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,0,0,Lt.width,Lt.height,vt,Lt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,Ut,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,0,0,Lt.width,Lt.height,vt,ot,Lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt,Ut,Lt.width,Lt.height,0,vt,ot,Lt.data)}}}else{if($=A.mipmaps,R&&nt){$.length>0&&ut++;const Q=ce(lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Ut,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(et){R?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,lt[Q].width,lt[Q].height,vt,ot,lt[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ut,lt[Q].width,lt[Q].height,0,vt,ot,lt[Q].data);for(let pt=0;pt<$.length;pt++){const te=$[pt].image[Q].image;R?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,0,0,te.width,te.height,vt,ot,te.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,Ut,te.width,te.height,0,vt,ot,te.data)}}else{R?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,vt,ot,lt[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ut,vt,ot,lt[Q]);for(let pt=0;pt<$.length;pt++){const Lt=$[pt];R?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,0,0,vt,ot,Lt.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pt+1,Ut,vt,ot,Lt.image[Q])}}}p(A)&&d(i.TEXTURE_CUBE_MAP),z.__version=K.version,A.onUpdate&&A.onUpdate(A)}M.__version=A.version}function dt(M,A,U,G,K,z){const xt=r.convert(U.format,U.colorSpace),it=r.convert(U.type),gt=y(U.internalFormat,xt,it,U.colorSpace),_t=n.get(A),et=n.get(U);if(et.__renderTarget=A,!_t.__hasExternalTextures){const lt=Math.max(1,A.width>>z),bt=Math.max(1,A.height>>z);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,z,gt,lt,bt,A.depth,0,xt,it,null):e.texImage2D(K,z,gt,lt,bt,0,xt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,M),mt(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,K,et.__webglTexture,0,se(A)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,K,et.__webglTexture,z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(M,A,U){if(i.bindRenderbuffer(i.RENDERBUFFER,M),A.depthBuffer){const G=A.depthTexture,K=G&&G.isDepthTexture?G.type:null,z=x(A.stencilBuffer,K),xt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=se(A);mt(A)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,z,A.width,A.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,z,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,z,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xt,i.RENDERBUFFER,M)}else{const G=A.textures;for(let K=0;K<G.length;K++){const z=G[K],xt=r.convert(z.format,z.colorSpace),it=r.convert(z.type),gt=y(z.internalFormat,xt,it,z.colorSpace),_t=se(A);U&&mt(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,_t,gt,A.width,A.height):mt(A)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_t,gt,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,gt,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Mt(M,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,M),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=n.get(A.depthTexture);G.__renderTarget=A,(!G.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),W(A.depthTexture,0);const K=G.__webglTexture,z=se(A);if(A.depthTexture.format===Oi)mt(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(A.depthTexture.format===ki)mt(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function zt(M){const A=n.get(M),U=M.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==M.depthTexture){const G=M.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),G){const K=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),A.__depthDisposeCallback=K}A.__boundDepthTexture=G}if(M.depthTexture&&!A.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const G=M.texture.mipmaps;G&&G.length>0?Mt(A.__webglFramebuffer[0],M):Mt(A.__webglFramebuffer,M)}else if(U){A.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[G]),A.__webglDepthbuffer[G]===void 0)A.__webglDepthbuffer[G]=i.createRenderbuffer(),Dt(A.__webglDepthbuffer[G],M,!1);else{const K=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=A.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,z)}}else{const G=M.texture.mipmaps;if(G&&G.length>0?e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),Dt(A.__webglDepthbuffer,M,!1);else{const K=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,z)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function me(M,A,U){const G=n.get(M);A!==void 0&&dt(G.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&zt(M)}function T(M){const A=M.texture,U=n.get(M),G=n.get(A);M.addEventListener("dispose",C);const K=M.textures,z=M.isWebGLCubeRenderTarget===!0,xt=K.length>1;if(xt||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=A.version,a.memory.textures++),z){U.__webglFramebuffer=[];for(let it=0;it<6;it++)if(A.mipmaps&&A.mipmaps.length>0){U.__webglFramebuffer[it]=[];for(let gt=0;gt<A.mipmaps.length;gt++)U.__webglFramebuffer[it][gt]=i.createFramebuffer()}else U.__webglFramebuffer[it]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){U.__webglFramebuffer=[];for(let it=0;it<A.mipmaps.length;it++)U.__webglFramebuffer[it]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(xt)for(let it=0,gt=K.length;it<gt;it++){const _t=n.get(K[it]);_t.__webglTexture===void 0&&(_t.__webglTexture=i.createTexture(),a.memory.textures++)}if(M.samples>0&&mt(M)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let it=0;it<K.length;it++){const gt=K[it];U.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[it]);const _t=r.convert(gt.format,gt.colorSpace),et=r.convert(gt.type),lt=y(gt.internalFormat,_t,et,gt.colorSpace,M.isXRRenderTarget===!0),bt=se(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,lt,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,U.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(U.__webglDepthRenderbuffer,M,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),Nt(i.TEXTURE_CUBE_MAP,A);for(let it=0;it<6;it++)if(A.mipmaps&&A.mipmaps.length>0)for(let gt=0;gt<A.mipmaps.length;gt++)dt(U.__webglFramebuffer[it][gt],M,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,gt);else dt(U.__webglFramebuffer[it],M,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(A)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let it=0,gt=K.length;it<gt;it++){const _t=K[it],et=n.get(_t);let lt=i.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(lt=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,et.__webglTexture),Nt(lt,_t),dt(U.__webglFramebuffer,M,_t,i.COLOR_ATTACHMENT0+it,lt,0),p(_t)&&d(lt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(it=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,G.__webglTexture),Nt(it,A),A.mipmaps&&A.mipmaps.length>0)for(let gt=0;gt<A.mipmaps.length;gt++)dt(U.__webglFramebuffer[gt],M,A,i.COLOR_ATTACHMENT0,it,gt);else dt(U.__webglFramebuffer,M,A,i.COLOR_ATTACHMENT0,it,0);p(A)&&d(it),e.unbindTexture()}M.depthBuffer&&zt(M)}function ie(M){const A=M.textures;for(let U=0,G=A.length;U<G;U++){const K=A[U];if(p(K)){const z=E(M),xt=n.get(K).__webglTexture;e.bindTexture(z,xt),d(z),e.unbindTexture()}}}const Pt=[],Ct=[];function At(M){if(M.samples>0){if(mt(M)===!1){const A=M.textures,U=M.width,G=M.height;let K=i.COLOR_BUFFER_BIT;const z=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(M),it=A.length>1;if(it)for(let _t=0;_t<A.length;_t++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer);const gt=M.texture.mipmaps;gt&&gt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let _t=0;_t<A.length;_t++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[_t]);const et=n.get(A[_t]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,et,0)}i.blitFramebuffer(0,0,U,G,0,0,U,G,K,i.NEAREST),l===!0&&(Pt.length=0,Ct.length=0,Pt.push(i.COLOR_ATTACHMENT0+_t),M.depthBuffer&&M.resolveDepthBuffer===!1&&(Pt.push(z),Ct.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ct)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Pt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let _t=0;_t<A.length;_t++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,xt.__webglColorRenderbuffer[_t]);const et=n.get(A[_t]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const A=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function se(M){return Math.min(s.maxSamples,M.samples)}function mt(M){const A=n.get(M);return M.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Bt(M){const A=a.render.frame;h.get(M)!==A&&(h.set(M,A),M.update())}function fe(M,A){const U=M.colorSpace,G=M.format,K=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||U!==mi&&U!==xn&&(Xt.getTransfer(U)===Zt?(G!==Xe||K!==tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),A}function ce(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(V.width=M.naturalWidth||M.width,V.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(V.width=M.displayWidth,V.height=M.displayHeight):(V.width=M.width,V.height=M.height),V}this.allocateTextureUnit=H,this.resetTextureUnits=O,this.setTexture2D=W,this.setTexture2DArray=Y,this.setTexture3D=Z,this.setTextureCube=k,this.rebindTextures=me,this.setupRenderTarget=T,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=mt}function jp(i,t){function e(n,s=xn){let r;const a=Xt.getTransfer(s);if(n===tn)return i.UNSIGNED_BYTE;if(n===ma)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ga)return i.UNSIGNED_SHORT_5_5_5_1;if(n===oV)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===VV)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rV)return i.BYTE;if(n===aV)return i.SHORT;if(n===Fi)return i.UNSIGNED_SHORT;if(n===Aa)return i.INT;if(n===Hn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===Gi)return i.HALF_FLOAT;if(n===lV)return i.ALPHA;if(n===cV)return i.RGB;if(n===Xe)return i.RGBA;if(n===Oi)return i.DEPTH_COMPONENT;if(n===ki)return i.DEPTH_STENCIL;if(n===hV)return i.RED;if(n===_a)return i.RED_INTEGER;if(n===uV)return i.RG;if(n===va)return i.RG_INTEGER;if(n===xa)return i.RGBA_INTEGER;if(n===Es||n===ys||n===Ts||n===ws)if(a===Zt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Es)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ts)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Es)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ys)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ts)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ws)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Nr||n===Or||n===kr||n===zr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Nr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Or)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===kr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Hr||n===Gr||n===Wr)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Hr||n===Gr)return a===Zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xr||n===Yr||n===Qr||n===jr||n===Kr||n===Zr||n===Jr||n===$r||n===ta||n===ea||n===na||n===ia||n===sa||n===ra)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Yr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===jr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Kr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Zr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Jr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$r)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ta)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ea)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===na)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ia)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sa)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ra)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===aa||n===oa||n===Va)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===aa)return a===Zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===oa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===la||n===ca||n===ha||n===ua)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===la)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ca)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ha)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ua)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ni?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Kp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Jp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new yV(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new yn({vertexShader:Kp,fragmentShader:Zp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ye(new Yi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $p extends _i{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,V=null,h=null,u=null,c=null,f=null,q=null;const g=typeof XRWebGLBinding<"u",p=new Jp,d={},E=e.getContextAttributes();let y=null,x=null;const w=[],b=[],C=new Yt;let B=null;const v=new Oe;v.viewport=new Ve;const _=new Oe;_.viewport=new Ve;const D=[v,_],O=new Ah;let H=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=w[X];return J===void 0&&(J=new hr,w[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=w[X];return J===void 0&&(J=new hr,w[X]=J),J.getGripSpace()},this.getHand=function(X){let J=w[X];return J===void 0&&(J=new hr,w[X]=J),J.getHandSpace()};function W(X){const J=b.indexOf(X.inputSource);if(J===-1)return;const dt=w[J];dt!==void 0&&(dt.update(X.inputSource,X.frame,V||a),dt.dispatchEvent({type:X.type,data:X.inputSource}))}function Y(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",Z);for(let X=0;X<w.length;X++){const J=b[X];J!==null&&(b[X]=null,w[X].disconnect(J))}H=null,j=null,p.reset();for(const X in d)delete d[X];t.setRenderTarget(y),f=null,c=null,u=null,s=null,x=null,Qt.stop(),n.isPresenting=!1,t.setPixelRatio(B),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return V||a},this.setReferenceSpace=function(X){V=X},this.getBaseLayer=function(){return c!==null?c:f},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return q},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",Z),E.xrCompatible!==!0&&await e.makeXRCompatible(),B=t.getPixelRatio(),t.getSize(C),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let dt=null,Dt=null,Mt=null;E.depth&&(Mt=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=E.stencil?ki:Oi,Dt=E.stencil?Ni:Hn);const zt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};u=this.getBinding(),c=u.createProjectionLayer(zt),s.updateRenderState({layers:[c]}),t.setPixelRatio(1),t.setSize(c.textureWidth,c.textureHeight,!1),x=new Gn(c.textureWidth,c.textureHeight,{format:Xe,type:tn,depthTexture:new EV(c.textureWidth,c.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:c.ignoreDepthValues===!1,resolveStencilBuffer:c.ignoreDepthValues===!1})}else{const dt={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,dt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Gn(f.framebufferWidth,f.framebufferHeight,{format:Xe,type:tn,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),V=null,a=await s.requestReferenceSpace(o),Qt.setContext(s),Qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Z(X){for(let J=0;J<X.removed.length;J++){const dt=X.removed[J],Dt=b.indexOf(dt);Dt>=0&&(b[Dt]=null,w[Dt].disconnect(dt))}for(let J=0;J<X.added.length;J++){const dt=X.added[J];let Dt=b.indexOf(dt);if(Dt===-1){for(let zt=0;zt<w.length;zt++)if(zt>=b.length){b.push(dt),Dt=zt;break}else if(b[zt]===null){b[zt]=dt,Dt=zt;break}if(Dt===-1)break}const Mt=w[Dt];Mt&&Mt.connect(dt)}}const k=new I,at=new I;function ct(X,J,dt){k.setFromMatrixPosition(J.matrixWorld),at.setFromMatrixPosition(dt.matrixWorld);const Dt=k.distanceTo(at),Mt=J.projectionMatrix.elements,zt=dt.projectionMatrix.elements,me=Mt[14]/(Mt[10]-1),T=Mt[14]/(Mt[10]+1),ie=(Mt[9]+1)/Mt[5],Pt=(Mt[9]-1)/Mt[5],Ct=(Mt[8]-1)/Mt[0],At=(zt[8]+1)/zt[0],se=me*Ct,mt=me*At,Bt=Dt/(-Ct+At),fe=Bt*-Ct;if(J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(fe),X.translateZ(Bt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Mt[10]===-1)X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const ce=me+Bt,M=T+Bt,A=se-fe,U=mt+(Dt-fe),G=ie*T/M*ce,K=Pt*T/M*ce;X.projectionMatrix.makePerspective(A,U,G,K,ce,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function St(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let J=X.near,dt=X.far;p.texture!==null&&(p.depthNear>0&&(J=p.depthNear),p.depthFar>0&&(dt=p.depthFar)),O.near=_.near=v.near=J,O.far=_.far=v.far=dt,(H!==O.near||j!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,j=O.far),O.layers.mask=X.layers.mask|6,v.layers.mask=O.layers.mask&3,_.layers.mask=O.layers.mask&5;const Dt=X.parent,Mt=O.cameras;St(O,Dt);for(let zt=0;zt<Mt.length;zt++)St(Mt[zt],Dt);Mt.length===2?ct(O,v,_):O.projectionMatrix.copy(v.projectionMatrix),Nt(X,O,Dt)};function Nt(X,J,dt){dt===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(dt.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=zi*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(c===null&&f===null))return l},this.setFoveation=function(X){l=X,c!==null&&(c.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(O)},this.getCameraTexture=function(X){return d[X]};let $t=null;function ne(X,J){if(h=J.getViewerPose(V||a),q=J,h!==null){const dt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let Dt=!1;dt.length!==O.cameras.length&&(O.cameras.length=0,Dt=!0);for(let T=0;T<dt.length;T++){const ie=dt[T];let Pt=null;if(f!==null)Pt=f.getViewport(ie);else{const At=u.getViewSubImage(c,ie);Pt=At.viewport,T===0&&(t.setRenderTargetTextures(x,At.colorTexture,At.depthStencilTexture),t.setRenderTarget(x))}let Ct=D[T];Ct===void 0&&(Ct=new Oe,Ct.layers.enable(T),Ct.viewport=new Ve,D[T]=Ct),Ct.matrix.fromArray(ie.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(ie.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(Pt.x,Pt.y,Pt.width,Pt.height),T===0&&(O.matrix.copy(Ct.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Dt===!0&&O.cameras.push(Ct)}const Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const T=u.getDepthInformation(dt[0]);T&&T.isValid&&T.texture&&p.init(T,s.renderState)}if(Mt&&Mt.includes("camera-access")&&g){t.state.unbindTexture(),u=n.getBinding();for(let T=0;T<dt.length;T++){const ie=dt[T].camera;if(ie){let Pt=d[ie];Pt||(Pt=new yV,d[ie]=Pt);const Ct=u.getCameraImage(ie);Pt.sourceTexture=Ct}}}}for(let dt=0;dt<w.length;dt++){const Dt=b[dt],Mt=w[dt];Dt!==null&&Mt!==void 0&&Mt.update(Dt,J,V||a)}$t&&$t(X,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),q=null}const Qt=new bV;Qt.setAnimationLoop(ne),this.setAnimationLoop=function(X){$t=X},this.dispose=function(){}}}const Pn=new en,tq=new le;function eq(i,t){function e(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,xV(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,E,y,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),c(p,d),d.isMeshPhysicalMaterial&&f(p,d,x)):d.isMeshMatcapMaterial?(r(p,d),q(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),g(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?l(p,d,E,y):d.isSpriteMaterial?V(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,e(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Te&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,e(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Te&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,e(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,e(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const E=t.get(d),y=E.envMap,x=E.envMapRotation;y&&(p.envMap.value=y,Pn.copy(x),Pn.x*=-1,Pn.y*=-1,Pn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Pn.y*=-1,Pn.z*=-1),p.envMapRotation.value.setFromMatrix4(tq.makeRotationFromEuler(Pn)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,E,y){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*E,p.scale.value=y*.5,d.map&&(p.map.value=d.map,e(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function V(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function c(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function f(p,d,E){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Te&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,p.specularIntensityMapTransform))}function q(p,d){d.matcap&&(p.matcap.value=d.matcap)}function g(p,d){const E=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function nq(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,y){const x=y.program;n.uniformBlockBinding(E,x)}function V(E,y){let x=s[E.id];x===void 0&&(q(E),x=h(E),s[E.id]=x,E.addEventListener("dispose",p));const w=y.program;n.updateUBOMapping(E,w);const b=t.render.frame;r[E.id]!==b&&(c(E),r[E.id]=b)}function h(E){const y=u();E.__bindingPointIndex=y;const x=i.createBuffer(),w=E.__size,b=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,w,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(E){const y=s[E.id],x=E.uniforms,w=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let b=0,C=x.length;b<C;b++){const B=Array.isArray(x[b])?x[b]:[x[b]];for(let v=0,_=B.length;v<_;v++){const D=B[v];if(f(D,b,v,w)===!0){const O=D.__offset,H=Array.isArray(D.value)?D.value:[D.value];let j=0;for(let W=0;W<H.length;W++){const Y=H[W],Z=g(Y);typeof Y=="number"||typeof Y=="boolean"?(D.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,O+j,D.__data)):Y.isMatrix3?(D.__data[0]=Y.elements[0],D.__data[1]=Y.elements[1],D.__data[2]=Y.elements[2],D.__data[3]=0,D.__data[4]=Y.elements[3],D.__data[5]=Y.elements[4],D.__data[6]=Y.elements[5],D.__data[7]=0,D.__data[8]=Y.elements[6],D.__data[9]=Y.elements[7],D.__data[10]=Y.elements[8],D.__data[11]=0):(Y.toArray(D.__data,j),j+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,y,x,w){const b=E.value,C=y+"_"+x;if(w[C]===void 0)return typeof b=="number"||typeof b=="boolean"?w[C]=b:w[C]=b.clone(),!0;{const B=w[C];if(typeof b=="number"||typeof b=="boolean"){if(B!==b)return w[C]=b,!0}else if(B.equals(b)===!1)return B.copy(b),!0}return!1}function q(E){const y=E.uniforms;let x=0;const w=16;for(let C=0,B=y.length;C<B;C++){const v=Array.isArray(y[C])?y[C]:[y[C]];for(let _=0,D=v.length;_<D;_++){const O=v[_],H=Array.isArray(O.value)?O.value:[O.value];for(let j=0,W=H.length;j<W;j++){const Y=H[j],Z=g(Y),k=x%w,at=k%Z.boundary,ct=k+at;x+=at,ct!==0&&w-ct<Z.storage&&(x+=w-ct),O.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=Z.storage}}}const b=x%w;return b>0&&(x+=w-b),E.__size=x,E.__cache={},this}function g(E){const y={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(y.boundary=4,y.storage=4):E.isVector2?(y.boundary=8,y.storage=8):E.isVector3||E.isColor?(y.boundary=16,y.storage=12):E.isVector4?(y.boundary=16,y.storage=16):E.isMatrix3?(y.boundary=48,y.storage=48):E.isMatrix4?(y.boundary=64,y.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),y}function p(E){const y=E.target;y.removeEventListener("dispose",p);const x=a.indexOf(y.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function d(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:V,dispose:d}}class iq{constructor(t={}){const{canvas:e=Lc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:V=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:c=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const q=new Uint32Array(4),g=new Int32Array(4);let p=null,d=null;const E=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Sn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let w=!1;this._outputColorSpace=Le;let b=0,C=0,B=null,v=-1,_=null;const D=new Ve,O=new Ve;let H=null;const j=new Gt(0);let W=0,Y=e.width,Z=e.height,k=1,at=null,ct=null;const St=new Ve(0,0,Y,Z),Nt=new Ve(0,0,Y,Z);let $t=!1;const ne=new Ta;let Qt=!1,X=!1;const J=new le,dt=new I,Dt=new Ve,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function me(){return B===null?k:1}let T=n;function ie(m,L){return e.getContext(m,L)}try{const m={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:V,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qa}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",$,!1),T===null){const L="webgl2";if(T=ie(L,m),T===null)throw ie(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(m){throw console.error("THREE.WebGLRenderer: "+m.message),m}let Pt,Ct,At,se,mt,Bt,fe,ce,M,A,U,G,K,z,xt,it,gt,_t,et,lt,bt,vt,ot,Ut;function R(){Pt=new df(T),Pt.init(),vt=new jp(T,Pt),Ct=new af(T,Pt,t,vt),At=new Yp(T,Pt),Ct.reversedDepthBuffer&&c&&At.buffers.depth.setReversed(!0),se=new qf(T),mt=new Pp,Bt=new Qp(T,Pt,At,mt,Ct,vt,se),fe=new Vf(x),ce=new uf(x),M=new vh(T),ot=new sf(T,M),A=new ff(T,M,se,ot),U=new mf(T,A,M,se),et=new Af(T,Ct,Bt),it=new of(mt),G=new Lp(x,fe,ce,Pt,Ct,ot,it),K=new eq(x,mt),z=new Ip,xt=new zp(Pt),_t=new nf(x,fe,ce,At,U,f,l),gt=new Wp(x,U,Ct),Ut=new nq(T,se,Ct,At),lt=new rf(T,Pt,se),bt=new pf(T,Pt,se),se.programs=G.programs,x.capabilities=Ct,x.extensions=Pt,x.properties=mt,x.renderLists=z,x.shadowMap=gt,x.state=At,x.info=se}R();const nt=new $p(x,T);this.xr=nt,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const m=Pt.get("WEBGL_lose_context");m&&m.loseContext()},this.forceContextRestore=function(){const m=Pt.get("WEBGL_lose_context");m&&m.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(m){m!==void 0&&(k=m,this.setSize(Y,Z,!1))},this.getSize=function(m){return m.set(Y,Z)},this.setSize=function(m,L,F=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=m,Z=L,e.width=Math.floor(m*k),e.height=Math.floor(L*k),F===!0&&(e.style.width=m+"px",e.style.height=L+"px"),this.setViewport(0,0,m,L)},this.getDrawingBufferSize=function(m){return m.set(Y*k,Z*k).floor()},this.setDrawingBufferSize=function(m,L,F){Y=m,Z=L,k=F,e.width=Math.floor(m*F),e.height=Math.floor(L*F),this.setViewport(0,0,m,L)},this.getCurrentViewport=function(m){return m.copy(D)},this.getViewport=function(m){return m.copy(St)},this.setViewport=function(m,L,F,N){m.isVector4?St.set(m.x,m.y,m.z,m.w):St.set(m,L,F,N),At.viewport(D.copy(St).multiplyScalar(k).round())},this.getScissor=function(m){return m.copy(Nt)},this.setScissor=function(m,L,F,N){m.isVector4?Nt.set(m.x,m.y,m.z,m.w):Nt.set(m,L,F,N),At.scissor(O.copy(Nt).multiplyScalar(k).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(m){At.setScissorTest($t=m)},this.setOpaqueSort=function(m){at=m},this.setTransparentSort=function(m){ct=m},this.getClearColor=function(m){return m.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor(...arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha(...arguments)},this.clear=function(m=!0,L=!0,F=!0){let N=0;if(m){let P=!1;if(B!==null){const tt=B.texture.format;P=tt===xa||tt===va||tt===_a}if(P){const tt=B.texture.type,Vt=tt===tn||tt===Hn||tt===Fi||tt===Ni||tt===ma||tt===ga,ft=_t.getClearColor(),ht=_t.getClearAlpha(),wt=ft.r,Rt=ft.g,Et=ft.b;Vt?(q[0]=wt,q[1]=Rt,q[2]=Et,q[3]=ht,T.clearBufferuiv(T.COLOR,0,q)):(g[0]=wt,g[1]=Rt,g[2]=Et,g[3]=ht,T.clearBufferiv(T.COLOR,0,g))}else N|=T.COLOR_BUFFER_BIT}L&&(N|=T.DEPTH_BUFFER_BIT),F&&(N|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",$,!1),_t.dispose(),z.dispose(),xt.dispose(),mt.dispose(),fe.dispose(),ce.dispose(),U.dispose(),ot.dispose(),Ut.dispose(),G.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",je),nt.removeEventListener("sessionend",Ca),Tn.stop()};function st(m){m.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const m=se.autoReset,L=gt.enabled,F=gt.autoUpdate,N=gt.needsUpdate,P=gt.type;R(),se.autoReset=m,gt.enabled=L,gt.autoUpdate=F,gt.needsUpdate=N,gt.type=P}function $(m){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",m.statusMessage)}function Q(m){const L=m.target;L.removeEventListener("dispose",Q),pt(L)}function pt(m){Lt(m),mt.remove(m)}function Lt(m){const L=mt.get(m).programs;L!==void 0&&(L.forEach(function(F){G.releaseProgram(F)}),m.isShaderMaterial&&G.releaseShaderCache(m))}this.renderBufferDirect=function(m,L,F,N,P,tt){L===null&&(L=Mt);const Vt=P.isMesh&&P.matrixWorld.determinant()<0,ft=PV(m,L,F,N,P);At.setMaterial(N,Vt);let ht=F.index,wt=1;if(N.wireframe===!0){if(ht=A.getWireframeAttribute(F),ht===void 0)return;wt=2}const Rt=F.drawRange,Et=F.attributes.position;let Ot=Rt.start*wt,Kt=(Rt.start+Rt.count)*wt;tt!==null&&(Ot=Math.max(Ot,tt.start*wt),Kt=Math.min(Kt,(tt.start+tt.count)*wt)),ht!==null?(Ot=Math.max(Ot,0),Kt=Math.min(Kt,ht.count)):Et!=null&&(Ot=Math.max(Ot,0),Kt=Math.min(Kt,Et.count));const oe=Kt-Ot;if(oe<0||oe===1/0)return;ot.setup(P,N,ft,F,ht);let ee,Jt=lt;if(ht!==null&&(ee=M.get(ht),Jt=bt,Jt.setIndex(ee)),P.isMesh)N.wireframe===!0?(At.setLineWidth(N.wireframeLinewidth*me()),Jt.setMode(T.LINES)):Jt.setMode(T.TRIANGLES);else if(P.isLine){let yt=N.linewidth;yt===void 0&&(yt=1),At.setLineWidth(yt*me()),P.isLineSegments?Jt.setMode(T.LINES):P.isLineLoop?Jt.setMode(T.LINE_LOOP):Jt.setMode(T.LINE_STRIP)}else P.isPoints?Jt.setMode(T.POINTS):P.isSprite&&Jt.setMode(T.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)Hi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Jt.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if(Pt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{const yt=P._multiDrawStarts,re=P._multiDrawCounts,Wt=P._multiDrawCount,we=ht?M.get(ht).bytesPerElement:1,Xn=mt.get(N).currentProgram.getUniforms();for(let be=0;be<Wt;be++)Xn.setValue(T,"_gl_DrawID",be),Jt.render(yt[be]/we,re[be])}else if(P.isInstancedMesh)Jt.renderInstances(Ot,oe,P.count);else if(F.isInstancedBufferGeometry){const yt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,re=Math.min(F.instanceCount,yt);Jt.renderInstances(Ot,oe,re)}else Jt.render(Ot,oe)};function te(m,L,F){m.transparent===!0&&m.side===cn&&m.forceSinglePass===!1?(m.side=Te,m.needsUpdate=!0,ji(m,L,F),m.side=En,m.needsUpdate=!0,ji(m,L,F),m.side=cn):ji(m,L,F)}this.compile=function(m,L,F=null){F===null&&(F=m),d=xt.get(F),d.init(L),y.push(d),F.traverseVisible(function(P){P.isLight&&P.layers.test(L.layers)&&(d.pushLight(P),P.castShadow&&d.pushShadow(P))}),m!==F&&m.traverseVisible(function(P){P.isLight&&P.layers.test(L.layers)&&(d.pushLight(P),P.castShadow&&d.pushShadow(P))}),d.setupLights();const N=new Set;return m.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;const tt=P.material;if(tt)if(Array.isArray(tt))for(let Vt=0;Vt<tt.length;Vt++){const ft=tt[Vt];te(ft,F,P),N.add(ft)}else te(tt,F,P),N.add(tt)}),d=y.pop(),N},this.compileAsync=function(m,L,F=null){const N=this.compile(m,L,F);return new Promise(P=>{function tt(){if(N.forEach(function(Vt){mt.get(Vt).currentProgram.isReady()&&N.delete(Vt)}),N.size===0){P(m);return}setTimeout(tt,10)}Pt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let jt=null;function nn(m){jt&&jt(m)}function je(){Tn.stop()}function Ca(){Tn.start()}const Tn=new bV;Tn.setAnimationLoop(nn),typeof self<"u"&&Tn.setContext(self),this.setAnimationLoop=function(m){jt=m,nt.setAnimationLoop(m),m===null?Tn.stop():Tn.start()},nt.addEventListener("sessionstart",je),nt.addEventListener("sessionend",Ca),this.render=function(m,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(L),L=nt.getCamera()),m.isScene===!0&&m.onBeforeRender(x,m,L,B),d=xt.get(m,y.length),d.init(L),y.push(d),J.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),ne.setFromProjectionMatrix(J,Je,L.reversedDepth),X=this.localClippingEnabled,Qt=it.init(this.clippingPlanes,X),p=z.get(m,E.length),p.init(),E.push(p),nt.enabled===!0&&nt.isPresenting===!0){const tt=x.xr.getDepthSensingMesh();tt!==null&&Bs(tt,L,-1/0,x.sortObjects)}Bs(m,L,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(at,ct),zt=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,zt&&_t.addToRenderList(p,m),this.info.render.frame++,Qt===!0&&it.beginShadows();const F=d.state.shadowsArray;gt.render(F,m,L),Qt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const N=p.opaque,P=p.transmissive;if(d.setupLights(),L.isArrayCamera){const tt=L.cameras;if(P.length>0)for(let Vt=0,ft=tt.length;Vt<ft;Vt++){const ht=tt[Vt];Da(N,P,m,ht)}zt&&_t.render(m);for(let Vt=0,ft=tt.length;Vt<ft;Vt++){const ht=tt[Vt];Ra(p,m,ht,ht.viewport)}}else P.length>0&&Da(N,P,m,L),zt&&_t.render(m),Ra(p,m,L);B!==null&&C===0&&(Bt.updateMultisampleRenderTarget(B),Bt.updateRenderTargetMipmap(B)),m.isScene===!0&&m.onAfterRender(x,m,L),ot.resetDefaultState(),v=-1,_=null,y.pop(),y.length>0?(d=y[y.length-1],Qt===!0&&it.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?p=E[E.length-1]:p=null};function Bs(m,L,F,N){if(m.visible===!1)return;if(m.layers.test(L.layers)){if(m.isGroup)F=m.renderOrder;else if(m.isLOD)m.autoUpdate===!0&&m.update(L);else if(m.isLight)d.pushLight(m),m.castShadow&&d.pushShadow(m);else if(m.isSprite){if(!m.frustumCulled||ne.intersectsSprite(m)){N&&Dt.setFromMatrixPosition(m.matrixWorld).applyMatrix4(J);const Vt=U.update(m),ft=m.material;ft.visible&&p.push(m,Vt,ft,F,Dt.z,null)}}else if((m.isMesh||m.isLine||m.isPoints)&&(!m.frustumCulled||ne.intersectsObject(m))){const Vt=U.update(m),ft=m.material;if(N&&(m.boundingSphere!==void 0?(m.boundingSphere===null&&m.computeBoundingSphere(),Dt.copy(m.boundingSphere.center)):(Vt.boundingSphere===null&&Vt.computeBoundingSphere(),Dt.copy(Vt.boundingSphere.center)),Dt.applyMatrix4(m.matrixWorld).applyMatrix4(J)),Array.isArray(ft)){const ht=Vt.groups;for(let wt=0,Rt=ht.length;wt<Rt;wt++){const Et=ht[wt],Ot=ft[Et.materialIndex];Ot&&Ot.visible&&p.push(m,Vt,Ot,F,Dt.z,Et)}}else ft.visible&&p.push(m,Vt,ft,F,Dt.z,null)}}const tt=m.children;for(let Vt=0,ft=tt.length;Vt<ft;Vt++)Bs(tt[Vt],L,F,N)}function Ra(m,L,F,N){const P=m.opaque,tt=m.transmissive,Vt=m.transparent;d.setupLightsView(F),Qt===!0&&it.setGlobalState(x.clippingPlanes,F),N&&At.viewport(D.copy(N)),P.length>0&&Qi(P,L,F),tt.length>0&&Qi(tt,L,F),Vt.length>0&&Qi(Vt,L,F),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function Da(m,L,F,N){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[N.id]===void 0&&(d.state.transmissionRenderTarget[N.id]=new Gn(1,1,{generateMipmaps:!0,type:Pt.has("EXT_color_buffer_half_float")||Pt.has("EXT_color_buffer_float")?Gi:tn,minFilter:kn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const tt=d.state.transmissionRenderTarget[N.id],Vt=N.viewport||D;tt.setSize(Vt.z*x.transmissionResolutionScale,Vt.w*x.transmissionResolutionScale);const ft=x.getRenderTarget(),ht=x.getActiveCubeFace(),wt=x.getActiveMipmapLevel();x.setRenderTarget(tt),x.getClearColor(j),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),zt&&_t.render(F);const Rt=x.toneMapping;x.toneMapping=Sn;const Et=N.viewport;if(N.viewport!==void 0&&(N.viewport=void 0),d.setupLightsView(N),Qt===!0&&it.setGlobalState(x.clippingPlanes,N),Qi(m,F,N),Bt.updateMultisampleRenderTarget(tt),Bt.updateRenderTargetMipmap(tt),Pt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let Kt=0,oe=L.length;Kt<oe;Kt++){const ee=L[Kt],Jt=ee.object,yt=ee.geometry,re=ee.material,Wt=ee.group;if(re.side===cn&&Jt.layers.test(N.layers)){const we=re.side;re.side=Te,re.needsUpdate=!0,La(Jt,F,N,yt,re,Wt),re.side=we,re.needsUpdate=!0,Ot=!0}}Ot===!0&&(Bt.updateMultisampleRenderTarget(tt),Bt.updateRenderTargetMipmap(tt))}x.setRenderTarget(ft,ht,wt),x.setClearColor(j,W),Et!==void 0&&(N.viewport=Et),x.toneMapping=Rt}function Qi(m,L,F){const N=L.isScene===!0?L.overrideMaterial:null;for(let P=0,tt=m.length;P<tt;P++){const Vt=m[P],ft=Vt.object,ht=Vt.geometry,wt=Vt.group;let Rt=Vt.material;Rt.allowOverride===!0&&N!==null&&(Rt=N),ft.layers.test(F.layers)&&La(ft,L,F,ht,Rt,wt)}}function La(m,L,F,N,P,tt){m.onBeforeRender(x,L,F,N,P,tt),m.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,m.matrixWorld),m.normalMatrix.getNormalMatrix(m.modelViewMatrix),P.onBeforeRender(x,L,F,N,m,tt),P.transparent===!0&&P.side===cn&&P.forceSinglePass===!1?(P.side=Te,P.needsUpdate=!0,x.renderBufferDirect(F,L,N,P,m,tt),P.side=En,P.needsUpdate=!0,x.renderBufferDirect(F,L,N,P,m,tt),P.side=cn):x.renderBufferDirect(F,L,N,P,m,tt),m.onAfterRender(x,L,F,N,P,tt)}function ji(m,L,F){L.isScene!==!0&&(L=Mt);const N=mt.get(m),P=d.state.lights,tt=d.state.shadowsArray,Vt=P.state.version,ft=G.getParameters(m,P.state,tt,L,F),ht=G.getProgramCacheKey(ft);let wt=N.programs;N.environment=m.isMeshStandardMaterial?L.environment:null,N.fog=L.fog,N.envMap=(m.isMeshStandardMaterial?ce:fe).get(m.envMap||N.environment),N.envMapRotation=N.environment!==null&&m.envMap===null?L.environmentRotation:m.envMapRotation,wt===void 0&&(m.addEventListener("dispose",Q),wt=new Map,N.programs=wt);let Rt=wt.get(ht);if(Rt!==void 0){if(N.currentProgram===Rt&&N.lightsStateVersion===Vt)return Ua(m,ft),Rt}else ft.uniforms=G.getUniforms(m),m.onBeforeCompile(ft,x),Rt=G.acquireProgram(ft,ht),wt.set(ht,Rt),N.uniforms=ft.uniforms;const Et=N.uniforms;return(!m.isShaderMaterial&&!m.isRawShaderMaterial||m.clipping===!0)&&(Et.clippingPlanes=it.uniform),Ua(m,ft),N.needsLights=IV(m),N.lightsStateVersion=Vt,N.needsLights&&(Et.ambientLightColor.value=P.state.ambient,Et.lightProbe.value=P.state.probe,Et.directionalLights.value=P.state.directional,Et.directionalLightShadows.value=P.state.directionalShadow,Et.spotLights.value=P.state.spot,Et.spotLightShadows.value=P.state.spotShadow,Et.rectAreaLights.value=P.state.rectArea,Et.ltc_1.value=P.state.rectAreaLTC1,Et.ltc_2.value=P.state.rectAreaLTC2,Et.pointLights.value=P.state.point,Et.pointLightShadows.value=P.state.pointShadow,Et.hemisphereLights.value=P.state.hemi,Et.directionalShadowMap.value=P.state.directionalShadowMap,Et.directionalShadowMatrix.value=P.state.directionalShadowMatrix,Et.spotShadowMap.value=P.state.spotShadowMap,Et.spotLightMatrix.value=P.state.spotLightMatrix,Et.spotLightMap.value=P.state.spotLightMap,Et.pointShadowMap.value=P.state.pointShadowMap,Et.pointShadowMatrix.value=P.state.pointShadowMatrix),N.currentProgram=Rt,N.uniformsList=null,Rt}function Pa(m){if(m.uniformsList===null){const L=m.currentProgram.getUniforms();m.uniformsList=bs.seqWithValue(L.seq,m.uniforms)}return m.uniformsList}function Ua(m,L){const F=mt.get(m);F.outputColorSpace=L.outputColorSpace,F.batching=L.batching,F.batchingColor=L.batchingColor,F.instancing=L.instancing,F.instancingColor=L.instancingColor,F.instancingMorph=L.instancingMorph,F.skinning=L.skinning,F.morphTargets=L.morphTargets,F.morphNormals=L.morphNormals,F.morphColors=L.morphColors,F.morphTargetsCount=L.morphTargetsCount,F.numClippingPlanes=L.numClippingPlanes,F.numIntersection=L.numClipIntersection,F.vertexAlphas=L.vertexAlphas,F.vertexTangents=L.vertexTangents,F.toneMapping=L.toneMapping}function PV(m,L,F,N,P){L.isScene!==!0&&(L=Mt),Bt.resetTextureUnits();const tt=L.fog,Vt=N.isMeshStandardMaterial?L.environment:null,ft=B===null?x.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:mi,ht=(N.isMeshStandardMaterial?ce:fe).get(N.envMap||Vt),wt=N.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Rt=!!F.attributes.tangent&&(!!N.normalMap||N.anisotropy>0),Et=!!F.morphAttributes.position,Ot=!!F.morphAttributes.normal,Kt=!!F.morphAttributes.color;let oe=Sn;N.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(oe=x.toneMapping);const ee=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Jt=ee!==void 0?ee.length:0,yt=mt.get(N),re=d.state.lights;if(Qt===!0&&(X===!0||m!==_)){const ve=m===_&&N.id===v;it.setState(N,m,ve)}let Wt=!1;N.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==re.state.version||yt.outputColorSpace!==ft||P.isBatchedMesh&&yt.batching===!1||!P.isBatchedMesh&&yt.batching===!0||P.isBatchedMesh&&yt.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&yt.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&yt.instancing===!1||!P.isInstancedMesh&&yt.instancing===!0||P.isSkinnedMesh&&yt.skinning===!1||!P.isSkinnedMesh&&yt.skinning===!0||P.isInstancedMesh&&yt.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&yt.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&yt.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&yt.instancingMorph===!1&&P.morphTexture!==null||yt.envMap!==ht||N.fog===!0&&yt.fog!==tt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==it.numPlanes||yt.numIntersection!==it.numIntersection)||yt.vertexAlphas!==wt||yt.vertexTangents!==Rt||yt.morphTargets!==Et||yt.morphNormals!==Ot||yt.morphColors!==Kt||yt.toneMapping!==oe||yt.morphTargetsCount!==Jt)&&(Wt=!0):(Wt=!0,yt.__version=N.version);let we=yt.currentProgram;Wt===!0&&(we=ji(N,L,P));let Xn=!1,be=!1,Ei=!1;const ae=we.getUniforms(),Ue=yt.uniforms;if(At.useProgram(we.program)&&(Xn=!0,be=!0,Ei=!0),N.id!==v&&(v=N.id,be=!0),Xn||_!==m){At.buffers.depth.getReversed()&&m.reversedDepth!==!0&&(m._reversedDepth=!0,m.updateProjectionMatrix()),ae.setValue(T,"projectionMatrix",m.projectionMatrix),ae.setValue(T,"viewMatrix",m.matrixWorldInverse);const Ee=ae.map.cameraPosition;Ee!==void 0&&Ee.setValue(T,dt.setFromMatrixPosition(m.matrixWorld)),Ct.logarithmicDepthBuffer&&ae.setValue(T,"logDepthBufFC",2/(Math.log(m.far+1)/Math.LN2)),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&ae.setValue(T,"isOrthographic",m.isOrthographicCamera===!0),_!==m&&(_=m,be=!0,Ei=!0)}if(P.isSkinnedMesh){ae.setOptional(T,P,"bindMatrix"),ae.setOptional(T,P,"bindMatrixInverse");const ve=P.skeleton;ve&&(ve.boneTexture===null&&ve.computeBoneTexture(),ae.setValue(T,"boneTexture",ve.boneTexture,Bt))}P.isBatchedMesh&&(ae.setOptional(T,P,"batchingTexture"),ae.setValue(T,"batchingTexture",P._matricesTexture,Bt),ae.setOptional(T,P,"batchingIdTexture"),ae.setValue(T,"batchingIdTexture",P._indirectTexture,Bt),ae.setOptional(T,P,"batchingColorTexture"),P._colorsTexture!==null&&ae.setValue(T,"batchingColorTexture",P._colorsTexture,Bt));const Ie=F.morphAttributes;if((Ie.position!==void 0||Ie.normal!==void 0||Ie.color!==void 0)&&et.update(P,F,we),(be||yt.receiveShadow!==P.receiveShadow)&&(yt.receiveShadow=P.receiveShadow,ae.setValue(T,"receiveShadow",P.receiveShadow)),N.isMeshGouraudMaterial&&N.envMap!==null&&(Ue.envMap.value=ht,Ue.flipEnvMap.value=ht.isCubeTexture&&ht.isRenderTargetTexture===!1?-1:1),N.isMeshStandardMaterial&&N.envMap===null&&L.environment!==null&&(Ue.envMapIntensity.value=L.environmentIntensity),be&&(ae.setValue(T,"toneMappingExposure",x.toneMappingExposure),yt.needsLights&&UV(Ue,Ei),tt&&N.fog===!0&&K.refreshFogUniforms(Ue,tt),K.refreshMaterialUniforms(Ue,N,k,Z,d.state.transmissionRenderTarget[m.id]),bs.upload(T,Pa(yt),Ue,Bt)),N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(bs.upload(T,Pa(yt),Ue,Bt),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&ae.setValue(T,"center",P.center),ae.setValue(T,"modelViewMatrix",P.modelViewMatrix),ae.setValue(T,"normalMatrix",P.normalMatrix),ae.setValue(T,"modelMatrix",P.matrixWorld),N.isShaderMaterial||N.isRawShaderMaterial){const ve=N.uniformsGroups;for(let Ee=0,Fs=ve.length;Ee<Fs;Ee++){const wn=ve[Ee];Ut.update(wn,we),Ut.bind(wn,we)}}return we}function UV(m,L){m.ambientLightColor.needsUpdate=L,m.lightProbe.needsUpdate=L,m.directionalLights.needsUpdate=L,m.directionalLightShadows.needsUpdate=L,m.pointLights.needsUpdate=L,m.pointLightShadows.needsUpdate=L,m.spotLights.needsUpdate=L,m.spotLightShadows.needsUpdate=L,m.rectAreaLights.needsUpdate=L,m.hemisphereLights.needsUpdate=L}function IV(m){return m.isMeshLambertMaterial||m.isMeshToonMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isShadowMaterial||m.isShaderMaterial&&m.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(m,L,F){const N=mt.get(m);N.__autoAllocateDepthBuffer=m.resolveDepthBuffer===!1,N.__autoAllocateDepthBuffer===!1&&(N.__useRenderToTexture=!1),mt.get(m.texture).__webglTexture=L,mt.get(m.depthTexture).__webglTexture=N.__autoAllocateDepthBuffer?void 0:F,N.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(m,L){const F=mt.get(m);F.__webglFramebuffer=L,F.__useDefaultFramebuffer=L===void 0};const BV=T.createFramebuffer();this.setRenderTarget=function(m,L=0,F=0){B=m,b=L,C=F;let N=!0,P=null,tt=!1,Vt=!1;if(m){const ht=mt.get(m);if(ht.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(T.FRAMEBUFFER,null),N=!1;else if(ht.__webglFramebuffer===void 0)Bt.setupRenderTarget(m);else if(ht.__hasExternalTextures)Bt.rebindTextures(m,mt.get(m.texture).__webglTexture,mt.get(m.depthTexture).__webglTexture);else if(m.depthBuffer){const Et=m.depthTexture;if(ht.__boundDepthTexture!==Et){if(Et!==null&&mt.has(Et)&&(m.width!==Et.image.width||m.height!==Et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(m)}}const wt=m.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(Vt=!0);const Rt=mt.get(m).__webglFramebuffer;m.isWebGLCubeRenderTarget?(Array.isArray(Rt[L])?P=Rt[L][F]:P=Rt[L],tt=!0):m.samples>0&&Bt.useMultisampledRTT(m)===!1?P=mt.get(m).__webglMultisampledFramebuffer:Array.isArray(Rt)?P=Rt[F]:P=Rt,D.copy(m.viewport),O.copy(m.scissor),H=m.scissorTest}else D.copy(St).multiplyScalar(k).floor(),O.copy(Nt).multiplyScalar(k).floor(),H=$t;if(F!==0&&(P=BV),At.bindFramebuffer(T.FRAMEBUFFER,P)&&N&&At.drawBuffers(m,P),At.viewport(D),At.scissor(O),At.setScissorTest(H),tt){const ht=mt.get(m.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+L,ht.__webglTexture,F)}else if(Vt){const ht=L;for(let wt=0;wt<m.textures.length;wt++){const Rt=mt.get(m.textures[wt]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+wt,Rt.__webglTexture,F,ht)}}else if(m!==null&&F!==0){const ht=mt.get(m.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,ht.__webglTexture,F)}v=-1},this.readRenderTargetPixels=function(m,L,F,N,P,tt,Vt,ft=0){if(!(m&&m.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ht=mt.get(m).__webglFramebuffer;if(m.isWebGLCubeRenderTarget&&Vt!==void 0&&(ht=ht[Vt]),ht){At.bindFramebuffer(T.FRAMEBUFFER,ht);try{const wt=m.textures[ft],Rt=wt.format,Et=wt.type;if(!Ct.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(Et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=m.width-N&&F>=0&&F<=m.height-P&&(m.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+ft),T.readPixels(L,F,N,P,vt.convert(Rt),vt.convert(Et),tt))}finally{const wt=B!==null?mt.get(B).__webglFramebuffer:null;At.bindFramebuffer(T.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(m,L,F,N,P,tt,Vt,ft=0){if(!(m&&m.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ht=mt.get(m).__webglFramebuffer;if(m.isWebGLCubeRenderTarget&&Vt!==void 0&&(ht=ht[Vt]),ht)if(L>=0&&L<=m.width-N&&F>=0&&F<=m.height-P){At.bindFramebuffer(T.FRAMEBUFFER,ht);const wt=m.textures[ft],Rt=wt.format,Et=wt.type;if(!Ct.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(Et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ot=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Ot),T.bufferData(T.PIXEL_PACK_BUFFER,tt.byteLength,T.STREAM_READ),m.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+ft),T.readPixels(L,F,N,P,vt.convert(Rt),vt.convert(Et),0);const Kt=B!==null?mt.get(B).__webglFramebuffer:null;At.bindFramebuffer(T.FRAMEBUFFER,Kt);const oe=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await Pc(T,oe,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Ot),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,tt),T.deleteBuffer(Ot),T.deleteSync(oe),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(m,L=null,F=0){const N=Math.pow(2,-F),P=Math.floor(m.image.width*N),tt=Math.floor(m.image.height*N),Vt=L!==null?L.x:0,ft=L!==null?L.y:0;Bt.setTexture2D(m,0),T.copyTexSubImage2D(T.TEXTURE_2D,F,0,0,Vt,ft,P,tt),At.unbindTexture()};const FV=T.createFramebuffer(),NV=T.createFramebuffer();this.copyTextureToTexture=function(m,L,F=null,N=null,P=0,tt=null){tt===null&&(P!==0?(Hi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=P,P=0):tt=0);let Vt,ft,ht,wt,Rt,Et,Ot,Kt,oe;const ee=m.isCompressedTexture?m.mipmaps[tt]:m.image;if(F!==null)Vt=F.max.x-F.min.x,ft=F.max.y-F.min.y,ht=F.isBox3?F.max.z-F.min.z:1,wt=F.min.x,Rt=F.min.y,Et=F.isBox3?F.min.z:0;else{const Ie=Math.pow(2,-P);Vt=Math.floor(ee.width*Ie),ft=Math.floor(ee.height*Ie),m.isDataArrayTexture?ht=ee.depth:m.isData3DTexture?ht=Math.floor(ee.depth*Ie):ht=1,wt=0,Rt=0,Et=0}N!==null?(Ot=N.x,Kt=N.y,oe=N.z):(Ot=0,Kt=0,oe=0);const Jt=vt.convert(L.format),yt=vt.convert(L.type);let re;L.isData3DTexture?(Bt.setTexture3D(L,0),re=T.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Bt.setTexture2DArray(L,0),re=T.TEXTURE_2D_ARRAY):(Bt.setTexture2D(L,0),re=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,L.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,L.unpackAlignment);const Wt=T.getParameter(T.UNPACK_ROW_LENGTH),we=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Xn=T.getParameter(T.UNPACK_SKIP_PIXELS),be=T.getParameter(T.UNPACK_SKIP_ROWS),Ei=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,ee.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ee.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,wt),T.pixelStorei(T.UNPACK_SKIP_ROWS,Rt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Et);const ae=m.isDataArrayTexture||m.isData3DTexture,Ue=L.isDataArrayTexture||L.isData3DTexture;if(m.isDepthTexture){const Ie=mt.get(m),ve=mt.get(L),Ee=mt.get(Ie.__renderTarget),Fs=mt.get(ve.__renderTarget);At.bindFramebuffer(T.READ_FRAMEBUFFER,Ee.__webglFramebuffer),At.bindFramebuffer(T.DRAW_FRAMEBUFFER,Fs.__webglFramebuffer);for(let wn=0;wn<ht;wn++)ae&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,mt.get(m).__webglTexture,P,Et+wn),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,mt.get(L).__webglTexture,tt,oe+wn)),T.blitFramebuffer(wt,Rt,Vt,ft,Ot,Kt,Vt,ft,T.DEPTH_BUFFER_BIT,T.NEAREST);At.bindFramebuffer(T.READ_FRAMEBUFFER,null),At.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(P!==0||m.isRenderTargetTexture||mt.has(m)){const Ie=mt.get(m),ve=mt.get(L);At.bindFramebuffer(T.READ_FRAMEBUFFER,FV),At.bindFramebuffer(T.DRAW_FRAMEBUFFER,NV);for(let Ee=0;Ee<ht;Ee++)ae?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ie.__webglTexture,P,Et+Ee):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Ie.__webglTexture,P),Ue?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ve.__webglTexture,tt,oe+Ee):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,ve.__webglTexture,tt),P!==0?T.blitFramebuffer(wt,Rt,Vt,ft,Ot,Kt,Vt,ft,T.COLOR_BUFFER_BIT,T.NEAREST):Ue?T.copyTexSubImage3D(re,tt,Ot,Kt,oe+Ee,wt,Rt,Vt,ft):T.copyTexSubImage2D(re,tt,Ot,Kt,wt,Rt,Vt,ft);At.bindFramebuffer(T.READ_FRAMEBUFFER,null),At.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else Ue?m.isDataTexture||m.isData3DTexture?T.texSubImage3D(re,tt,Ot,Kt,oe,Vt,ft,ht,Jt,yt,ee.data):L.isCompressedArrayTexture?T.compressedTexSubImage3D(re,tt,Ot,Kt,oe,Vt,ft,ht,Jt,ee.data):T.texSubImage3D(re,tt,Ot,Kt,oe,Vt,ft,ht,Jt,yt,ee):m.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,tt,Ot,Kt,Vt,ft,Jt,yt,ee.data):m.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,tt,Ot,Kt,ee.width,ee.height,Jt,ee.data):T.texSubImage2D(T.TEXTURE_2D,tt,Ot,Kt,Vt,ft,Jt,yt,ee);T.pixelStorei(T.UNPACK_ROW_LENGTH,Wt),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,we),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Xn),T.pixelStorei(T.UNPACK_SKIP_ROWS,be),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ei),tt===0&&L.generateMipmaps&&T.generateMipmap(re),At.unbindTexture()},this.initRenderTarget=function(m){mt.get(m).__webglFramebuffer===void 0&&Bt.setupRenderTarget(m)},this.initTexture=function(m){m.isCubeTexture?Bt.setTextureCube(m,0):m.isData3DTexture?Bt.setTexture3D(m,0):m.isDataArrayTexture||m.isCompressedArrayTexture?Bt.setTexture2DArray(m,0):Bt.setTexture2D(m,0),At.unbindTexture()},this.resetState=function(){b=0,C=0,B=null,At.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Je}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}const Ri=new I;function Ne(i,t,e,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Ri.copy(t),Ri[n]=0,Ri.normalize();const V=.5*a/(a+o),h=1-Ri.angleTo(i)/l;return Math.sign(Ri[e])===1?h*V:o/(a+o)+V+V*(1-h)}class ba extends Mi{constructor(t=1,e=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new I,V=new I,h=new I(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,c=this.attributes.normal.array,f=this.attributes.uv.array,q=u.length/6,g=new I,p=.5/a;for(let d=0,E=0;d<u.length;d+=3,E+=2)switch(l.fromArray(u,d),V.copy(l),V.x-=Math.sign(V.x)*p,V.y-=Math.sign(V.y)*p,V.z-=Math.sign(V.z)*p,V.normalize(),u[d+0]=h.x*Math.sign(l.x)+V.x*r,u[d+1]=h.y*Math.sign(l.y)+V.y*r,u[d+2]=h.z*Math.sign(l.z)+V.z*r,c[d+0]=V.x,c[d+1]=V.y,c[d+2]=V.z,Math.floor(d/q)){case 0:g.set(1,0,0),f[E+0]=Ne(g,V,"z","y",r,n),f[E+1]=1-Ne(g,V,"y","z",r,e);break;case 1:g.set(-1,0,0),f[E+0]=1-Ne(g,V,"z","y",r,n),f[E+1]=1-Ne(g,V,"y","z",r,e);break;case 2:g.set(0,1,0),f[E+0]=1-Ne(g,V,"x","z",r,t),f[E+1]=Ne(g,V,"z","x",r,n);break;case 3:g.set(0,-1,0),f[E+0]=1-Ne(g,V,"x","z",r,t),f[E+1]=1-Ne(g,V,"z","x",r,n);break;case 4:g.set(0,0,1),f[E+0]=1-Ne(g,V,"x","y",r,t),f[E+1]=1-Ne(g,V,"y","x",r,e);break;case 5:g.set(0,0,-1),f[E+0]=Ne(g,V,"x","y",r,t),f[E+1]=1-Ne(g,V,"y","x",r,e);break}}static fromJSON(t){return new ba(t.width,t.height,t.depth,t.segments,t.radius)}}const ye={L:3,H:.6,W:1,GAP:.035,BEVEL:.05};let vr=null;function sq(){return vr||(vr=new ba(ye.L-ye.GAP,ye.H-ye.GAP,ye.W-ye.GAP,2,ye.BEVEL)),vr}const pa=[["#CFA873","#B98D55"],["#C9A26B","#AD8046"],["#D2AE7C","#B48A52"],["#BF9560","#A3733C"]];function rq(i){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function aq(i){const t=rq(1e3+i*7919),e=512,n=256,s=document.createElement("canvas");s.width=e,s.height=n;const r=s.getContext("2d"),[a,o]=pa[i%pa.length],l=r.createLinearGradient(0,0,0,n);l.addColorStop(0,a),l.addColorStop(1,o),r.fillStyle=l,r.fillRect(0,0,e,n);for(let c=0;c<110;c++){const f=t()*n,q=2+t()*6,g=.004+t()*.01,p=t()*10,d=t()<.75;r.strokeStyle=d?`rgba(70,40,15,${.05+t()*.14})`:`rgba(255,235,200,${.04+t()*.08})`,r.lineWidth=.6+t()*1.8,r.beginPath();for(let E=0;E<=e;E+=6){const y=f+Math.sin(E*g+p)*q+Math.sin(E*.03+p)*1.2;E===0?r.moveTo(E,y):r.lineTo(E,y)}r.stroke()}const V=t()<.5?1:t()<.3?2:0;for(let c=0;c<V;c++){const f=60+t()*(e-120),q=30+t()*(n-60),g=10+t()*16;for(let p=6;p>0;p--)r.strokeStyle=`rgba(80,45,20,${.06+p*.02})`,r.lineWidth=1.2,r.beginPath(),r.ellipse(f,q,g*p/6*2.2,g*p/6,0,0,Math.PI*2),r.stroke()}const h=r.getImageData(0,0,e,n),u=h.data;for(let c=0;c<u.length;c+=4){const f=(t()-.5)*18;u[c]+=f,u[c+1]+=f*.9,u[c+2]+=f*.7}return r.putImageData(h,0,0),s}let _s=null;function oq(){return _s||(_s=pa.map((i,t)=>{const e=new lh(aq(t));return e.colorSpace=Le,e.wrapS=e.wrapT=Rs,e.anisotropy=4,new hh({map:e,roughness:.68,metalness:.02})}),_s)}function Vq(i,t,e=Math.random){const n=oq(),s=n[Math.floor(e()*n.length)].clone();s.map=s.map.clone(),s.map.needsUpdate=!0,s.map.offset.set(e(),e()<.5?0:.5),e()<.5&&(s.map.repeat.x=-1);const r=.92+e()*.12;s.color.setRGB(r,r*(.97+e()*.04),r*(.95+e()*.05));const a=new Ye(sq(),s);a.castShadow=!0,a.receiveShadow=!0;const o=i*ye.H+ye.H/2,l=i%2===0;l?a.position.set(0,o,(t-1)*ye.W):(a.position.set((t-1)*ye.W,o,0),a.rotation.y=Math.PI/2);const V={id:`${i}-${t}`,layer:i,index:t,mesh:a,removed:!1,wild:!1,axis:l?new I(1,0,0):new I(0,0,1),home:a.position.clone(),anim:null,selected:!1};return a.userData.block=V,V}const vs=18,lq=3,cq=.05,Go={outCubic:i=>1-Math.pow(1-i,3),inCubic:i=>i*i*i,inOutQuad:i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2},hq=()=>globalThis.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;class uq{constructor(t,e={}){this.el=t,this.h=e,this.blocks=[],this.risk=0,this.shakeImpulse=0,this.collapsed=!1,this.selected=null,this.yaw=.62,this.yawVel=0,this.pulled=0,this.tiltDir=Math.random()*Math.PI*2,this.initScene(),this.build(),this.bindPointer(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t),this.resize(),this.clock=new mh,this.running=!0,this.loop=this.loop.bind(this),requestAnimationFrame(this.loop),document.addEventListener("visibilitychange",()=>{this.running=!document.hidden,this.running&&(this.clock.getDelta(),requestAnimationFrame(this.loop))})}initScene(){const t=new iq({antialias:!0,alpha:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(devicePixelRatio||1,2)),t.shadowMap.enabled=!0,t.shadowMap.type=eV,t.toneMapping=iV,t.toneMappingExposure=1.05,t.setClearColor(0,0),this.renderer=t,this.el.appendChild(t.domElement),this.scene=new rh,this.camera=new Oe(26,1,.1,100),this.group=new Li,this.scene.add(this.group);const e=new fh(5922675,657932,.9);this.scene.add(e);const n=new fr(16773340,2.6);n.position.set(6,14,8),n.castShadow=!0,n.shadow.mapSize.set(1024,1024),n.shadow.bias=-8e-4,n.shadow.normalBias=.02;const s=n.shadow.camera;s.left=s.bottom=-8,s.right=s.top=8,s.near=1,s.far=40,this.scene.add(n),this.key=n;const r=new fr(9412863,.8);r.position.set(-7,6,-3),this.scene.add(r),this.fill=r;const a=new fr(12662571,.9);a.position.set(-2,5,-10),this.scene.add(a);const o=new Ye(new Yi(60,60),new ch({opacity:.5}));o.rotation.x=-Math.PI/2,o.receiveShadow=!0,this.scene.add(o),this.raycaster=new gh,this.ndc=new Yt}build(){this.blocks.forEach(n=>{this.group.remove(n.mesh),n.mesh.material.dispose()}),this.blocks=[],this.pulled=0,this.collapsed=!1,this.selected=null,this.risk=0,this.group.rotation.set(0,0,0),this.tiltDir=Math.random()*Math.PI*2;for(let n=0;n<vs;n++)for(let s=0;s<lq;s++){const r=Vq(n,s);this.blocks.push(r),this.group.add(r.mesh)}const t=Math.max(1,Math.round(this.blocks.length*cq)),e=this.blocks.filter(n=>n.layer<vs-1);for(let n=0;n<t;n++){const s=e.splice(Math.floor(Math.random()*e.length),1)[0];s&&(s.wild=!0)}this.towerH=vs*ye.H}reset(){this.build(),this.yawVel=0}resize(){const t=this.el.clientWidth||1,e=this.el.clientHeight||1;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.placeCamera()}placeCamera(){const t=Ka.degToRad(this.camera.fov),e=this.towerH*1.14,n=5.2,s=e/2/Math.tan(t/2),r=n/2/(Math.tan(t/2)*this.camera.aspect),a=Math.max(s,r),o=.22,l=new I(0,this.towerH*.5,0);if(this.camera.position.set(l.x+a*Math.cos(o)*Math.sin(this.yaw),l.y+a*Math.sin(o),l.z+a*Math.cos(o)*Math.cos(this.yaw)),this.camera.lookAt(l),this.key){const V=this.yaw+.55;this.key.position.set(14*Math.sin(V),14,14*Math.cos(V));const h=this.yaw-1.2;this.fill.position.set(8*Math.sin(h),5,8*Math.cos(h))}}topLayer(){let t=-1;return this.blocks.forEach(e=>{!e.removed&&e.layer>t&&(t=e.layer)}),t}layerState(t){const e=[!1,!1,!1];return this.blocks.forEach(n=>{n.layer===t&&!n.removed&&(e[n.index]=!0)}),e}isRemovable(t){if(t.removed||t.anim||this.collapsed||t.layer>=this.topLayer())return!1;const e=this.layerState(t.layer);return t.index===1?e[0]&&e[2]:e[1]}removable(){return this.blocks.filter(t=>this.isRemovable(t))}randomRemovable(){const t=this.removable();return t.length?t[Math.floor(Math.random()*t.length)]:null}weakLayers(){let t=0;for(let e=0;e<this.topLayer();e++)this.layerState(e).filter(Boolean).length===1&&t++;return t}setRisk(t){this.risk=Ka.clamp(t,0,1)}bindPointer(){const t=this.renderer.domElement;let e=null;t.addEventListener("pointerdown",s=>{e={x:s.clientX,y:s.clientY,t:performance.now(),yaw:this.yaw,drag:!1,lastX:s.clientX,lastT:performance.now()},this.yawVel=0,t.setPointerCapture(s.pointerId)}),t.addEventListener("pointermove",s=>{if(!e)return;const r=s.clientX-e.x;if(!e.drag&&Math.hypot(r,s.clientY-e.y)>8&&(e.drag=!0),e.drag){this.yaw=e.yaw+r*.009;const a=performance.now();this.yawVel=(s.clientX-e.lastX)*.009/Math.max(1,a-e.lastT)*16,e.lastX=s.clientX,e.lastT=a,this.placeCamera()}});const n=s=>{if(!e)return;const r=e;if(e=null,r.drag||performance.now()-r.t>600)return;const a=this.pick(s.clientX,s.clientY);if(!a){this.selected&&this.clearSelection();return}this.isRemovable(a)?this.h.onTap?.(a):(this.blockedFx(a),this.h.onBlocked?.(a))};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",()=>{e=null})}pick(t,e){const n=this.renderer.domElement.getBoundingClientRect();this.ndc.set((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.camera);const s=this.blocks.filter(a=>!a.removed&&!a.anim).map(a=>a.mesh),r=this.raycaster.intersectObjects(s,!1)[0];return r?r.object.userData.block:null}outDir(t){const e=this.camera.position.clone().sub(t.mesh.getWorldPosition(new I));return t.axis.clone().multiplyScalar(Math.sign(e.dot(t.axis))||1)}select(t){this.selected&&this.selected!==t&&this.clearSelection(),this.selected=t,t.selected=!0,t.mesh.material.emissive.set(13111342),t.mesh.material.emissiveIntensity=.28,t.selT0=performance.now(),t.selDir=this.outDir(t)}clearSelection(){const t=this.selected;t&&(this.selected=null,t.selected=!1,t.mesh.material.emissiveIntensity=0,t.mesh.position.copy(t.home),this.h.onDeselect?.(t))}blockedFx(t){t.fx={t0:performance.now(),type:"blocked"},t.mesh.material.emissive.set(13111342)}pull(t){return new Promise(e=>{this.selected===t&&(this.selected=null,t.selected=!1),t.mesh.material.emissiveIntensity=0,t.mesh.material.transparent=!0,t.anim={t0:performance.now(),dir:this.outDir(t),resolve:e,vy:0},this.shakeImpulse=Math.min(1,.5+this.risk*.8)})}collapse(){return new Promise(t=>{if(this.collapsed)return t();this.collapsed=!0,this.clearSelection();const e=new I(Math.cos(this.tiltDir),0,Math.sin(this.tiltDir));this.blocks.forEach(n=>{if(n.removed)return;n.anim=null;const s=n.layer/vs;n.phys={v:new I(e.x*(1+s*5)+(Math.random()-.5)*2.5,Math.random()*1.5+s*1.5,e.z*(1+s*5)+(Math.random()-.5)*2.5),av:new I((Math.random()-.5)*6,(Math.random()-.5)*4,(Math.random()-.5)*6)},n.mesh.material.transparent=!0}),this.collapseT0=performance.now(),this.collapseResolve=t,this.shakeImpulse=1.2})}loop(){if(!this.running)return;const t=Math.min(.05,this.clock.getDelta()),e=performance.now(),n=e/1e3;Math.abs(this.yawVel)>2e-4&&(this.yaw+=this.yawVel,this.yawVel*=.92,this.placeCamera());const s=hq();this.shakeImpulse=Math.max(0,this.shakeImpulse-t*1.6);const r=s?0:.003+Math.pow(this.risk,1.6)*.03+this.shakeImpulse*.02,a=Math.pow(this.risk,2)*.075;this.collapsed||(this.group.rotation.x=a*Math.cos(this.tiltDir)+Math.sin(n*1.7)*r+Math.sin(n*4.3)*r*.35,this.group.rotation.z=a*Math.sin(this.tiltDir)+Math.cos(n*2.3)*r*.8+Math.sin(n*5.1)*r*.3);const o=this.selected;if(o){const l=Go.outCubic(Math.min(1,(e-o.selT0)/180));o.mesh.position.copy(o.home).addScaledVector(o.selDir,.38*l+Math.sin(n*6)*.015)}for(const l of this.blocks){if(l.fx){const V=(e-l.fx.t0)/260;if(V>=1)l.fx=null,l.mesh.position.copy(l.home),l.mesh.material.emissiveIntensity=0;else{const h=l.axis.x?new I(0,0,1):new I(1,0,0);l.mesh.position.copy(l.home).addScaledVector(h,Math.sin(V*Math.PI*5)*.06*(1-V)),l.mesh.material.emissiveIntensity=.5*(1-V)}}if(l.anim){const V=l.anim,h=e-V.t0;if(h<220){const u=h/220;l.mesh.rotation.x=Math.sin(u*Math.PI*6)*.025*(1-u),l.mesh.rotation.z=Math.cos(u*Math.PI*5)*.02*(1-u)}else{const u=Math.min(1,(h-220)/460),c=Go.inOutQuad(u);l.mesh.rotation.x=0,l.mesh.rotation.z=0,l.mesh.position.copy(l.home).addScaledVector(V.dir,.38+c*4.2),u>.55&&(V.vy+=14*t,l.mesh.position.y-=V.vy*t*2,l.mesh.rotation.z+=t*2*V.dir.x,l.mesh.rotation.x-=t*2*V.dir.z),l.mesh.material.opacity=u>.7?1-(u-.7)/.3:1,u>=1&&(l.removed=!0,l.mesh.visible=!1,l.anim=null,this.pulled++,V.resolve())}}if(l.phys){const V=l.phys;V.v.y-=22*t,l.mesh.position.addScaledVector(V.v,t),l.mesh.rotation.x+=V.av.x*t,l.mesh.rotation.y+=V.av.y*t,l.mesh.rotation.z+=V.av.z*t,l.mesh.position.y<ye.H/2&&(l.mesh.position.y=ye.H/2,V.v.y*=-.22,V.v.x*=.75,V.v.z*=.75,V.av.multiplyScalar(.6));const h=(e-this.collapseT0)/1e3;h>1.2&&(l.mesh.material.opacity=Math.max(0,1-(h-1.2)/.7))}}if(this.collapsed&&this.collapseResolve&&e-this.collapseT0>2e3){const l=this.collapseResolve;this.collapseResolve=null,l()}this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.loop)}destroy(){this.running=!1,this.ro.disconnect(),this.renderer.dispose(),this.el.innerHTML=""}}class dq{constructor(){this.fill=S("div",{class:"risk__fill"}),this.num=S("div",{class:"risk__num"},"0%"),this.el=S("div",{class:"stat stat--risk",role:"meter","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":0,"aria-label":"위험도"},S("div",{class:"label"},"위험도"),S("div",{class:"risk"},S("div",{class:"risk__bar"},this.fill),this.num))}set(t){const e=Math.round(t*100);this.fill.style.width=`${e}%`,this.num.textContent=`${e}%`,this.el.setAttribute("aria-valuenow",e),this.el.classList.toggle("is-hot",t>=.5),this.el.classList.toggle("is-critical",t>=.8)}}class fq{constructor(){this.backdrop=S("div",{class:"sheet-backdrop"}),this.el=S("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":"미션","data-lenis-prevent":""}),document.body.append(this.backdrop,this.el),this.timer=null}show(){this.backdrop.classList.add("is-on"),this.el.classList.add("is-on"),Ge.sheet(),Pe.sheet(),this.el.scrollTop=0}close(){this.stopTimer(),this.backdrop.classList.remove("is-on"),this.el.classList.remove("is-on")}stopTimer(){clearInterval(this.timer),this.timer=null}frame({typeLabel:t,wild:e=!1,names:n,tag:s,text:r,desc:a,roles:o,body:l=[],actions:V=[]}){this.el.replaceChildren(...[S("div",{class:"sheet__handle"}),S("div",{class:"sheet__eyebrow"},S("span",{class:`chip ${e?"chip--accent":"chip--spicy"}`},e?"와일드":t||"미션")),n?S("div",{class:"sheet__names",html:n}):null,s&&/[가-힣]/.test(s)?S("h2",{class:"sheet__tag"},s):null,S("p",{class:"sheet__text",html:Hs(r,o)}),a?S("p",{class:"sheet__desc",html:Hs(a,o)}):null,...l,this.actionsEl=S("div",{class:"sheet__actions"},...V),S("div",{class:"sheet__foot"},"누구나 패스할 수 있다. 이유는 필요 없다.")].filter(Boolean)),this.show()}setActions(...t){this.actionsEl.replaceChildren(...t)}btn(t,e,n){return S("button",{class:`btn ${e}`,type:"button",onClick:n},t)}namesFor(t,e,n=[]){const s=l=>String(l).replace(/[&<>"']/g,V=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[V]),r=l=>`<span>${s(e[l])}</span>`,a=e.director!==null&&e.director!==void 0?`<span class="role">감독 ${s(e.Z)}</span>`:"",o=(e.judges||[]).map(l=>n[l]).filter(Boolean);switch(t.type){case"duo":return`${r("X")}<span class="plus">+</span>${r("Y")}${a}`;case"group":return n.length?n.map(l=>`<span>${s(l)}</span>`).join('<span class="plus">·</span>'):`${r("A")}<span class="plus">·</span>${r("X")}<span class="plus">·</span>${r("Y")}`;case"story":case"question":return`${r("A")}<span class="role">듣는 사람 ${o.map(s).join(" · ")}</span>`;default:return`${r("A")}<span class="plus">→</span>${r("X")}${a}`}}open({mission:t,roles:e,players:n=[],double:s=!1,penaltyProvider:r,onResult:a}){const o=[];let l=null;if(t.options?.length){const f=t.options.map((q,g)=>S("button",{class:"option",type:"button","aria-pressed":"false",onClick:p=>{l=g,f.forEach(d=>d.setAttribute("aria-pressed",String(d===p.currentTarget))),Ge.tick()}},S("span",{class:"option__idx"},String(g+1)),q));o.push(S("div",{class:"options",role:"group","aria-label":"문장 선택"},...f))}const V=t.timer?s?t.timer*2:t.timer:0;V&&o.push(this.timerEl(V));const h=f=>{this.close(),a(f)},u=(f,q={})=>{const g=r();this.setActions(this.btn("다음","btn--primary",()=>h({kind:f,penalty:g.effect,...q}))),this.actionsEl.before(S("div",{class:"verdict verdict--fail"},S("div",{class:"verdict__title"},g.title),S("div",{class:"verdict__sub"},g.detail))),Ge.verdict(!1),Pe.penalty()},c=[this.btn("패스","btn--secondary btn--pass",()=>h({kind:"pass"}))];t.type==="story"||t.type==="question"?(o.push(S("p",{class:"sheet__desc",style:{margin:"0 0 4px"}},S("strong",{},"룰"),' · 나머지 전원이 "약함"이라고 하면 벌주 한 모금. 판정은 입으로.')),c.push(this.btn("완료","btn--primary",()=>h({kind:"done",story:!0})))):(t.failable&&c.push(this.btn("실패","btn--secondary",()=>u("fail"))),c.push(this.btn("완료","btn--primary",()=>h({kind:"done",option:l})))),this.frame({typeLabel:Cs[t.type],names:this.namesFor(t,e,n),tag:s?`한 단계 더 · ${t.tag}`:t.tag,text:t.text,desc:s?`거리는 절반, 시간은 두 배. ${t.description||""}`:t.description,roles:e,body:o,actions:c})}timerEl(t){let e=t,n=!1;const s=S("div",{class:"timer__num","aria-live":"off"},String(t)),r=S("button",{class:"btn btn--secondary btn--sm timer__btn",type:"button"},"시작"),a=()=>{e-=1,s.textContent=String(Math.max(0,e)),s.classList.toggle("is-hot",e<=3),e<=3&&e>0&&(Ge.tick(),Pe.timerTick()),e<=0&&(this.stopTimer(),n=!1,r.textContent="다시",Ge.timerEnd(),Pe.timerEnd())};return r.addEventListener("click",()=>{if(n){this.stopTimer(),n=!1,r.textContent="시작";return}e=t,s.textContent=String(t),s.classList.remove("is-hot"),n=!0,r.textContent="정지",Pe.click(),this.timer=setInterval(a,1e3)}),S("div",{class:"timer"},s,S("div",{class:"timer__label"},`${t}초`),r)}openWild({wild:t,roles:e,onChoice:n}){const s=[],r=[],a=o=>{this.close(),n(o)};t.kind==="choose"?(s.push(S("div",{class:"wild-grid"},...t.missions.map(o=>S("button",{class:"wild-opt",type:"button",onClick:()=>a(o)},S("span",{class:"wild-opt__tag"},Cs[o.type]||"미션"),S("span",{class:"wild-opt__sub",html:Hs(o.text,e)}))))),r.push(this.btn("패스","btn--secondary btn--pass",()=>a(null)))):r.push(this.btn("패스","btn--secondary btn--pass",()=>a(null)),this.btn("진행","btn--primary",()=>a("go"))),this.frame({wild:!0,tag:t.tag,text:t.text,desc:t.description,roles:e,body:s,actions:r})}}const pq=26;class qq{constructor({onSettings:t,onGameOver:e,onHome:n}){this.onGameOver=e,this.onHome=n,this.rnd=new Tl,this.modal=new fq,this.risk=new dq,this.playerEl=S("div",{class:"stat__value stat__value--name"},"—"),this.turnEl=S("div",{class:"stat__value"},"1"),this.towerEl=S("div",{class:"tower-wrap","aria-label":"젠가 타워. 블록을 탭하면 선택, 한 번 더 탭하면 뽑는다."}),this.hint=S("div",{class:"tower-hint"},"블록을 탭해서 고르고, 다시 탭해서 뽑는다 · 드래그로 회전"),this.pullBtn=S("button",{class:"btn btn--primary tower-pull",type:"button",onClick:()=>this.pullSelected()},"뽑기"),this.towerEl.append(this.hint,this.pullBtn),this.el=S("section",{class:"screen game",id:"screen-game"},S("div",{class:"game__head"},Jo({height:34,sub:""}),S("button",{class:"btn--icon",type:"button","aria-label":"설정",html:qe.gear,onClick:t})),S("div",{class:"stats"},S("div",{class:"stat"},S("div",{class:"label"},"차례"),this.playerEl),S("div",{class:"stat"},S("div",{class:"label"},"턴"),this.turnEl),this.risk.el),this.towerEl,S("div",{class:"game__foot"},S("div",{class:"btn-row"},S("button",{class:"btn btn--secondary",type:"button",onClick:()=>this.randomBlock()},"아무 블록"),S("button",{class:"btn btn--ghost",type:"button",style:{flex:".6"},onClick:()=>this.confirmReset()},"다시 쌓기")),S("div",{class:"consent-line"},"누구나 패스할 수 있다. 이유는 필요 없다."))),this.busy=!1}mountTower(){this.tower||(this.tower=new uq(this.towerEl,{onTap:t=>this.onTap(t),onBlocked:t=>{Ge.blocked(),Pe.blocked(),De(t.layer>=this.tower.topLayer()?"맨 위층은 못 뽑는다":"그 블록을 빼면 무너진다")},onDeselect:()=>this.pullBtn.classList.remove("is-on")}))}start(t){this.mountTower(),this.players=t,this.n=t.length,this.turn=0,this.turnCount=1,this.stats={pulled:0,stories:0,passes:0,done:0,penalties:0},this.lastMission=null,this.extraMission=!1,this.samePlayerAgain=!1,this.over=!1,this.rnd.setPlayers(t.length),this.rnd.reset(),this.tower.reset(),this.tower.setRisk(0),this.risk.set(0),this.pullBtn.classList.remove("is-on"),this.hint.classList.remove("is-hidden"),this.renderHUD()}renderHUD(){this.playerEl.textContent=this.players[this.turn],this.turnEl.textContent=String(this.turnCount)}async confirmReset(){await Bn("타워를 다시 쌓을까? 현재 진행은 사라진다.","다시 쌓기")&&(this.start(this.players),De("새 타워"))}onTap(t){if(!(this.busy||this.over)){if(this.tower.selected===t)return this.pullSelected();this.tower.select(t),Ge.tick(),Pe.tick(),this.pullBtn.textContent=`${t.layer+1}층 뽑기`,this.pullBtn.classList.add("is-on"),this.hint.classList.add("is-hidden")}}randomBlock(){if(this.busy||this.over)return;const t=this.tower.randomRemovable();if(!t)return this.endGame();this.tower.select(t),Ge.tick(),this.pullBtn.classList.remove("is-on"),this.busy=!0,setTimeout(()=>{this.busy=!1,this.pullSelected()},420)}async pullSelected(){const t=this.tower.selected;if(!t||this.busy||this.over)return;this.busy=!0,this.pullBtn.classList.remove("is-on"),Ge.pull(),Pe.wood(),this.currentRisk()>.5&&Ge.tense(this.currentRisk()),await this.tower.pull(t),this.stats.pulled++;const e=this.updateRisk();if(e>=.55&&Pe.sub(e),this.shouldCollapse(e)||!this.tower.removable().length)return this.busy=!1,this.endGame();this.busy=!1,t.wild?this.showWild():this.showMission()}currentRisk(){return Math.min(1,this.stats.pulled/pq*.75+this.tower.weakLayers()/6*.35)}updateRisk(){const t=this.currentRisk();return this.tower.setRisk(t),this.risk.set(t),t}shouldCollapse(t){if(t>=1)return!0;if(t<.62)return!1;const e=Math.pow((t-.62)/.38,2)*.5;return Math.random()<e}async endGame(){this.over||(this.over=!0,this.busy=!0,Ge.collapse(),Pe.collapse(),await this.tower.collapse(),this.busy=!1,this.onGameOver({...this.stats,mostPair:this.rnd.mostPair(this.players)}))}drawMission(t={}){const e=Tt.missions();return e.length?this.rnd.draw(e,t):(De("미션이 없다. Mission Editor에서 추가.",2600),null)}tissueLevel(){const t=this.turnCount;return t<=3?"휴지 한 장 (긴 쪽)":t<=6?"휴지 반 장":t<=9?"휴지 1/4 장":"휴지 한 조각 (손가락 한 마디)"}showMission({forceType:t=null,mission:e=null,roles:n=null,double:s=!1}={}){let r=e||this.drawMission({type:t});if(!r)return this.nextTurn();Tt.get().settings.tissueAuto&&/TISSUE/i.test(r.tag)&&(r={...r,description:`${r.description||""} · 지금 난이도: ${this.tissueLevel()}`});const a=n||ka(this.rnd,this.players,this.turn,r.type);this.lastMission={mission:r,roles:a},this.modal.open({mission:r,roles:a,players:this.players,double:s,penaltyProvider:()=>this.penalty(),onResult:o=>this.onResult(o)})}penalty(){if(Tt.get().settings.drinking)return{title:"벌주.",detail:"한 모금. 원샷 아님.",effect:null};const t=[["다음 블록 바로 뽑기","extra_pull"],["추가 미션 하나 더","extra_mission"]],[e,n]=t[Math.floor(Math.random()*t.length)];return{title:"벌칙.",detail:`벌주 모드 꺼짐 · ${e}`,effect:n}}onResult(t){if(t.kind==="pass"?this.stats.passes++:t.kind==="done"&&(this.stats.done++,t.story&&this.stats.stories++),t.penalty!==void 0&&t.penalty!==null&&this.applyPenalty(t.penalty),t.kind==="fail"&&this.stats.penalties++,this.extraMission)return this.extraMission=!1,this.showMission();this.nextTurn()}applyPenalty(t){t==="extra_pull"?(this.samePlayerAgain=!0,De("같은 사람이 바로 다음 블록을 뽑는다")):t==="extra_mission"&&(this.extraMission=!0)}nextTurn(){this.over||(this.samePlayerAgain?this.samePlayerAgain=!1:this.turn=(this.turn+1)%this.players.length,this.turnCount++,this.renderHUD(),this.tower.removable().length||this.endGame())}showWild(){const t=Tt.wilds().filter(s=>s.kind!=="director");if(!t.length)return this.showMission();let e=t[Math.floor(Math.random()*t.length)];e.kind==="double"&&!this.lastMission&&(e=t.find(s=>s.kind!=="double")||e),e.kind==="all"&&this.players.length<3&&(e=t.find(s=>s.kind!=="all"&&s.kind!=="double")||e);const n=ka(this.rnd,this.players,this.turn,"action");e.kind==="choose"&&(e={...e,missions:this.rnd.drawMany(Tt.missions(),3)}),this.modal.openWild({wild:e,roles:n,onChoice:s=>{if(s===null)return this.stats.passes++,this.nextTurn();switch(e.kind){case"double":{const{mission:r,roles:a}=this.lastMission;return this.showMission({mission:r,roles:a,double:!0})}case"choose":return this.showMission({mission:s});case"switch":{const[r,a,o]=this.rnd.pairExcept(this.lastMission?.roles?.actors||null),l={A:this.players[this.turn],X:this.players[r],Y:this.players[a],Z:this.players[o],R:this.players[(this.turn+1)%this.n],L:this.players[(this.turn-1+this.n)%this.n],actors:[r,a],director:this.players.length>=3?o:null,judges:this.players.map((V,h)=>h).filter(V=>V!==this.turn),idx:{X:r,Y:a,Z:o}};return this.showMission({forceType:"duo",roles:l})}case"all":return this.showMission({forceType:"group"});case"rule":case"qm":case"mate":case"waterfall":case"thumb":return this.stats.done++,this.nextTurn();default:return this.showMission()}}})}}class Aq{constructor({onAgain:t,onHome:e}){this.grid=S("div",{class:"over__grid"}),this.el=S("section",{class:"screen over",id:"screen-over"},S("div",{class:"stack"},S("div",{class:"label"},"타워 붕괴"),S("h1",{class:"h1-ko",style:{margin:0}},"게임 ",S("em",{},"끝"))),this.grid,S("div",{class:"stack"},S("button",{class:"btn btn--primary",type:"button",onClick:t},"다시 쌓기"),S("button",{class:"btn btn--ghost",type:"button",onClick:e},"처음으로")))}render(t){const e=(n,s,r=!1)=>S("div",{class:"over__cell"},S("div",{class:"label"},n),S("div",{class:`over__num ${r?"over__num--text":""}`},String(s)));this.grid.replaceChildren(e("뽑은 블록",t.pulled),e("가장 많이 걸린 둘",t.mostPair,!0),e("푼 썰",t.stories),e("패스",t.passes),e("완료한 미션",t.done),e("벌주",t.penalties))}}class mq{constructor({onOpenEditor:t,onConsent:e}){const n=Tt.get().settings,s=(r,a,o)=>{const l=S("button",{class:"switch",type:"button",role:"switch","aria-checked":String(!!n[r]),"aria-label":a,onClick:()=>{const V=l.getAttribute("aria-checked")!=="true";l.setAttribute("aria-checked",String(V)),Tt.update(h=>{h.settings[r]=V}),r==="sound"&&V&&(Pe.unlock(),setTimeout(()=>Pe.wood(),150))}});return this.switches[r]=l,S("div",{class:"toggle"},S("div",{class:"toggle__label"},S("span",{},a),o?S("small",{},o):null),l)};this.switches={},this.el=S("div",{class:"panel",role:"dialog","aria-label":"설정"},S("div",{class:"panel__head"},S("button",{class:"btn--icon",type:"button","aria-label":"뒤로",html:qe.back,onClick:()=>this.close()}),S("div",{class:"panel__title panel__title--ko"},"설정")),S("div",{class:"panel__body","data-lenis-prevent":""},S("div",{class:"section-title"},"플레이"),S("div",{class:"settings-group"},s("drinking","벌주 모드","끄면 벌주 대신 다음 블록 바로 뽑기 / 추가 미션"),s("noStory","썰 제외","썰·질문·말로 하는 카드를 빼고 몸으로 하는 벌칙만 나온다"),s("tissueAuto","휴지 난이도 자동","라운드가 갈수록 휴지 길이가 짧아진다"),s("haptics","진동","블록 뽑기·위험도 진동"),s("sound","소리","기본 꺼짐. 나무 타격음 · 잔 부딪힘 · 저음 (Kenney CC0)")),S("div",{class:"section-title"},"미션"),S("div",{class:"settings-group"},S("button",{class:"linkrow",type:"button",onClick:t},S("span",{},"미션 편집",S("small",{},"수정 · 추가 · 팩 · 가져오기/내보내기")),S("span",{html:qe.chevron}))),S("div",{class:"section-title"},"룰"),S("div",{class:"settings-group"},S("button",{class:"linkrow",type:"button",onClick:e},S("span",{},"시작 안내 다시 보기"),S("span",{html:qe.chevron}))),S("div",{class:"section-title"},"주의"),S("div",{class:"settings-group"},S("button",{class:"linkrow",type:"button",style:{color:"var(--accent)"},onClick:async()=>{await Bn("모든 데이터(미션팩·설정·이름)를 지우고 처음 상태로 되돌릴까?","전부 삭제")&&(await Ss.del("state"),location.reload())}},S("span",{},"모든 데이터 초기화"),S("span",{html:qe.chevron}))),S("p",{class:"muted",style:{fontSize:"12px",textAlign:"center",marginTop:"12px"}},"한 번 열어두면 오프라인에서도 된다"))),document.body.append(this.el)}open(){const t=Tt.get().settings;Object.entries(this.switches).forEach(([e,n])=>n.setAttribute("aria-checked",String(!!t[e]))),this.el.classList.add("is-on")}close(){this.el.classList.remove("is-on"),this.onClose?.()}}const gq=["missions","wild"];class _q{constructor(){this.tab="missions",this.tabsEl=S("div",{class:"tabs",role:"tablist"}),this.listEl=S("div",{class:"mlist"}),this.packBtn=S("button",{class:"linkrow",type:"button",onClick:()=>this.packMenu()}),this.el=S("div",{class:"panel",role:"dialog","aria-label":"Mission Editor"},S("div",{class:"panel__head"},S("button",{class:"btn--icon",type:"button","aria-label":"뒤로",html:qe.back,onClick:()=>this.close()}),S("div",{class:"panel__title panel__title--ko"},"미션 편집"),S("button",{class:"btn--icon",type:"button","aria-label":"미션 추가",html:qe.plus,onClick:()=>this.openForm(null)})),S("div",{class:"panel__body","data-lenis-prevent":""},this.packBtn,this.tabsEl,S("p",{class:"muted",style:{fontSize:"12px",margin:0}},"행을 탭하면 수정. 왼쪽 손잡이를 끌어 순서 변경. {A} 현재 턴 · {X}{Y} 랜덤 2인 · {Z} 나머지 중 1인 · {R}{L} 오른쪽/왼쪽 사람"),this.listEl),S("div",{class:"panel__foot"},S("button",{class:"btn btn--secondary btn--sm",type:"button",style:{flex:1},onClick:()=>this.openIO("export")},"내보내기"),S("button",{class:"btn btn--secondary btn--sm",type:"button",style:{flex:1},onClick:()=>this.openIO("import")},"가져오기"),S("button",{class:"btn btn--ghost btn--sm",type:"button",onClick:()=>this.reset()},"기본값"))),this.formEl=S("div",{class:"panel",style:{zIndex:46},role:"dialog","aria-label":"미션 편집"}),this.ioEl=S("div",{class:"panel",style:{zIndex:46},role:"dialog","aria-label":"JSON"}),document.body.append(this.el,this.formEl,this.ioEl),Tt.subscribe(()=>{this.el.classList.contains("is-on")&&this.render()})}open(){this.el.classList.add("is-on"),this.render()}close(){this.el.classList.remove("is-on"),this.formEl.classList.remove("is-on"),this.ioEl.classList.remove("is-on")}render(){const t=Tt.pack;if(this.packBtn.replaceChildren(S("span",{},S("span",{class:"label"},"팩 "),S("strong",{},t.name),S("small",{},`미션 ${t.missions.length}개 · 팩 ${Tt.get().packs.length}개`)),S("span",{html:qe.chevron})),this.tabsEl.replaceChildren(...gq.map(n=>{const s=n==="wild"?(t.wild||[]).length:t.missions.length;return S("button",{class:"tabs__btn",type:"button",role:"tab","aria-pressed":String(this.tab===n),"aria-selected":String(this.tab===n),onClick:()=>{this.tab=n,this.render()}},n==="wild"?"와일드":"미션",S("span",{class:"cnt"},String(s)))})),this.tab==="wild")return this.renderWild(t);const e=t.missions.map(n=>this.row(n));this.listEl.replaceChildren(...e.length?e:[S("p",{class:"muted",style:{textAlign:"center",padding:"24px 0"}},"미션이 없다. + 로 추가.")])}row(t){const e=S("div",{class:`mrow ${t.enabled===!1?"is-disabled":""}`,"data-id":t.id},S("div",{class:"mrow__handle",html:qe.grip,"aria-label":"순서 변경 손잡이"}),S("button",{class:"mrow__main",type:"button",onClick:()=>this.openForm(t)},S("div",{class:"mrow__top"},t.tag?S("span",{class:`mrow__tag ${/[가-힣]/.test(t.tag)?"mrow__tag--ko":""}`},t.tag):null,S("span",{class:`mrow__type mrow__type--${t.type}`},Cs[t.type]||t.type),t.touch?S("span",{class:"mrow__type",html:qe.touch,title:"touch",style:{display:"inline-flex",width:"22px",height:"18px",padding:"0",alignItems:"center",justifyContent:"center"}}):null,t.timer?S("span",{class:"mrow__type"},`${t.timer}s`):null,t.options?.length?S("span",{class:"mrow__type"},`${t.options.length} opt`):null),S("div",{class:"mrow__text"},t.text)),S("button",{class:"mrow__more",type:"button","aria-label":"더보기",html:qe.more,onClick:()=>this.rowMenu(t)}));return this.bindDrag(e),e}async rowMenu(t){const e=await yr(t.tag,[{label:"수정",value:"edit"},{label:"복제",value:"dup"},{label:t.enabled===!1?"켜기":"끄기",value:"toggle"},{label:"삭제",value:"del",danger:!0}]);if(e){if(e==="edit")return this.openForm(t);if(e==="dup")return Tt.setPackMissions(xq(Tt.pack.missions,t.id,{...t,id:Bi("m"),tag:`${t.tag} 2`}));if(e==="toggle")return Tt.setPackMissions(Tt.pack.missions.map(n=>n.id===t.id?{...n,enabled:n.enabled===!1}:n));e==="del"&&await Bn(`"${t.tag}" 삭제?`,"삭제")&&Tt.setPackMissions(Tt.pack.missions.filter(n=>n.id!==t.id))}}bindDrag(t){const e=t.querySelector(".mrow__handle");e.addEventListener("pointerdown",n=>{n.preventDefault(),e.setPointerCapture(n.pointerId),t.classList.add("is-dragging");let s=null;const r=o=>{const l=document.elementFromPoint(o.clientX,o.clientY)?.closest(".mrow");if(!l||l===t)return;const V=l.getBoundingClientRect();o.clientY<V.top+V.height/2?l.before(t):l.after(t),s?.classList.remove("is-over"),s=l,s.classList.add("is-over")},a=()=>{e.removeEventListener("pointermove",r),e.removeEventListener("pointerup",a),e.removeEventListener("pointercancel",a),t.classList.remove("is-dragging"),s?.classList.remove("is-over");const o=[...this.listEl.querySelectorAll(".mrow")].map(l=>l.dataset.id);this.commitOrder(o)};e.addEventListener("pointermove",r),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a)})}commitOrder(t){const e=Tt.pack.missions,n=t.map(s=>e.find(r=>r.id===s)).filter(Boolean);n.length===e.length&&Tt.setPackMissions(n)}renderWild(t){const e=(t.wild||[]).map(n=>{const s=S("button",{class:"switch",type:"button",role:"switch","aria-checked":String(n.enabled!==!1),"aria-label":n.tag,onClick:()=>{Tt.update(r=>{const o=r.packs.find(l=>l.id===r.activePackId).wild.find(l=>l.id===n.id);o.enabled=o.enabled===!1})}});return S("div",{class:"mrow",style:{gridTemplateColumns:"1fr auto"}},S("button",{class:"mrow__main",type:"button",onClick:()=>this.openWildForm(n)},S("div",{class:"mrow__top"},S("span",{class:"mrow__tag"},n.tag),S("span",{class:"mrow__type"},n.kind)),S("div",{class:"mrow__text"},n.text)),s)});this.listEl.replaceChildren(S("p",{class:"muted",style:{fontSize:"12px",margin:"0 0 4px"}},"WILD 블록은 전체의 약 5%. 숨겨져 있다. 룰의 종류는 고정, 문구는 수정 가능."),...e)}openWildForm(t){const e={tag:xs("이름",t.tag),text:Ms("문구",t.text),description:Ms("설명",t.description)};this.formEl.replaceChildren(S("div",{class:"panel__head"},S("button",{class:"btn--icon",type:"button","aria-label":"뒤로",html:qe.back,onClick:()=>this.formEl.classList.remove("is-on")}),S("div",{class:"panel__title panel__title--ko"},"와일드 룰")),S("div",{class:"panel__body form","data-lenis-prevent":""},e.tag.wrap,e.text.wrap,e.description.wrap),S("div",{class:"panel__foot"},S("button",{class:"btn btn--primary",type:"button",onClick:()=>{Tt.update(n=>{const r=n.packs.find(a=>a.id===n.activePackId).wild.find(a=>a.id===t.id);r.tag=e.tag.input.value.trim()||r.tag,r.text=e.text.input.value.trim(),r.description=e.description.input.value.trim()}),this.formEl.classList.remove("is-on"),De("저장됨")}},"저장"))),this.formEl.classList.add("is-on")}openForm(t){const e=!t,n=t||{id:Bi("m"),type:"action",tag:"",text:"",description:"",touch:!1,weight:1,enabled:!0,options:[],timer:0},s={tag:xs("이름 (선택 · 한글이면 카드에 표시)",n.tag,{placeholder:"예: 감독의 컷"}),type:vq("유형",n.type,el.filter(V=>V!=="wild").map(V=>[V,Cs[V]])),text:Ms("미션 문구",n.text,{placeholder:"{X}와 {Y}는 미션을 수행하고 {Z}는 감독 역할."}),description:Ms("성공 조건 · 설명",n.description),touch:xr("신체 접촉",!!n.touch),failable:xr("실패 버튼 · 실패하면 벌주",!!n.failable),timer:xs("타이머 (초, 0 = 없음)",n.timer||0,{type:"number",inputmode:"numeric",min:0}),weight:xs("등장 가중치",n.weight||1,{type:"number",inputmode:"numeric",min:1}),enabled:xr("사용",n.enabled!==!1)},r=S("div",{class:"opt-list"}),a=V=>r.replaceChildren(...V.map((h,u)=>S("div",{class:"field"},S("span",{class:"badge"},String(u+1)),S("input",{type:"text",value:h,"aria-label":`문장 ${u+1}`,onInput:c=>{V[u]=c.target.value}}),S("button",{class:"btn--icon",type:"button","aria-label":"삭제",html:qe.x,onClick:()=>{V.splice(u,1),a(V)}})))),o=[...n.options||[]];a(o);const l=()=>{const V=Qo({id:n.id,tag:s.tag.input.value,type:s.type.input.value,text:s.text.input.value,description:s.description.input.value,touch:s.touch.get(),failable:s.failable.get(),timer:+s.timer.input.value||0,weight:+s.weight.input.value||1,enabled:s.enabled.get(),options:o.map(u=>u.trim()).filter(Boolean)});if(!V.text){De("미션 문구는 비울 수 없다"),s.text.input.focus();return}const h=Tt.pack.missions;Tt.setPackMissions(e?[...h,V]:h.map(u=>u.id===V.id?V:u)),this.tab="missions",this.formEl.classList.remove("is-on"),De(e?"추가됨":"저장됨")};this.formEl.replaceChildren(S("div",{class:"panel__head"},S("button",{class:"btn--icon",type:"button","aria-label":"뒤로",html:qe.back,onClick:()=>this.formEl.classList.remove("is-on")}),S("div",{class:"panel__title panel__title--ko"},e?"새 미션":"미션 수정"),e?null:S("button",{class:"btn btn--danger btn--sm",type:"button",onClick:async()=>{await Bn(`"${n.tag}" 삭제?`,"삭제")&&(Tt.setPackMissions(Tt.pack.missions.filter(V=>V.id!==n.id)),this.formEl.classList.remove("is-on"))}},"삭제")),S("div",{class:"panel__body form","data-lenis-prevent":""},s.tag.wrap,s.type.wrap,s.text.wrap,S("p",{class:"hint"},"치환: ",S("code",{},"{A}")," 현재 턴 · ",S("code",{},"{X}")," ",S("code",{},"{Y}")," 랜덤 2인 · ",S("code",{},"{Z}")," 나머지 중 1인(감독) · ",S("code",{},"{R}")," ",S("code",{},"{L}")," 오른쪽/왼쪽 사람. DUO는 {X}{Y}, ACTION/STORY/QUESTION은 {A}+{X}, GROUP은 전원."),s.description.wrap,S("div",{class:"form",style:{gap:"6px"}},S("span",{class:"label"},"문장 선택지 (귓속말용, 선택)"),r,S("button",{class:"btn btn--secondary btn--sm",type:"button",onClick:()=>{o.length<6&&(o.push(""),a(o))}},"+ 문장 추가")),s.touch.wrap,s.failable.wrap,s.enabled.wrap,S("div",{class:"two"},s.timer.wrap,s.weight.wrap)),S("div",{class:"panel__foot"},S("button",{class:"btn btn--primary",type:"button",onClick:l},e?"추가":"저장"))),this.formEl.classList.add("is-on"),setTimeout(()=>s[e?"tag":"text"].input.focus({preventScroll:!0}),300)}async packMenu(){const t=Tt.get(),e=await yr("미션 팩",[...t.packs.map(n=>({label:`${n.id===t.activePackId?"● ":""}${n.name}`,value:`use:${n.id}`})),{label:"새 팩 (기본값 복사)",value:"new"},{label:"현재 팩 복제",value:"dup"},{label:"이름 바꾸기",value:"rename"},...t.packs.length>1?[{label:"현재 팩 삭제",value:"del",danger:!0}]:[]]);if(e){if(e.startsWith("use:"))return Tt.set({activePackId:e.slice(4)});if(e==="new"){const n=prompt("팩 이름","내 팩");n&&Tt.addPack(n.slice(0,24));return}if(e==="dup"){const n=prompt("팩 이름",`${Tt.pack.name} 복사본`);n&&Tt.addPack(n.slice(0,24),Tt.pack);return}if(e==="rename"){const n=prompt("새 이름",Tt.pack.name);n&&Tt.update(s=>{s.packs.find(r=>r.id===s.activePackId).name=n.slice(0,24)});return}e==="del"&&await Bn(`"${Tt.pack.name}" 팩 삭제?`,"삭제")&&Tt.deletePack(Tt.pack.id)}}async reset(){await Bn(`"${Tt.pack.name}" 팩의 모든 미션을 기본값으로 되돌릴까? 직접 만든 미션은 사라진다.`,"기본값 복구")&&(Tt.resetActivePack(),De("기본값 복구됨"))}openIO(t){const e=S("textarea",{class:"io-area","aria-label":"미션팩 데이터",spellcheck:"false"});t==="export"?e.value=Tt.exportPack():e.placeholder="여기에 붙여넣기 또는 파일 열기",e.readOnly=t==="export";const n=S("input",{type:"file",accept:".json,application/json",class:"sr-only",onChange:async o=>{const l=o.target.files[0];l&&(e.value=await l.text())}}),s=o=>{try{const l=Tt.importPack(e.value,{replace:o});De(o?"현재 팩 덮어씀":`"${l.name}" 팩 추가됨`),this.ioEl.classList.remove("is-on")}catch(l){De(`가져오기 실패: ${l.message}`,2600)}},r=async()=>{try{await navigator.clipboard.writeText(e.value),De("클립보드에 복사됨")}catch{e.focus(),e.select(),document.execCommand("copy"),De("복사됨")}},a=()=>{const o=S("a",{href:URL.createObjectURL(new Blob([e.value],{type:"application/json"})),download:`boiler-game-${Tt.pack.name.replace(/\s+/g,"_").toLowerCase()}.json`});document.body.append(o),o.click(),o.remove()};this.ioEl.replaceChildren(S("div",{class:"panel__head"},S("button",{class:"btn--icon",type:"button","aria-label":"뒤로",html:qe.back,onClick:()=>this.ioEl.classList.remove("is-on")}),S("div",{class:"panel__title panel__title--ko"},t==="export"?"내보내기":"가져오기")),S("div",{class:"panel__body","data-lenis-prevent":""},S("p",{class:"muted",style:{fontSize:"13px",margin:0}},t==="export"?"현재 미션팩 전체. 복사해서 친구에게 보내거나 파일로 저장.":"다른 사람이 만든 미션팩을 불러온다. 새 팩으로 추가하거나 현재 팩을 덮어쓴다."),e,n),S("div",{class:"panel__foot"},...t==="export"?[S("button",{class:"btn btn--primary btn--sm",type:"button",style:{flex:1},onClick:r},"클립보드 복사"),S("button",{class:"btn btn--secondary btn--sm",type:"button",style:{flex:1},onClick:a},"파일 저장")]:[S("button",{class:"btn btn--secondary btn--sm",type:"button",onClick:()=>n.click()},"파일 열기"),S("button",{class:"btn btn--primary btn--sm",type:"button",style:{flex:1},onClick:()=>s(!1)},"새 팩으로"),S("button",{class:"btn btn--secondary btn--sm",type:"button",style:{flex:1},onClick:async()=>{await Bn("현재 팩을 덮어쓸까?","덮어쓰기")&&s(!0)}},"덮어쓰기")])),this.ioEl.classList.add("is-on")}}function xs(i,t,e={}){const n=S("input",{type:"text",value:String(t??""),...e});return{wrap:S("label",{},S("span",{},i),n),input:n}}function Ms(i,t,e={}){const n=S("textarea",{...e});return n.value=t||"",{wrap:S("label",{},S("span",{},i),n),input:n}}function vq(i,t,e){const n=S("select",{},...e.map(([s,r])=>S("option",{value:s,selected:s===t},r)));return{wrap:S("label",{},S("span",{},i),n),input:n}}function xr(i,t){const e=S("button",{class:"switch",type:"button",role:"switch","aria-checked":String(t),"aria-label":i,onClick:()=>e.setAttribute("aria-checked",String(e.getAttribute("aria-checked")!=="true"))});return{wrap:S("div",{class:"toggle"},S("span",{},i),e),get:()=>e.getAttribute("aria-checked")==="true"}}function xq(i,t,e){const n=i.findIndex(r=>r.id===t),s=[...i];return s.splice(n+1,0,e),s}class Mq{constructor(){this.el=S("div",{class:"consent",role:"dialog","aria-modal":"true","aria-labelledby":"consent-title"},S("div",{class:"consent__card"},S("div",{class:"label"},"시작 전에 한 번만"),S("h2",{class:"h2",id:"consent-title"},"이 게임은 성인용이지만, 강요 게임이 아니다."),S("ul",{class:"consent__list"},S("li",{},"전원 성인(19+)이고 자발적으로 참여한다."),S("li",{},"신체 접촉 미션은 당사자 둘 다 동의할 때만. 나머지 사람에게는 항상 감독·심판 역할이 있다."),S("li",{},"누구나 PASS 가능. 설명 필요 없음. PASS에 벌칙 없음."),S("li",{},'벌주는 "한 모금"이 기본. 원샷 강요 금지. 설정에서 벌주 모드를 끌 수 있다.')),S("button",{class:"btn btn--primary",type:"button",onClick:()=>this.accept()},"알겠다. 시작."))),document.body.append(this.el)}show(){return new Promise(t=>{this.res=t,this.el.classList.add("is-on"),this.el.querySelector("button").focus()})}accept(){Tt.update(t=>{t.settings.consentSeen=!0}),this.el.classList.remove("is-on"),this.res?.(!0)}}new KV({autoRaf:!0,autoToggle:!0,anchors:!0});const Sq=document.getElementById("app");async function Eq(){await Tt.ready;const i=new Mq,t=new _q,e=new mq({onOpenEditor:()=>t.open(),onConsent:()=>i.show()}),n=o=>document.querySelectorAll(".screen").forEach(l=>l.classList.toggle("is-active",l.id===o)),s=new qq({onSettings:()=>e.open(),onGameOver:o=>{r.render(o),n("screen-over")},onHome:()=>n("screen-start")}),r=new Aq({onAgain:()=>{s.start(s.players),n("screen-game")},onHome:()=>{a.sync(),n("screen-start")}}),a=new Sl({onSettings:()=>e.open(),onStart:async o=>{Pe.unlock(),Tt.get().settings.consentSeen||await i.show(),s.start(o),n("screen-game")}});e.onClose=()=>{document.getElementById("screen-start").classList.contains("is-active")&&a.sync()},Sq.append(a.el,s.el,r.el),n("screen-start")}Eq();"serviceWorker"in navigator&&addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
