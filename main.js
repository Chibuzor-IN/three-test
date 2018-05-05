// var container, stats;
var target = document.getElementById("scene");
// var camera, scene, renderer;

class Spinner {
	constructor(domContainer, height, width, cameraDistance, sensitivity, backgroundColor){
		this.startPosition = 0
		this.mouseMoved = false
		this.sensitivity = sensitivity || 0.005

		this.domContainer = domContainer
		this.backgroundColor = backgroundColor || 0xffffff 

		this.width = width || domContainer.offsetWidth
		this.height = height || domContainer.offsetHeight
		this.cameraDistance = cameraDistance || 250

		this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 2000 );
		this.camera.position.z = this.cameraDistance
		
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(this.backgroundColor)

		var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4 );
		this.scene.add( ambientLight );

		var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
		this.camera.add(pointLight);
		
		this.scene.add(this.camera);				
		
		this.renderer = new THREE.WebGLRenderer();
		
		this.renderer.setSize(this.width, this.height );
		
		this.domContainer.appendChild(this.renderer.domElement);
		THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
	}

	onProgress = (xhr) => {

		if ( xhr.lengthComputable ) {

			var percentComplete = xhr.loaded / xhr.total * 100;						
		}

	};

	onError = (xhr) => {

	}

	setObject = (materialURL, objectURL) => {
		this.materialURL = materialURL
		this.objectURL = objectURL
		THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
		new THREE.MTLLoader()
			.load(materialURL , (materials) => {
				materials.preload();
				new THREE.OBJLoader()
					.setMaterials(materials)
					.load(objectURL, (object) => {
						object.position.y = - 95;														
						this.scene.add(object);
						this.object = object
					}, this.onProgress, this.onError );
			} );
	}

	changeMaterial = (materialURL) => {
		// this.materialURL = materialURL
		// this.scene.remove(this.object)
		// this.setObject(this.materialURL, this.objectURL)
		new THREE.MTLLoader()
			.load(materialURL , (materials) => {
				window.x = materials
				materials.preload();				
				spinner.object.traverse((child) => {
					if( child instanceof THREE.Mesh ){
						child.material = window.x.create("FrontColorNoCullingID_male-02-1noCulling.JP")
					}
				})
			} );
	}

	changeObject = (objectURL) => {
		this.objectURL = objectURL
		this.scene.remove(this.object)
		this.setObject(this.materialURL, this.objectURL)	
		// new THREE.OBJLoader()					
		// 			.load(objectURL, (object) => {
		// 				object.position.y = - 95;														
		// 				this.scene.add(object);
						
		// 				this.object = object
		// 			}, this.onProgress, this.onError );
	}

	setRotation = (rotation) => {
		this.object.rotation.y += rotation;									
	}

	onLeave = (event) => {
		this.domContainer.removeEventListener("mousemove", this.onMouseMove)
		this.domContainer.removeEventListener("mouseup", this.onDragEnd)
	}
	
	onDragEnd = (event) => {
		// console.log(this.mouseMoved)
		if(this.mouseMoved){
			window.setTimeout(() => {
				this.domContainer.removeEventListener("mousemove", this.onMouseMove)
				this.domContainer.removeEventListener("mouseleave", this.onLeave)
				this.sensitivity = 0.00005
			}, 2000)  			
		}
		else{
			this.domContainer.removeEventListener("mousemove", this.onMouseMove)
			this.domContainer.removeEventListener("mouseleave", this.onLeave)
		}
		
		this.mouseMoved = false
		this.domContainer.removeEventListener("mouseup", this.onDragEnd)                
	}            
	
	onMouseMove = (event) => {
		var currentPosition = event.clientX
		var rotation = (currentPosition - this.startPosition)*this.sensitivity
		
		this.setRotation(rotation)
		
		this.startPosition = currentPosition
		this.mouseMoved = true
		// console.log("Moved")
	}
	
	onDragStart = (event) => {
		this.startPosition = event.clientX
		this.sensitivity = 0.005
	
		this.domContainer.addEventListener("mouseleave", this.onLeave)
		this.domContainer.addEventListener("mousemove", this.onMouseMove)
		this.domContainer.addEventListener("mouseup", this.onDragEnd)
	}
	
	
	animate = () => {
		this.domContainer.addEventListener("mousedown", this.onDragStart);
		
		requestAnimationFrame(this.animate);
		this.render();
	}

	render = () => {
		this.camera.lookAt( this.scene.position );
	
		this.renderer.render( this.scene, this.camera );
	
	}
}   
window.Spinner = Spinner
window.spinner = new Spinner(target, 600, 800)
spinner.setObject("male02_dds.mtl","male02.obj")
spinner.animate()
// spinner.setObject("male02.obj")



window.setTimeout(() => {	
	spinner.object.traverse((child) => {
		if( child instanceof THREE.Mesh ){
			window.y = child.material
		}
	})
	// spinner.changeObject("male02.obj")
	spinner.changeMaterial("male02_dds.mtl")
	console.log("Hello")
}, 2000)