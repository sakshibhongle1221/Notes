<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
	import Toast from '$lib/components/Toast.svelte';
</script>

<div class="h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white flex flex-col transition-colors duration-300">  
  <Header/>
  
  <main class="grow py-2 px-5 overflow-y-auto relative"> 
    {@render children()}
  </main>
	<Toast/>

  <footer class="border-t border-gray-200 dark:border dark:border-zinc-700 py-3 text-center text-sm text-black dark:text-white">
    <p>
      Built by Sakshi Bhongle
      <a href="https://github.com/sakshibhongle1221/Notes.git" target="_blank" rel="noopener noreferrer" class="font-bold hover:text-blue-600 transition-colors underline decoration-gray-300 underline-offset-3">
        Github Repo link
      </a>
    </p>
  </footer>
</div>