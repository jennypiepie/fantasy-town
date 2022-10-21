import { proxy } from "valtio";

const store = proxy({
    colors: ['Black', 'Brown', 'White'],
    people: ['BeachBabe', 'BusinessMan', 'Doctor', 'FireFighter', 'Housewife', 'Policeman', 'Prostitute', 'Punk', 'RiotCop', 'Roadworker', 'Robber', 'Sheriff', 'Streetman', 'Waitress'],
    color: 'Black',
    person: 'BeachBabe',
})

export default store