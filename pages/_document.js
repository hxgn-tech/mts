import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap"
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
