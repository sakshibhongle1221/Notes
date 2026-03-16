import type { Note } from "$lib/dataType/NoteTy";
import {getNotes,deleteNote} from "$lib/api/requests";

function noteState(){
  let states = $state(
    {notes:[] as Note[],
    loading:false,
    search:"",
    sortBy:"createdAt",
    page:1,
    limit:20,
    totalPages:1,
    selectedNoteId: null as string | null,
    isDarkMode:false,
    isMore: true,
    toast:{ 
      showToast:false, 
      note:null as Note | null, 
      timeoutId: null as ReturnType<typeof setTimeout> | null 
    }
    }
  );

  function saveLocal(){
    if(typeof window !== 'undefined'){
      localStorage.setItem('offline_notes_cache',JSON.stringify(states.notes))
    }
  }

  async function loadNotes() {
  if(states.page === 1){
    setLoading(true);
  if(typeof window!=='undefined'){
    const cached = localStorage.getItem('offline_notes_cache');
    if (cached){
      states.notes = JSON.parse(cached);
    }
  }} 
  try{
    const data = await getNotes(states.page, states.limit);
    if (states.page === 1){setNotes(data)}
    else {states.notes = [...states.notes, ...data]}
    states.isMore = data.length === states.limit;
    saveLocal();
  }catch(err){
    console.error("You are offline",err);
  }finally {
    setLoading(false);
  }
}

function loadMore(){
  if(states.isMore){
    states.page += 1
    loadNotes()}
  }

  function setNotes(newNotes:Note[]){
    states.notes=newNotes
  }

  function add(note:Note){
    states.notes = [...states.notes,note];
    saveLocal();
  }

  function remove(id:string){
    states.notes = states.notes.filter(i => i.id !== id);
    saveLocal();
  }

  function update(updatedNote:Note){
    states.notes = states.notes.map(i =>i.id === updatedNote.id ? updatedNote : i)
    saveLocal();
  }

  function setLoading(value:boolean){
    states.loading = value;
  }

  function setSearch(input:string){
    states.search = input;
  }

  function setPage(pg:number){
  states.page = pg;
  }

  function setSortBy(value: string){
  states.sortBy = value;
  }

  function setTotalPages(value: number){
  states.totalPages = value;
  }

  function setSelectedNoteId(id: string | null){
  states.selectedNoteId= id;
  }

  function toggleDarkMode(){
    states.isDarkMode = !states.isDarkMode;
    if (typeof document !== 'undefined') {
      if (states.isDarkMode) {
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');
      }
    }
  }

function deleteCount(undoNote: Note){
states.notes=states.notes.filter(i=>i.id!==undoNote.id)
saveLocal();
if(states.toast.timeoutId){
  clearTimeout(states.toast.timeoutId)
}
const timeoutId = setTimeout(async()=>{
  try{
    await deleteNote(undoNote.id);
  }catch(err){
    console.error("Failed to delete from DB", err)}
    finally{
        states.toast.showToast=false;
        states.toast.note= null;
    }
    },10000);
    states.toast = {showToast:true, note:undoNote, timeoutId};
  }

  function undoDelete() {
    if (states.toast.note && states.toast.timeoutId){
      clearTimeout(states.toast.timeoutId);
      states.notes=[...states.notes, states.toast.note];
      states.toast.showToast = false;
      states.toast.note = null;
    }
  }

  return {
    get notes(){return states.notes},
    get loading(){return states.loading},
    get search(){return states.search},
    get sortBy(){return states.sortBy},
    get page(){return states.page},
    get limit(){ return states.limit},
    get totalPages(){ return states.totalPages},
    get selectedNoteId(){return states.selectedNoteId},
    get isDarkMode(){return states.isDarkMode},
    get hasMore(){return states.isMore},
    get toast(){return states.toast},
    get filteredNotes() {
      let result = states.notes;
      if(states.search){
        const lower =states.search.toLowerCase();
        result= result.filter(n =>n.title.toLowerCase().includes(lower) || n.content.toLowerCase().includes(lower)
        );
      }
      return [...result].sort((a, b) =>{
        if (states.sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (states.sortBy === 'id') {
          return String(a.id).localeCompare(String(b.id)); 
        }
        return new Date(b.createdAt).getTime() -new Date(a.createdAt).getTime();
      });
    },
    setNotes,
    add,
    remove,
    update,
    setLoading,
    setSearch,
    setPage,
    setSortBy,
    setTotalPages,
    loadNotes,
    setSelectedNoteId,
    toggleDarkMode,
    loadMore,
    deleteCount,
    undoDelete
  };
}

export const noteStore = noteState();