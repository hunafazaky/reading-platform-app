export const state = () => ({
  counter: 0,
  worksData: null,
  usersData: null,
  workData: null,
  userData: null,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  decrement(state) {
    state.counter--
  },
  setWorks(state, data) {
    state.worksData = data
  },
  setUsers(state, data) {
    state.usersData = data
  },
  setWork(state, data) {
    state.workData = data
  },
  setUser(state, data) {
    state.userData = data
  },
  updateReadList(state, data) {
    state.userData.read_list.push(data)
  },
  updateLikeList(state, data) {
    state.userData.like_list.push(data)
  },
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 }
    state.counter = res.data
    return res.data
  },
  increment(context) {
    context.commit('increment')
  },
  decrement(context) {
    context.commit('decrement')
  },
  getWorks({ commit }) {
    this.$axios.get('/works?sortBy=newest')
      .then(response => {
        commit('setWorks', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
  getUsers({ commit }) {
    this.$axios.get('/users')
      .then(response => {
        commit('setUsers', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
  getWorkById({ commit }, id) {
    this.$axios.get('/works/' + id)
      .then(response => {
        commit('setWork', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
  getUserById({ commit }, id) {
    this.$axios.get('/users/' + id)
      .then(response => {
        commit('setUser', response.data)
      })
      .catch(error => {
        console.error('Error fetching data from API:', error)
      })
  },
  getUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/users/' + id)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.error('Error fetching data from API:', error)
          reject(error)
        })
    })
  },
  updateReadList({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      commit('updateReadList', data)
      this.$axios.put(`/users/${state.userData.id}`, state.userData)
        .then(response => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  updateLikeList({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      commit('updateLikeList', data)
      this.$axios.put(`/users/${state.userData.id}`, state.userData)
        .then(response => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  regis({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/users', {username:data.username, pen_name:data.username, password:data.password} )
        .then(response => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/users/login', {username:data.username, password:data.password} )
        .then(response => {
          commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  postWork({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/works', data )
        .then(response => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  deleteWork({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.delete('/works/'+ id )
        .then(response => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
}

export const getters = {
  getCounter(state) {
    return state.counter
  },
  works(state) {
    return state.worksData
  },
  users(state) {
    return state.usersData
  },
  work(state) {
    return state.workData
  },
  me(state) {
    return state.userData
  }
}