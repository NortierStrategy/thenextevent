"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { BlogPost } from "@/lib/blog";
import type { Dictionary } from "@/lib/i18n";

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  dict: Dictionary;
  locale: string;
}

function renderMarkdown(content: string) {
  // Simple markdown to HTML for headings, bold, paragraphs, and lists
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="font-playfair text-2xl text-text font-light mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="font-playfair text-xl text-text font-light mt-8 mb-3">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={key++} className="border-red/[0.08] my-8" />);
    } else if (line.trim() === "") {
      continue;
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      // Collect list items
      const items: string[] = [line.replace(/^[-*] /, "")];
      while (i + 1 < lines.length && (lines[i + 1].startsWith("- ") || lines[i + 1].startsWith("* "))) {
        i++;
        items.push(lines[i].replace(/^[-*] /, ""));
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 mb-4 font-outfit text-[15px] text-text-muted font-light leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = [line.replace(/^\d+\. /, "")];
      while (i + 1 < lines.length && /^\d+\. /.test(lines[i + 1])) {
        i++;
        items.push(lines[i].replace(/^\d+\. /, ""));
      }
      elements.push(
        <ol key={key++} className="list-decimal list-inside space-y-1 mb-4 font-outfit text-[15px] text-text-muted font-light leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    } else {
      elements.push(
        <p key={key++} className="font-outfit text-[15px] text-text-muted font-light leading-[1.9] mb-4">
          {renderInline(line)}
        </p>
      );
    }
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  // Handle **bold** patterns
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-text font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function BlogArticle({
  post,
  relatedPosts,
  dict,
  locale,
}: BlogArticleProps) {
  const isEN = locale === "en";
  const title = isEN ? post.titleEN : post.title;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(isEN ? "en-GB" : "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // JSON-LD structured data — Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: isEN ? post.excerptEN : post.excerpt,
    image: `https://thenextevent.fr${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thenextevent.fr/${locale}/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://thenextevent.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "The Next Event",
      url: "https://thenextevent.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://thenextevent.fr/images/logo.png",
      },
    },
    inLanguage: isEN ? "en" : "fr",
  };

  // JSON-LD structured data — BreadcrumbList
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEN ? "Home" : "Accueil",
        item: `https://thenextevent.fr/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `https://thenextevent.fr/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://thenextevent.fr/${locale}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="bg-black min-h-[100dvh] pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-[720px] mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 font-outfit text-[11px] uppercase tracking-[2px] text-text-muted mb-10"
          >
            <Link href={`/${locale}`} className="hover:text-text transition-colors duration-300">
              {isEN ? "Home" : "Accueil"}
            </Link>
            <span className="text-text-muted/30">/</span>
            <Link href={`/${locale}/blog`} className="hover:text-text transition-colors duration-300">
              Blog
            </Link>
            <span className="text-text-muted/30">/</span>
            <span className="text-text truncate max-w-[200px]">{title}</span>
          </motion.nav>

          {/* Header */}
          <motion.header
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-red">
                {post.category}
              </span>
              <span className="text-text-muted/30">|</span>
              <span className="font-outfit text-[11px] text-text-muted font-light">
                {formatDate(post.date)}
              </span>
            </div>
            <h1 className="font-playfair text-[clamp(26px,4vw,40px)] font-light text-text leading-tight mb-4">
              {title}
            </h1>
            <p className="font-outfit text-sm text-text-muted font-light">
              {isEN ? "By" : "Par"} {post.author}
            </p>
          </motion.header>

          {/* Hero image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="relative aspect-[16/9] rounded-[4px] overflow-hidden mb-12"
          >
            <Image
              src={post.image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              priority
            />
          </motion.div>

          {/* Article content */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            {renderMarkdown(post.content)}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border border-red/[0.08] rounded-[4px] p-8 text-center mb-16"
          >
            <h3 className="font-playfair text-xl text-text font-light mb-3">
              {isEN ? "Need a stage manager?" : "Besoin d'un régisseur ?"}
            </h3>
            <p className="font-outfit text-sm text-text-muted font-light mb-5">
              {isEN
                ? "Our team responds within 24 hours with a tailored proposal."
                : "Notre équipe vous répond sous 24h avec une proposition sur-mesure."}
            </p>
            <Link
              href={`/${locale}/#contact`}
              className="inline-block px-8 py-3 font-outfit text-[10px] font-semibold uppercase tracking-[2.5px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:from-red-light hover:to-red hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] transition-all duration-300"
            >
              {dict.nav.cta}
            </Link>
          </motion.div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="font-outfit text-[11px] font-semibold uppercase tracking-[4px] text-text-muted mb-6">
                {isEN ? "Related articles" : "Articles liés"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/blog/${related.slug}`}
                    className="group block border border-red/[0.08] rounded-[4px] overflow-hidden hover:border-red/20 transition-colors duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-dark">
                      <Image
                        src={related.image}
                        alt={isEN ? related.titleEN : related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, 360px"
                      />
                    </div>
                    <div className="p-5">
                      <span className="font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-red mb-2 block">
                        {related.category}
                      </span>
                      <h4 className="font-playfair text-base text-text font-light group-hover:text-red/90 transition-colors duration-300 leading-snug">
                        {isEN ? related.titleEN : related.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </>
  );
}
