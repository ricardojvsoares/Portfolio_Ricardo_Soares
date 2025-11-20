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
    }, 300);
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
>
  <div class="toggle-track" aria-hidden="true">
    <div class="toggle-thumb" class:dark={$theme === 'dark'}>
      <span class="toggle-icon">
        {#if $theme === 'light'}
          ☀️
        {:else}
          🌙
        {/if}
      </span>
    </div>
  </div>
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.35rem;
    border-radius: 12px;
    transition: background 0.18s ease;
    color: var(--text-color);
  }

  .theme-toggle:hover {
    background: var(--surface-hover);
  }

  .theme-toggle:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .toggle-track {
    position: relative;
    width: 50px;
    height: 26px;
    background: var(--surface-color);
    border-radius: 13px;
    border: 2px solid var(--border-color);
    transition: all 0.3s ease;
  }

  .toggle-thumb {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--box-shadow);
  }

  .toggle-thumb.dark {
    transform: translateX(22px);
  }

  .toggle-icon {
    font-size: 0.9rem;
    line-height: 1;
  }

  .theme-toggle.animating .toggle-thumb {
    transform: scale(0.9);
  }

  .theme-toggle.animating .toggle-thumb.dark {
    transform: translateX(22px) scale(0.9);
  }

  @media (max-width: 768px) {
    .theme-toggle {
      padding: 0.25rem;
    }
  }
</style>
