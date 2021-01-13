import { observable, computed } from "bobx";
import * as h from "bobwai--chat/examples/src/helpers";

interface Comment {
    id: number,
    text: string,
    created: string,
    from?: number,
    to?: number,
    isEditable?: boolean,
    replies: any
}

export class ChatStore {
    comment: Comment[] = [
        {
            id: 0,
            text: "Are you here?",
            created: "2020.01.30",
            from: 1,
            to: 5,
            replies: []
        },
        {
            id: 2,
            text: "Yes, I am.",
            isEditable: true,
            from: 5,
            to: 1,
            created: "2020.02.08",
            replies: []
        },
        {
            id: 3,
            text: "Okay.",
            created: "2020.02.14",
            from: 1,
            to: 5,
            replies: []
        },
        {
            id: 4,
            text: "I would like to remind you your meeting on Saturady.",
            created: "2021.02.15",
            from: 2,
            to: 5,
            replies: []
        },
        {
            id: 5,
            text: "Hello.",
            created: "2020.02.28",
            from: 3,
            to: 5,
            replies: []
        },
        {
            id: 6,
            text: "How are you John?",
            created: "2020.04.10",
            from: 3,
            to: 5,
            replies: []
        },
        {
            id: 7,
            text: "Hello, are you here?",
            created: "2020.06.31",
            from: 4,
            to: 5,
            replies: []
        },
        {
            id: 8,
            text: "Apparently you aren't.",
            created: "2020.07.01",
            from: 4,
            to: 5,
            replies: []
        },
        {
            id: 9,
            text: "I will be there, thank you.",
            isEditable: true,
            from: 5,
            to: 2,
            created: "2020.02.16",
            replies: []
        },
        {
            id: 10,
            text: "Hello, I am fine. What about you?",
            isEditable: true,
            from: 5,
            to: 3,
            created: "2020.02.16",
            replies: []
        }
    ];

    @observable lastId1: number = this.comment.length;
    @observable commentValue: string = "";
    @observable defaultRootCommentId: number = -1;
    @observable activeCommentId: number = -1;

    @computed
    get isValueEmpty(): boolean {
        return this.commentValue.trim().length === 0;
    }

    addComment(comment) {
        this.comment.push({
            id: comment.id,
            text: comment.text,
            from: comment.from,
            to: comment.to,
            isEditable: comment.isEditable,
            created: comment.created,
            replies: comment.replies
        });
        console.log(comment);
    }

    removeComment(index: number) {
        this.comment.splice(index, 1);
    }
}

export const chatStore = new ChatStore();