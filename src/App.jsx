import React from 'react';
import ReactDOM from 'react-dom';

import IssueList from './IssueList.jsx';

const contentNode = document.getElementById('contents');

// Render the component inside the content Node
ReactDOM.render(<IssueList/>, contentNode);

if (module.hot) {
    module.hot.accept();
}