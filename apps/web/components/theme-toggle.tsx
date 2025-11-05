'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="size-5" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun className="size-5 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Переключить тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="gap-2 cursor-pointer"
          data-active={theme === 'light'}
        >
          <Sun className="size-4" />
          <span>Светлая</span>
          {theme === 'light' && (
            <span className="ml-auto size-2 rounded-full bg-primary animate-pulse" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="gap-2 cursor-pointer"
          data-active={theme === 'dark'}
        >
          <Moon className="size-4" />
          <span>Темная</span>
          {theme === 'dark' && (
            <span className="ml-auto size-2 rounded-full bg-primary animate-pulse" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="gap-2 cursor-pointer"
          data-active={theme === 'system'}
        >
          <Monitor className="size-4" />
          <span>Системная</span>
          {theme === 'system' && (
            <span className="ml-auto size-2 rounded-full bg-primary animate-pulse" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
