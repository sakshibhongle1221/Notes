import type { Note } from "$lib/dataType/NoteTy";

function noteState(){
  let states = $state(
    {notes:[] as Note[],
    loading:false,
    search:"",
    sortBy:"createdAt",
    page:1,
    limit:20,
    totalPages:1
    }
  );

  function setNotes(newNotes:Note[]){
    states.notes=newNotes
  }

  function add(note:Note){
    states.notes = [...states.notes,note];
  }

  function remove(id:string){
    states.notes = states.notes.filter(i => i.id !== id);
  }

  function update(updatedNote:Note){
    states.notes = states.notes.map(i =>i.id === updatedNote.id ? updatedNote : i)
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

  return {
    get notes(){return states.notes},
    get loading(){return states.loading},
    get search(){return states.search},
    get sortBy(){return states.sortBy},
    get page(){return states.page},
    get limit(){ return states.limit},
    get totalPages(){ return states.totalPages},
    setNotes,
    add,
    remove,
    update,
    setLoading,
    setSearch,
    setPage,
    setSortBy,
    setTotalPages
  };
}

export const noteStore = noteState();