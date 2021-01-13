import * as b from "bobril";
import {chatStore} from "../store/chatStore";
import { Chat, IComment } from "bobwai--chat/src/lib";
import {userStore} from "../store/userStore";
import * as chat from "bobwai--chat/src/lib";

const defaultRootCommentId = chatStore.defaultRootCommentId;

let lastId1 = chatStore.lastId1;
let activeCommentId = chatStore.activeCommentId;
let commentValue = chatStore.commentValue;

function dateNow(): string {
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'.');
    return utc;
}

function icon(id) {
    let result;
    result = userStore.users.find(user => {
        return user.id === id
    });
    return result.avatar
}

function findUser(id: number) {
    return userStore.users.find(user => {
        return user.id === id
    });
}

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
            <div style={{marginTop: "32px"}}>
                <Chat
                    labels={{submit: "Submit", reply: "Reply", label: "", cancel: "Cancel",
                        edit: "Edit", removeComment: "Delete"}}
                    blurSave
                    comments={model}
                    activeCommentId={activeCommentId}
                    defaultRootCommentId={defaultRootCommentId}
                    activeCommentValue={commentValue}
                    onChangeActiveCommentValue={(text: string) => {
                        commentValue = text;
                        b.invalidate();
                    }}
                    onChangeActiveCommentId={id => {activeCommentId = id; b.invalidate();}}
                    onActiveCommentSubmit={(parentCommentId, text: string) => {
                        if(text === "") return;
                        if (parentCommentId === defaultRootCommentId) {
                            chatStore.addComment({
                                id: lastId1++,
                                text: text,
                                from: 5,
                                to: otherUser.id,
                                isEditable: true,
                                created: dateNow(),
                                replies: []
                            })
                        } else {
                            chatStore.comment
                                .filter(c => c.id === parentCommentId)[0]
                                .replies.push({
                                id: lastId1++,
                                text: text,
                                userName: loggedInUser.name,
                                icon: loggedInUser.avatar,
                                isEditable: true,
                                created: dateNow(),
                                replies: []
                            });
                        }
                        b.invalidate();
                    }}
                    onEditComment={(commentId, value, parentId) => {
                        if (parentId !== undefined) {
                            chatStore.comment.filter(c => c.id === parentId)[0].replies.slice(-1)[0].text = value;
                        } else {
                            chatStore.comment.filter(c => c.id === commentId)[0].text = value;
                        }

                        commentValue = "";
                        activeCommentId = -1;
                        b.invalidate();
                    }}
                    onEditFocusOutComment={commentId => {
                        console.log("onEditFocusOutComment", commentId);
                    }}
                    onDeleteComment={(commentId) => {
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
                        activeCommentId = -1;
                        b.invalidate();
                    }}
                    icon={icon(5)}
                    headerOff
                    placeholderText={"Type a message"}
                />
            </div>
        );
    }
});