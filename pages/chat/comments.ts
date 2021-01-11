export interface IComments {
    commentValue: string,
    lastId1: number,
    defaultRootCommentId: number,
    activeCommentId: number,
    _comments: IComments[]
}