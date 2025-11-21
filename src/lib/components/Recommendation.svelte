<script lang="ts">
  export let src: string = '/pdf/recommendation_letter.pdf';
  export let title: string = 'Recommendation Letter';

  import { onMount } from 'svelte';
  let available = true;

  const openInNewTab = () => {
    window.open(src, '_blank', 'noopener');
  };

  onMount(async () => {
    try {
      const resp = await fetch(src, { method: 'HEAD' });
      if (!resp.ok) available = false;
    } catch (e) {
      available = false;
    }
  });
</script>

<div class="recommendation-card">
  <div class="rec-header">
    <div class="rec-icon">📄</div>
    <div class="rec-title">
      <strong>{title}</strong>
      <div class="rec-sub">Last internship recommendation</div>
    </div>
  </div>

  {#if available}
    <div class="rec-body">
      <!-- Lightweight inline preview. Many browsers will render the PDF inside an iframe. -->
      <iframe class="pdf-preview" {src} {title}></iframe>
    </div>

    <div class="rec-actions">
      <button
        class="btn btn-outline"
        on:click={openInNewTab}
        aria-label="Open recommendation"
      >
        View
      </button>

      <a
        class="btn btn-primary"
        href={src}
        download
        aria-label="Download recommendation"
      >
        Download
      </a>
    </div>
  {:else}
    <div class="rec-body missing">
      <p>
        Recommendation file not found in <code>/static/pdf</code>. Please add
        your recommendation PDF named <code>recommendation_letter.pdf</code> to
        <code>static/pdf</code>.
      </p>
    </div>
  {/if}
</div>

<style>
  .recommendation-card {
    background: var(--white-005);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .rec-header {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .rec-icon {
    font-size: 1.6rem;
  }

  .rec-title .rec-sub {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .rec-body {
    height: 260px;
    overflow: hidden;
    border-radius: 8px;
  }

  .pdf-preview {
    width: 100%;
    height: 100%;
    border: none;
    background: #f8f8f8;
  }

  .rec-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .btn {
    padding: 0.5rem 0.9rem;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }

  .btn-primary {
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    color: white;
    border: none;
  }

  @media (max-width: 768px) {
    .rec-body {
      height: 180px;
    }
  }
</style>
