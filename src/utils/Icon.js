import React from 'react';
import PropTypes from 'prop-types';

const icons = {
    'heartrate': ['M20 16h4.766c-0.187 0.203-0.313 0.313-0.344 0.344l-9.734 9.375c-0.187 0.187-0.438 0.281-0.688 0.281s-0.5-0.094-0.688-0.281l-9.75-9.406c-0.031-0.016-0.156-0.125-0.328-0.313h5.766c0.453 0 0.859-0.313 0.969-0.75l1.094-4.391 2.969 10.422c0.125 0.422 0.516 0.719 0.969 0.719v0c0.438 0 0.828-0.297 0.953-0.719l2.281-7.578 0.875 1.75c0.172 0.328 0.516 0.547 0.891 0.547zM28 9.312c0 1.797-0.781 3.437-1.609 4.688h-5.766l-1.734-3.453c-0.172-0.359-0.578-0.578-0.969-0.547-0.422 0.047-0.766 0.313-0.875 0.719l-2.016 6.719-3.063-10.719c-0.125-0.422-0.516-0.719-0.984-0.719-0.453 0-0.844 0.313-0.953 0.75l-1.813 7.25h-6.609c-0.828-1.25-1.609-2.891-1.609-4.688 0-4.578 2.797-7.313 7.469-7.313 2.734 0 5.297 2.156 6.531 3.375 1.234-1.219 3.797-3.375 6.531-3.375 4.672 0 7.469 2.734 7.469 7.313z'],
    'bloodpressure': ['M22.821,7.605v2.428H20.88v2.914h1.941v1.941h0.972v-1.941h1.942v-2.914h-1.942V7.605c0-1.338-1.089-2.428-2.428-2.428h-3.399c-1.339,0-2.428,1.09-2.428,2.428v17.966c0,0.803-0.654,1.456-1.457,1.456H8.254c-0.802,0-1.457-0.653-1.457-1.456v-0.971c0.536,0,0.971-0.435,0.971-0.971v-1.458H4.856v1.458c0,0.536,0.434,0.971,0.971,0.971v0.971c0,1.339,1.089,2.427,2.428,2.427h5.827c1.339,0,2.428-1.088,2.428-2.427V7.605c0-0.803,0.654-1.458,1.457-1.458h3.399C22.168,6.147,22.821,6.802,22.821,7.605z',
        'M3.884,2.75h0.972v1.942h2.913v0.971H4.856v1.942h1.942v0.972H4.856v1.942h2.913v0.971H4.856v1.942h1.942v0.972H4.856v1.941h2.913v0.971H4.856v1.944h6.312c0.803,0,1.457-0.655,1.457-1.458V3.235c0-0.803-0.654-1.458-1.457-1.458H1.457C0.653,1.777,0,2.432,0,3.235v14.567c0,0.803,0.653,1.458,1.457,1.458h2.428V2.75z',
        'M8.926-0.165H3.699L3.214,0.807h6.197L8.926-0.165z',
        'M8.74,20.715V20.23H3.884v0.484c0,0.269,0.218,0.486,0.485,0.486h3.885C8.522,21.201,8.74,20.983,8.74,20.715z',
        'M27.017,20.024l-3.709-4.384l-3.71,4.384c-0.739,0.872-1.146,1.985-1.146,3.129c0,2.672,2.175,4.847,4.846,4.847c2.692,0,4.866-2.175,4.866-4.847C28.163,22.01,27.756,20.896,27.017,20.024z M26.706,24.113h-1.942v1.943H21.85v-1.943h-1.942v-2.912h1.942V19.26h2.914v1.941h1.942V24.113z',
        'M23.793,20.23h-0.972v1.941H20.88v0.972h1.941v1.941h0.972v-1.941h1.942v-0.972h-1.942V20.23z',
        'M5.614,12.612']
};

const icon = props => {
    let paths = icons[props.icon].map(path => {
        return <path style={{ fill: '#FFFF' }} d={path}></path>
    });
    return (
        <svg width="22" height="22" viewBox="0 0 28 28">
            {/* <path style={{ fill: '#FFFF' }} d={icons[props.icon]}></path> */}
            {paths}
        </svg>
    );
};

icon.propTypes = {
    icon: PropTypes.string.isRequired
};

export default icon;