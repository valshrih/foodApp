import React from 'react';
import { ConfigProvider } from 'antd';
import App, { AppInitialProps, AppContext } from 'next/app';
import 'antd/dist/antd.css';
import '../components/layout.css';

interface IProps extends AppInitialProps {
    Component: {
        getLayout?: any;
    };
}

interface IAppContext extends AppContext {
    ctx: any;

}

class MyApp extends App<IProps> {
    public static getInitialProps = async ({ Component, ctx }: IAppContext) => {
        const pageProps = {
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        };

        return {
            pageProps,
        };
    };

    public render() {
        const { Component, pageProps } = this.props;

        const getLayout = Component.getLayout || ((page: React.ReactNode) => page);


        return (
            <ConfigProvider  >
                {getLayout(<Component {...pageProps} />)}
            </ConfigProvider>
        );
    }
}

export default MyApp;
