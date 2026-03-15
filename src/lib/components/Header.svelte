<script lang="ts">
  import NoteForm from './NoteForm.svelte';
  import {createNote} from '$lib/api/requests';
  import {noteStore} from '$lib/store/note.svelte';
  let isCreateMode = $state(false);

  const colors = [
  '#fef9c3','#d1fae5','#bfdbfe','#fecdd3','#f9a8d4','#fed7aa','#e9d5ff'
  ];

  let selectedColor = $state('#fef9c3');

  function toggleCreateMode() {
    isCreateMode = !isCreateMode;
  }

  async function handleCreate(title:string, content:string){
    try{
      const newNote = await createNote(title,content, selectedColor);
      noteStore.add(newNote);
      isCreateMode = false;
    }catch(error){
      console.error("Error creating note", error);
      alert("Failed to save note"); 
    }
  }
</script>

<header class="flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-200">
  
  <button aria-label="Open sideNavBar" class="p-2 hover:bg-gray-300 rounded-full transition-colors">
    <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  <button 
    onclick={toggleCreateMode}
    aria-label="Create note"
    class="w-9 h-9 flex items-center justify-center bg-black text-white rounded-full text-2xl font-semibold shadow-sm transition-colors"
  > +
  </button>

  {#if isCreateMode}
    <div class="flex items-center gap-2 ml-2">
      {#each colors as color}
        <button 
          aria-label="Select color {color}"
          onclick={() => selectedColor = color}
          class="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
          style="background-color:{color}; border-color: {selectedColor === color ? '#e5e7eb' : 'transparent'};"
        ></button>
      {/each}
    </div>
  {/if}

  <div class="flex-1"></div>

  {#if !isCreateMode}
    <div class="flex items-center bg-gray-200 px-4 py-2 rounded-full w-full max-w-md">
      <svg class="w-5 h-5 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input 
        type="text" 
        placeholder="Search notes..." 
        class="bg-transparent outline-none w-full text-gray placeholder-gray"
      />
    </div>
  {:else}
    <button aria-label="Search" class="p-2 hover:bg-gray-300 rounded-full transition-colors">
      <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  {/if}

</header>
{#if isCreateMode}
  <div class="bg-gray border-b border-none p-6 flex justify-center">
    <div class="w-full h-full">
      <NoteForm 
        color={selectedColor} 
        onSubmit={handleCreate} 
        onCancel={() => isCreateMode = false} 
      />
    </div>
  </div>
{/if}