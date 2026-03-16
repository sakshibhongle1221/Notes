<script lang="ts">
  import { onMount } from 'svelte';
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
    onSubmit:(title:string, content:string)=> void;
    onCancel:() => void;
  } = $props();

  let title = $state('');
  let content = $state('');

  onMount(()=>{
    title= initialTitle
    content= initialContent
  });

  function handleSave() {
    if (!title.trim() && !content.trim()){return;}
    onSubmit(title, content);
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
    class="font-bold text-black text-lg mb-2 bg-transparent outline-none placeholder-gray-500"
  />
  
  <textarea
    placeholder="Write your note here..."
    bind:value={content}
    class="text-black text-sm flex-1 bg-transparent outline-none resize-none placeholder-gray"
  ></textarea>

  <div class="flex items-center justify-end gap-2 mt-4">
    <button 
      onclick={onCancel} 
      class="px-3 py-1.5 text-sm font-medium text-black hover:bg-black/5 rounded-md transition-colors"
    >
    Cancel
    </button>
    <button 
      onclick={handleSave} 
      class="px-3 py-1.5 text-sm font-medium bg-black text-white rounded-md transition-colors shadow-sm"
    > Save
    </button>
  </div>
</div>