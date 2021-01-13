import * as b from "bobril";
import * as Icon from "bobwai--icon/src/lib";
import * as color from "bobwai--color/src/lib";

interface User {
    id: number,
    name: string,
    avatar?: object,
}

export const iconRdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, color.Warning));
export const iconLdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, color.Success));
export const iconJdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, color.Error));
export const iconIdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, color.Info));
export const iconMdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, color.Application));

export class UserStore {
    users: User[] = [
        { id: 1, name: "Hans Becker", avatar: iconLdComment },
        { id: 2, name: "Thomas Wood", avatar: iconRdComment },
        { id: 3, name: "Alen Green", avatar: iconMdComment },
        { id: 4, name: "Phil Barret", avatar: iconJdComment },
        { id: 5, name: "John Mitchel", avatar: iconIdComment }
    ];

}

export const userStore = new UserStore();