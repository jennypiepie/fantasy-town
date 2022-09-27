import { useLoader,useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useEffect } from 'react'; 
import * as THREE from 'three';

function Player(props) {
    const colors = ['Black', 'Brown', 'White']
    // const color = colors[Math.floor(Math.random()*colors.length)]
    const color = colors[0]
    const people = ['BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Housewife', 'Policeman', 'Prostitute', 'Punk', 'RiotCop', 'Roadworker', 'Robber', 'Sheriff', 'Streetman', 'Waitress']
    // const person = people[Math.floor(Math.random() * people.length)]
    const person = people[0]
    const anims = ['Walking', 'Walking Backwards', 'Turn', 'Running', 'Pointing', 'Talking', 'Pointing Gesture']
    // let anim = anims[3]
    let anim = props.action

    const texture = useLoader(TextureLoader,`/textures/people/SimplePeople_${person}_${color}.png`)
    const fbx = useLoader(FBXLoader, `/models/people/${person}.fbx`)
    const posture = useLoader(FBXLoader, `/models/anims/${anim}.fbx`)
    const mixer = new THREE.AnimationMixer(fbx)
    const action = mixer.clipAction(posture.animations[0])
    action.time = 0
    action.fadeIn(0.5)
    action.play()


    useFrame((state, delta) => {
        mixer?.update(delta)
    })

    useEffect(() => {
        if (!fbx) return
        fbx.traverse( function ( child ) {
            if (child.isMesh) {
				child.castShadow = true
                child.receiveShadow = true
                child.material.map = texture
			}
		})
    })

		

    return (
        <>
        <primitive object={fbx}/>
        </>
    );
}

export default Player;
