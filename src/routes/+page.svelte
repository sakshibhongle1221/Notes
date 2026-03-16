<script>
import { onMount } from "svelte";
import { noteStore } from "$lib/store/note.svelte";
import NotesCard from "$lib/components/NotesCard.svelte";

onMount(() => {
  noteStore.loadNotes();
});
</script>

{#if noteStore.loading}
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4"> 
    {#each Array(10) as _}
      <div class="p-5 rounded-2xl h-56 border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 animate-pulse flex flex-col justify-between transition-colors">
        <div>
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-4"></div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    {/each}
  </div>

{:else if noteStore.notes.length === 0}
  <div class="flex flex-col items-center justify-center mt-32 text-gray-500 dark:text-gray-400">
    <p class="text-xl font-semibold mb-2 text-black dark:text-white">No notes yet</p>
    <p>Click the + button above or press Ctrl+N to create your first note</p>
  </div>

{:else if noteStore.filteredNotes.length === 0}
  <div class="flex flex-col items-center justify-center mt-32 text-gray-500 dark:text-gray-400">
    <p class="text-xl font-semibold mb-2 text-black dark:text-white">No results found</p>
    <p>Couldn't find any match for"{noteStore.search}"</p>
  </div>

{:else}
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4"> 
    {#each noteStore.filteredNotes as note (note.id)}
      <NotesCard note={note} />
    {/each}
  </div>
  {#if noteStore.hasMore && noteStore.filteredNotes.length >= noteStore.limit}
    <div class="flex justify-center mt-12 mb-8">
      <button 
        onclick={()=>noteStore.loadMore()}
        class="px-6 py-2 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white rounded-full font-medium hover:bg-gray-200 dark:hover:bg-zinc-500 transition-colors shadow-sm"
      >Load More Notes
      </button>
    </div>
  {/if}
{/if}