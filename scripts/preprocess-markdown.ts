import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";

import { extractSearchData } from "../utils/extractMdData";

// 모든 마크다운 파일 전처리
const preprocessMarkdown = async () => {
  const contentDir = path.join(process.cwd(), "contents"); // md 파일 저장해둔 폴더 경로
  const files = fs.readdirSync(contentDir);

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(contentDir, file); // md 파일 경로
      const fileContent = fs.readFileSync(filePath, "utf8"); // md 파일 내용 읽기

      const { data: frontmatter, content } = matter(fileContent); // frontmatter와 content 분리

      const ast = remark().use(remarkGfm).parse(content); // 마크다운 내용을 AST로 변환

      const { searchData, headings } = extractSearchData(ast);

      const result = {
        slug: file.replace(".md", ""),
        frontmatter,
        headings,
        searchData,
      };

      // JSON 파일로 저장
      fs.writeFileSync(path.join(process.cwd(), `public/${file.replace(".md", "")}.json`), JSON.stringify(result));
    }),
  );
};

preprocessMarkdown();
