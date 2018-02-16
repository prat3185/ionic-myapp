

  $(function(){
    /*global variables*/
    var scene, camera, renderer;
    var controls, guiControls, datGUI;
    var stats;
    var spotLight, hemi;
    var SCREEN_WIDTH, SCREEN_HEIGHT;
    var loader, model;
	 var config = {
    apiKey: "AIzaSyDo1Jz7FTyOxmkdw3B2IixfSNxQJiGpvnw",
    authDomain: "test-eefa2.firebaseapp.com",
    databaseURL: "https://test-eefa2.firebaseio.com",
    projectId: "test-eefa2",
    storageBucket: "test-eefa2.appspot.com",
    messagingSenderId: "334050492647"
  };
    firebase.initializeApp(config);
  
   const container=document.getElementById("object");
   const dataref=firebase.database().ref().child('object');
   console.log(dataref);
   
    

//    function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//       if ((new Date().getTime() - start) > milliseconds){
//         break;
//       }
//     }
//   }
      
//    for(var i=0;i<360;i++){
//     dataref.update({"angle3":i});
//     sleep(2000);
//     }
    
 

 

    function init(){
        /*creates empty scene object and renderer*/
        scene = new THREE.Scene();
        camera =  new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 500);
        renderer = new THREE.WebGLRenderer({antialias:true});
        
        renderer.setClearColor(0x333300);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled= true;
        renderer.shadowMapSoft = true;
        
        /*add controls*/
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render );
                    
        camera.position.x = 200;
        camera.position.y = 200;
        camera.position.z = 200;    
        camera.lookAt(scene.position);

     
        //add some nice lighting
        hemi = new THREE.HemisphereLight( 0xff0090, 0xff0011 );
        scene.add(hemi);
        //add some fog
        scene.fog = new THREE.Fog( 0xffff90, .01, 500 );
  
        loader = new THREE.ColladaLoader();
        loader.load( 'https://cdn.rawgit.com/wpdildine/wpdildine.github.com/master/models/cylinder.json', addModel );
        
     
        $("#webGL-container").append(renderer.domElement);
        
        stats = new Stats();        
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';     
        $("#webGL-container").append( stats.domElement );
    }
    var set;
    var helpset;
    var scaleVal = 5;
    function addModel( geometry,  materials ){
  
            materials[0].skinning = true;

            var cs = scaleVal;
            
            set= new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(materials) );
            set.position.set(50,50,50);
            set.scale.set (cs, cs, cs);
            set.castShadow = true;
            set.receiveShadow = true;
            
            scene.add(set);
            helpset= new THREE.SkeletonHelper(set);
           // scene.add(helpset);
           
        }    

      
    function render() { 
    
        
        scene.traverse(function(child){
            if (child instanceof THREE.SkinnedMesh){  
                
              //  child.rotation.y += .01;
                
  dataref.on('value',snap=>{
                child.skeleton.bones[0].rotation.z = snap.val().angle1;
                child.skeleton.bones[1].rotation.z = snap.val().angle2;
                child.skeleton.bones[2].rotation.z = snap.val().angle3;
                child.skeleton.bones[3].rotation.z = snap.val().angle4;
				});                
            }
            else if  (child instanceof THREE.SkeletonHelper){
                child.update();
            }
        }); 

    }
    
    function animate(){
        requestAnimationFrame(animate);
        render();
        stats.update();     
        renderer.render(scene, camera);
    }
    
    init();
    animate();
    
    $(window).resize(function(){
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    });
    }); 