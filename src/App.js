import {Canvas} from '@react-three/fiber'
import SceneContainer from './SceneContainer'


function App() {
  return <Canvas
    gl={{ antialias: true, logarithmicDepthBuffer: true }}
    shadows={true}
  >
    <SceneContainer />
  </Canvas>

}

export default App;
