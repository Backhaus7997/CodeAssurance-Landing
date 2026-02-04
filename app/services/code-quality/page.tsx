import Link from 'next/link';

export default function CodeQualityPage() {
  return (
    <main className="min-h-screen px-6 py-24 lg:px-16 xl:px-24">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Code Quality
        </h1>
        <p className="text-lg text-gray-300">Coming soon2</p>
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-mono uppercase tracking-[0.2em] text-accent transition-all duration-300 hover:border-accent hover:bg-accent/20"
        >
          Back to Home
          <span className="text-accent/70">→</span>
        </Link>
      </div>
    </main>
  );
}
