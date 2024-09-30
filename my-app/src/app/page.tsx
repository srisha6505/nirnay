"use client"
import React from 'react';
import Sidebar from '@/components/sidebar';
import Headbar from '@/components/headbar';
import { colors } from '@/components/colors';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from 'next/link';

// Sample data for notes
const initialNotes = [
    { name: "Case Study 1", dateCreated: "2023-07-01" },
    { name: "Legal Research", dateCreated: "2023-07-05" },
    { name: "Case Study 2", dateCreated: "2023-07-02" },
    { name: "Legal Research 2", dateCreated: "2023-07-06" },
    { name: "Case Study 3", dateCreated: "2023-07-03" },
    { name: "Legal Research 3", dateCreated: "2023-07-07" },
    // Add more sample notes here
];

// Sample data for notifications
const initialNotifications = [
        { name: "New Case Assignment", date: "2023-07-10" },
    { name: "Court Date Reminder", date: "2023-07-15" },
    { name: "New Case Assignment", date: "2023-07-10" },
    { name: "Court Date Reminder", date: "2023-07-15" },
    { name: "New Case Assignment", date: "2023-07-10" },
    { name: "Court Date Reminder", date: "2023-07-15" },
    { name: "New Case Assignment", date: "2023-07-10" }
    // Add more sample notifications here
];

// Sample data for cases
const initialCases = [
    { id: "C001", name: "Smith vs. Johnson", judge: "Hon. Brown", verdict: "Pending", date: "2023-08-01" },
    { id: "C002", name: "Doe vs. Corporation X", judge: "Hon. Davis", verdict: "Settled", date: "2023-07-20" },
    { id: "C003", name: "Jones vs. Tech Corp", judge: "Hon. Smith", verdict: "Won", date: "2023-07-18" },
    { id: "C004", name: "Johnson vs. Medical Center", judge: "Hon. Johnson", verdict: "Lost", date: "2023-07-16" },
    { id: "C005", name: "Williams vs. Law Firm", judge: "Hon. Williams", verdict: "Pending", date: "2023-07-14" },
    { id: "C006", name: "Brown vs. Construction Co", judge: "Hon. Brown", verdict: "Settled", date: "2023-07-12" },
    { id: "C007", name: "Doe vs. Corporation X", judge: "Hon. Davis", verdict: "Settled", date: "2023-07-20" },
    { id: "C008", name: "Jones vs. Tech Corp", judge: "Hon. Smith", verdict: "Won", date: "2023-07-18" },
    { id: "C009", name: "Johnson vs. Medical Center", judge: "Hon. Johnson", verdict: "Lost", date: "2023-07-16" },
    { id: "C010", name: "Williams vs. Law Firm", judge: "Hon. Williams", verdict: "Pending", date: "2023-07-14" },
    { id: "C011", name: "Brown vs. Construction Co", judge: "Hon. Brown", verdict: "Settled", date: "2023-07-12" },
    // Add more sample cases here
];

const HomePage = () => {
    const [notes, setNotes] = React.useState(initialNotes);
    const [notifications, setNotifications] = React.useState(initialNotifications);
    const [cases, setCases] = React.useState(initialCases);

    // Function to add a new note
    const addNote = (newNote: any) => {
        setNotes([...notes, newNote]);
    };

    // Function to add a new notification
    const addNotification = (newNotification: any) => {
        setNotifications([...notifications, newNotification]);
    };

    // Function to add a new case
    const addCase = (newCase: any) => {
        setCases([...cases, newCase]);
    };

    return (
        <div className="flex flex-col h-screen" style={{ backgroundColor: colors.primary }}>
            <Headbar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 p-6 ml-72 overflow-y-auto">
                    <Breadcrumb className="mb-6 text-black">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-white text-black">
                            <CardHeader>
                                <CardTitle>Your Notes</CardTitle>
                            </CardHeader>
                            <CardContent className="h-64 overflow-hidden relative">
                                <div className="overflow-y-auto h-full pr-2 scrollbar-hidden">
                                    <Table>
                                        <TableHeader className="sticky top-0 bg-white z-10">
                                            <TableRow className="border-b border-gray-200">
                                                <TableHead className="font-semibold">Note Name</TableHead>
                                                <TableHead className="font-semibold">Date Created</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {notes.map((note, index) => (
                                                <TableRow key={index} className="border-b border-gray-100">
                                                    <TableCell className="py-2">{note.name}</TableCell>
                                                    <TableCell className="py-2">{note.dateCreated}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white text-black">
                            <CardHeader>
                                <CardTitle>Recent Litigation Notifications</CardTitle>
                            </CardHeader>
                            <CardContent className="h-64 overflow-hidden relative">
                                <div className="overflow-y-auto h-full pr-2 scrollbar-hidden">
                                    <Table>
                                        <TableHeader className="sticky top-0 bg-white z-10">
                                            <TableRow className="border-b border-gray-200">
                                                <TableHead className="font-semibold">Notification</TableHead>
                                                <TableHead className="font-semibold">Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {notifications.map((notification, index) => (
                                                <TableRow key={index} className="border-b border-gray-100">
                                                    <TableCell className="py-2">{notification.name}</TableCell>
                                                    <TableCell className="py-2">{notification.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-6 bg-white text-black">
                        <CardHeader>
                            <CardTitle>
                                <Link href="/library" className="hover:underline">
                                    My Library
                                </Link>
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="h-64 overflow-hidden relative">
                        <div className="overflow-y-auto h-full pr-2 scrollbar-hidden">

                            <h3 className="text-lg font-semibold mb-2">Saved Cases</h3>

                            <div className="overflow-y-auto h-full pr-2 scrollbar-hidden">

                                <Table>
                                    <TableHeader className="sticky top-0 bg-white z-10">
                                        <TableRow className="border-b border-gray-200">
                                            <TableHead className="font-semibold">Case ID</TableHead>
                                            <TableHead className="font-semibold">Case Name</TableHead>
                                            <TableHead className="font-semibold">Judge Name</TableHead>
                                            <TableHead className="font-semibold">Verdict</TableHead>
                                            <TableHead className="font-semibold">Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cases.map((case_, index) => (
                                            <TableRow key={index} className="border-b border-gray-100">
                                                <TableCell className="py-2">{case_.id}</TableCell>
                                                <TableCell className="py-2">{case_.name}</TableCell>
                                                <TableCell className="py-2">{case_.judge}</TableCell>
                                                <TableCell className="py-2">{case_.verdict}</TableCell>
                                                <TableCell className="py-2">{case_.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
