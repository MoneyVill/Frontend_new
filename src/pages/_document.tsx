import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* 기존 링크 및 메타 태그 */}
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#fffae2" />
				<link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon-57x57.png" /> 
				<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="apple-touch-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="apple-touch-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.png" />
				<link rel="icon" type="image/png" href="favicon-196x196.png" sizes="196x196" />
				<link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
				<link rel="icon" type="image/png" href="favicon-128.png" sizes="128x128" />
				<meta name="application-name" content="&nbsp;" />
				<meta name="msapplication-TileColor" content="#FFFFFF" />
				<meta name="msapplication-TileImage" content="mstile-144x144.png" />
				<meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
				<meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
				<meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
				<meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
			</Head>
			<body>
				{/* <link href="https://webfontworld.github.io/sunn/SUIT.css" rel="stylesheet"></link> */}
				{/* modal이 렌더링 될 위치 */}
				<div id="portal" />

				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
