<script lang="ts">
  import {noteStore} from '$lib/store/note.svelte'
  let { 
    isOpen, 
    onClose 
  }:{ 
    isOpen:boolean; 
    onClose:() =>void} =$props();

  function handleKeydown(event:KeyboardEvent){
    if (event.key=== 'Escape'&&isOpen){
      onClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown}/>
{#if isOpen}
  <div 
    class="fixed inset-0 bg-black/40 z-40" 
    onclick={onClose}
    onkeydown={(e) =>{if(e.key==='Enter') onClose()}}
    role="button"
    tabindex="0"
    aria-label="close sideNav"
  ></div>

  <aside class="fixed top-0 left-0 w-72 h-full bg-white dark:bg-black shadow-2xl z-50 p-6 flex flex-col transition-color">
    
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xl font-bold text-black dark:text-white">Settings</h2>
      <button 
        onclick={onClose} 
        aria-label="Close menu"
        class="p-2 hover:bg-gray-300 rounded-full transition-colors"
      >
        <svg class="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

  <div class="flex-1">      
      <div class="mb-8">
        <h3 class="text-md font-bold text-black dark:text-white tracking-wider mb-4">Sort By</h3>   
        <div class="flex flex-col gap-3">
          <label class="flex items-center gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="sort" 
              value="createdAt" 
              checked={noteStore.sortBy === 'createdAt'} 
              onchange={() => noteStore.setSortBy('createdAt')} 
              class="w-4 h-4 accent-black"
            />
            <span class="text-black dark:text-white">CreatedAt (Newest First)</span>
          </label>

          <label class="flex items-center gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="sort" 
              value="title" 
              checked={noteStore.sortBy === 'title'} 
              onchange={() => noteStore.setSortBy('title')} 
              class="w-4 h-4 accent-black"
            />
            <span class="text-black dark:text-white">Title (A-Z)</span>
          </label>

          <label class="flex items-center gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="sort" 
              value="id" 
              checked={noteStore.sortBy === 'id'} 
              onchange={() => noteStore.setSortBy('id')} 
              class="w-4 h-4 accent-black"
            />
            <span class="text-black dark:text-white">ID</span>
          </label>
        </div>
      </div>

  </div>

  <div>
    <h3 class="text-md font-bold text-black dark:text-white tracking-wider mb-4">Appearance</h3>
    <div class="flex items-center justify-between p-3 bg-gray-100 dark:bg-white rounded-xl">
      <span class="text-black font-medium">Dark Mode</span>
          <button 
            onclick={() => noteStore.toggleDarkMode()}
            aria-label="Toggle Dark Mode"
            class="w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none {noteStore.isDarkMode ?'bg-blue-600': 'bg-gray-300'}"
          >
            <div class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 {noteStore.isDarkMode ? 'translate-x-6' :'translate-x-0'}">
            </div>
          </button>
    </div>
  </div>

  </aside>
{/if}