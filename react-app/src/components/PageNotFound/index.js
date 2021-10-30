import React from 'react';

import css from './PageNotFound.module.css'

const PageNotFound = () => {
    return (
        <div className={css.page_not_found}>
            <h1 className={css.header}>
                Page Not Found.
            </h1>
            <p className={css.message}>
                Sorry, the page you are trying to access does not exist.
            </p>
        </div>
    )
}

export default PageNotFound;
