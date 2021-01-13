import {observable} from "bobx/index";

interface CommentFromTo {
    id: number,
    from: number,
    to: number,
    commentId: number
}

export class CommentFromToStore {
    @observable model: CommentFromTo[] = [
        { id: 1, from: 5, to: 1, commentId: 7 },
        { id: 2, from: 5, to: 2, commentId: 8 }
    ];

    @observable lastIdComment: number = this.model.length;

    addCommentFromTo(record) {
        this.model.push({
            id: record.id,
            from: record.from,
            to: record.to,
            commentId: record.commentId,
        })
    }
}

export const commentFromToStore = new CommentFromToStore();