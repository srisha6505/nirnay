'use client';

import React, { useState } from 'react';
import Sidebar from "@/components/sidebar";
import Headbar from '@/components/headbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Plus, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchResult {
  petitioner: string;
  respondent: string;
  date_of_judgment: string;
  citation: string;
  court: string;
  bench: string;
}

interface CaseDetails extends SearchResult {
  judgment: string;
}

export default function SearchPage() {
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseDetails | null>(null);
  const [collections, setCollections] = useState<string[]>([]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const citation = (document.getElementById('citation') as HTMLInputElement).value;
      const petitioner = (document.getElementById('petitioner') as HTMLInputElement).value;
      const respondent = (document.getElementById('respondent') as HTMLInputElement).value;
      const judge = (document.getElementById('judge') as HTMLInputElement).value;

      const queryParams = new URLSearchParams();
      if (citation) queryParams.append('citation', citation);
      if (petitioner) queryParams.append('petitioner', petitioner);
      if (respondent) queryParams.append('respondent', respondent);
      if (judge) queryParams.append('judge', judge);
      if (dateFrom) queryParams.append('date_from', dateFrom);
      if (dateTo) queryParams.append('date_to', dateTo);

      const url = `http://127.0.0.1:8000/cases/search?${queryParams.toString()}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResult[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please check your network connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaseClick = async (citation: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/cases/citation/${encodeURIComponent(citation)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const caseData = await response.json();

      const judgmentResponse = await fetch(`http://127.0.0.1:8000/cases/judgment/${encodeURIComponent(citation)}`);
      if (!judgmentResponse.ok) {
        throw new Error(`HTTP error! status: ${judgmentResponse.status}`);
      }
      const judgmentData = await judgmentResponse.json();

      setSelectedCase({ ...caseData, judgment: judgmentData.judgment });
    } catch (error) {
      console.error("Error fetching case details:", error);
      setError("Failed to fetch case details. Please try again.");
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cases/citation/see');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const addToCollection = async (citation: string, collectionName: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cases/citation/see', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ citation, collection_name: collectionName }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Added case ${citation} to collection ${collectionName}`);
    } catch (error) {
      console.error("Error adding to collection:", error);
    }
  };

  return (
    <body className="body-class bg-gray-100 text-black">
      <div className="flex h-screen bg-gray-100 text-black">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden bg-gray-100 text-black">
          <Headbar />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100 text-black">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black">Case Search</CardTitle>
                <h3 className="text-lg text-black">Search by Citation, Petitioner, Respondent or date</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 text-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-black">
                    <div>
                      <label htmlFor="citation" className="block text-sm font-medium mb-1 text-black">Citation Number</label>
                      <Input id="citation" placeholder="Enter citation number" className="border-gray-300" />
                    </div>
                    <div>
                      <label htmlFor="petitioner" className="block text-sm font-medium mb-1 text-black">Petitioner</label>
                      <Input id="petitioner" placeholder="Enter petitioner name" className="border-gray-300" />
                    </div>
                    <div>
                      <label htmlFor="respondent" className="block text-sm font-medium mb-1 text-black">Respondent</label>
                      <Input id="respondent" placeholder="Enter respondent name" className="border-gray-300" />
                    </div>
                    <div>
                      <label htmlFor="judge" className="block text-sm font-medium mb-1 text-black">Judge Name</label>
                      <Input id="judge" placeholder="Enter judge name" className="border-gray-300" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dateFrom" className="block text-sm font-medium mb-1 text-black">Date Range From</label>
                      <div className="flex items-center border border-gray-300 rounded">
                        <Calendar className="ml-2 mr-2 text-gray-400" />
                        <Input 
                          type="date" 
                          id="dateFrom" 
                          value={dateFrom} 
                          onChange={(e) => setDateFrom(e.target.value)} 
                          className="border-none" 
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="dateTo" className="block text-sm font-medium mb-1 text-black">Date Range To</label>
                      <div className="flex items-center border border-gray-300 rounded">
                        <Calendar className="ml-2 mr-2 text-gray-400" />
                        <Input 
                          type="date" 
                          id="dateTo" 
                          value={dateTo} 
                          onChange={(e) => setDateTo(e.target.value)} 
                          className="border-none" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-2 font-bold"
                      onClick={handleSearch}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="mt-6">
              <Card className="bg-white shadow-lg text-black">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-black">Search Results</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-96">
                    <Table>
                      <TableHeader>
                        <TableRow className='bg-white text-black'>
                          <TableHead className='text-black font-bold' >Citation</TableHead>
                          <TableHead className='text-black font-bold'>Petitioner</TableHead>
                          <TableHead className='text-black font-bold'>Respondent</TableHead>
                          <TableHead className='text-black font-bold'>Date of Judgment</TableHead>
                          <TableHead className='text-black font-bold'>Court</TableHead>
                          <TableHead className='text-black font-bold'>Bench</TableHead>
                          <TableHead className='text-black font-bold'>Add to Collection</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {searchResults.map((result) => (
                          <TableRow key={result.citation}>
                            <TableCell
                              className="cursor-pointer text-blue-600 underline"
                              onClick={() => handleCaseClick(result.citation)}
                            >
                              {result.citation}
                            </TableCell>
                            <TableCell>{result.petitioner}</TableCell>
                            <TableCell>{result.respondent}</TableCell>
                            <TableCell>{result.date_of_judgment}</TableCell>
                            <TableCell>{result.court}</TableCell>
                            <TableCell>{result.bench}</TableCell>
                            <TableCell>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" className="p-2 text-black bg-white hover:bg-gray-200">
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-4 bg-white shadow-md border-black border rounded-lg">
                                  <div className="grid gap-2">
                                    {collections.length === 0 ? (
                                      <div className='bg-white text-black'>No collections available</div>
                                    ) : (
                                      collections.map((collection) => (
                                        <Button
                                          key={collection}
                                          className="text-black bg-white border-black border hover:bg-gray-200"
                                          onClick={() => addToCollection(result.citation, collection)}
                                        >
                                          {collection}
                                        </Button>
                                      ))
                                    )}
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </main>

          {selectedCase && (
            <Dialog open={Boolean(selectedCase)} onOpenChange={() => setSelectedCase(null)}>
              <DialogContent className="max-w-7xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-black">{selectedCase.citation}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-96">
                  <p className="text-black">{selectedCase.judgment}</p>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </body>
  );
}
