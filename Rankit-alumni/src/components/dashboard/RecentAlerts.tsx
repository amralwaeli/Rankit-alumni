import { ArrowUpRight, Briefcase, Star } from 'lucide-react';
import { recentJobChanges } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function RecentAlerts() {
  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-header mb-0">Recent Job Changes</h3>
        <Link to="/alerts">
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
            View All
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {recentJobChanges.slice(0, 4).map((alert) => (
          <div
            key={alert.id}
            className={cn(
              'p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm',
              alert.isHighValue 
                ? 'border-accent/30 bg-accent/5 hover:border-accent/50' 
                : 'border-border hover:border-border/80'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  alert.isHighValue ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                )}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{alert.alumniName}</span>
                    {alert.isHighValue && (
                      <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {alert.previousTitle} → <span className="text-foreground">{alert.newTitle}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {alert.previousCompany} → <span className="text-foreground">{alert.newCompany}</span>
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(alert.changeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
