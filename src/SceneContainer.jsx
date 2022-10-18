import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useLoader,useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef} from 'react';
import { CubeTextureLoader,Vector3 } from 'three';
import Town from './Town';
import Player from './Player';
import { useSnapshot } from "valtio";
import store from './store/Store';

function SceneContainer() {
    const { scene } = useThree();
    const urls = ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map(name => {
        return `/textures/environment/${name}.jpg`
    })
    const [envMap] = useLoader(CubeTextureLoader, [urls])
    scene.background = envMap

    useEffect(() => {
        // moveBox(snap.camera,snap.player);
        // console.log(snap.camera,snap.player);
    },[])

    return (
        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault  //默认相机
                fov={45}
                aspect={window.innerWidth / window.innerHeight}
                near={10}
                far = {200000}
                position={[3120, 300, -1100]} />
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
            <Player />
            {/* <axesHelper args={[8000, 8000, 8000]} /> */}
        </Suspense>
    );
}

export default SceneContainer;