import { observable, computed } from "bobx";
import { IComments } from "../chat/comments";
// import * as h from "bobwai--chat/examples/src/helpers";
import * as chat from "bobwai--chat/src/lib";
import * as b from "bobril";
import * as Icon from "bobwai--icon/src/lib";
import * as color from "bobwai--color/src/lib";
import * as h from "bobwai--chat/examples/src/helpers";

export const iconRdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, color.Warning));
export const iconRdReply = b.styledDiv(null, b.sprite(Icon.user_small_24_png, color.Warning));
export const iconJdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, color.Error));
export const iconJdReply = b.styledDiv(null, b.sprite(Icon.user_small_24_png, color.Error));
export const iconMdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, color.Application));
export const iconMdReply = b.styledDiv(null, b.sprite(Icon.user_small_24_png, color.Application));
export const iconAnonymousComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, color.White));
export const iconAnonymousReply = b.styledDiv(null, b.sprite(Icon.user_small_24_png, color.White));



export class ChatStore {
    @observable model: chat.IComment<number>[] = [
        {
            id: 0,
            text: "This is comment from Hans Becker.",
            userName: "Hans Becker",
            created: "2020.01.30",
            icon: iconJdComment,
            replies: []
        },
        {
            id: 1,
            text: "This is comment from Hans Becker.",
            userName: "Hans Becker",
            created: "2020.02.14",
            icon: iconJdComment,
            replies: []
        },
        {
            id: 2,
            text: "This is comment. Thomas Wood has his own icon.",
            userName: "Thomas Wood",
            created: "2021.02.15",
            icon: iconAnonymousComment,
            replies: []
        },
        {
            id: 3,
            text: "This is comment. Alen Green has his own icon.",
            userName: "Alen Green",
            created: "2020.02.28",
            icon: iconMdComment,
            replies: []
        },
        {
            id: 4,
            text: "This is comment. Alen Green has his own icon.",
            userName: "Alen Green",
            created: "2020.04.10",
            icon: iconMdComment,
            replies: []
        },
        {
            id: 5,
            text: "This is comment. Phil Barret has his own icon.",
            userName: "Phil Barret",
            created: "2020.06.31",
            icon: iconRdComment,
            replies: []
        },
        {
            id: 6,
            text: "This is comment. Phil Barret has his own icon.",
            userName: "Phil Barret",
            created: "2020.10.01",
            icon: iconRdComment,
            replies: []
        }
    ];

    @observable lastId1: number = this.model.length;
    @observable commentValue: string = "";
    @observable defaultRootCommentId: number = -1;
    @observable activeCommentId: number = -1;

    @computed
    get isValueEmpty(): boolean {
        return this.commentValue.trim().length === 0;
    }

    addComment(comment) {
        this.model.push({
            id: comment.id,
            text: comment.text,
            userName: comment.userName,
            isEditable: true,
            icon: h.iconJdReply,
            created: comment.created,
            replies: comment.replies
        });
        console.log("Element has been added by a store");
    }

    editComment(lastCommentId, newComment) {
        console.log(lastCommentId, newComment);


        /*this.model.push({
            id: editCommentValue.id,
            text: editCommentValue.text
        });*/
        console.log("Element has been edited by a store");
    }

    removeComment(index: number) {
        this.model.splice(index, 1);
    }
}

export const chatStore = new ChatStore();