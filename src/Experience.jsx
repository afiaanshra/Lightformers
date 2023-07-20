import { useFrame } from '@react-three/fiber'
import {  Lightformer,Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
console.log(Lightformer)
import { Leva, useControls } from 'leva'


export default function Experience()
{
        const cube = useRef()
    const directionalLight=useRef()
   //seHelper(directionalLight,THREE.DirectionalLightHelper,1)


    const {color,opacity,blur}=useControls('Contact shadows',{
        color:"#1d8f75",
        opacity:{value:0.4,min:0,mix:1},
        blur:{value:2.8,min:1,mix:10}
    })
    const {sunPosition}=useControls('sky',{
        sunPosition:{value:[1,2,3]}
    })
    const { envMapIntensity } = useControls('environment map', {
        envMapIntensity: { value: 1, min: 0, max: 12 }
    })
    console.log(envMapIntensity)
    
    
    useFrame((state, delta) =>
    {
        // const time=state.clock.elapsedTime
        // cube.current.position.x= 2+Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })
    return <>
        
        <Environment
           background
>
           <color args={ ['white' ] } attach="background" />
            <Lightformer position-z={ - 5 } scale={ 10 } color='red'/>
       </Environment>
        
            
         {/* //<BakeShadows /> */}
        {/* <SoftShadows frustum={ 3.75 } size={ 50 } near={ 9.5 } samples={ 17 } rings={ 11 } /> */}
                   {/* <AccumulativeShadows
                      scale={10}
                      opacity={ 0.8 }
                      color='blue'
                      position={ [ 0,- 0.99,0]}
                      frames={ Infinity}
                      temporal
                      blend={100}
                      >
                      <RandomizedLight
                      amount={ 8 }
                      radius={ 1}
                      ambient={ 0.5 }
                      intensity={ 1}
                      />
                      </AccumulativeShadows> */}
                   <ContactShadows 
                    opacity={opacity}
                    blur={blur}
                    frames={1}
                    />
               
        <OrbitControls />
        {/* // <directionalLight 
        // ref={directionalLight} 
        // position={sunPosition}
        // intensity={ 1.5 } 
        // castShadow
        // shadow-mapSize={[1024,1024]}
        // shadow-camera-near={1}
        // shadow-camera-far={10}
        // shadow-camera-top={5}
        // shadow-camera-left={5}
        // shadow-camera-bottom={-5}
        // shadow-camera-right={-5}
        // />
        // <ambientLight intensity={ 0.5 } /> 
//  */}
        <mesh castShadow position-x={ - 2 }>
    <sphereGeometry />
    <meshStandardMaterial color="orange" envMapIntensity={ envMapIntensity } />
</mesh>

<mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
    <boxGeometry />
    <meshStandardMaterial color="mediumpurple" envMapIntensity={ envMapIntensity } />
    
</mesh>


<mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
    <planeGeometry />
    <meshStandardMaterial color="greenyellow" envMapIntensity={ envMapIntensity } />
</mesh>

    </>
}