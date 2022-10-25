import { PerspectiveCamera,Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef} from 'react';
import Town from './Town';
import Player from './Player';


function SceneContainer() {
    const colliders = useRef(null)
    const getColliders = (collider) => {
        colliders.current = collider
    }

    useEffect(() => {
    },[])

    return (
        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault  //默认相机
                fov={45}
                aspect={window.innerWidth / window.innerHeight}
                near={50}
                far = {20000}
                position={[3530,50,-8600]} />
            <ambientLight color='#aaaaaa' />
            <directionalLight color='#aaaaaa'
                position={[30, 100, 40]}
                castShadow
                shadow-bias={0.0039}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            >
                <orthographicCamera attach='shadow-camera' args={[-5000,5000,5000,-5000,1,5000]} />
            </directionalLight>
            <Environment
                background={'only'}
                files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}
                path="/textures/environment/"
            />
            <Town getColliders={getColliders} />
            <Player colliders={colliders} />
            <mesh position={[3800, -30, -4600]}  rotation={[-Math.PI / 2, 0, 0]} >
                <planeBufferGeometry attach="geometry" args={[22000, 22000]} />
                <meshStandardMaterial attach="material" color="#b5b39c" />
            </mesh>
            {/* <axesHelper args={[16000, 16000, 16000]} /> */}
        </Suspense>
    );
}

export default SceneContainer;