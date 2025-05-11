import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Tech Adoption Platform</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/api/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover and Share Tech Experiences
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  An internal platform for employees to collect, manage, and showcase hands-on experiences with emerging
                  online tools, SaaS products, and technologies.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/api/auth/signin">
                    <Button size="lg">Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-lg border bg-card p-8 shadow-sm">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Platform Features</h3>
                      <ul className="list-disc pl-4 text-muted-foreground">
                        <li>Share detailed feedback and structured insights</li>
                        <li>Upload screen recordings and video walkthroughs</li>
                        <li>Rate and react to tech experiences</li>
                        <li>Track and manage training budgets</li>
                        <li>Discover new tools and technologies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Tech Adoption Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
