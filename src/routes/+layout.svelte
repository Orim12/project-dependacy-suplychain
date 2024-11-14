<script lang="ts">
	import Footer from '@src/lib/3_organisms/footer/footer.svelte';
	import Header from '@src/lib/3_organisms/header/header.svelte';
</script>

<Header />
<main class="page">
	<slot />
</main>
<Footer />