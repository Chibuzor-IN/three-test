!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var o=new function e(t,n,o,i,r,s){var a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.onProgress=function(e){e.lengthComputable&&(e.loaded,e.total)},this.onError=function(e){},this.setObject=function(e,t){THREE.Loader.Handlers.add(/\.dds$/i,new THREE.DDSLoader),(new THREE.MTLLoader).load(e,function(e){e.preload(),(new THREE.OBJLoader).setMaterials(e).load(t,function(e){e.position.y=-95,a.scene.add(e),a.object=e},a.onProgress,a.onError)})},this.setRotation=function(e){a.object.rotation.y+=e},this.onLeave=function(e){a.domContainer.removeEventListener("mousemove",a.onMouseMove),a.domContainer.removeEventListener("mouseup",a.onDragEnd)},this.onDragEnd=function(e){a.mouseMoved?window.setTimeout(function(){a.domContainer.removeEventListener("mousemove",a.onMouseMove),a.domContainer.removeEventListener("mouseleave",a.onLeave),a.sensitivity=5e-5},2e3):(a.domContainer.removeEventListener("mousemove",a.onMouseMove),a.domContainer.removeEventListener("mouseleave",a.onLeave)),a.mouseMoved=!1,a.domContainer.removeEventListener("mouseup",a.onDragEnd)},this.onMouseMove=function(e){var t=e.clientX,n=(t-a.startPosition)*a.sensitivity;a.setRotation(n),a.startPosition=t,a.mouseMoved=!0},this.onDragStart=function(e){a.startPosition=e.clientX,a.sensitivity=.005,a.domContainer.addEventListener("mouseleave",a.onLeave),a.domContainer.addEventListener("mousemove",a.onMouseMove),a.domContainer.addEventListener("mouseup",a.onDragEnd)},this.animate=function(){a.domContainer.addEventListener("mousedown",a.onDragStart),requestAnimationFrame(a.animate),a.render()},this.render=function(){a.camera.lookAt(a.scene.position),a.renderer.render(a.scene,a.camera)},this.startPosition=0,this.mouseMoved=!1,this.sensitivity=r||.005,this.domContainer=t,this.backgroundColor=s||16777215,this.width=o||t.offsetWidth,this.height=n||t.offsetHeight,this.cameraDistance=i||250,this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,1,2e3),this.camera.position.z=this.cameraDistance,this.scene=new THREE.Scene,this.scene.background=new THREE.Color(this.backgroundColor);var d=new THREE.AmbientLight(13421772,.4);this.scene.add(d);var u=new THREE.PointLight(16777215,.8);this.camera.add(u),this.scene.add(this.camera),this.renderer=new THREE.WebGLRenderer,this.renderer.setSize(this.width,this.height),this.domContainer.appendChild(this.renderer.domElement)}(document.getElementById("scene"),600,800);o.setObject("male02_dds.mtl","male02.obj"),o.animate()}]);