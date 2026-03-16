<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col transition-colors duration-300">  
  <Header/>
	<main class="flex-1 p-10"> {@render children()}</main>
</div>