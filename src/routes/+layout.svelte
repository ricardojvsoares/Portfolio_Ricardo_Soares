<script>
  import '../styles/global.css';
  import '../styles/variables.css';
  import '../styles/themes.css';

  import Navigation from '$lib/components/Navigation.svelte';
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>
<div class="page-bg">
  <Navigation />

  <main id="main-content" tabindex="-1">
    <slot />
  </main>
</div>

<style>
  :global(html) {
    font-family: 'DM Sans', system-ui, sans-serif;
  }

  main {
    min-height: calc(100vh - 80px);
    padding-top: 4.5rem; /* space for fixed nav */
    outline: none;
  }

  /* ensure page background uses theme background */
  .page-bg {
    min-height: 100vh;
    background: var(--background-color);
    color: var(--text-color);
  }
</style>
