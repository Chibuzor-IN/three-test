// var container, stats;
var target = document.getElementById("scene");
// var camera, scene, renderer;

class Spinner {
	constructor(domContainer, height, width, cameraDistance, sensitivity, backgroundColor){
		this.startPosition = 0
		// this.mouseMoved = false
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
		// THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
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
		// THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
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
		new THREE.MTLLoader()
			.load(materialURL , (material) => {				
				material.preload();			
				var materialObjects = Object.keys(material.materials)

				var count = 0
				this.object.traverse((child) => {
					if( child instanceof THREE.Mesh ){
						child.material = material.materials[materialObjects[count]]						
						count += 1
						if (count == materialObjects.length){
							return
						}
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

	changeTexture = (textureURL) => {
		// var count = 0
		this.object.traverse((child) => {
			if( child instanceof THREE.Mesh ){				
				var loader = new THREE.TextureLoader();

				var texture = loader.load( textureURL, (texture) => {
					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					texture.offset.set( 0, 0 );
					texture.repeat.set( 2, 2 );
				} );
				
				if(child.material instanceof Array){
					for(let item in child.material){
						child.material[item].needsUpdate = true
						child.material[item].map = texture
					}					
				}
				else{
					child.material.needsUpdate = true
					child.material.map = texture
				}
				
				// count += 1
				// if (count == materialObjects.length){
				// 	return
				// }
			}
		})
	}

	setRotation = (rotation) => {
		this.object.rotation.y += rotation;
	}

	onLeave = (event) => {
		this.domContainer.removeEventListener("mousemove", this.onMouseMove)
		this.domContainer.removeEventListener("mouseup", this.onDragEnd)
	}
	
	onDragEnd = (event) => {		
		this.domContainer.removeEventListener("mousemove", this.onMouseMove)
		this.domContainer.removeEventListener("mouseleave", this.onLeave)		
		this.domContainer.removeEventListener("mouseup", this.onDragEnd) 
		
		if (this.moved){
			var continueRotation = true
			window.setTimeout(()=>{
				continueRotation = false
				this.moved = false
			}, 500)
			const rotationDelay = () => {
				if(continueRotation){
					this.setRotation(this.rotation)
					requestAnimationFrame(rotationDelay)
				}			
			}
			rotationDelay()
		}
		else{
			this.moved = false
		}
	}            
	
	onMouseMove = (event) => {
		var currentPosition = event.clientX
		var rotation = (currentPosition - this.startPosition)*this.sensitivity

		this.moved = true
		
		this.setRotation(rotation)
		this.rotation = rotation
		this.startPosition = currentPosition
	}
	
	onDragStart = (event) => {
		this.startPosition = event.clientX
		this.sensitivity = 0.005
		this.moved = false

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
window.spinner = new Spinner(target, 600, 800, 200)
// spinner.setObject("CAMISA YA 2.mtl","CAMISA YA 2.obj")
spinner.setObject("shirt_dolmanv1_b_39kpolys.mtl","shirt_dolmanv1_b_39kpolys.obj")
spinner.animate()
