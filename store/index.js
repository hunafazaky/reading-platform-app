export const state = () => ({
  // counter: 0,
  worksData: null,
  usersData: null,
  workData: null,
  userData: null,
  workReaders: null,
  workLikeBy: null,
})

export const mutations = {
  // increment(state) {
  //   state.counter++
  // },
  // decrement(state) {
  //   state.counter--
  // },
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
    const newData = state.userData.read_list.filter((item => item._id !== data))
    newData.unshift(data)
    state.userData.read_list = newData
  },
  updateReaders(state, data) {
    const newData = data.readers.filter((item => item._id !== state.userData.id))
    newData.unshift(state.userData.id)
    // state.userData.read_list = newData
    state.workReaders = newData
  },
  updateLikeBy(state, data) {
    const newData = data.like_by
    newData.unshift(state.userData.id)
    // state.userData.read_list = newData
    state.workLikeBy = newData
  },
  updateLikeList(state, data) {
    const newData = state.userData.like_list.filter((item => item._id !== data))
    newData.unshift(data)
    state.userData.like_list = newData
  },
}

export const actions = {
  // async fetchCounter({ state }) {
  //   // make request
  //   const res = { data: 10 }
  //   state.counter = res.data
  //   return res.data
  // },
  // increment(context) {
  //   context.commit('increment')
  // },
  // decrement(context) {
  //   context.commit('decrement')
  // },
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
    return new Promise((resolve, reject) => {
      this.$axios.get('/works/' + id)
        .then(response => {
          commit('setWork', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error('Error fetching data from API:', error)
          reject(error)
        })
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
  updateReadList({ state, commit }, workId) {
    return new Promise((resolve, reject) => {
      commit('updateReadList', workId)
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
  updateLikeList({ state, commit }, workId) {
    return new Promise((resolve, reject) => {
      commit('updateLikeList', workId)
      this.$axios.put(`/users/${state.userData.id}`, { like_list:state.userData.like_list })
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
  updateReaders({ state, commit }, work) {
    return new Promise((resolve, reject) => {
      commit('updateReaders', work)
      this.$axios.put(`/works/${work.id}`, { readers:state.workReaders })
        .then(response => {
          // commit('setUser', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },
  updateLikeBy({ state, commit }, work) {
    return new Promise((resolve, reject) => {
      commit('updateLikeBy', work)
      this.$axios.put(`/works/${work.id}`, { like_by:state.workLikeBy })
        .then(response => {
          // commit('setUser', response.data)
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