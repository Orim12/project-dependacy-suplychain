<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const fileInput = document.getElementById('fileInput');
		if (fileInput) {
			fileInput.addEventListener('change', function (event: Event) {
				const target = event.target as HTMLInputElement;
				const file = target.files ? target.files[0] : null;
				if (file) {
					const reader = new FileReader();
					reader.onload = function (e: ProgressEvent<FileReader>) {
						try {
							const result = e.target?.result;
							if (typeof result === 'string') {
								const packageJson = JSON.parse(result);
								const dependencies = packageJson.dependencies || {};
								const devDependencies = packageJson.devDependencies || {};
								const output = document.getElementById('output');
								if (output) {
									output.innerHTML = '';

									const createLink = (name: string, version: string) => {
										const encodedName = encodeURIComponent(name)
											.replace(/%40/g, '%2540')
											.replace(/%2F/g, '%252F');
										const encodedName2 = encodeURIComponent(name)
											.replace(/%40/g, '%40')
											.replace(/%2F/g, '%2F');
										const url = `https://npm.anvaka.com/#/view/2d/${encodedName}`;
										const url2 = `https://npmgraph.js.org/?q=${encodedName2}#color=outdated`;
										return `<p>${name}</p> <iframe src="${url}" width="50%" height="800px" frameborder="0"></iframe>  <iframe src="${url2}" width="50%" height="800px" frameborder="0"></iframe>`;
									};

									const displayDependencies = (deps: Record<string, string>, title: string) => {
										if (Object.keys(deps).length > 0) {
											output.innerHTML += `<h2>${title}</h2>`;
											output.innerHTML += '<ul>';
											for (const [name, version] of Object.entries(deps)) {
												output.innerHTML += `<li>${createLink(name, version)}</li>`;
											}
											output.innerHTML += '</ul>';
										}
									};

									displayDependencies(dependencies, 'Dependencies');
									displayDependencies(devDependencies, 'Dev Dependencies');

									// Encode JSON data and create a download link
									const encodedData = encodeURIComponent(JSON.stringify(packageJson));
									const downloadLink = document.createElement('a');
									downloadLink.href = `download/index.html?data=${encodedData}`;
									downloadLink.textContent = 'Download JSON as Text File';
									output.appendChild(downloadLink);
								}
							}
						} catch (error) {
							const output = document.getElementById('output');
							if (output) {
								output.textContent = 'Invalid JSON file';
							}
						}
					};
					reader.readAsText(file);
				}
			});
		}
	});
</script>

<h1>Upload package.json</h1>
<h2>if you hold the mouse on the white space you can scroll</h2>
<input type="file" id="fileInput" accept=".json" aria-label="input package.json" />
<pre id="output"></pre>
