"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl">🥣</p>
      <h1 className="mt-6 font-display text-4xl font-bold">Something went wrong</h1>
      <button onClick={() => reset()} className="mt-8 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Try again</button>
    </section>
  );
}
