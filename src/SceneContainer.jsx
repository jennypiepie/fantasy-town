import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useLoader,useThree,useFrame } from '@react-three/fiber';
import { Suspense ,useRef,useState} from 'react';
import { CubeTextureLoader } from 'three';
import Town from './Town';
import Player from './Player';
import JoyStick from './utils/JoyStick';

function SceneContainer() {
    const { scene } = useThree();
    const urls = ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map(name => {
        return `/textures/environment/${name}.jpg`
    })
    const [envMap] = useLoader(CubeTextureLoader, [urls])
    scene.background = envMap

    const [action, setAction] = useState('Talking')
    const [motion, setMotion] = useState({ X:0,Y:0})
    
    new JoyStick({
        onMove:playerControl
    })
	function playerControl(forward, turn){
        turn = -turn;
        if (forward > 0.3) {
            // if (action !== 'Walking' && action !== 'Running')
                setAction('Walking')
        } else if (forward < -0.3) {
            // if (action !== 'Walking Backwards')
                setAction('Walking Backwards')
		}else{
			forward = 0;
			if (Math.abs(turn)>0.1){
                if (action !== 'Turn') setAction('Turn')
			}else if (action!=="Talking"){
				setAction('Talking')
			}
		}
		
		if (forward===0 && turn===0){
			setMotion({ X:0,Y:0})
		}else{
			setMotion({ X:forward, Y:turn } )
		}
		
		// this.player.updateSocket();
	}


    const meshRef = useRef();
    useFrame((state, delta) => {
        meshRef.current.position.x += motion.X * 3
        meshRef.current.position.z += motion.Y * 3
        meshRef.current.rotation.set(0,1.5,0)
    })
    
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
            <mesh ref={meshRef} position={[3122, 0, -173]}>
                <Player action={action} />
            </mesh>
        </Suspense>
    );
}

export default SceneContainer;