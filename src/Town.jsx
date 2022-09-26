import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'

function Town() {
    const colliders = []
    const fbx = useLoader(FBXLoader, '/models/town.fbx') 
		fbx.traverse( function ( child ) {
            if (child.isMesh) {
                if (child.name.startsWith("proxy")) {
					colliders.push(child);
					child.material.visible = false;
				}else{
					child.castShadow = true;
					child.receiveShadow = true;
				}
			}
		})

    useEffect(() => {
        if (!fbx) return
        
    })

    return (
        <primitive object={fbx}/>
    );
}

export default Town;
