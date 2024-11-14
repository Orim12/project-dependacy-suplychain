<script lang="ts">
	import { onMount } from 'svelte';
	import Container from '@utils/container/container.svelte';

	const fetchLicense = async (packageName: string) => {
		const response = await fetch(`https://registry.npmjs.org/${packageName}`);
		const data = await response.json();
		return data.license || 'No license information available';
	};

	const fetchPackageData = async (packageName: string) => {
		const response = await fetch(`https://registry.npmjs.org/${packageName}`);
		return await response.json();
	};

	const fetchAllDependencies = async (deps: Record<string, string>) => {
		const allDeps: Record<string, any> = {};
		for (const name of Object.keys(deps)) {
			const packageData = await fetchPackageData(name);
			allDeps[name] = {
				version: deps[name],
				dependencies: packageData.dependencies || {},
				devDependencies: packageData.devDependencies || {},
				license: packageData.license || 'No license information available'
			};
			// Recursively fetch nested dependencies
			allDeps[name].dependencies = await fetchAllDependencies(allDeps[name].dependencies);
			allDeps[name].devDependencies = await fetchAllDependencies(allDeps[name].devDependencies);
		}
		return allDeps;
	};

	onMount(() => {
		const fileInput = document.getElementById('fileInput');
		if (fileInput) {
			fileInput.addEventListener('change', function (event: Event) {
				const target = event.target as HTMLInputElement;
				const file = target.files ? target.files[0] : null;
				if (file) {
					const reader = new FileReader();
					reader.onload = async function (e: ProgressEvent<FileReader>) {
						try {
							const result = e.target?.result;
							if (typeof result === 'string') {
								const packageJson = JSON.parse(result);
								const dependencies = packageJson.dependencies || {};
								const devDependencies = packageJson.devDependencies || {};
								const output = document.getElementById('output');
								if (output) {
									output.innerHTML = '';

									const licenseCache: Record<string, string> = {};

									const createLink = (name: string) => {
										const encodedName = encodeURIComponent(name)
											.replace(/%40/g, '%2540')
											.replace(/%2F/g, '%252F');
										const encodedName2 = encodeURIComponent(name)
											.replace(/%40/g, '%40')
											.replace(/%2F/g, '%2F');
										const url = `https://npm.anvaka.com/#/view/2d/${encodedName}`;
										const url2 = `https://npmgraph.js.org/?q=${encodedName2}#color=outdated`;
										const license = licenseCache[name];
										return `<p>${name} - License: ${license}</p> <iframe src="${url}" width="50%" height="800px" frameborder="0"></iframe>  <iframe src="${url2}" width="50%" height="800px" frameborder="0"></iframe>`;
									};

									const fetchAllLicenses = async (deps: Record<string, string>) => {
										for (const name of Object.keys(deps)) {
											if (!licenseCache[name]) {
												licenseCache[name] = await fetchLicense(name);
											}
										}
									};

									const displayDependencies = (deps: Record<string, string>, title: string) => {
										if (Object.keys(deps).length > 0) {
											output.innerHTML += `<h2>${title}</h2>`;
											output.innerHTML += '<ul>';
											for (const [name] of Object.entries(deps)) {
												output.innerHTML += `<li>${createLink(name)}</li>`;
											}
											output.innerHTML += '</ul>';
										}
									};

									await fetchAllLicenses(dependencies);
									await fetchAllLicenses(devDependencies);

									displayDependencies(dependencies, 'Dependencies');
									displayDependencies(devDependencies, 'Dev Dependencies');

									// Fetch all nested dependencies and devDependencies
									const allDependencies = await fetchAllDependencies(dependencies);
									const allDevDependencies = await fetchAllDependencies(devDependencies);

									// Encode all dependencies and devDependencies data and create a download link
									const dataToDownload = {
										dependencies: allDependencies,
										devDependencies: allDevDependencies
									};
									const encodedData = encodeURIComponent(JSON.stringify(dataToDownload));
									const downloadLink = document.createElement('a');
									downloadLink.href = `download/?data=${encodedData}`;
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
<Container>
	<h1>Upload package.json</h1>
	<h2>if you hold the mouse on the white space you can scroll</h2>
	<input type="file" id="fileInput" accept=".json" aria-label="input package.json" />
</Container>
	<pre id="output"></pre>


