import { Search, SlidersHorizontal, Crown, Building2, ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { AlumniFilter, SortKey, SortDirection } from '@/lib/alumniUtils';

interface AlumniFiltersProps {
  filters: AlumniFilter;
  onFilterChange: (newFilters: Partial<AlumniFilter>) => void;
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: (direction: SortDirection) => void;
}

export function AlumniFilters({
  filters,
  onFilterChange,
  sortKey,
  onSortKeyChange,
  sortDirection,
  onSortDirectionChange,
}: AlumniFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="relative flex-1 min-w-[280px] max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, company, or email..."
          value={filters.query || ""}
          onChange={(e) => onFilterChange({ query: e.target.value })}
          className="pl-10"
        />
      </div>

      <Select
        value={filters.prominence || "all"}
        onValueChange={(value: "executive" | "notable-employer" | "both" | "all") => onFilterChange({ prominence: value })}
      >
        <SelectTrigger className={cn(
          "w-[180px]",
          filters.prominence !== 'all' && "border-accent text-accent"
        )}>
          <SelectValue placeholder="Prominence" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Alumni</SelectItem>
          <SelectItem value="executive">
            <span className="flex items-center gap-2">
              <Crown className="w-3 h-3 text-amber-500" />
              Executive Titles
            </span>
          </SelectItem>
          <SelectItem value="notable-employer">
            <span className="flex items-center gap-2">
              <Building2 className="w-3 h-3 text-blue-500" />
              Notable Employers
            </span>
          </SelectItem>
          <SelectItem value="both">
            <span className="flex items-center gap-2">
              <Crown className="w-3 h-3 text-amber-500" />
              Executive + Notable
            </span>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.verificationStatus || "all"}
        onValueChange={(value: "verified" | "pending" | "unverified" | "all") => onFilterChange({ verificationStatus: value })}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Verification" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="unverified">Unverified</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.wealthIndicator || "all"}
        onValueChange={(value: "high" | "medium" | "low" | "all") => onFilterChange({ wealthIndicator: value })}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Wealth Indicator" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="high">High Value</SelectItem>
          <SelectItem value="medium">Medium Value</SelectItem>
          <SelectItem value="low">Low Value</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Controls */}
      <Select value={sortKey} onValueChange={(value: SortKey) => onSortKeyChange(value)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rankScore">Rank Score</SelectItem>
          <SelectItem value="graduationYear">Graduation Year</SelectItem>
          <SelectItem value="lastJobChange">Last Job Change</SelectItem>
          <SelectItem value="totalDonations">Total Donations</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc')}
      >
        {sortDirection === 'asc' ? <ArrowUpWideNarrow className="w-4 h-4" /> : <ArrowDownWideNarrow className="w-4 h-4" />}
      </Button>

      <Button variant="outline" className="gap-2">
        <SlidersHorizontal className="w-4 h-4" />
        More Filters
      </Button>
    </div>
  );
}