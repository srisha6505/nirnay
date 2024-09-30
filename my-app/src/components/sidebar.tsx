import React from 'react'
import { Home, BookOpen, FileSearch, TrendingUp, Info, Settings, HelpCircle, MessageSquare, Gavel, NotebookTabsIcon, InfoIcon, BadgeInfo } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { HomeIcon } from '@radix-ui/react-icons'

export default function Sidebar() {
  return (
    <div className="flex h-screen bg-black text-black">
      {/* Sidebar */}
      <div className="w-64 flex flex-col  border-r border-gray-200 text-black" style={{backgroundColor: '#cfecec'}}>
        {/* Header */}
        <div className="h-16 flex items-center justify-center  px-4" style={{backgroundColor: '#cfecec'}}>
          <Gavel className="h-8 w-8 mr-2 text-blue-600" />
          <span className="text-xl font-bold text-gray-800 ">Adalat.ai </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 ">
          <ul className="space-y-4 px-4 text-black">
            <li><a href="/homet" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600 flex items-center "><Home className="mr-2 h-4 w-4" /> Home</a></li>
            <li><a href="/library" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600 flex items-center"><BookOpen className="mr-2 h-4 w-4" /> My Library</a></li>
            <li><a href="/search" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600 flex items-center"><FileSearch className="mr-2 h-4 w-4" /> Search Cases</a></li>
            <li><a href="/predictive" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600 flex items-center"><TrendingUp className="mr-2 h-4 w-4" /> Predictive Analysis</a></li>
            <li><a href="/notes" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600 flex items-center"><NotebookTabsIcon className="mr-2 h-4 w-4" /> Notes</a></li>
            <li><a href="/legal_docs" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600 flex items-center"><BadgeInfo  className="mr-2 h-4 w-4" /> Legal Documents</a></li>
            <li><a href="/about" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600 flex items-center"><Info className="mr-2 h-4 w-4" /> About</a></li>

                      </ul>
        </nav>

        {/* Bottom Links */}
        <div className="p-4 border-t border-gray-200">
          <ul className="space-y-2">
            <li><Button variant="ghost" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600"><Settings className="mr-2 h-4 w-4" /> Settings</Button></li>
            <li><Button variant="ghost" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600"><HelpCircle className="mr-2 h-4 w-4" /> Help</Button></li>
            <li><Button variant="ghost" className="w-full justify-start text-black hover:bg-blue-50 hover:text-blue-600"><MessageSquare className="mr-2 h-4 w-4" /> Contact</Button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}