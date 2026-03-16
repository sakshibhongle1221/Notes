<script lang="ts">
  import { onMount } from 'svelte';
  import {noteStore} from '$lib/store/note.svelte';
  let{
    color= '#ffffff',
    initialTitle = '',
    initialContent = '',
    onSubmit,
    onCancel
  }:{
    color?: string;
    initialTitle?: string;
    initialContent?: string;
    onSubmit:(title:string, content:string)=> Promise<void>|void;
    onCancel:() => void;
  } = $props();

  let title = $state('');
  let content = $state('');
  let isSubmit = $state(false);

  onMount(()=>{
    title= initialTitle
    content= initialContent
  });

  async function handleSave() {
    if (!title.trim() && !content.trim()){return;}
    isSubmit=true
    try{
      await onSubmit(title, content)
    }finally{
      isSubmit=false
    }
  }
</script>

<div 
  class="mx-auto p-5 rounded-2xl shadow-md border border-black/10 flex flex-col h-80 max-w-200" 
  style="background-color: {color};"
>
  <input
    type="text"
    placeholder="Note Title"
    bind:value={title}
    disabled={isSubmit}
    class="font-bold text-black text-lg mb-2 bg-transparent outline-none placeholder-gray-500 disabled:opacity-70"
  />
  
  <textarea
    placeholder="Write your note here..."
    bind:value={content}
    disabled={isSubmit}
    class="text-black text-sm flex-1 bg-transparent outline-none resize-none placeholder-gray disabled:opacity-70"
  ></textarea>

  <div class="flex items-center justify-end gap-2 mt-4">
    <button 
      onclick={onCancel}
      disabled={isSubmit}
      class="px-3 py-1.5 text-sm font-medium text-black hover:bg-black/5 rounded-md transition-colors disabled:opacity-50"
    >
    Cancel
    </button>
    <button 
      onclick={handleSave} 
      disabled={isSubmit}
      class="px-4 py-1.5 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-md transition-colors shadow-sm flex flex-row items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-25"
    >
    {#if isSubmit}
      <svg class="animate-spin h-4 w-4 text-white dark:text-black shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Saving...</span>
      {:else}
      <span>Save</span>
      {/if}
    </button>
  </div>
</div>