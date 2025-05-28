export const ROUTE_LABEL_MAP = new Map<string, string>([
  ["about", "자기소개"],
  ["education", "학력"],
  ["learning", "학습"],
  ["projects", "프로젝트"],
]);

export const tocPages = {
  about: {
    introText: "자기 자신을 소개해주세요.",
    htmlPath: "/html/about.html",
    tocPath: "/about.json",
  },
  test: {
    introText: "test",
    htmlPath: "/html/test.html",
    tocPath: "/test.json",
  },
};
