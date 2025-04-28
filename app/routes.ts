import { index, layout, type RouteConfig } from "@react-router/dev/routes";

export default [layout("components/layout.tsx", [index("routes/home.tsx")])] satisfies RouteConfig;
