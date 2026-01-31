// src/components/alumni/AlumniTable.tsx
import type { AlumniRecord } from "@/lib/alumni";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AlumniTableProps {
  alumni: AlumniRecord[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

/**
 * AlumniTable is a pure view component:
 * it receives prepared data and emits selection events.
 * No filtering or ranking logic lives here.
 */
export function AlumniTable({
  alumni,
  selectedId,
  onSelect,
}: AlumniTableProps) {
  if (!alumni.length) {
    return (
      <div className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">
        No alumni match the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Graduation</TableHead>
            <TableHead>Current role</TableHead>
            <TableHead>Country</TableHead>
            <TableHead className="text-right">Rank score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alumni.map((alum) => (
            <TableRow
              key={alum.id}
              className={cn(
                "cursor-pointer hover:bg-accent/60",
                selectedId === alum.id && "bg-accent/80"
              )}
              onClick={() =>
                onSelect(selectedId === alum.id ? null : alum.id)
              }
            >
              <TableCell className="font-medium">
                {alum.fullName}
              </TableCell>
              <TableCell>{alum.degreeProgram}</TableCell>
              <TableCell>{alum.graduationYear}</TableCell>
              <TableCell>
                {alum.currentTitle
                  ? `${alum.currentTitle} @ ${alum.currentCompany ?? ""}`
                  : "—"}
              </TableCell>
              <TableCell>{alum.country ?? "—"}</TableCell>
              <TableCell className="text-right">
                {alum.rankScore ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
