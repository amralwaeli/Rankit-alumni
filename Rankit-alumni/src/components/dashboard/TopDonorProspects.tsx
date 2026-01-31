import { ArrowUpRight, DollarSign, TrendingUp } from 'lucide-react';
import { alumniData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function TopDonorProspects() {
  const topProspects = alumniData
    .filter((a) => a.wealthIndicator === 'high' && a.givingLikelihood > 70)
    .sort((a, b) => b.givingLikelihood - a.givingLikelihood)
    .slice(0, 5);

  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-header mb-0">Top Donor Prospects</h3>
        <Link to="/donors">
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
            View All
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {topProspects.map((alumni) => (
          <div key={alumni.id} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                  {alumni.firstName[0]}{alumni.lastName[0]}
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-accent transition-colors cursor-pointer">
                    {alumni.firstName} {alumni.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {alumni.currentTitle} at {alumni.currentEmployer}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-success" />
                  <span>{alumni.givingLikelihood}%</span>
                </div>
                <span className="badge-high-value text-[10px]">
                  <DollarSign className="w-3 h-3" />
                  High Value
                </span>
              </div>
            </div>
            <Progress 
              value={alumni.givingLikelihood} 
              className="h-1.5 bg-muted" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
