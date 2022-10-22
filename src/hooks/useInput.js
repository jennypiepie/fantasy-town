import { useEffect, useState } from "react";

export const useInput = () => {
    const [action, setAction] = useState('Idle')

    const keys = {
        KeyW: 'Walking',
        KeyS: 'Backwards',
        KeyA: 'Left',
        KeyD: 'Right',
        ShiftLeft: 'Running',
        Space: 'Jumping',
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            keys[e.code]?setAction(keys[e.code]):setAction('Idle')
        }
        const handleKeyUp = (e) => {
            if (e.code === 'Space') {
                setTimeout(()=>setAction('Idle'),1500)
            } else {
                setAction('Idle') 
            }

        }
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup',handleKeyUp)
    }, [])
    
    return action
}