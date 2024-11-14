<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const jsonData = urlParams.get('data');
		if (jsonData) {
			try {
				const decodedData = decodeURIComponent(jsonData);
				const parsedData = JSON.parse(decodedData);
				const textFileContent = JSON.stringify(parsedData, null, 2);
				const blob = new Blob([textFileContent], { type: 'text/plain' });
				const link = document.createElement('a');
				link.href = URL.createObjectURL(blob);
				link.download = 'data.json';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} catch (error) {
				console.error('Invalid JSON data:', error);
			}
		} else {
			console.error('No JSON data provided in URL');
		}
	});
</script>
