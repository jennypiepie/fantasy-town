import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls,useAnimations} from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useEffect,useRef } from 'react'; 
import {AnimationMixer,Vector3} from 'three';
import { useSnapshot } from "valtio";
import store from './store/Store';

import { useInput } from './hooks/useInput';

function Player() {
    // const snap = useSnapshot(store)
    const action = useInput()

    const controlsRef = useRef()
    const camera = useThree((state) => state.camera)
    const meshRef = useRef()

    const currentAction = useRef('')
    

    const colors = ['Black', 'Brown', 'White']
    // const color = colors[Math.floor(Math.random()*colors.length)]
    const color = colors[0]
    const people = ['BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Housewife', 'Policeman', 'Prostitute', 'Punk', 'RiotCop', 'Roadworker', 'Robber', 'Sheriff', 'Streetman', 'Waitress']
    // const person = people[Math.floor(Math.random() * people.length)]
    const person = people[4]
    const anims = ['Walking', 'Backwards', 'Left', 'Right', 'Running','Idle']

    const texture = useLoader(TextureLoader,`/textures/people/SimplePeople_${person}_${color}.png`)
    const fbx = useLoader(FBXLoader, `/models/people/${person}.fbx`)


    const postures = useLoader(FBXLoader, anims.map((anim) => `/models/anims/${anim}.fbx`))

    const mixer = new AnimationMixer(fbx)
    const actions = {
        'Walking': mixer.clipAction(postures[0].animations[0]),
        'Backwards': mixer.clipAction(postures[1].animations[0]),
        'Left': mixer.clipAction(postures[2].animations[0]),
        'Right': mixer.clipAction(postures[3].animations[0]),
        'Running': mixer.clipAction(postures[4].animations[0]),
        'Idle': mixer.clipAction(postures[5].animations[0]),
    }
    actions[action].play()
    // const { actions } = useAnimations(postures[0].animations, fbx)
    // const action = actions['mixamo.com']


    function move(action) {
        const p1 = meshRef.current.position
        const p2 = camera.position

        const v1 = p1.clone().sub(p2)
        v1.y = 0
        const length = v1.length()

        const v2 = new Vector3(v1.z, 0, -v1.x)
        // console.log(action);

        let dir = 1
        let v = v1 
        switch (action) {
            case 'Walking':
                dir = 1
                break
            case 'Backwards':
                dir = -1
                break
            case 'Left':
                dir = 1
                v = v2
                break
            case 'Right':
                dir = -1
                v = v2
                break
            default:
                return
        }
        
        rotateModel()
        const step = 3
        meshRef.current.position['x'] += dir * v['x'] / length * step
        camera.position['x'] += dir * v['x'] / length * step
        meshRef.current.position['z'] += dir * v['z'] / length* step
        camera.position['z'] += dir * v['z'] / length * step

        controlsRef.current.target.set( ...meshRef.current.position )
        // controlsRef.current.update()
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
        // meshRef.current.position.x += 1
        // camera.position.x += 1
        // controlsRef.current.target.set( ...meshRef.current.position )
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
        console.log(camera,meshRef.current);
    }, [])


    useEffect(() => {
        if (currentAction.current !== action) {
            const nextAction = actions[action]
            const current = actions[currentAction.current]
            current?.fadeOut(0.2)
            nextAction?.reset().fadeIn(0.2).play()
            currentAction.current = action
        }
        // move(action)

        // console.log(current,action);
        // actions[current].fadeIn(0.5)
        // actions[current].play()
        // action.time = 0
    },[action])

    return (
        <>
            <OrbitControls ref={controlsRef} target={[3120, 0, -173]} />
            <mesh ref={meshRef} position={[3120, 0, -173]} rotation={[0, 3, 0]}>
            <primitive object={fbx}/>
            </mesh>
        </>
    );
}

export default Player;
