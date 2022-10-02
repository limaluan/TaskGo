import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="./favicon.png" type="image/PNG" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                    {/* font-family: 'Roboto', sans-serif; 400 500 700
                        font-family: 'Roboto Mono', monospace; */}
                        
                    {/* Import Icons */}
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}