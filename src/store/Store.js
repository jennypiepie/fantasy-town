import { proxy } from "valtio";

const store = proxy({
    colors: ['Black', 'Brown', 'White'],
    people: ['BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Policeman', 'Prostitute', 'Punk', 'RiotCop', 'Robber', 'Sheriff', 'Streetman', 'Waitress'],
    color: 'Black',
    person: 'BeachBabe',
})

export default store