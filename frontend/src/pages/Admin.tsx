
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import axios from 'axios';
import { Plus, RefreshCw } from 'lucide-react';

const API_URL = 'http://localhost:4000/api';

export default function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('');
  const [voters, setVoters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // Create Voter State
  const [newName, setNewName] = useState('');
  const [newId, setNewId] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (token) {
        fetchVoters();
        fetchResults();
    }
  }, [token]);

  const login = async () => {
    try {
        const res = await axios.post(`${API_URL}/admin/login`, { password });
        if (res.data.ok) {
            localStorage.setItem('adminToken', res.data.token);
            setToken(res.data.token);
            toast.success("Logged in");
        }
    } catch (err) {
        toast.error("Invalid password");
    }
  };

  const logout = () => {
      localStorage.removeItem('adminToken');
      setToken(null);
  };

  const fetchVoters = async () => {
      setLoading(true);
      try {
          const res = await axios.get(`${API_URL}/admin/voters`, { headers: { 'x-admin-token': token }});
          setVoters(res.data);
      } catch (err) {
          toast.error("Failed to fetch voters");
      } finally {
          setLoading(false);
      }
  };

  const fetchResults = async () => {
    try {
        const res = await axios.get(`${API_URL}/results`);
        setResults(res.data);
    } catch (err) {
        console.error(err);
    }
  };

  const createVoter = async () => {
      if(!newName || !newId) return;
      try {
          await axios.post(`${API_URL}/admin/voters`, { name: newName, universityIdOrEmail: newId }, { headers: { 'x-admin-token': token }});
          toast.success("Voter created");
          setCreateOpen(false);
          setNewName('');
          setNewId('');
          fetchVoters();
      } catch (err) {
          toast.error("Failed to create voter");
      }
  };

  const issueCode = async (id: string, name: string) => {
      try {
          const res = await axios.post(`${API_URL}/admin/voters/${id}/issue-code`, {}, { headers: { 'x-admin-token': token }});
          // Show code to admin clearly
          alert(`CODE FOR ${name}: ${res.data.code}\n\nCopy this code and give it to the voter.`);
          fetchVoters();
      } catch (err) {
          toast.error("Failed to issue code");
      }
  };

  const whitelistVoter = async (id: string) => {
      try {
          const toastId = toast.loading("Whitelisting on-chain...");
          await axios.post(`${API_URL}/admin/voters/${id}/whitelist`, {}, { headers: { 'x-admin-token': token }});
          toast.dismiss(toastId);
          toast.success("Voter Whitelisted Successfully!");
          fetchVoters();
      } catch (err: any) {
          toast.dismiss();
          toast.error(err.response?.data?.error || "Whitelisting failed");
      }
  };

  if (!token) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>Enter admin password to continue.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input type="password" placeholder="Password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
                    <Button className="w-full" onClick={login}>Login</Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <Button variant="outline" onClick={logout}>Logout</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Election Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {results.map((c: any) => (
                                <div key={c.id} className="flex justify-between items-center p-3 bg-slate-100 rounded-lg">
                                    <span className="font-medium">{c.name}</span>
                                    <Badge variant="secondary" className="text-lg">{c.voteCount}</Badge>
                                </div>
                            ))}
                            {results.length === 0 && <p className="text-muted-foreground">No data from contract yet.</p>}
                            <Button variant="ghost" size="sm" className="w-full mt-2" onClick={fetchResults}>
                                <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                     <CardHeader className="flex flex-row items-center justify-between">
                         <div>
                            <CardTitle>Voter Management</CardTitle>
                            <CardDescription>Manage eligibility and whitelist status.</CardDescription>
                         </div>
                         <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" /> Add Voter
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Eligible Voter</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <Input placeholder="Full Name" value={newName} onChange={(e: any) => setNewName(e.target.value)} />
                                    <Input placeholder="University ID / Email" value={newId} onChange={(e: any) => setNewId(e.target.value)} />
                                    <Button onClick={createVoter} className="w-full">Create</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>ID/Email</TableHead>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Wallet</TableHead>
                                        <TableHead>On-Chain</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {voters.map((v) => (
                                        <TableRow key={v._id}>
                                            <TableCell className="font-medium">{v.name}</TableCell>
                                            <TableCell>{v.universityIdOrEmail}</TableCell>
                                            <TableCell>
                                                {v.codeHash ? <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Issued</Badge> : <Badge variant="secondary">Pending</Badge>}
                                            </TableCell>
                                            <TableCell>
                                                {v.walletAddress ? 
                                                    <span className="font-mono text-xs" title={v.walletAddress}>{v.walletAddress.substring(0,6)}...{v.walletAddress.substring(38)}</span> 
                                                    : <span className="text-muted-foreground">-</span>
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {v.whitelistedOnChain ? <Badge className="bg-green-600">Yes</Badge> : <Badge variant="secondary">No</Badge>}
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                {!v.codeHash && (
                                                    <Button size="sm" variant="outline" onClick={() => issueCode(v._id, v.name)}>Issue Code</Button>
                                                )}
                                                {v.walletAddress && !v.whitelistedOnChain && (
                                                    <Button size="sm" onClick={() => whitelistVoter(v._id)}>Whitelist</Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {voters.length === 0 && !loading && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No voters found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
