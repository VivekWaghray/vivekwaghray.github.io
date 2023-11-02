function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,_toPropertyKey(n.key),n)}}function _createClass(t,i,e){return i&&_defineProperties(t.prototype,i),e&&_defineProperties(t,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function _toPropertyKey(t){var i=_toPrimitive(t,"string");return"symbol"===_typeof(i)?i:String(i)}function _toPrimitive(t,i){if("object"!==_typeof(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,i||"default");if("object"!==_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===i?String:Number)(t)}var particleArray,canvas=document.getElementById("canvas1"),ctx=canvas.getContext("2d");ctx.canvas.width=window.innerWidth,ctx.canvas.height=window.innerHeight;var Particle=function(){function t(i,e,n,r,a,o){_classCallCheck(this,t),this.x=i,this.y=e,this.directionX=n,this.directionY=r,this.size=a,this.color=o,this.speedX=this.directionX,this.speedY=this.directionY}return _createClass(t,[{key:"draw",value:function(){ctx.beginPath(),ctx.arc(this.x,this.y,this.size,0,2*Math.PI,!1),ctx.fillStyle="#DB93B0",ctx.fill()}},{key:"update",value:function(){(this.x>canvas.width||this.x<0)&&(this.directionX=-this.directionX,this.speedX=this.directionX),(this.y+this.size>canvas.height||this.y-this.size<0)&&(this.directionY=-this.directionY,this.speedY=this.directionY),this.x+=this.directionX,this.y+=this.directionY,this.draw()}}]),t}();function init(){particleArray=[];for(var t=canvas.height*canvas.width/9e3,i=0;i<t;i++){var e=20*Math.random()+1,n=Math.random()*(innerWidth-2*e-2*e)+2*e,r=Math.random()*(innerHeight-2*e-2*e)+2*e,a=2*Math.random()-1,o=2*Math.random()-1;particleArray.push(new Particle(n,r,a,o,e,"black"))}}function animate(){requestAnimationFrame(animate),ctx.clearRect(0,0,innerWidth,innerHeight);for(var t=0;t<particleArray.length;t++)particleArray[t].update()}init(),animate(),window.addEventListener("resize",(function(){canvas.width=innerWidth,canvas.height=innerHeight,init()}));