<script>
	import '@src/scss/globals.scss';
</script>

<svelte:head>
    <!-- Preload all fonts -->
    <link rel="preload" href="/fonts/Open-Sans/OpenSans-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/fonts/Open-Sans/OpenSans-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/fonts/Oswald/Oswald-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/fonts/Oswald/Oswald-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    
    <!-- Define fonts -->
	<style>
		@font-face {
			font-family: 'Open Sans';
			font-style: normal;
			font-weight: 400;
			src: url('/fonts/Open-Sans/OpenSans-Regular.woff2') format('woff2');
			font-display: swap;
		}

		@font-face {
			font-family: 'Open Sans';
			font-style: normal;
			font-weight: 700;
			src: url('/fonts/Open-Sans/OpenSans-Bold.woff2') format('woff2');
			font-display: swap;
		}

		@font-face {
			font-family: 'Oswald';
			font-style: normal;
			font-weight: 400;
			src: url('/fonts/Oswald/Oswald-Regular.woff2') format('woff2');
			font-display: swap;
		}

		@font-face {
			font-family: 'Oswald';
			font-style: normal;
			font-weight: 700;
			src: url('/fonts/Oswald/Oswald-Bold.woff2') format('woff2');
			font-display: swap;
		}
	</style>
</svelte:head>
