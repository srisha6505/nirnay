"use client"
import React from 'react';
import Sidebar from '@/components/sidebar';
import { colors } from '@/components/colors.js';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const LibraryPage = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
               
                {/* <header className="bg-[${colors.primary}] shadow-md p-4 fixed top-0 right-0 z-10 left-64 m-4 rounded-lg" style={{ backgroundColor: colors.primary }}>
                    <h1 className="text-2xl font-bold" style={{ color: colors.secondary }}>Library</h1>
                </header> */}

                {/* <main className="flex-1 p-4 mt-24" style={{ backgroundColor: colors.primary }}> */}
                    <div className="mt-8" >
                        <h2 className="text-xl font-semibold mb-4 text-left" style={{ color: colors.primary }}>Saved Cases</h2>
                    </div>
                    <div className="mt-8">
                    <Table>
                        <TableHeader style={{ backgroundColor: colors.primary }}>
                            <TableRow style={{ backgroundColor: colors.primary }}>
                                <TableHead className="font-bold" style={{ color: colors.secondary }}>Case ID</TableHead>
                                <TableHead className="font-bold" style={{ color: colors.secondary }}>Case Name</TableHead>
                                <TableHead className="font-bold" style={{ color: colors.secondary }}>Judge</TableHead>
                                <TableHead className="font-bold" style={{ color: colors.secondary }}>Verdict</TableHead>
                                <TableHead className="font-bold" style={{ color: colors.secondary }}>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Add table rows here */}
                        </TableBody>
                    </Table>
                {/* </main> */}
            </div>
        </div>
        </div>
    );
};

export default LibraryPage;