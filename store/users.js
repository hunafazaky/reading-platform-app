export const state = () => ({
  data: [],
})

export const getters = {
  GetSpecificUser: (state) => (id) => {
    return state.users.filter((q) => q._id == id)[0]
  },
}

export const mutations = {
  GetRandomUser(state) {
    fetch('http://localhost:3000/users/random')
      .then((res) => res.json())
      .then((data) => {
        if (state.user._id != data._id) {
          state.user = data
        } else {
          this.commit('GetRandomUser')
        }
      })
  },
  GetAllUsers(state) {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => {
        state.users = data
      })
  },
  add(state, user) {
    state.data.push({
      user,
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}
