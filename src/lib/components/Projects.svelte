<script lang="ts">
  import { projects } from '../data/projects';
  import { filters } from '../data/filters';
  import { t } from '$lib/i18n';

  let sectionElement: HTMLElement | null = $state(null);
  let isVisible: boolean = $state(false);
  let selectedFilter: 'all' | 'fullstack' | 'frontend' | 'backend' =
    $state('all');

  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => observer.disconnect();
  });

  let filteredProjects = $derived(
    selectedFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedFilter)
  );

  function setFilter(filterId: typeof selectedFilter) {
    selectedFilter = filterId;
  }
</script>

<section id="projetos" class="projects-section" bind:this={sectionElement}>
  <div class="container">
    <div class="section-header" class:animate={isVisible}>
      <h2 class="section-title">{$t('projects.title')}</h2>
      <p class="section-subtitle">{$t('projects.subtitle')}</p>
    </div>

    <div class="filter-tabs" class:animate={isVisible}>
      {#each filters as filter}
        <button
          class="filter-btn"
          class:active={selectedFilter === filter.id}
          onclick={() => setFilter(filter.id)}
        >
          {$t(filter.labelKey)}
        </button>
      {/each}
    </div>

    <div class="projects-grid" class:animate={isVisible}>
      {#each filteredProjects as project, index}
        <div
          class="project-card"
          class:featured={project.featured}
          style="animation-delay: {index * 0.1}s"
        >
          <div class="project-content">
            <h3 class="project-title">{$t(project.titleKey)}</h3>
            <p class="project-description">{$t(project.descriptionKey)}</p>

            <div class="project-technologies">
              {#each project.technologies as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>

            <!-- Only render actions if links are available -->
            <!-- Reserve the actions area always so cards keep consistent height.
        Use the `no-links` class to hide the separator when there are no links. -->
            <div
              class="project-actions"
              class:no-links={!project.github && !project.demo}
            >
              {#if project.github}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener"
                  class="project-link"
                >
                  <span>{$t('projects.github')}</span>
                </a>
              {/if}
              {#if project.demo}
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener"
                  class="project-link demo"
                >
                  <span>{$t('projects.demo')}</span>
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .projects-section {
    padding: 8rem 0;
    background: var(--background-color);
    color: white;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  .section-header.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1rem;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .filter-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease 0.2s;
  }

  .filter-tabs.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .filter-btn {
    padding: 0.8rem 1.5rem;
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--text-secondary);
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  .filter-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  .filter-btn.active {
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    border-color: transparent;
    color: var(--background-color);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease 0.4s;
  }

  .projects-grid.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card {
    background: var(--white-005);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.6s ease forwards;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--box-shadow);
    border-color: var(--border-color);
  }

  .project-card.featured {
    border-color: var(--border-color);
    box-shadow: var(--box-shadow);
  }

  /* project-image removed to focus on content */

  /* overlay and project-links removed; actions are always visible */
  /* base link styling (used in actions) */
  .project-link {
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      transform 0.15s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 44px; /* fixed vertical size */
  }
  .project-link:hover {
    transform: translateY(-2px);
  }

  .project-link.demo {
    background: var(--primary-color);
    color: var(--background-color);
  }

  .project-link.demo:hover {
    background: var(--secondary-color);
  }

  .project-content {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;
    min-height: 180px; /* ensure consistent content area so layout doesn't shift */
    padding-bottom: 0.75rem; /* leave room before actions */
  }

  .project-title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    color: var(--primary-color);
  }

  .project-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.3rem 0.8rem;
    background: var(--border-color);
    color: var(--primary-color);
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid var(--border-color);
  }

  /* Persistent action links bar */
  .project-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    align-items: center;
    min-height: 68px; /* reserve vertical space for actions even when empty */
    padding-bottom: 0.5rem; /* breathing room */
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.01)
    );
  }
  /* If only one link, make it full width */
  .project-actions :global(a:only-child),
  .project-actions :global(a:first-child:only-child) {
    flex: 1 1 100%;
  }

  /* Links share space equally when multiple */
  .project-actions :global(a) {
    flex: 1 1 50%;
    text-align: center;
  }

  /* Ensure links use the fixed height and center their content */
  .project-actions :global(a.project-link) {
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* When there are no links, hide the top separator but keep reserved space */
  .project-actions.no-links {
    border-top: none;
  }

  /* Improve title/description rendering */
  .project-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .project-description {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .filter-tabs {
      flex-wrap: wrap;
    }

    .section-title {
      font-size: 2rem;
    }

    /* no-op: project-links removed */
  }
</style>
