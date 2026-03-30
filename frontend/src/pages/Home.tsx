
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl text-slate-900 dark:text-slate-100">
            Secure E-Voting
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A blockchain-based voting system ensuring transparency, integrity, and privacy for university elections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          
          <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
            <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
              <CardTitle>Voter Portal</CardTitle>
              <CardDescription>
                Cast your vote securely using your unique code and wallet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/voter">
                <Button className="w-full group" size="lg">
                  Enter Voting Booth
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
            <CardHeader>
                 <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-purple-600" />
                </div>
              <CardTitle>Admin Portal</CardTitle>
              <CardDescription>
                Manage eligible voters, issue codes, and monitor results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin">
                <Button variant="secondary" className="w-full group" size="lg">
                  Access Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
