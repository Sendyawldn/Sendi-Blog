import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Reference = {
  title: string;
  url?: string;
};

export type TurnitinData = {
  score: number;
  label?: string;
};

export type PostMetadata = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  turnitin?: TurnitinData;
  references?: Reference[];
};

const rootDirectory = path.join(process.cwd(), "content", "blog");

// Pastikan direktori ada
if (!fs.existsSync(rootDirectory)) {
  fs.mkdirSync(rootDirectory, { recursive: true });
}

export const getPostBySlug = async (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    meta: { ...data, slug: realSlug } as PostMetadata,
    content,
  };
};

export const getAllPostsMeta = async () => {
  if (!fs.existsSync(rootDirectory)) return [];

  const files = fs.readdirSync(rootDirectory);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(rootDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      return {
        ...data,
        slug: file.replace(/\.mdx$/, ""),
      } as PostMetadata;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
};
