import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

function Town(props) {
    const colliders = []
    const fbx = useLoader(FBXLoader,process.env.PUBLIC_URL+'/models/town.fbx')

    useEffect(() => {
        if (!fbx) return
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
        props.getColliders(colliders)
    }, [])

    return (
        <primitive object={fbx}/>
    );
}

export default Town;
