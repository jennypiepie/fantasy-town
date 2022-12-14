import { useTexture,PerspectiveCamera,useFBX} from '@react-three/drei';
import { Suspense, useEffect} from 'react'; 
import store from './store/Store';
import { useSnapshot } from 'valtio';
import Loading from './components/Loading';

function Figure() {
    const snap = useSnapshot(store)
    

    const texture = useTexture(`/textures/people2/SimplePeople_${snap.person}_${snap.color}.png`)
    const fbx =useFBX(`/models/people/${snap.person}.fbx`)

    useEffect(() => {
        if (!fbx) return
        fbx.traverse(function (child) {
            if (child.isMesh) {
                child.material.map = texture
            }
        })
    })


    return (
        <>
        <Suspense fallback={Loading}>
            <PerspectiveCamera makeDefault
                fov={45}
                aspect={window.innerWidth / window.innerHeight}
                near={10}
                far={200}
                position={[0,70,200]} />
            <ambientLight color='#aaaaaa' />
            <primitive object={fbx} scale={[0.4,0.4,0.4]}/>
        </Suspense>
        <color attach="background" args={["#93bf98"]} />
        </>
    );

}

export default Figure;
