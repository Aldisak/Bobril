import {
    iconAlenGreen,
    iconHansBecker,
    iconThomasWood,
    iconPhilBarret,
    iconJohnMitchel } from "../utils";
import {observable} from "bobx";

interface User {
    id: number,
    name: string,
    avatar?: object,
}

export class UserStore {
    users: User[] = [
        { id: 1, name: "Hans Becker", avatar: iconHansBecker },
        { id: 2, name: "Thomas Wood", avatar: iconThomasWood },
        { id: 3, name: "Alen Green", avatar: iconAlenGreen },
        { id: 4, name: "Phil Barret", avatar: iconPhilBarret },
        { id: 5, name: "John Mitchel", avatar: iconJohnMitchel }
    ];
    @observable activeItem: number = 0;
}

export const userStore = new UserStore();