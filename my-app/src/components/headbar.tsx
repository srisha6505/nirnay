"use client";

import React from 'react'
import { Bell, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  return (
    <div className="themed-header">
      <style jsx>{`
        .themed-header {
          /* Main colors */
          --color-bg-primary: #ffffff;
          --color-bg-secondary: #f3f4f6;
          --color-accent: #3b82f6;
          
          /* Border colors */
          --color-border: #e5e7eb;
          
          /* Hover and focus colors */
          --color-hover: #eff6ff;
          --color-focus: #bfdbfe;
          
          /* Notification colors */
          --color-notification: #ef4444;

          /* Text colors */
          --color-text-primary: #000000;
          --color-text-secondary: #000000;

          /* Dropdown hover color */
          --color-dropdown-hover: #f8f9fa;
        }
      `}</style>
      <header className="h-10 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] flex items-center justify-between px-4" style={{backgroundColor: 'white'}}>
        <div className="flex-1 max-w-md">
          <div className="relative flex items-center h-full">
            {/* Search input removed */}
          </div>
        </div>
        <div className="flex items-center space-x-4 h-full">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-[var(--color-hover)] focus:bg-[var(--color-focus)]"
          >
            <Bell className="h-5 w-5 text-black" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-[var(--color-notification)] rounded-full"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-[var(--color-hover)] focus:bg-[var(--color-focus)]"
              >
                <User className="h-5 w-5 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[var(--color-bg-primary)] border-[var(--color-border)]">
              <DropdownMenuLabel className="text-black">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[var(--color-border)]" />
              <DropdownMenuItem className="text-black hover:text-black hover:bg-[var(--color-dropdown-hover)] focus:text-black focus:bg-[var(--color-dropdown-hover)]">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:text-black hover:bg-[var(--color-dropdown-hover)] focus:text-black focus:bg-[var(--color-dropdown-hover)]">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:text-black hover:bg-[var(--color-dropdown-hover)] focus:text-black focus:bg-[var(--color-dropdown-hover)]">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
}