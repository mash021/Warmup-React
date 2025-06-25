import { usePathname } from "next/navigation";

export default function BlogPostPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop(); // get the last segment

  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div>
      <h1>{title}</h1>
      <p>This is the blog post for "{title}".</p>
    </div>
  );
}
