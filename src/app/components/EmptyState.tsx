import { FolderOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <FolderOpen
        size={48}
        strokeWidth={1.5}
        style={{ color: 'var(--text-muted)' }}
        className="mb-4"
      />
      <h3
        className="mb-1"
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}
      >
        No projects yet
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
        }}
      >
        Click "+ Add Project" to create your first project.
      </p>
    </div>
  );
}
