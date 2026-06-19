import type { ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-ocean-deep py-16 text-white">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-3 text-sm text-white/70">Last updated: {updated}</p>
          </div>
        </section>
        <article className="mx-auto max-w-3xl px-6 py-16 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:mt-3 [&_p]:text-muted-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_a]:text-ocean [&_a]:underline">
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
}
