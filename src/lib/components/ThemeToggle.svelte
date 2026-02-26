<script lang="ts">
  import { theme, toggleTheme } from '$lib/stores/theme';
  import { t } from '$lib/i18n';

  let isAnimating: boolean = $state(false);

  function handleToggle() {
    if (isAnimating) return;
    isAnimating = true;
    toggleTheme();
    setTimeout(() => {
      isAnimating = false;
    }, 280);
  }
</script>

<button
  class="theme-toggle"
  onclick={handleToggle}
  aria-label={$theme === 'light'
    ? $t('theme.switchToDark')
    : $t('theme.switchToLight')}
  title={$theme === 'light'
    ? $t('theme.switchToDark')
    : $t('theme.switchToLight')}
  class:animating={isAnimating}
  class:dark={$theme === 'dark'}
>
  <span class="toggle-track" aria-hidden="true">
    <span class="icon-sun" aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        />
      </svg>
    </span>
    <span class="icon-moon" aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </span>
    <span class="toggle-thumb"></span>
  </span>
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.35rem;
    border-radius: 999px;
    transition:
      background 0.2s ease,
      transform 0.15s ease;
    color: var(--text-secondary);
  }

  .theme-toggle:hover {
    background: var(--surface-hover);
    color: var(--text-color);
  }

  .theme-toggle:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }

  .toggle-track {
    position: relative;
    display: flex;
    align-items: center;
    width: 56px;
    height: 28px;
    padding: 0 6px;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 999px;
    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.2s ease;
  }

  .theme-toggle:hover .toggle-track {
    border-color: var(--text-secondary);
  }

  .theme-toggle.dark .toggle-track {
    border-color: rgba(255, 255, 255, 0.12);
  }

  .icon-sun,
  .icon-moon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transition:
      color 0.25s ease,
      opacity 0.25s ease;
    z-index: 1;
  }

  .icon-sun {
    color: var(--text-secondary);
  }

  .icon-moon {
    color: var(--text-secondary);
  }

  .theme-toggle:not(.dark) .icon-sun {
    color: var(--accent-color);
    opacity: 1;
  }

  .theme-toggle:not(.dark) .icon-moon {
    opacity: 0.5;
  }

  .theme-toggle.dark .icon-sun {
    opacity: 0.5;
  }

  .theme-toggle.dark .icon-moon {
    color: var(--accent-color);
    opacity: 1;
  }

  .toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    background: var(--accent-color);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition:
      transform 0.28s cubic-bezier(0.4, 0, 0.2, 1),
      background 0.2s ease;
    pointer-events: none;
  }

  .theme-toggle.dark .toggle-thumb {
    transform: translateX(28px);
    background: var(--accent-color);
  }

  .theme-toggle.animating .toggle-thumb {
    transform: scale(0.92);
  }

  .theme-toggle.animating.dark .toggle-thumb {
    transform: translateX(28px) scale(0.92);
  }

  @media (max-width: 768px) {
    .theme-toggle {
      padding: 0.25rem;
    }
    .toggle-track {
      width: 52px;
      height: 26px;
    }
    .toggle-thumb {
      width: 20px;
      height: 20px;
    }
    .theme-toggle.dark .toggle-thumb {
      transform: translateX(26px);
    }
    .theme-toggle.animating.dark .toggle-thumb {
      transform: translateX(26px) scale(0.92);
    }
  }
</style>
