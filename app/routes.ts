import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("components/layout.tsx", [
    index("routes/home.tsx"),
    layout("components/content-layout.tsx", [
      route("about", "routes/about.tsx"),
      route("learning", "routes/learning.tsx"),
      route("test", "routes/test.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
