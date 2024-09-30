'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import Sidebar from '@/components/sidebar'
import Headbar from '@/components/headbar'
import { X } from "lucide-react"



interface Note {
  name: string
  createdAt: string
}

interface Notification {
  name: string
  date: string
}

interface Case {
  citation: string
  petitioner: string
  respondent: string
  court: string
  bench: string
  date_of_judgment: string
  judgment: string
}

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [cases, setCases] = useState<Case[]>([])
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const fetchData = async (endpoint: string, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/${endpoint}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log(`Fetched ${endpoint}:`, data)
      setter(data)
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
    }
  }
  const handleCitationClick = async (citation: string) => {
    console.log(`Fetching case details for citation: ${citation}`);
    const normalizedCitation = citation
      .replace(/\s+/g, ' ')
      .trim();
  
    try {
      const caseResponse = await fetch(`http://127.0.0.1:8000/cases/citation/${encodeURIComponent(normalizedCitation)}`, {
        method: 'GET',
      });
      if (!caseResponse.ok) {
        throw new Error(`HTTP error! status: ${caseResponse.status}`);
      }
      const caseData = await caseResponse.json();
      console.log(`Fetched case details for citation ${normalizedCitation}:`, caseData);
  
      // Fetching the judgment for the selected case
      const judgmentResponse = await fetch(`http://127.0.0.1:8000/cases/judgment/${encodeURIComponent(normalizedCitation)}`, {
        method: 'GET',
      });
      if (!judgmentResponse.ok) {
        throw new Error(`HTTP error! status: ${judgmentResponse.status}`);
      }
      const judgmentData = await judgmentResponse.json();
      console.log(`Fetched judgment for citation ${normalizedCitation}:`, judgmentData);
  
      // Set the selected case along with the judgment text
      setSelectedCase({ ...caseData, judgment: judgmentData.judgment });
      setIsPopupOpen(true);
    } catch (error) {
      console.error(`Error fetching details for citation ${normalizedCitation}:`, error);
    }
  };
  



  useEffect(() => {
    fetchData('notes', setNotes)
    fetchData('notifications', setNotifications)
    fetchData('cases', setCases)
  }, [])

  return (
  <body>
    <div className="flex flex-col min-h-screen bg-white text-black">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <Headbar />
          <h1 className="text-2xl font-bold mb-6">DASHBOARD</h1>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-black">Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 overflow-auto scrollbar-hide text-black">
                    <Table>
                      <TableHeader>
                        <TableRow className="text-black">
                          <TableHead className="font-bold text-black">Note Name</TableHead>
                          <TableHead className="font-bold text-black">Date Created</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="text-black">
                        {notes.length > 0 ? (
                          notes.map((note, i) => (
                            <TableRow key={i}>
                              <TableCell className="border-t border-gray-200">{note.name || "N/A"}</TableCell>
                              <TableCell className="border-t border-gray-200">{new Date(note.createdAt).toLocaleDateString() || "N/A"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="text-center text-black">No Notes Available</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-black">Legal Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 overflow-auto scrollbar-hide">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold text-black">Notification Name</TableHead>
                          <TableHead className="font-bold text-black">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {notifications.length > 0 ? (
                          notifications.map((notification, i) => (
                            <TableRow key={i}>
                              <TableCell className="border-t border-gray-200 text-black">{notification.name || "N/A"}</TableCell>
                              <TableCell className="border-t border-gray-200 text-black">{new Date(notification.date).toLocaleDateString() || "N/A"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="text-center text-black">No Notifications Available</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black">Saved Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-auto scrollbar-hide">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-black">Citation</TableHead>
                        <TableHead className="font-bold text-black">Petitioner</TableHead>
                        <TableHead className="font-bold text-black">Respondent</TableHead>
                        <TableHead className="font-bold text-black">Court</TableHead>
                        <TableHead className="font-bold text-black">Bench</TableHead>
                        <TableHead className="font-bold text-black">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cases.length > 0 ? (
                        cases.map((caseItem, i) => (
                          <TableRow key={i} onClick={() => handleCitationClick(caseItem.citation)} className="cursor-pointer hover:bg-gray-100">

                            <TableCell className="border-t border-gray-200 text-black">{caseItem.citation}</TableCell>
                            <TableCell className="border-t border-gray-200 text-black">{caseItem.petitioner}</TableCell>
                            <TableCell className="border-t border-gray-200 text-black">{caseItem.respondent}</TableCell>
                            <TableCell className="border-t border-gray-200 text-black">{caseItem.court}</TableCell>
                            <TableCell className="border-t border-gray-200 text-black">{caseItem.bench}</TableCell>
                            <TableCell className="border-t border-gray-200 text-black">{new Date(caseItem.date_of_judgment).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-black">No Cases Available</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {isPopupOpen && selectedCase && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg w-11/12 h-5/6 flex flex-col">
      <div className="p-6 flex justify-between items-center border-b">
        <h2 className="text-2xl font-bold">Case Details</h2>
        <button
          onClick={() => setIsPopupOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="p-6 flex-grow flex flex-col overflow-hidden">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <p><strong>Citation:</strong> {selectedCase.citation}</p>
          <p><strong>Court:</strong> {selectedCase.court}</p>
          <p><strong>Date of Judgment:</strong> {new Date(selectedCase.date_of_judgment).toLocaleDateString()}</p>
          <p><strong>Petitioner:</strong> {selectedCase.petitioner}</p>
          <p><strong>Respondent:</strong> {selectedCase.respondent}</p>
          <p><strong>Bench:</strong> {selectedCase.bench}</p>
        </div>
        <h3 className="text-2xl font-bold mb">Judgment</h3>
        <ScrollArea className="flex-grow w-full">
          <div className=" judgment-content">
          <div className="judgment-section">
          {selectedCase.judgment}
</div>

          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
)}


    </div>
    <script type="module">
 
</script>
    </body>
  )
}