'use client'

import { BookOpen, Briefcase, Calendar, Home, Users } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Chatman
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground"
          >
            <Home className="h-4 w-4" />
            <span>Главная</span>
          </Link>
          <Link
            href="/community"
            className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60"
          >
            <Users className="h-4 w-4" />
            <span>Сообщество</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60"
          >
            <Briefcase className="h-4 w-4" />
            <span>Проекты</span>
          </Link>
          <Link
            href="/events"
            className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60"
          >
            <Calendar className="h-4 w-4" />
            <span>События</span>
          </Link>
          <Link
            href="/knowledge"
            className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60"
          >
            <BookOpen className="h-4 w-4" />
            <span>База знаний</span>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="default">Войти</Button>
        </div>
      </div>
    </header>
  )
}
