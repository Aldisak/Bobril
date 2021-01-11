import * as b from "bobril";
import {create as EmptyState, Size} from "bobwai--empty-state";

export const DefaultPage = b.createVirtualComponent({
    id: "defaultPage",
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        me.children = (
            <div>
                <EmptyState size={Size.Large} message={"No chat selected"} />
            </div>
        );
    }
});