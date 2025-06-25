export default function BlogsPage() {
  const blogSlugs = ["my-new-post", "nasa-update", "hello-mars"];

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogSlugs.map((slug) => (
          <li key={slug}>
            <a href={`/blogs/${slug}`}>{slug.replace(/-/g, " ")}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
