<script lang="ts">
  import { t } from '$lib/i18n';
  import { techStack } from '$lib/data/skills';
  import { achievements } from '$lib/data/achievements';

  let sectionElement: HTMLElement | null = $state(null);
  let isVisible = $state(false);
  /** Icon URLs that failed to load – show letter placeholder instead */
  let failedIcons = $state<Set<string>>(new Set());

  function onIconError(iconSrc: string) {
    failedIcons = new Set(failedIcons).add(iconSrc);
  }

  function showIconPlaceholder(skill: {
    name: string;
    icon?: string;
  }): boolean {
    return !skill.icon || failedIcons.has(skill.icon);
  }

  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) isVisible = true;
        });
      },
      { threshold: 0.12 }
    );
    if (sectionElement) observer.observe(sectionElement);
    return () => observer.disconnect();
  });
</script>

<section id="skills" class="skills-section" bind:this={sectionElement}>
  <!-- Running slideshow of tech icons behind -->
  <div class="slideshow-bg" aria-hidden="true">
    <div class="slideshow-track slideshow-track--left">
      {#each [...techStack, ...techStack] as skill}
        <div class="slideshow-item">
          {#if showIconPlaceholder(skill)}
            <span class="slideshow-placeholder">{skill.name.charAt(0)}</span>
          {:else}
            <img
              src={skill.icon}
              alt=""
              width="48"
              height="48"
              onerror={() => onIconError(skill.icon!)}
            />
          {/if}
        </div>
      {/each}
    </div>
    <div class="slideshow-track slideshow-track--right">
      {#each [...techStack, ...techStack] as skill}
        <div class="slideshow-item">
          {#if showIconPlaceholder(skill)}
            <span class="slideshow-placeholder">{skill.name.charAt(0)}</span>
          {:else}
            <img
              src={skill.icon}
              alt=""
              width="48"
              height="48"
              onerror={() => onIconError(skill.icon!)}
            />
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="container">
    <div class="section-header" class:animate={isVisible}>
      <h2 class="section-title">{$t('skills.title')}</h2>
      <p class="section-subtitle">{$t('skills.subtitle')}</p>
    </div>

    <div class="tech-grid" class:animate={isVisible}>
      {#each techStack as skill, i}
        <div
          class="tech-card"
          class:animate={isVisible}
          style="animation-delay: {i * 0.04}s"
        >
          {#if showIconPlaceholder(skill)}
            <span class="tech-icon tech-icon-placeholder"
              >{skill.name.charAt(0)}</span
            >
          {:else}
            <img
              src={skill.icon}
              alt=""
              width="32"
              height="32"
              class="tech-icon"
              onerror={() => onIconError(skill.icon!)}
            />
          {/if}
          <span class="tech-name">{skill.name}</span>
        </div>
      {/each}
    </div>

    <div class="achievements-section" class:animate={isVisible}>
      <h3 class="achievements-title">{$t('skills.achievements.title')}</h3>
      <div class="achievements-grid">
        {#each achievements as achievement, index}
          {#if achievement.link}
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              class="achievement-link"
            >
              <div
                class="achievement-card"
                style="animation-delay: {index * 0.15}s"
                class:animate={isVisible}
              >
                <div class="achievement-icon">{achievement.icon}</div>
                <div class="achievement-content">
                  <h4 class="achievement-title">{achievement.title}</h4>
                  <p class="achievement-description">
                    {achievement.description}
                  </p>
                  <span class="achievement-year">{achievement.year}</span>
                </div>
              </div>
            </a>
          {:else}
            <div
              class="achievement-card"
              style="animation-delay: {index * 0.15}s"
              class:animate={isVisible}
            >
              <div class="achievement-icon">{achievement.icon}</div>
              <div class="achievement-content">
                <h4 class="achievement-title">{achievement.title}</h4>
                <p class="achievement-description">{achievement.description}</p>
                <span class="achievement-year">{achievement.year}</span>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .skills-section {
    position: relative;
    padding: 6rem 0 8rem;
    background: linear-gradient(
      160deg,
      var(--background-color) 0%,
      var(--surface-color) 50%,
      var(--background-color) 100%
    );
    color: var(--text-color);
    overflow: hidden;
  }

  .slideshow-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .slideshow-track {
    position: absolute;
    display: flex;
    gap: 2rem;
    padding: 0 2rem;
    opacity: 0.12;
  }

  .slideshow-track--left {
    top: 12%;
    left: 0;
    animation: slideLeft 45s linear infinite;
  }

  .slideshow-track--right {
    bottom: 18%;
    right: 0;
    animation: slideRight 50s linear infinite;
  }

  .slideshow-item {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface-color);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    padding: 6px;
  }

  .slideshow-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .slideshow-placeholder {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
  }

  @keyframes slideLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @keyframes slideRight {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0);
    }
  }

  .container {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 2.5rem;
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  .section-header.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(
      135deg,
      var(--primary-color),
      var(--secondary-color)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-subtitle {
    font-size: 1.05rem;
    color: var(--text-secondary);
    max-width: 480px;
    margin: 0 auto;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.5s ease 0.1s,
      transform 0.5s ease 0.1s;
  }

  .tech-grid.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .tech-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0.75rem;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
    opacity: 0;
    transform: translateY(10px);
    animation: techIn 0.4s ease forwards;
  }

  .tech-card.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .tech-card:hover {
    border-color: var(--accent-color);
    box-shadow: 0 6px 20px var(--shadow);
    transform: translateY(-3px);
  }

  .tech-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .tech-icon-placeholder {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--muted);
    color: var(--primary-color);
    font-weight: 700;
    font-size: 0.9rem;
    border-radius: 8px;
  }

  .tech-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-color);
    text-align: center;
    line-height: 1.2;
  }

  @keyframes techIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .achievements-section {
    margin-top: 3.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--border-color);
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.5s ease 0.2s,
      transform 0.5s ease 0.2s;
  }

  .achievements-section.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .achievements-title {
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.25rem;
    color: var(--primary-color);
  }

  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .achievement-link {
    text-decoration: none;
    color: inherit;
  }

  .achievement-card {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.25rem;
    text-align: center;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
    opacity: 0;
    transform: translateY(10px);
    animation: techIn 0.5s ease forwards;
  }

  .achievement-card.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .achievement-card:hover {
    border-color: var(--accent-color);
    box-shadow: 0 6px 16px var(--shadow);
    transform: translateY(-3px);
  }

  .achievement-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .achievement-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 0.25rem;
  }

  .achievement-description {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  .achievement-year {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    background: var(--muted);
    color: var(--primary-color);
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid var(--border-color);
  }

  @media (max-width: 768px) {
    .skills-section {
      padding: 4rem 0 6rem;
    }
    .tech-grid {
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 0.75rem;
    }
    .tech-card {
      padding: 0.75rem 0.5rem;
    }
    .tech-name {
      font-size: 0.8rem;
    }
    .slideshow-item {
      width: 40px;
      height: 40px;
    }
    .slideshow-track {
      gap: 1.25rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .slideshow-track--left,
    .slideshow-track--right {
      animation: none;
    }
  }
</style>
