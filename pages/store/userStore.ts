import { observable, computed } from "bobx";
import { IUsers } from "../users";
import * as h from "bobwai--chat/examples/src/helpers";
import * as SidebarItem from "bobwai--sidebar-item/src/lib";
import {iconAnonymousComment, iconJdComment, iconMdComment, iconRdComment} from "./chatStore";

interface User {
    id: number,
    name: string,
    avatar?: object,
}

export class UserStore {
    users: User[] = [
        { id: 1, name: "Hans Becker" },
        { id: 2, name: "Thomas Wood" },
        { id: 3, name: "Alen Green" },
        { id: 4, name: "Phil Barret" },
        { id: 5, name: "John Mitchel" }
    ];

}

export const userStore = new UserStore();