import { useEffect } from 'react';
import {useFBX} from '@react-three/drei';

function Town(props) {
    const colliders = []
    const fbx = useFBX('/models/town.fbx')

    useEffect(() => {
        if (!fbx) return
        fbx.traverse( function ( child ) {
            if (child.isMesh) {
                if (child.name.startsWith("proxy")) {
                    colliders.push(child);
					child.material.visible = false;
                } else {
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
