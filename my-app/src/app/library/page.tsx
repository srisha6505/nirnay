'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from "@/components/sidebar"
import Headbar from '@/components/headbar'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Collection {
  name: string
  cases: Case[]
}

interface Case {
  citation: string
  petitioner: string
  respondent: string
  court: string
  bench: string
  date: string
}

export default function LibraryPage() {
  const [collections, setCollections] = useState<Collection[]>([
    { name: "saved_cases", cases: [] },
    { name: "my_cases", cases: [] }
  ])
  const [newCollectionName, setNewCollectionName] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Function to fetch cases for a specific collection
  const fetchCasesForCollection = async (collectionName: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/cases/citation/${encodeURIComponent(collectionName)}`);
      if (response.ok) {
        const cases: Case[] = await response.json();
        setCollections(prevCollections =>
          prevCollections.map(collection =>
            collection.name === collectionName ? { ...collection, cases } : collection
          )
        );
      } else {
        console.error(`Failed to fetch cases for ${collectionName}`);
      }
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  // Fetch cases when the component mounts
  useEffect(() => {
    collections.forEach(collection => {
      fetchCasesForCollection(collection.name);
    });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const addCollection = async () => {
    if (newCollectionName.trim()) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/cases/citation/${encodeURIComponent(newCollectionName)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            petitioner: "Sample Petitioner",
            respondent: "Sample Respondent",
            date_of_judgment: "2024-01-01",
            bench: "Sample Bench",
            citation: newCollectionName,
            court: "Sample Court",
            citator_info: null,
            judgment: "Sample Judgment"
          })
        });

        if (response.ok) {
          const newCase: Case = await response.json();
          setCollections([...collections, { name: newCollectionName, cases: [newCase] }]);
          setNewCollectionName('');
          setIsDialogOpen(false);
        } else {
          console.error('Failed to add new case to collection');
        }
      } catch (error) {
        console.error('Error adding collection:', error);
      }
    }
  };

  const deleteCollection = async (collectionName: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/cases/citation/${encodeURIComponent(collectionName)}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCollections(collections.filter(collection => collection.name !== collectionName));
      } else {
        console.error('Failed to delete collection');
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Headbar />
          <main className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-black">LIBRARY</h1>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4 text-black" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-black">Add New Collection</DialogTitle>
                  </DialogHeader>
                  <Input
                    placeholder="Collection Name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className="border-black text-black"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="text-black border-black">Cancel</Button>
                    <Button onClick={addCollection} className="bg-black text-white hover:bg-gray-800">Add</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections.map((collection, index) => (
                <Card key={index} className="bg-white border border-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-black">{collection.name}</CardTitle>
                    {collection.name !== "saved_cases" && collection.name !== "my_cases" && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteCollection(collection.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
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
                        {collection.cases.map((caseItem, caseIndex) => (
                          <TableRow key={caseIndex}>
                            <TableCell className="text-black">{caseItem.citation}</TableCell>
                            <TableCell className="text-black">{caseItem.petitioner}</TableCell>
                            <TableCell className="text-black">{caseItem.respondent}</TableCell>
                            <TableCell className="text-black">{caseItem.court}</TableCell>
                            <TableCell className="text-black">{caseItem.bench}</TableCell>
                            <TableCell className="text-black">{caseItem.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
