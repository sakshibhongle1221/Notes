<script lang="ts">
  import NoteForm from './NoteForm.svelte';
  import type { Note } from '$lib/dataType/NoteTy';
  import { noteStore } from '$lib/store/note.svelte';
  import {editNote} from '$lib/api/requests'

  let { 
    note, onClose 
  }:{ 
    note: Note; 
    onClose: () => void; 
  } = $props();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape'){
      onClose();
    }
  }

  async function handleUpdate(updatedTitle: string, updatedContent: string) {
    try {
      const updatedNote= await editNote(note.id,updatedTitle,updatedContent,note.color,note.pinned||false);

      noteStore.update(updatedNote);
      onClose();
    }catch (error) {
      console.error("Failed to update note:", error);
      alert("Could not update the note");
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"> 
  <div class="w-full max-w-2xl">
    <NoteForm 
      color={note.color}
      initialTitle={note.title}
      initialContent={note.content}
      onSubmit={handleUpdate}
      onCancel={onClose}
    />  
  </div>
</div>