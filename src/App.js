import styled from 'styled-components'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
import { useEffect, useState } from 'react'
import git3d from './gltf/git3d.gltf'

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
  align-items: center;
  justify-content: center;
` 

function App() {
  const width = Number(document.querySelector('#root').clientWidth) - 16;
  const height = Number(document.querySelector('#root').clientHeight) - 16;
  const [scroll,setScroll] = useState(0);
  useEffect(()=>{
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({
      canvas:document.querySelector('#canvas'),
      antialias:true
    })
    let camera = new THREE.PerspectiveCamera(32,1);
    camera.position.set(0,0,300);
    scene.background = new THREE.Color('white');
    let light = new THREE.DirectionalLight(0xC0C0C0,3);
    light.position.set(0.2,1,1)
    light.castShadow = true;
    scene.add(light)
    let loader = new GLTFLoader();
    loader.load(
      git3d,
      gltf =>{
      scene.add(gltf.scene);
      setScroll(gltf.scene.rotation.z)
      gltf.scene.rotation.x = 105.7;
      setInterval(() => {
        gltf.scene.rotation.z += 0.01;
        setScroll(gltf.scene.rotation.z)
        renderer.render(scene,camera);
      }, 30);
      window.addEventListener('wheel',(e)=>{
        gltf.scene.rotation.z += Math.sqrt(Math.abs(e.deltaX)) * -0.02 * (e.deltaX > 0 ? 1 : -1);
        renderer.render(scene,camera);
      })
    })
  },[])

  return (
    <Container>
      <canvas id="canvas" width={width >= height ? height : width} height={width >= height ? height : width} ></canvas>
    </Container>
  )
}

export default App
