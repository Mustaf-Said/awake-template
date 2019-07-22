import { isString } from 'lodash'
export const state = () => ({
  pageType: '',
  title: '',
  subtitle: '',
  featureImage: '',
  content: '',
  author: '',
  date: ''
})
export const mutations = {
  set(state, data) {
    state = Object.assign(state, data)
  }
}
export const actions = {
  nuxtServerInit(store, context) {
    this.$cms = context.store.$cms
  },
  set({ commit }, { resource, slug }) {
    if (!resource) {
      setOtherPageData(commit)
    } else {
      const theResource = isString(resource) ? this.$cms[resource] : resource
      const data = Object.assign(theResource.getOne(slug), {
        pageType: theResource.slug
      })
      data.slug = slug
      commit('set', data)
    }
  }
}

function setOtherPageData(commit) {
  const global = require('~/content/global.json')
  commit('set', {
    title: global.siteName,
    subtitle: global.tagline,
    featureImage: global.featureImage
  })
}
