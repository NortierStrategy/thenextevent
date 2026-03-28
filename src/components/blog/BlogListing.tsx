"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { BlogPost } from "@/lib/blog";

const CATEGORIES = [
  { key: "all", labelFR: "Tous", labelEN: "All" },
  { key: "coulisses", labelFR: "Coulisses", labelEN: "Behind the scenes" },
  { key: "tendances", labelFR: "Tendances", labelEN: "Trends" },
  { key: "expertise", labelFR: "Expertise", labelEN: "Expertise" },
];

interface BlogListingProps {
  posts: BlogPost[];
  locale: string;
}

export default function BlogListing({ posts, locale }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const isEN = locale === "en";

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(isEN ? "en-GB" : "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-black min-h-[100dvh] pt-32 pb-20 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <span className="font-outfit text-[11px] font-semibold uppercase tracking-[6px] text-red mb-4 block">
            Blog
          </span>
          <h1 className="font-playfair text-[clamp(28px,4vw,48px)] font-light text-text leading-tight">
            {isEN ? "Insights & " : "Coulisses & "}
            <em className="text-gradient-red">expertise</em>
          </h1>
        </motion.div>

        {/* Category filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 font-outfit text-[11px] font-medium uppercase tracking-[2px] rounded-[2px] border transition-all duration-300 ${
                activeCategory === cat.key
                  ? "border-red bg-red/10 text-text"
                  : "border-red/[0.08] text-text-muted hover:border-red/20 hover:text-text"
              }`}
            >
              {isEN ? cat.labelEN : cat.labelFR}
            </button>
          ))}
        </motion.div>

        {/* Posts grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPosts.map((post) => (
            <motion.article key={post.slug} variants={fadeInUp}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group block border border-red/[0.08] rounded-[4px] overflow-hidden hover:border-red/20 transition-colors duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-dark">
                  <Image
                    src={post.image}
                    alt={isEN ? post.titleEN : post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-red">
                      {post.category}
                    </span>
                    <span className="text-text-muted/30">|</span>
                    <span className="font-outfit text-[11px] text-text-muted font-light">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h2 className="font-playfair text-lg text-text font-light mb-3 group-hover:text-red/90 transition-colors duration-300 leading-snug">
                    {isEN ? post.titleEN : post.title}
                  </h2>
                  <p className="font-outfit text-[13px] text-text-muted font-light leading-relaxed line-clamp-3">
                    {isEN ? post.excerptEN : post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <p className="text-center font-outfit text-text-muted mt-12">
            {isEN ? "No articles in this category yet." : "Aucun article dans cette catégorie pour le moment."}
          </p>
        )}
      </div>
    </div>
  );
}
