import { getPostBySlug, getAllPostsMeta } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.meta.title} - Sendi's Blog`,
    description: post.meta.excerpt,
  };
}

// ─── Tipe data ───────────────────────────────────────────────────────────────

type Reference = {
  title: string;
  url?: string;
};

type TurnitinData = {
  score: number;
  label?: string;
};

// ─── Komponen Sidebar ─────────────────────────────────────────────────────────

function TurnitinCard({ data }: { data: TurnitinData }) {
  const isGreen = data.score < 20;
  const isYellow = data.score >= 20 && data.score < 40;

  const color = isGreen ? "#4CAF70" : isYellow ? "#E8A020" : "#E84040";
  const bgColor = isGreen
    ? "rgba(76,175,112,0.08)"
    : isYellow
      ? "rgba(232,160,32,0.08)"
      : "rgba(232,64,64,0.08)";
  const borderColor = isGreen
    ? "rgba(76,175,112,0.25)"
    : isYellow
      ? "rgba(232,160,32,0.25)"
      : "rgba(232,64,64,0.25)";

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (data.score / 100) * circumference;

  return (
    <div
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "16px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#6A5A48",
          marginBottom: "16px",
        }}
      >
        Hasil Turnitin
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          style={{ flexShrink: 0 }}
        >
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="7"
          />
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 44 44)"
            style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
          />
          <text
            x="44"
            y="44"
            textAnchor="middle"
            dominantBaseline="central"
            fill={color}
            fontSize="18"
            fontWeight="800"
            fontFamily="var(--font-heading)"
          >
            {data.score}%
          </text>
        </svg>

        <div>
          <p
            style={{
              color: color,
              fontWeight: 700,
              fontSize: "15px",
              marginBottom: "4px",
              filter: `drop-shadow(0 0 8px ${color}66)`,
            }}
          >
            {data.label ?? (isGreen ? "Sangat Orisinal" : "Perlu Ditinjau")}
          </p>
          <p style={{ color: "#6A5A48", fontSize: "12px", lineHeight: "1.5" }}>
            {isGreen
              ? "Tingkat kemiripan di bawah 20% — konten dianggap orisinal."
              : "Tingkat kemiripan cukup tinggi. Periksa kembali sumber."}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReferencesCard({ references }: { references: Reference[] }) {
  return (
    <div
      style={{
        background: "rgba(44,40,32,0.6)",
        border: "1px solid #3A3428",
        borderRadius: "16px",
        padding: "20px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#6A5A48",
          marginBottom: "14px",
        }}
      >
        Sumber Referensi
      </p>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {references.map((ref, i) => (
          <li
            key={i}
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#3A3428",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                color: "#D4A870",
                fontWeight: 700,
                marginTop: "1px",
              }}
            >
              {i + 1}
            </span>
            {ref.url ? (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A870] hover:underline text-[13px] leading-relaxed break-words"
                style={{ textDecoration: "none" }}
              >
                {ref.title}
              </a>
            ) : (
              <span
                style={{
                  color: "#907860",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  wordBreak: "break-word",
                }}
              >
                {ref.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const turnitin = post.meta.turnitin as TurnitinData | undefined;
  const references = post.meta.references as Reference[] | undefined;
  const hasSidebar = turnitin || (references && references.length > 0);

  return (
    <article className="py-12">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/blog"
          className="text-sm font-medium text-[#C0B090] hover:text-[#E8E0D4] transition-colors mb-6 inline-block"
        >
          ← Kembali ke artikel
        </Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 text-[#E8E0D4]">
          {post.meta.title}
        </h1>
        <time className="text-[#6A5A48] font-mono text-sm block">
          {post.meta.date}
        </time>
      </div>

      {/* Layout: konten + sidebar */}
      <div
        className={hasSidebar ? "lg:grid lg:gap-10 lg:items-start" : ""}
        style={hasSidebar ? { gridTemplateColumns: "1fr 260px" } : {}}
      >
        {/* Konten MDX */}
        <div className="prose max-w-none min-w-0">
          <MDXRemote source={post.content} />
        </div>

        {/* Sidebar — hanya desktop */}
        {hasSidebar && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              {turnitin && <TurnitinCard data={turnitin} />}
              {references && references.length > 0 && (
                <ReferencesCard references={references} />
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Sidebar mobile — tampil di bawah konten */}
      {hasSidebar && (
        <div className="lg:hidden mt-12 space-y-4">
          {turnitin && <TurnitinCard data={turnitin} />}
          {references && references.length > 0 && (
            <ReferencesCard references={references} />
          )}
        </div>
      )}
    </article>
  );
}
