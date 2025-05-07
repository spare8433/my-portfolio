import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("components/layout.tsx", [index("routes/home.tsx"), route("about", "routes/about.tsx")]),
] satisfies RouteConfig;
