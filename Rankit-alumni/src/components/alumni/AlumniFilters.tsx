import { Search, SlidersHorizontal, Crown, Building2 } from 'lucide-react';
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

interface AlumniFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  verificationFilter: string;
  onVerificationChange: (value: string) => void;
  wealthFilter: string;
  onWealthChange: (value: string) => void;
  prominenceFilter: string;
  onProminenceChange: (value: string) => void;
}

export function AlumniFilters({
  searchQuery,
  onSearchChange,
  verificationFilter,
  onVerificationChange,
  wealthFilter,
  onWealthChange,
  prominenceFilter,
  onProminenceChange,
}: AlumniFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="relative flex-1 min-w-[280px] max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, company, or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Prominence Filter - NEW */}
      <Select value={prominenceFilter} onValueChange={onProminenceChange}>
        <SelectTrigger className={cn(
          "w-[180px]",
          prominenceFilter !== 'all' && "border-accent text-accent"
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

      <Select value={verificationFilter} onValueChange={onVerificationChange}>
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

      <Select value={wealthFilter} onValueChange={onWealthChange}>
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

      <Button variant="outline" className="gap-2">
        <SlidersHorizontal className="w-4 h-4" />
        More Filters
      </Button>
    </div>
  );
}
