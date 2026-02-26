interface Skill {
  name: string;
  level?: number;
  icon?: string;
}

interface TechGroup {
  title: string;
  skills: Skill[];
}

/** Single flat list of all techs for the grid + slideshow. Icons live in static/icons/ */
export const techStack: Skill[] = [
  { name: 'React', icon: '/icons/React.png' },
  { name: 'Next.js', icon: '/icons/NextJs.png' },
  { name: 'Svelte', icon: '/icons/Svelte.png' },
  { name: 'TypeScript', icon: '/icons/TypeScript.png' },
  { name: 'JavaScript', icon: '/icons/JavaScript.png' },
  { name: 'HTML5', icon: '/icons/HTML5.png' },
  { name: 'CSS3', icon: '/icons/CSS3.png' },
  { name: 'Tailwind CSS', icon: '/icons/Tailwind CSS.png' },
  { name: 'Vite', icon: '/icons/Vite.js.png' },
  { name: 'Node.js', icon: '/icons/Node.js.png' },
  { name: 'Python', icon: '/icons/Python.png' },
  { name: 'PostgreSQL', icon: '/icons/PostgreSQL.png' },
  { name: 'Microsoft SQL Server', icon: '/icons/Microsoft SQL Server.png' },
  { name: 'Postman', icon: '/icons/Postman.png' },
  { name: 'Docker', icon: '/icons/Docker.png' },
  { name: 'Git', icon: '/icons/Git.png' },
  { name: 'GitHub', icon: '/icons/GitHub.png' },
  { name: 'GitLab', icon: '/icons/GitLab.png' },
  { name: 'Vercel', icon: '/icons/Vercel.png' },
  { name: 'VS Code', icon: '/icons/VSCode.png' },
];

/** Grouped version for any legacy use. */
export const techStackGroups: TechGroup[] = [
  { title: 'Frontend', skills: techStack.slice(0, 9) },
  { title: 'Backend & Data', skills: techStack.slice(9, 14) },
  { title: 'DevOps & Tools', skills: techStack.slice(14, 20) },
];

/** Legacy: flat skills list for About section progress bars */
export const skills: { name: string; level: number }[] = [
  { name: 'JavaScript/TypeScript', level: 90 },
  { name: 'Design UI/UX', level: 90 },
  { name: 'Svelte/SvelteKit', level: 85 },
  { name: 'Node.js', level: 75 },
  { name: 'Python', level: 70 },
];

/** Legacy category structure – kept for About or other refs. */
export const skillCategories: Record<
  string,
  { title: string; skills: Skill[] }
> = {
  frontend: {
    title: 'Frontend Development',
    skills: techStackGroups[0].skills,
  },
  backend: { title: 'Backend & Data', skills: techStackGroups[1].skills },
  tools: { title: 'DevOps & Tools', skills: techStackGroups[2].skills },
};
