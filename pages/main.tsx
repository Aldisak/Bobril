import * as b from "bobril";
import * as routes from "../routes";
import {create as LSidebar, SidebarWidth} from "bobwai--l-view-sidebar";
import {create as LSidebarItem} from "bobwai--sidebar-item";
import * as SidebarItem from "bobwai--sidebar-item/src/lib";
import Avatar from "bobwai--avatar/src/avatar";
import {create as Filter} from "bobwai--filter";
import {Size} from "bobwai--sidebar-item/src/data";
import {create as LMainView} from "bobwai--l-view-main/src/lib";
import {create as AppHeader} from "bobwai--app-header";
import { userStore } from "./store/userStore";

let filterValue = "[^]*";

const sideBarHeaderStyle = b.styleDef({
    paddingLeft:"8px",
    paddingRight:"8px",
    paddingTop:"8px",
    height:"56px"
});

const selectUser = (id: number): boolean => {
    setActiveItem(sidebarItems, id.toString());
    b.runTransition(b.createRedirectPush(routes.chatPage.name, {userId: id.toString()}))
    b.invalidate();
    return true;
};

function setActiveItem(source: SidebarItem.IData[], id: string): void {
    source.forEach((item: SidebarItem.IData) => {
        item.isActive = item.id === id;
    });
}

var sidebarItems: SidebarItem.IData[] = [];

function text(text: string, fontWeight: string | number, fontSize: string, isItalic: boolean = false, fontFamily?: string) {
    return (
        <span style={{
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontStyle: isItalic && "italic"
        }}>{text}</span>
    )
}

function sideBarHeader() {
    return (
        <div style={sideBarHeaderStyle}>
            <Avatar size={140} imageSrc="https://www.w3schools.com/html/img_girl.jpg" />
            <span style={{paddingLeft:"16px"}}>
                {text("John Mitchel", 600,"19px", false)}
            </span>
            <div style={{marginTop:"8px"}}>
                <Filter placeholder={"Search"} onChange={(v) => {
                    filterValue = v;
                    console.log(filterValue);
                    b.invalidate();
                }} onTextClear={() => {
                    filterValue = "[^]*";
                    b.invalidate();
                }} />
            </div>
        </div>
    )
}

function appBarLeftContent(userName) {
    return (
        <div style={{paddingLeft:"34px", paddingTop:"8px"}}>
            <div style={{display: "flex",alignItems:"center"}}>
                <div style={{paddingLeft: "16px", marginTop:"8px", fontSize:"14px", fontWeight:"600"}}>
                    {userName}
                </div>
            </div>
        </div>
    )
}

export const Main = b.createVirtualComponent({
    id: "main",
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        sidebarItems = [];
        var regexp = new RegExp("^" + filterValue, 'i');

        userStore.users.forEach(user => {
            if(user.id !== 5 && regexp.test(user.name)) {
                sidebarItems.push({
                    id: user.id.toString(),
                    title: user.name,
                    onClick: () => selectUser(user.id)
                })
            }
        })

        var userName;
        userStore.users.forEach(user => {
            if (user.id.toString() === ctx.data.routeParams["userId"])
                userName = user.name;
        })

        me.children = (
            <div>
                <LSidebar width={SidebarWidth.Large} headerTabContent={sideBarHeader()}>
                    <div style={{marginTop:"150px"}}>
                        {sidebarItems.map(item => (
                            <>
                                <LSidebarItem size={Size.Default} {...item} />
                            </>
                        ))}
                    </div>
                </LSidebar>
                <LMainView sidebarWidth={SidebarWidth.Large} isCombinedWithSidebar>
                    {!userName ? "" : <AppHeader theme={2} leftContent={appBarLeftContent(userName)}/>}
                    {me.data.activeRouteHandler()}
                </LMainView>
            </div>
        );
    }
});