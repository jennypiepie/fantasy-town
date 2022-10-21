import { useLoader } from '@react-three/fiber';
import { useTexture,PerspectiveCamera,useAnimations} from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Suspense, useEffect} from 'react'; 
import store from './store/Store';
import { useSnapshot } from 'valtio';


function Figure() {
    const snap = useSnapshot(store)
    

    const texture = useTexture(`/textures/people/SimplePeople_${snap.person}_${snap.color}.png`)
    const fbx =useLoader(FBXLoader, `/models/people/${snap.person}.fbx`)

    // const posture = useLoader(FBXLoader, `/models/anims/Talking.fbx`)
    // const { actions } = useAnimations(fbx.animations, fbx)
    // const action = actions['mixamo.com']
    
    useEffect(() => {
        if (!fbx) return
        // action.play()
        fbx.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                child.material.map = texture
            }
        })
    })


    return (
        <>
        <Suspense>
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