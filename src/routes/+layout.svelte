<script>
  import '../styles/global.css';
  import '../styles/variables.css';
  import '../styles/themes.css';

  import Navigation from '$lib/components/Navigation.svelte';
</script>

<div class="page-bg">
  <Navigation />

  <main>
    <slot />
  </main>
</div>

<style>
  :global(html) {
    font-family: 'Inter', system-ui, sans-serif;
  }

  main {
    min-height: calc(100vh - 80px);
    padding-top: 4.5rem; /* space for fixed nav */
  }

  /* ensure page background uses theme background */
  .page-bg {
    min-height: 100vh;
    background: var(--background-color);
    color: var(--text-color);
  }
</style>
