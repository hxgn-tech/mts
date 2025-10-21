import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
                    rel="stylesheet"
                />
                
            </Head>
            <body
                style={{
                    margin: 0,
                    padding: 0,
                }}
            >
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
