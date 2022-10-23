import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Loading() {
  const ref1 = useRef()  
  const ref2 = useRef()
  const ref3 = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref1.current.position.y = Math.sin(t * 3) / 3
    ref2.current.position.y = Math.sin(t * 3 + 1) / 3
    ref3.current.position.y = Math.sin(t * 3 + 2) / 3
  })
  return (
      <group>
        <ambientLight intensity={0.7}/>
          <mesh ref={ref1} position={[-0.5,0,-5]} scale={0.2}>
            <sphereGeometry />
            <meshStandardMaterial color={'hotpink'} />  
        </mesh>
          <mesh ref={ref2} position={[0, 0, -5]} scale={0.2}>
            <sphereGeometry />
            <meshStandardMaterial color={'yellow'} />  
        </mesh>
        <mesh ref={ref3} position={[0.5, 0, -5]} scale={0.2}>
            <sphereGeometry  />
            <meshStandardMaterial color={'green'} />  
          </mesh>
    </group>
  );
}

export default Loading;
