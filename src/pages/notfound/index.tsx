/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppConfig from '@/layout/AppConfig';
import Link from 'next/link';
import { Page } from '../../../types/types';

const NotFoundPage: Page = () => {
    return (
        <div className='flex items-center justify-center min-h-full flex-col'>
            <h2>Error</h2>
            <Link href='/'>History Back</Link>
        </div>
    );
};

NotFoundPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};

export default NotFoundPage;
