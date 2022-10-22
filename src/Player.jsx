import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls,useAnimations,useTexture,useFBX} from '@react-three/drei';
import { useEffect,useRef } from 'react'; 
import { AnimationMixer, Vector3, Raycaster } from 'three';
import store from './store/Store';
import { useSnapshot } from 'valtio';

import { useInput } from './hooks/useInput';

function Player(props) {
    const snap = useSnapshot(store)
    const action = useInput()

    const controlsRef = useRef()
    const camera = useThree((state) => state.camera)
    const meshRef = useRef()

    const currentAction = useRef('Idle')

    const texture = useTexture(`/textures/people/SimplePeople_${snap.person}_${snap.color}.png`)
    const fbx = useFBX(`/models/people/${snap.person}.fbx`)
    
    const anims = ['Walking', 'Backwards', 'Left', 'Right', 'Running', 'Jumping','Idle']
    const postures = useFBX(anims.map((anim) =>`/models/anims/${anim}.fbx`))

    const mixer = new AnimationMixer(fbx)
    const actions = {
        'Walking': mixer.clipAction(postures[0].animations[0]),
        'Backwards': mixer.clipAction(postures[1].animations[0]),
        'Left': mixer.clipAction(postures[2].animations[0]),
        'Right': mixer.clipAction(postures[3].animations[0]),
        'Running': mixer.clipAction(postures[4].animations[0]),
        'Jumping':mixer.clipAction(postures[5].animations[0]),
        'Idle': mixer.clipAction(postures[6].animations[0]),
    }
    actions[action].play()
    // const { actions } = useAnimations(postures[0].animations, fbx)
    // const action = actions['mixamo.com']

    function move(action) {
        const p1 = meshRef.current.position
        const p2 = camera.position
        const v1 = p1.clone().sub(p2)
        v1.y = 0
        const v2 = new Vector3(v1.z, 0, -v1.x)
        let dir = v1
        let step = 3
        let blocked = false

        if (action === 'Jumping') {
            const initY = p1.y
            if (p1.y < 100) {
                p1.y += 3
            }else{
                p1.y -= 3
            }
            if (p1.y > initY) {
                p1.y = initY
            }
            controlsRef.current.target.set( ...p1 )
        }

        switch (action) {
            case 'Walking':
                dir = v1.normalize()
                break
            case 'Backwards':
                dir = v1.negate().normalize()
                step = 2
                break
            case 'Left':
                dir = v2.normalize()
                break
            case 'Right':
                dir = v2.negate().normalize()
                break
            case 'Running':
                dir = v1.normalize()
                step = 10
                break
            default:
                return
        }
        // console.log(dir);

        const rayOrigin = p1.clone()
        rayOrigin.y += 60
        const raycaster = new Raycaster()
        raycaster.set(rayOrigin, dir)
        const intersects = raycaster.intersectObjects(props.colliders.current)
        // console.log(intersects);

        if (intersects.length > 0) {
            if(intersects[0].distance < 50) blocked = true
        }
        
        const dir2 = new Vector3(0, -1, 0)
        const rayOrigin2 = p1.clone()
        rayOrigin2.y += 200
        const raycaster2 = new Raycaster()
        raycaster2.set(rayOrigin2, dir2)
        const intersects2 = raycaster2.intersectObjects(props.colliders.current)
        // console.log(intersects2);
        const targetY = rayOrigin2.y - intersects2[0].distance
        if (targetY > p1.y) {
            // p1.y = targetY
            p1.y = 0.8 * p1.y + 0.2 * targetY
        } else {
            p1.y -= 1
            if (p1.y < targetY) {
                p1.y = targetY
            }
        }


        rotateModel()
        if (!blocked) {
            p1.x += dir.x * step
            p2.x += dir.x * step
            p1.z += dir.z * step
            p2.z += dir.z * step
            controlsRef.current.target.set( ...p1 )
        }

    }

    function rotateModel() {
        // 获取人物中心点和相机中心点
        const p1 = meshRef.current.position
        const p2 = camera.position
        // 计算两者连接形成的向量
        const v1 = p1.clone().sub(p2)
        v1.y = 0
        // 人物的初始面向
        const origin = new Vector3(0,0,1)
        // 点乘求夹角
        const radian = Math.acos(v1.dot( origin ) /(v1.length()*origin.length()))
        // 叉乘求方向
        v1.cross(origin)
        meshRef.current.rotation.y = radian * (v1.z === 0 && 1 / v1.z < 0 ? -1 : 1)
    }


    useFrame((state, delta) => {
        mixer?.update(delta)
        move(action)
    })

    useEffect(() => {
        if (!fbx) return
        // console.log(fbx);
        
        fbx.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                child.material.map = texture
            }
        })
        // console.log(camera,meshRef.current);
    }, [])


    useEffect(() => {
        if (currentAction.current !== action) {
            const nextAction = actions[action]
            const current = actions[currentAction.current]
            current?.fadeOut(0.3)
            nextAction?.reset().fadeIn(0.3).play()
            currentAction.current = action
        }
    },[action])

    return (
        <>
            <OrbitControls ref={controlsRef} target={[3530,-20,-9112]}
                minDistance={500} maxDistance={3000}
                minPolarAngle={0}
                maxPolarAngle={Math.PI/2.1}
                />
            <mesh ref={meshRef} position={[3530,-20,-9112]}>
            <primitive object={fbx}/>
            </mesh>
        </>
    );
}

export default Player;
