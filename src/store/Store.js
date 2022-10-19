import { proxy } from "valtio";

const store = proxy({
    colliders : []
})

export default store