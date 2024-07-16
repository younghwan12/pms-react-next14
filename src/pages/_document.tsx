import React from "react";
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="ko">
                <Head>
                    <link id="theme-css" href={`/themes/light-blue/theme.css`} rel="stylesheet"></link>
                    <link
                        href="https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo.css"
                        rel="stylesheet"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
