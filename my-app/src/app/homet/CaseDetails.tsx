// CaseDetail.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from '@/components/sidebar';
import Headbar from '@/components/headbar';

interface Case {
  caseNumber: string;
  caseID: string;
  name: string;
  court: string;
  judge: string;
  verdict: string;
  date: string;
}

const CaseDetail: React.FC = () => {
  const router = useRouter();
  const { caseID } = router.query;

  const [caseData, setCaseData] = useState<Case | null>(null);

  const fetchCaseDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/cases/${caseID}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCaseData(data);
    } catch (error) {
      console.error('Error fetching case details:', error);
    }
  };

  useEffect(() => {
    if (caseID) {
      fetchCaseDetails();
    }
  }, [caseID]);

  if (!caseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <Headbar />
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black">Case Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Case Number:</strong> {caseData.caseNumber}</p>
              <p><strong>Case ID:</strong> {caseData.caseID}</p>
              <p><strong>Name:</strong> {caseData.name}</p>
              <p><strong>Court:</strong> {caseData.court}</p>
              <p><strong>Judge:</strong> {caseData.judge}</p>
              <p><strong>Verdict:</strong> {caseData.verdict}</p>
              <p><strong>Date:</strong> {new Date(caseData.date).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CaseDetail;
