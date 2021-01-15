import * as b from "bobril";
import * as routes from "../routes";
import {create as LSidebar, SidebarWidth} from "bobwai--l-view-sidebar";
import {create as LSidebarItem} from "bobwai--sidebar-item";
import * as SidebarItem from "bobwai--sidebar-item/src/lib";
import {create as Filter} from "bobwai--filter";
import {create as LMainView} from "bobwai--l-view-main/src/lib";
import {create as AppHeader} from "bobwai--app-header";
import {userStore} from "./store/userStore";
import {text, findUser} from "./utils";
import {appBarLeftContentStyle, sideBarHeaderStyle, sideBarItemsStyles, sideBarUserInfo} from "./styles";

let filterValue: string = "[^]*";
let sidebarItems: SidebarItem.IData[] = [];
let activeItem: number = userStore.activeItem;

const selectUser = (id: number): boolean => {
    b.runTransition(b.createRedirectPush(routes.chatPage.name, {userId: id.toString()}))
    setActiveItem(sidebarItems, id.toString());
    return true;
};

function setActiveItem(source: SidebarItem.IData[], id: string): void {
    source.forEach((item: SidebarItem.IData) => {
        activeItem = parseInt(id);
    });
}

export const Main = b.createVirtualComponent({
    id: "main",
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        sidebarItems = [];
        activeItem = parseInt(ctx.data.routeParams["userId"]);
        let loggedInUser = findUser(5);
        let conversationUser = findUser(parseInt(ctx.data.routeParams["userId"]));
        var regexp: RegExp = new RegExp("^" + filterValue, 'i');

        function sideBarHeader(loggedInUser) {
            return (
                <div style={sideBarHeaderStyle}>
                    <div style={sideBarUserInfo}>
                        {loggedInUser.avatar}
                        {text(loggedInUser.name, 600, 19, false, 16, )}
                    </div>
                    <Filter placeholder={"Search"} onChange={(v) => {
                        filterValue = v;
                        console.log(filterValue);
                        b.invalidate();
                    }} onTextClear={() => {
                        filterValue = "[^]*";
                        b.invalidate();
                    }} />
                </div>
            )
        }

        userStore.users.forEach(user => {
            if (user.id !== 5 && regexp.test(user.name)) {
                sidebarItems.push({
                    id: user.id.toString(),
                    title: user.name,
                    onClick: () => selectUser(user.id),
                    iconContent: user.avatar,
                    isActive: user.id === activeItem
                })
            }
        })

        function appBarLeftContent(conversationUser) {
            return (
                <div style={appBarLeftContentStyle}>
                    {conversationUser.avatar}
                    {text(conversationUser.name, 600, 14, false, 16, 4)}
                </div>
            )
        }

        me.children = (
            <div>
                <LSidebar width={SidebarWidth.Large} headerTabContent={sideBarHeader(loggedInUser)}>
                    <div style={sideBarItemsStyles}>
                        {sidebarItems.map(item => (
                            <LSidebarItem {...item} />
                        ))}
                    </div>
                </LSidebar>
                <LMainView sidebarWidth={SidebarWidth.Large} isCombinedWithSidebar>
                    {!conversationUser ? "" : <AppHeader theme={2} leftContent={appBarLeftContent(conversationUser)}/>}
                    {me.data.activeRouteHandler()}
                </LMainView>
            </div>
        );
    }
});