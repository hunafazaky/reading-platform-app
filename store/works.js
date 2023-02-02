export const state = () => ({
  data: [],
})

export const actions = {
  async asyncData({ $axios, context }) {
    const works = await $axios.$get(`/works`)
    return { works }
  },
  // async getAllWorks({$axios, context}) {
  //   const { data } = await $axios.get(
  //     `/works`
  //   );
  //   context.commit("setData", data);
  // }
}

export const mutations = {
  setData(state, data) {
    state.data = data
  },
  // GetAllWorks(state) {
  //   fetch('http://localhost:8080/api/works')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       state.users = data
  //     })
  // },
  // add(state, post) {
  //   state.data.push(post)
  // },
  // edit(state, post) {
  //   const index = state.data.findIndex((object) => {
  //     return object.id === post.id
  //   })
  //   state.data[index] = post
  // },
  // remove(state, post) {
  //   state.data.splice(state.data.indexOf(post), 1)
  // },
  // toggle(state, todo) {
  //   todo.done = !todo.done
  // },
}
