"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Shift {
  id: string;
  title: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  status: "open" | "assigned" | "completed";
}

export default function AdminDashboard() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const shiftsRes = await fetch("/api/shifts");
      const shiftsData = await shiftsRes.json();
      setShifts(shiftsData.shifts || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-8">
          {/* Shifts Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">All Shifts</h2>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shifts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No shifts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    shifts.map((shift) => (
                      <TableRow key={shift.id}>
                        <TableCell className="font-medium">{shift.title}</TableCell>
                        <TableCell>{shift.shift_date}</TableCell>
                        <TableCell>{shift.start_time}</TableCell>
                        <TableCell>{shift.end_time}</TableCell>
                        <TableCell>
                          <Badge variant={shift.status === "open" ? "outline" : "default"}>
                            {shift.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Create New Shift */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-bold mb-4">Create New Shift</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Shift Title"
                  className="border rounded px-3 py-2"
                />
                <input
                  type="date"
                  placeholder="Shift Date"
                  className="border rounded px-3 py-2"
                />
                <input
                  type="time"
                  placeholder="Start Time"
                  className="border rounded px-3 py-2"
                />
                <input
                  type="time"
                  placeholder="End Time"
                  className="border rounded px-3 py-2"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Shift
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
