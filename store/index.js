export const state = () => ({
    pageTitle: 'Dashboard'
})

export const getters = {
    getPageTitle: state => state.pageTitle
}

export const actions = {
    setPageTitle: ({ commit }, pageTitle) => {
        commit('mSetPageTitle', pageTitle)
    }
}

export const mutations = {
    mSetPageTitle: (state, pageTitle) => {
        state.pageTitle = pageTitle
    }
}