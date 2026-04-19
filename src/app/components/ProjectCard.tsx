import { useState } from 'react';
import { StatusBadge, ProjectStatus } from './StatusBadge';
import { MoreVertical } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  startedDate: string;
  lastUpdated: string;
}

interface ProjectCardProps {
  project: Project;
  onStatusChange: (projectId: string, newStatus: ProjectStatus) => void;
  onError?: () => void;
}

export function ProjectCard({ project, onStatusChange, onError }: ProjectCardProps) {
  const [showError, setShowError] = useState(false);

  const handleStatusChange = async (newStatus: ProjectStatus) => {
    try {
      onStatusChange(project.id, newStatus);
    } catch (error) {
      setShowError(true);
      onError?.();
      setTimeout(() => setShowError(false), 4000);
    }
  };

  return (
    <div
      className="border rounded-lg p-5 transition-all hover:shadow-sm relative"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#404040';
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <StatusBadge status={project.status} onStatusChange={handleStatusChange} />
        <button className="p-1 -mr-1 -mt-1 rounded hover:bg-zinc-800 transition-colors">
          <MoreVertical size={16} style={{ color: 'var(--text-secondary)' }} />
        </button>
      </div>

      <h3
        className="mb-2 line-clamp-1"
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}
      >
        {project.name}
      </h3>

      <p
        className="mb-3 line-clamp-2"
        style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: '1.5',
        }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-2 py-0.5"
            style={{
              backgroundColor: '#27272a',
              color: '#a1a1aa',
              fontSize: '12px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        <div>Started: {project.startedDate}</div>
        <div>Updated: {project.lastUpdated}</div>
      </div>

      {showError && (
        <div
          className="absolute bottom-0 left-0 right-0 border-t px-3 py-2 flex items-center justify-between rounded-b-lg"
          style={{
            backgroundColor: '#450a0a',
            borderTopColor: '#7f1d1d',
            color: '#fca5a5',
            fontSize: '12px',
          }}
        >
          <span>Failed to update status. Changes reverted.</span>
          <button onClick={() => setShowError(false)} className="ml-2 hover:opacity-70">
            ×
          </button>
        </div>
      )}
    </div>
  );
}
