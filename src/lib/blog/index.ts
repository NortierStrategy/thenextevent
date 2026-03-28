import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  titleEN: string;
  date: string;
  excerpt: string;
  excerptEN: string;
  category: "coulisses" | "tendances" | "expertise";
  image: string;
  keywords: string[];
  author: string;
  content: string;
  relatedServices?: string[];
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug: data.slug || filename.replace(/\.mdx$/, ""),
      title: data.title,
      titleEN: data.titleEN || data.title,
      date: data.date,
      excerpt: data.excerpt,
      excerptEN: data.excerptEN || data.excerpt,
      category: data.category,
      image: data.image || "/blog/placeholder.jpg",
      keywords: data.keywords || [],
      author: data.author || "The Next Event",
      content,
      relatedServices: data.relatedServices || [],
    } as BlogPost;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 3
): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const posts = getAllPosts().filter((p) => p.slug !== currentSlug);
  const sameCategory = posts.filter((p) => p.category === current.category);
  const others = posts.filter((p) => p.category !== current.category);

  return [...sameCategory, ...others].slice(0, limit);
}
