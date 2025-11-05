import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="container py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Новая платформа для творческих людей
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Сообщество свободных и{' '}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              креативных
            </span>{' '}
            людей
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Платформа для тех, кто стремится выйти из системы страха и раскрыть свой творческий
            потенциал. Находите единомышленников, создавайте проекты, развивайтесь.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2">
              Присоединиться <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Узнать больше</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Почему Chatman.media?</h2>
              <p className="text-lg text-muted-foreground">
                Все что нужно для успешного творческого пути
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Творчество</h3>
                <p className="text-muted-foreground">
                  Делитесь своими работами и получайте гарантированные просмотры от активного
                  сообщества
                </p>
              </div>
              <div className="rounded-lg border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Сообщество</h3>
                <p className="text-muted-foreground">
                  Находите единомышленников, обменивайтесь опытом и создавайте совместные проекты
                </p>
              </div>
              <div className="rounded-lg border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Свобода</h3>
                <p className="text-muted-foreground">
                  Выходите из системы страха, раскрывайте потенциал и живите осознанной жизнью
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-3xl rounded-lg border bg-card p-8 text-center shadow-sm md:p-12">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Готовы начать?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Присоединяйтесь к сообществу творческих людей и начните путь к свободе уже сегодня
          </p>
          <Button size="lg" className="gap-2">
            Создать аккаунт <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  )
}
