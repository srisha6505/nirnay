import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Headbar from "@/components/headbar"



function VersionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full p-3 mb-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded transition duration-200 ease-in-out"
    >
      {children}
    </Link>
  )
}

export default function Component() {
  return (
    <body>
      <div className="flex flex-col min-h-screen bg-white text-black">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6">
            <Headbar />
            <h1>Notes Coming Soon as soon as you select us</h1>
           </main> 
        </div>
      </div>
    </body>
  )
}