const issuesReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_ISSUES_LIST_SUCCESS':
            return {
                loading: false,
                post: action.payload,
            }
        case 'FETCH_ISSUE_DETAILS_SUCCESS':
            return {
                loading: false,
                post: action.payload,
            }
        default:
            return state
    }
}

export default issuesReducer