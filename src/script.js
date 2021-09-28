import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Scene } from 'three'

import horizontalGridVertexShader from './shaders/horizontalGrid/vertex.glsl'
import horizontalGridFragmentShader from './shaders/horizontalGrid/fragment.glsl'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
// /**
//  * Base
//  */
// // Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('rebeccapurple')
// scene.fog = new THREE.Fog('white',1,1000);



const light = new THREE.AmbientLight( 0xFFFFFF );
scene.add(light)

//Terrain (two meshes)

var audioFiles = [0,0,0]

function placeSpectrograms(audioFiles){
    
}

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 'red'});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
scene.add(cube)

/*const sphereGeometry = new THREE.SphereGeometry(1,32,16);
const sphereMaterial = new THREE.MeshBasicMaterial({color: 'cyan'});
const sphere = new THREE.Mesh(sphereGeometry , sphereMaterial)
scene.add(sphere)*/


const torusGeometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const torusMaterial = new THREE.MeshBasicMaterial( { color: 'cyan',wireframe: true } );
const torusKnot = new THREE.Mesh( torusGeometry, torusMaterial )
scene.add( torusKnot )


const geometry = new THREE.PlaneGeometry( 100, 100 );
const horizontalGridMaterial = new THREE.ShaderMaterial({
    vertexShader: horizontalGridVertexShader,
    fragmentShader: horizontalGridFragmentShader,
    transparent: true,
})


const floorPlane = new THREE.Mesh( geometry, horizontalGridMaterial );
// plane.rotation.y += Math.PI/2
floorPlane.rotation.x -= Math.PI/2
scene.add( floorPlane );

scene.add(new THREE.AxesHelper())

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -5
camera.position.y = 3.0
camera.lookAt(0,0,0)
// camera.position.x = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.xr.enabled = true;
document.body.appendChild( VRButton.createButton( renderer ) );


/**
 * Animate
 */
const clock = new THREE.Clock()
let delta = 0;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()
    delta += clock.getDelta();
	cube.position.x = 10 * Math.sin(elapsedTime);
	cube.position.y = 3 * Math.sin(elapsedTime);
    //material.uniforms.uTime.value = elapsedTime;
}

tick()



renderer.setAnimationLoop( function () {
    tick()
	renderer.render( scene, camera );

} );


