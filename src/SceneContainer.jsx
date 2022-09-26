import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useLoader,useThree } from '@react-three/fiber';
import { Suspense  } from 'react';
import { CubeTextureLoader } from 'three';
import Town from './Town';
import Player from './Player';

function SceneContainer() {
    const { scene } = useThree();
    const urls = ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map(name => {
        return `/textures/environment/${name}.jpg`
    })

    const options = {id:1}
    
    const [envMap] = useLoader(CubeTextureLoader, [urls])
    scene.background = envMap
    return (
        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault
                fov={45}
                aspect={window.innerWidth / window.innerHeight}
                near={10}
                far = {200000}
                position={[1500, 4000, 4500]} />
            <OrbitControls target={[1, 5, 0]} />
            <ambientLight color='#aaaaaa' />
            <directionalLight color='#aaaaaa'
                position={[30, 100, 40]}
                castShadow
                shadow-bias={0.0039}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            >
                <orthographicCamera attach='shadow-camera' args={[-500,500,500,-500,1,500]} />
            </directionalLight>
            <Town />
            <Player options={options} />
            
        </Suspense>
    );
}

export default SceneContainer;
