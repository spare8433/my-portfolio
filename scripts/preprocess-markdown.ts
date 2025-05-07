// scripts/preprocess-markdown.js
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import { extractSearchData } from "utils/extractTextFromNode";

// 모든 마크다운 파일 전처리
const preprocessMarkdown = () => {
  const contentDir = path.join(process.cwd(), "contents"); // md 파일 저장해둔 폴더 경로
  const files = fs.readdirSync(contentDir);

  const processedData = files.map((file) => {
    const filePath = path.join(contentDir, file); // md 파일 경로
    const fileContent = fs.readFileSync(filePath, "utf8"); // md 파일 내용 읽기

    const { data: frontmatter, content } = matter(fileContent); // frontmatter와 content 분리
    const ast = remark().parse(content); // 마크다운 내용을 AST로 변환
    const searchData = extractSearchData(ast);

    return {
      slug: file.replace(".md", ""), //
      frontmatter,
      content,
      searchData,
    };
  });

  // JSON 파일로 저장
  fs.writeFileSync(path.join(process.cwd(), "public/processed-content.json"), JSON.stringify(processedData));
};

preprocessMarkdown();
