import * as b from "bobril";
import * as h from "bobwai--chat/examples/src/helpers";
import {chatStore} from "../store/chatStore";
import { Chat, IComment } from "bobwai--chat/src/lib";
import {userStore} from "../store/userStore";

const defaultRootCommentId = chatStore.defaultRootCommentId;

let lastId1 = chatStore.lastId1;
let activeCommentId = chatStore.activeCommentId;
let commentValue = chatStore.commentValue;

function dateNow(): string {
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'.');
    return utc;
}

export const ChatPage = b.createVirtualComponent({
    id: "chat",
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        let model: IComment<number>[] = [];

        chatStore.model.forEach(comment => {
            var userName = "";
            userStore.users.forEach(user => {
                if (user.id.toString() === ctx.data.routeParams["userId"])
                    userName = user.name;
            })
            if(comment.userName === userName || comment.userName === "John Mitchel") {
                model.push(comment);
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
                                userName: "John Mitchel",
                                isEditable: true,
                                created: dateNow(),
                                replies: []
                            })
                        } else {
                            chatStore.model
                                .filter(c => c.id === parentCommentId)[0]
                                .replies.push({
                                id: lastId1++,
                                text: text,
                                userName: "John Mitchel",
                                isEditable: true,
                                icon: h.iconJdReply,
                                created: dateNow(),
                                replies: []
                            });
                        }
                        b.invalidate();
                    }}
                    onEditComment={(commentId, value, parentId) => {
                        if (parentId !== undefined) {
                            chatStore.model.filter(c => c.id === parentId)[0].replies.slice(-1)[0].text = value;
                        } else {
                            chatStore.model.filter(c => c.id === commentId)[0].text = value;
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
                            let index = chatStore.model.findIndex(comment => {
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
                    icon={h.iconMdComment}
                    headerOff
                    placeholderText={"Type a message"}
                />
            </div>
        );
    }
});