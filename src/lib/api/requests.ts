import type { Note } from '$lib/dataType/NoteTy';

const Base_URL = 'https://69ad61a7b50a169ec87f45fd.mockapi.io/note/v1';

export async function getNotes(page:number=1, limit:number=20): Promise<Note[]> {
  const res = await fetch(`${Base_URL}/notes?page=${page}&limit=${limit}`);

  if (!res.ok) {throw new Error('Failed to fetch notes');}

  return res.json();
}

export async function createNote(title:string, content: string, color: string): Promise<Note> {
  const response = await fetch(`${Base_URL}/notes`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title,content,color,pinned: false,createdAt: new Date().toISOString()})
  });

  if (!response.ok) {throw new Error('Failed to create note');}

  return response.json();
}

export async function editNote(id:string, title:string, content:string, color:string, pinned:boolean): Promise<Note> {
  const response = await fetch(`${Base_URL}/notes/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title,content,color,pinned})
  });
  if (!response.ok) {throw new Error('Failed to update note');}
  return response.json();
}

export async function deleteNote(id:string): Promise<void> {
  const response = await fetch(`${Base_URL}/notes/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {throw new Error('Failed to delete note');}
}