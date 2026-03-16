<script lang="ts">
  import {noteStore} from '$lib/store/note.svelte';
</script>

{#if noteStore.toast.showToast}
  <div class="fixed bottom-11 right-6 bg-black dark:bg-white text-white dark:text-black px-4 py-4 rounded-xl shadow-2xl flex items-center gap-6 z-50 transition-colors">
    <p class="font-medium">Note moved to bin</p>
    <button
      onclick={() => noteStore.undoDelete()}
      class="font-bold text-yellow-400 dark:text-blue-600 hover:scale-105 transition-transform tracking-wide"
    >UNDO
    </button>
  </div>
{/if}