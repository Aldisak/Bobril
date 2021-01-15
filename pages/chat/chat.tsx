import * as b from "bobril";
import {chatStore} from "../store/chatStore";
import { Chat, IComment } from "bobwai--chat/src/lib";
import * as chat from "bobwai--chat/src/lib";
import { findUser, dateNow, generateId, icon } from "../utils";
import { chatStyle } from "../styles";

const defaultRootCommentId = chatStore.defaultRootCommentId;
let lastId1 = chatStore.lastId1;
let activeCommentId = chatStore.activeCommentId;
let commentValue = chatStore.commentValue;

export const ChatPage = b.createVirtualComponent({
    id: "chat",
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {

        let model: IComment<number>[] = [];
        let loggedInUser = findUser(5);
        let otherUser = findUser(parseInt(ctx.data.routeParams["userId"]));

        chatStore.comment.forEach(comment => {
            if(comment.to === otherUser.id && comment.from === loggedInUser.id) {
                model.push({
                    id: comment.id,
                    text: comment.text,
                    userName: loggedInUser.name,
                    isEditable: comment.isEditable,
                    created: comment.created,
                    icon: loggedInUser.avatar,
                    replies: comment.replies
                })
            }
            if(comment.to === loggedInUser.id && comment.from === otherUser.id) {
                model.push({
                    id: comment.id,
                    text: comment.text,
                    userName: otherUser.name,
                    isEditable: comment.isEditable,
                    created: comment.created,
                    icon: otherUser.avatar,
                    replies: comment.replies
                })
            }
        })

        me.children = (
            <div style={chatStyle}>
                <Chat
                    labels={{
                        submit: "Submit",
                        reply: "Reply",
                        label: "Social Commenting",
                        cancel: "Cancel",
                        edit: "Edit",
                        removeComment: "Delete",
                        newComment: "New Comment"
                    }}
                    headerOff
                    activeCommentId={activeCommentId}
                    activeCommentValue={commentValue}
                    defaultRootCommentId={defaultRootCommentId}
                    comments={model}
                    icon={icon(5)}
                    onChangeActiveCommentId={(id) => {
                        activeCommentId = id;
                        b.invalidate();
                    }}
                    onChangeActiveCommentValue={(text: string) => {
                        commentValue = text;
                        b.invalidate();
                    }}
                    onActiveCommentSubmit={(parentCommentId, text: string) => {
                        if (parentCommentId !== defaultRootCommentId) {
                            model.forEach(c => (c.isScrolledTo = false));
                            chatStore.comment
                                .filter(c => c.id === parentCommentId)[0]
                                .replies.push({
                                id: generateId(),
                                text: text,
                                from: findUser(5).id,
                                userName: findUser(5).name,
                                isEditable: true,
                                icon: findUser(5).avatar,
                                created: dateNow(),
                                replies: []
                            });
                        } else {
                            model.forEach(c => (c.isScrolledTo = false));
                            chatStore.comment.push({
                                id: lastId1++,
                                text: text,
                                from: findUser(5).id,
                                to: otherUser.id,
                                isEditable: true,
                                created: dateNow(),
                                replies: []
                            });
                        }
                        b.invalidate();
                    }}
                    onEditComment={(commentId, value: string, parentId) => {
                        if (parentId) {
                            chatStore.comment.filter(c => c.id === parentId)[0].replies.slice(-1)[0].text = value;
                        } else {
                            chatStore.comment.filter(c => c.id === commentId)[0].text = value;
                        }

                        activeCommentId = -2;
                        b.invalidate();
                    }}
                    onDeleteComment={commentId => {
                        if (!model.filter(c => c.id === commentId)[0]) {
                            for (let i = 0; i < model.length; i++) {
                                if (model[i] && model[i].replies.filter(c => c.id === commentId)[0]) {
                                    model[i].replies.pop();
                                }
                            }
                        } else {
                            let index = chatStore.comment.findIndex(comment => {
                                if(comment.id === commentId)
                                    return index = comment.id;
                            })
                            chatStore.removeComment(index);
                        }

                        activeCommentId = -2;
                        b.invalidate();
                    }}
                    onCancelComment={() => {
                        activeCommentId = -2;
                        b.invalidate();
                    }} />
            </div>
        );
    }
});