import { useState, useEffect } from 'react';
import { ProjectCard, Project } from './components/ProjectCard';
import { AddProjectModal } from './components/AddProjectModal';
import { SkeletonCard } from './components/SkeletonCard';
import { EmptyState } from './components/EmptyState';
import { ProjectStatus } from './components/StatusBadge';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'api-gateway-v2',
    description: 'Rebuild API gateway with improved rate limiting and better error handling. Target: production ready by Q2.',
    status: 'Active',
    tags: ['#backend', '#api', '#go'],
    startedDate: '2026-04-01',
    lastUpdated: '2026-04-18',
  },
  {
    id: '2',
    name: 'mobile-app-mvp',
    description: 'Initial MVP for iOS and Android. Focus on core features: auth, profile, and basic functionality.',
    status: 'Paused',
    tags: ['#mobile', '#react-native'],
    startedDate: '2026-02-20',
    lastUpdated: '2026-04-10',
  },
  {
    id: '3',
    name: 'authentication-system',
    description: 'OAuth 2.0 implementation with JWT tokens and refresh token rotation for enhanced security.',
    status: 'Complete',
    tags: ['#backend', '#security', '#auth'],
    startedDate: '2026-01-10',
    lastUpdated: '2026-03-28',
  },
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, status: newStatus, lastUpdated: '2026-04-19' }
          : p
      )
    );
  };

  const handleAddProject = (newProject: {
    name: string;
    description: string;
    tags: string[];
    status: ProjectStatus;
  }) => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      startedDate: '2026-04-19',
      lastUpdated: '2026-04-19',
    };
    setProjects((prev) => [project, ...prev]);
    setIsModalOpen(false);
  };

  const stats = {
    Active: projects.filter((p) => p.status === 'Active').length,
    Paused: projects.filter((p) => p.status === 'Paused').length,
    Complete: projects.filter((p) => p.status === 'Complete').length,
    Scrapped: projects.filter((p) => p.status === 'Scrapped').length,
    Idea: projects.filter((p) => p.status === 'Idea').length,
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh' }}>
      <nav
        className="border-b sticky top-0 z-40"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border)',
          height: '64px',
        }}
      >
        <div className="max-w-[1152px] mx-auto px-8 h-full flex items-center justify-between">
          <h1
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            Project Dashboard
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: '#fafafa',
              color: '#0a0a0a',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            + Add Project
          </button>
        </div>
      </nav>

      <div className="max-w-[1152px] mx-auto px-8 py-6">
        <div
          className="flex items-center gap-6 mb-6 py-4"
          style={{
            fontSize: '14px',
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-secondary)' }}>Active:</span>
            <span
              style={{ color: 'var(--text-primary)', fontWeight: 600 }}
            >
              {stats.Active}
            </span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-secondary)' }}>Paused:</span>
            <span
              style={{ color: 'var(--text-primary)', fontWeight: 600 }}
            >
              {stats.Paused}
            </span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-secondary)' }}>Complete:</span>
            <span
              style={{ color: 'var(--text-primary)', fontWeight: 600 }}
            >
              {stats.Complete}
            </span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-secondary)' }}>Scrapped:</span>
            <span
              style={{ color: 'var(--text-primary)', fontWeight: 600 }}
            >
              {stats.Scrapped}
            </span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--text-secondary)' }}>Idea:</span>
            <span
              style={{ color: 'var(--text-primary)', fontWeight: 600 }}
            >
              {stats.Idea}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProject}
      />
    </div>
  );
}