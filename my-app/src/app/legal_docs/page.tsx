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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white text-black">
                <CardHeader>
                  <CardTitle className="text-black bg-white">Indian Constitution</CardTitle>
                </CardHeader>
                <CardContent className="text-black bg-white">
                  <p className="text-sm text-gray-500 mb-4">Access the Indian Constitution in English or Hindi:</p>
                  <VersionLink href="https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf">
                    English Version
                  </VersionLink>
                  <VersionLink href="https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2023/05/2023050186.pdf">
                    Hindi Version
                  </VersionLink>
                </CardContent>
              </Card>
              <Card className="bg-white text-black">
                <CardHeader>
                  <CardTitle className="text-black bg-white">Landmark Judgments</CardTitle>
                </CardHeader>
                <CardContent className="text-black bg-white"    >
                  <p className="text-sm text-gray-500 mb-4">Access landmark judgments and summaries:</p>
                  <VersionLink href="https://www.sci.gov.in/landmark-judgment-summaries/">
                    Landmark Judgments Summaries By The Supreme Court of India website
                  </VersionLink>
                  <VersionLink href="https://nja.gov.in/Concluded_Programmes/2019-20/SE-05_2019_PPTs/6.LANDMARK%20JUDGMENTS%20OF%20THE%20SUPREME%20COURT%20PLAIN.pdf">
                    Landmark Judgments of The Supreme Court of India By Justice Ved Prakash
                  </VersionLink>
                </CardContent>
              </Card>
              <Card className="bg-white text-black">
                <CardHeader>
                  <CardTitle className="text-black bg-white">CPC (Civil Procedure Code)</CardTitle>
                </CardHeader>
                <CardContent className="text-black bg-white"    >
                  <p className="text-sm text-gray-500 mb-4">Access the Civil Procedure Code in English or Hindi:</p>
                  <VersionLink href="https://www.indiacode.nic.in/bitstream/123456789/2191/1/A1908-05.pdf">
                    English Version
                  </VersionLink>
                  <VersionLink href="https://www.indiacode.nic.in/bitstream/123456789/2191/2/H1908-05.pdf">
                    Hindi Version
                  </VersionLink>
                </CardContent>
              </Card>
              <Card className="bg-white text-black">
                <CardHeader>
                  <CardTitle className="text-black bg-white">Central Acts</CardTitle>
                </CardHeader>
                <CardContent className="text-black bg-white"        >
                  <p className="text-sm text-gray-500 mb-4">Access the Central Acts database:</p>
                  <VersionLink href="https://legislative.gov.in/central-acts-updated/">
                    Department of Legislature Database
                  </VersionLink>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-gray-500 mt-6">More coming soon...</p>
          </main>
        </div>
      </div>
    </body>
  )
}