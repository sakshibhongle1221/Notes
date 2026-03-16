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

  <aside class="fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50 p-6 flex flex-col border-r border-gray-200">
    
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xl font-bold text-black">Settings</h2>
      <button 
        onclick={onClose} 
        aria-label="Close menu"
        class="p-2 hover:bg-gray-200 rounded-full transition-colors"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

  <div class="flex-1">      
      <div class="mb-8">
        <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Sort By</h3>   
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
            <span class="text-gray-800">CreatedAt (Newest First)</span>
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
            <span class="text-gray-800">Title (A-Z)</span>
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
            <span class="text-gray-800">ID</span>
          </label>
        </div>
      </div>

    </div>

  </aside>
{/if}