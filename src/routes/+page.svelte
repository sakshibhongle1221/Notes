<script>
import { onMount } from "svelte";
import { noteStore } from "$lib/store/note.svelte";
import NoteCard from "$lib/components/NoteCard.svelte";

onMount(() => {
  noteStore.loadNotes();
});
</script>

{#if noteStore.loading}
  <div class="flex justify-center mt-20">
    <p class="text-black font-medium">Loading your notes....</p>
  </div>

{:else}

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4"> 
    {#each noteStore.notes as note (note.id)}
      <NoteCard note={note} />
    {/each}
  </div>
{/if}