<script lang="ts">
  import type {Note} from '$lib/dataType/NoteTy';
  let {note}: {note:Note} = $props();
  import {noteStore} from '$lib/store/note.svelte'
  import EditNote from './EditNote.svelte';

  let showEditModal = $state(false);

  function formatDate(dateString:string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US',{
      month:'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
</script>

<div
onclick={() => noteStore.setSelectedNoteId(note.id)}
onkeydown={(e) => {if(e.key ==='Enter'|| e.key ===' ') noteStore.setSelectedNoteId(note.id)}}
  role="button" 
  tabindex="0" 
  class="p-5 rounded-2xl flex flex-col h-40 shadow-sm justify-between border transition-all cursor-pointer outline-none {noteStore.selectedNoteId === note.id ?'border-black':'border-black/5 hover:shadow-lg'}" 
  style="background-color:{note.color || '#ffffff'}"
> 
 <div>
    <div class="flex justify-between items-start gap-3 mb-2">
      <h3 class="font-bold text-black dark:text-white text-lg line-clamp-2">
      {note.title || 'Untitled'}
      </h3>
      <button 
        onclick={(e)=>{
          e.stopPropagation();
          noteStore.togglePin(note);
        }}
        aria-label="Toggle Pin"
        class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all {note.pinned?'bg-[#1a1a1a]' : 'bg-black/5 dark:bg-white/10 hover:bg-[#1a1a1a] group'}"
      >
        <svg class="w-3.5 h-3.5 {note.pinned ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-300 group-hover:text-yellow-400'}" fill={note.pinned ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>
    </div>
    <p class="text-black dark:text-gray-300 text-sm line-clamp-2">{note.content}</p>
  </div>
  
  <div class="flex items-center justify-between mt-4">
    <span class="text-xs text-gray-800 font-medium">
      {formatDate(note.createdAt)}
    </span>
    
    <button 
    onclick={(e)=> {
        e.stopPropagation()
        showEditModal = true}}
    aria-label="Edit note" class="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" fill="#1a1a1a"/>
    <path d="M24.5 12.5l3 3-10 10-4.5 1 1-4.5 10.5-9.5z" fill="white" stroke="white" stroke-width="0.2"/>
    <path d="M23 14l3 3" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
    </svg>
    </button>
  </div>
</div>
{#if showEditModal}
  <EditNote 
    note={note} 
    onClose={() => showEditModal = false} 
  />
{/if}