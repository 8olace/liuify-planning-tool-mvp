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

interface Application {
  id: string;
  shift_id: string;
  status: "pending" | "accepted" | "rejected";
}

export default function StaffDashboard() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all shifts
      const shiftsRes = await fetch("/api/shifts?status=open");
      const shiftsData = await shiftsRes.json();
      setShifts(shiftsData.shifts || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyForShift = async (shiftId: string) => {
    try {
      if (!userId) {
        setError("User ID not available");
        return;
      }

      const res = await fetch("/api/shifts/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shift_id: shiftId, user_id: userId }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Applied for shift successfully!");
        fetchData();
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Staff Dashboard</h1>

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
          {/* Available Shifts Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Available Shifts</h2>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shifts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No open shifts available
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
                          <Badge variant="outline">{shift.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleApplyForShift(shift.id)}
                          >
                            Apply Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* My Applications Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">My Applications</h2>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                        No applications yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.shift_id}</TableCell>
                        <TableCell>
                          <Badge variant={app.status === "pending" ? "outline" : "default"}>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
