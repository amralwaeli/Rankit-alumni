import { X, Mail, Phone, Linkedin, MapPin, Building2, GraduationCap, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { Alumni } from '@/types/alumni';
import { employmentHistoryData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface AlumniProfilePanelProps {
  alumni: Alumni | null;
  onClose: () => void;
}

export function AlumniProfilePanel({ alumni, onClose }: AlumniProfilePanelProps) {
  if (!alumni) return null;

  const employmentHistory = employmentHistoryData.filter(
    (e) => e.alumniId === alumni.id
  );

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-card border-l border-border shadow-xl z-50 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Alumni Profile</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
        {/* Profile Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
            {alumni.firstName[0]}{alumni.lastName[0]}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">
              {alumni.firstName} {alumni.lastName}
            </h3>
            <p className="text-muted-foreground">{alumni.currentTitle}</p>
            <p className="text-sm text-accent">{alumni.currentEmployer}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">Giving Likelihood</div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{alumni.givingLikelihood}%</span>
              <Progress value={alumni.givingLikelihood} className="flex-1 h-2" />
            </div>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">Wealth Indicator</div>
            <div className={cn(
              'text-xl font-bold capitalize',
              alumni.wealthIndicator === 'high' && 'text-accent'
            )}>
              {alumni.wealthIndicator}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <h4 className="font-medium text-sm text-muted-foreground mb-3">Contact Information</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{alumni.email}</span>
            </div>
            {alumni.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{alumni.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{alumni.location}</span>
            </div>
            {alumni.linkedInUrl && (
              <div className="flex items-center gap-3 text-sm">
                <Linkedin className="w-4 h-4 text-muted-foreground" />
                <a href={alumni.linkedInUrl} className="text-accent hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Education */}
        <div className="mb-6">
          <h4 className="font-medium text-sm text-muted-foreground mb-3">Education</h4>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">{alumni.degree} in {alumni.major}</p>
              <p className="text-sm text-muted-foreground">Class of {alumni.graduationYear}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Employment History */}
        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-3">Employment History</h4>
          <div className="relative pl-4 space-y-4">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
            
            {employmentHistory.length > 0 ? (
              employmentHistory.map((job, index) => (
                <div key={job.id} className="relative flex gap-3">
                  <div className={cn(
                    'absolute left-0 w-4 h-4 rounded-full border-2 -translate-x-[6px]',
                    job.isCurrent 
                      ? 'bg-accent border-accent' 
                      : 'bg-card border-border'
                  )} />
                  <div className="ml-4">
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.startDate} — {job.isCurrent ? 'Present' : job.endDate}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground ml-4">
                Current position: {alumni.currentTitle} at {alumni.currentEmployer}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border flex gap-3">
        <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
          Add to Outreach List
        </Button>
        <Button variant="outline" className="flex-1">
          Export Profile
        </Button>
      </div>
    </div>
  );
}
