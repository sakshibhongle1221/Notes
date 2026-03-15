<script lang="ts">
  let {noteTitle,onDelete,onCancel
  }:{
    noteTitle: string;
    onDelete:() => void;
    onCancel:() => void;
  }= $props();
</script>

<div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
  
  <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
    <h3 class="text-lg font-bold text-stone-800 mb-2">Delete note ?</h3>
    
    <p class="text-sm text-gray-600 mb-6">
      Are you sure you want to delete "<strong>{noteTitle || 'Untitled'}</strong>"?
    </p>
    
    <div class="flex gap-3 justify-end">
      <button
        onclick={onCancel}
        class="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-300 transition-colors text-sm font-medium"
      >Cancel
      </button>
      
      <button
        onclick={onDelete}
        class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium shadow-sm"
      >Delete
      </button>
    </div>
  </div>
  
</div>