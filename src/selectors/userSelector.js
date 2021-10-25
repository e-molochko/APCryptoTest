import { createSelector } from 'reselect'

export const selectCurrentUser = (state) => state.currentUser || {}

export const selectCurrentUserName = createSelector(
    [selectCurrentUser],
    (user) => user.name
)

export const selectInternetReachability = createSelector(
    [selectCurrentUser],
    (user) => user.isInternetReachable
)
