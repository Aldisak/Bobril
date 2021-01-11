import * as b from "bobril";
import * as routes from "./routes";

import * as font from "bobwai--font";

font.init();

b.routes(
    b.route(routes.main, [
        b.route(routes.chatPage),
        b.route(routes.defaultPage),
        b.routeDefault(routes.defaultRoute)
    ])
);