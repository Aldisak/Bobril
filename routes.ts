import * as b from "bobril";
import { Main } from "./pages/main";
import { ChatPage } from "./pages/chat/chat";
import { DefaultPage } from "./pages/about/defaultPage";

export const main: b.IRoute = { handler: Main };
export const chatPage: b.IRoute = {
    handler: ChatPage,
    name: "chatPage",
    url: "/chatPage/:userId?"
};
export const defaultPage: b.IRoute = { handler: DefaultPage, name: "defaultPage", url: "/defaultPage" };
export const defaultRoute = defaultPage;