import { proxy } from "valtio";
import { Vector3 } from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const anims = ['Walking', 'Walking Backwards', 'Turn', 'Running', 'Pointing', 'Talking', 'Pointing Gesture']


const store = proxy({
    camera: new Vector3(3200, 320, -1000),
    player: new Vector3(3122, 0, -173),
    currentState:'Idle'
})

export default store