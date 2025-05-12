import type { Root, RootContent } from "mdast";

function extractTextFromNode(node: RootContent): string {
  if (!node) return "";

  if ("value" in node) {
    return node.value;
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join("");
  }

  return "";
}

// heading 계층 추적
const updateHeadingHierarchy = (hierarchy: string[], depth: number, text: string): string[] => {
  const newHierarchy = [...hierarchy];
  newHierarchy[depth - 1] = text;
  return newHierarchy.slice(0, depth);
};

// 출력 타입
type SearchData = { type: string; headingHierarchy: string[]; text: string };
type HeadingType = { depth: number; text: string };

// 메인 검색 데이터 추출 함수
function extractSearchData(ast: Root): { searchData: SearchData[]; headings: HeadingType[] } {
  const searchData: SearchData[] = [];
  let headingHierarchy: string[] = [];
  const headings: HeadingType[] = [];

  const walk = (node: RootContent) => {
    switch (node.type) {
      case "heading": {
        const text = extractTextFromNode(node);
        headingHierarchy = updateHeadingHierarchy(headingHierarchy, node.depth, text);
        headings.push({ depth: node.depth, text: node.children.map((c) => "value" in c && c.value).join("") });
        break;
      }

      case "tableCell":
      case "paragraph":
      case "code": {
        const text = extractTextFromNode(node);
        if (text.trim()) {
          searchData.push({ type: node.type, headingHierarchy: [...headingHierarchy], text });
        }
        break;
      }

      // 기타 블록 노드 추가 처리 가능
    }

    // 자식 노드가 있으면 순회
    if ("children" in node && Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  };

  ast.children.forEach(walk);

  return { headings, searchData };
}

export { extractSearchData, extractTextFromNode };
