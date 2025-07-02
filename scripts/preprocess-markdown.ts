import fs from "fs";
import matter from "gray-matter";
import type { Element, RootContent as HastRootContent } from "hast";
import type { Root, RootContent } from "mdast";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFormat from "rehype-format";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";

// 출력 타입
type FrontmatterType = { title: string; slug: string };

interface ParsedMarkdown {
  route: string;
  content: string;
  frontmatter: FrontmatterType;
  filePath: string;
}

// md 파일 경로
const CONTENT_DIR = path.join(process.cwd(), "contents");

generateStaticFilesFromMarkdown(); // 스크립트 실행

// 헤딩에 URI fragment 를 위한 id 속성 추가 함수(예: <h1 id="제목-예시">제목 예시</h1>)
function rehypeCustomSlug() {
  return (tree: Element) => {
    const visit = (node: HastRootContent) => {
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
        const text = extractTextFromHtmlNode(node);
        const slug = generateSlug(text);

        node.properties = { ...node.properties, id: slug };
        console.log(node.properties);
      }

      if ("children" in node && Array.isArray(node.children)) {
        for (const child of node.children) {
          visit(child);
        }
      }
    };

    visit(tree);
  };
}

/**
 * 검색 데이터: public/searchData.json
 * HTML 파일: public/html/{slug}.html
 * 목차 데이터: public/{slug}.json
 */
async function generateStaticFilesFromMarkdown() {
  const parsedMarkdowns = getAllMarkdownFiles(CONTENT_DIR);
  const searchDataList: SearchData[] = [];

  for (const parsedMarkdown of parsedMarkdowns) {
    const { route, content, frontmatter } = parsedMarkdown;
    const ast = remark().use(remarkGfm).parse(content);

    const htmlResult = await remark()
      .use(remarkGfm) // GFM (GitHub Flavored Markdown) 지원
      .use(remarkRehype, { allowDangerousHtml: true }) // 마크다운을 HTML AST 로 변환
      .use(rehypeRaw) // HTML 태그를 포함한 마크다운 지원
      .use(rehypeCustomSlug) // 헤딩에 id 생성
      .use(rehypeAutolinkHeadings, { behavior: "wrap" }) // 헤딩을 <a>로 감싸 앵커 생성
      .use(rehypeFormat) // HTML 포맷팅
      .use(rehypeStringify) // HTML 문자열로 변환
      .process(content); // 이건 HTML 문자열 포함

    const { searchData, headings } = extractSearchData(ast, route); // 검색 데이터 및 목차 데이터 추출

    // html 파일로 저장
    ensureWriteFileSync(path.join(process.cwd(), `public/html/${frontmatter.slug}.html`), String(htmlResult));

    // 목차 데이터 JSON 파일로 저장
    ensureWriteFileSync(path.join(process.cwd(), `public/${frontmatter.slug}.json`), JSON.stringify(headings));

    // 검색에 데이터 추가
    for (const data of searchData) {
      searchDataList.push(data);
    }
  }

  // 검색 데이터 JSON 파일로 저장
  ensureWriteFileSync(path.join(process.cwd(), "public/site-search.json"), JSON.stringify(searchDataList));
}

function getAllMarkdownFiles(dir: string): ParsedMarkdown[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true }); // 디렉토리 내부 항목들 (파일/폴더 포함)
  const results: ParsedMarkdown[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name); // 현재 항목의 전체 경로
    const relativePath = path.relative(CONTENT_DIR, fullPath); // 루트 기준 상대 경로
    const withoutExt = relativePath.replace(/\.md$/, ""); // 확장자 제거한 경로

    if (entry.isDirectory()) {
      // 하위 폴더일 경우 재귀적으로 탐색
      results.push(...getAllMarkdownFiles(fullPath)); // 하위 경로에 대해 재귀 호출
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      // .md 파일인 경우만 처리
      const raw = fs.readFileSync(fullPath, "utf-8"); // 파일 내용 읽기
      const { content, data: frontmatter } = matter(raw); // frontmatter 및 본문 분리

      const route = frontmatter.slug ? "/" + frontmatter.slug : "/" + withoutExt.replace(/\\/g, "/"); // OS에 따라 경로 구분자 일관되게 처리 → URL 경로화

      results.push({
        route, // 최종 URL 경로
        content, // 마크다운 본문
        frontmatter: frontmatter as FrontmatterType, // YAML frontmatter
        filePath: fullPath, // 실제 파일 경로 (디버깅용)
      });
    }
  }

  return results; // 누적된 결과 반환
}

function extractSearchData(ast: Root, route: string): { searchData: SearchData[]; headings: HeadingType[] } {
  const searchData: SearchData[] = [];
  let headingHierarchy: string[] = [];
  const headings: HeadingType[] = [];

  const walk = (node: RootContent) => {
    switch (node.type) {
      case "heading": {
        const text = extractTextFromNode(node);
        if (text.trim()) {
          // 공백이 아닌 경우에만 실행
          headingHierarchy = updateHeadingHierarchy(headingHierarchy, node.depth, text);
          headings.push({
            path: `${route}#${generateSlug(text)}`,
            depth: node.depth,
            text,
          });

          searchData.push({ route, type: node.type, headingHierarchy, text });
        }
        break;
      }

      case "tableCell":
      case "paragraph":
      case "code": {
        const text = extractTextFromNode(node);
        if (text.trim()) {
          // 공백이 아닌 경우에만 추가
          searchData.push({ route, type: node.type, headingHierarchy, text });
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

const updateHeadingHierarchy = (hierarchy: string[], depth: number, text: string): string[] => {
  const newHierarchy = [...hierarchy];
  newHierarchy[depth - 1] = text;
  return newHierarchy.slice(0, depth);
};

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

function extractTextFromHtmlNode(node: Element): string {
  let result = "";
  for (const child of node.children || []) {
    if (child.type === "text") {
      result += child.value;
    } else if (child.type === "element") {
      result += extractTextFromHtmlNode(child);
    }
  }
  return result;
}

function ensureWriteFileSync(filePath: string, content: string): void {
  const dirPath = path.dirname(filePath); // 파일의 디렉토리 추출

  // 디렉토리가 없으면 생성
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // 파일 저장
  fs.writeFileSync(filePath, content, "utf-8");
}

// slug 변환 함수("1. 제목 예시" > "1-제목-예시")
function generateSlug(text: string): string {
  return text
    .normalize("NFKD") // 유니코드 정규화
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // 특수문자 제거, 한글 허용
    .trim()
    .replace(/\s+/g, "-") // 공백 → 하이픈
    .toLowerCase();
}
