export interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
  current?: boolean;
  pdf?: string;
}

export const experiences: Experience[] = [
  {
    year: '2026',
    title: 'Full Stack Developer',
    company: 'PlexIt',
    description:
      'Building and maintaining full stack applications and services. Delivering scalable, user-focused solutions across the stack.',
    current: true,
  },
  {
    year: '2025',
    title: 'Junior Intern - Full Stack Developer',
    company: 'Casino:Gate',
    description:
      'Collaborating on the development of frontend and full stack solutions and web applications using Svelte, TypeScript and Pixi.js.',
    pdf: 'recommendation_letter.pdf',
  },
  {
    year: '2024',
    title: 'BI Junior Intern Developer',
    company: 'Sunviauto',
    description:
      'Created custom ETL pipelines and DAX measures for performance optimization',
  },
  {
    year: '2021-2024',
    title: 'LifeGuard',
    company: `Salv'Aqua`,
    description:
      '3000+ hours ensuring safety, coordinating teams, and providing emergency care',
  },
];
