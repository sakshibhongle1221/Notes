<script lang="ts">
  import type {Note} from '$lib/dataType/NoteTy';
  let {note}: {note:Note} = $props();

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
  class="p-5 rounded-2xl flex flex-col h-56 shadow-sm justify-between border border-black/5" 
  style="background-color:{note.color || '#ffffff'}"
> 
  <div>
    <h3 class="font-bold text-black text-lg mb-2">
      {note.title || 'Untitled'}
    </h3>
    <p class="text-black text-sm line-clamp-4">
      {note.content}
    </p>
  </div>
  
  <div class="flex items-center justify-between mt-4">
    <span class="text-xs text-gray-800 font-medium">
      {formatDate(note.createdAt)}
    </span>
    
    <button aria-label="Edit note" class="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" fill="#1a1a1a"/>
    <path d="M24.5 12.5l3 3-10 10-4.5 1 1-4.5 10.5-9.5z" fill="white" stroke="white" stroke-width="0.2"/>
    <path d="M23 14l3 3" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
    </svg>
    </button>
  </div>

</div>