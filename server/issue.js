'use strict';

// Validation
const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verfied: true,
    Closed: true,
};

const issueFieldType = {
    // id: 'required',
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
};

function validateIssue(issue) {
    for (const field in issueFieldType) {
        const type = issueFieldType[field];
        if (!type) {
            delete issue[field];
        } else if (type === 'required' && !issue[field]) {
            return `${field} is required.`;
        }
    }

    if (!validIssueStatus[issue.status]) {
        return `${issue.status} is not a valid status.`;
    }

    return null;
}

module.exports = {
    validateIssue: validateIssue
}