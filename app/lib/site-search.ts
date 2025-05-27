import Fuse from "fuse.js";

const searchDataList = (await fetch("/site-search.json")
  .then((res) => res.json())
  .catch((error) => console.error("Error loading search data:", error))) as SearchData[];

const fuse = new Fuse(searchDataList, {
  keys: ["text"],
  includeMatches: true, // 검색 결과에 일치하는 부분 포함
  minMatchCharLength: 2, // 최소 일치 문자 길이
  threshold: 0.3, // 검색 정확도 조정 (0.0 = 완벽 일치, 1.0 = 완전 불일치)
});

export function searchSite(query: string) {
  return fuse.search(query);
}
