import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  format?: 'number' | 'percentage';
}

export function StatCard({ label, value, icon, trend, format = 'number' }: StatCardProps) {
  const displayValue = format === 'percentage' 
    ? `${value}%` 
    : typeof value === 'number' 
      ? value.toLocaleString() 
      : value;

  const TrendIcon = trend 
    ? trend.value > 0 
      ? TrendingUp 
      : trend.value < 0 
        ? TrendingDown 
        : Minus
    : null;

  const trendColor = trend 
    ? trend.value > 0 
      ? 'text-success' 
      : trend.value < 0 
        ? 'text-destructive' 
        : 'text-muted-foreground'
    : '';

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
        {trend && TrendIcon && (
          <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
            <TrendIcon className="w-3 h-3" />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div className="kpi-value text-foreground">{displayValue}</div>
      <div className="kpi-label mt-1">{label}</div>
      {trend && (
        <div className="text-xs text-muted-foreground mt-2">{trend.label}</div>
      )}
    </div>
  );
}
