import { Canvas } from '@react-three/fiber'
import { useState } from 'react';
import Figure from './Figure';
import SceneContainer from './SceneContainer'
import store from './store/Store';
import { useSnapshot } from 'valtio';

function App() {
  const [show, setShow] = useState(true)
  const [cNum, setCNum] = useState(1)
  const [pNum, setPNum] = useState(1)

  const snap = useSnapshot(store)

  return (
  <div className="content">
    <div className="wrapper" style={{display:show?'block':'none'}}>
      <Canvas
      gl={{ antialias: true}}
      shadows
      >
        <Figure />
      </Canvas>
        <div className="selector">
          <div className="title">Choose your character</div>
          <div className="select">
            <span className="name">skin</span>
            {snap.color}
            <span className="next" onClick={() => {
              setCNum((cNum + 1) % snap.colors.length);
              store.color = snap.colors[cNum]
            }}></span>
          </div>
          <div className="select">
            <span className="name">role</span>
            {snap.person}
            <span className="next" onClick={() => {
              pNum < 12 && setPNum(pNum + 1) ;
              store.person = snap.people[pNum]
            }}></span>
          </div>
      </div>
      <button className="confirm" onClick={() =>setShow(false)}>GO</button>
    </div>
    <div className="wrapper" style={{display:show?'none':'block'}}>
    <Canvas
    gl={{ antialias: true}}
    shadows
    >
      <SceneContainer />
    </Canvas>
    </div>
  </div>
  )
}

export default App;
