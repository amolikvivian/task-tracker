import _ from 'lodash'

export const state = () => ({
  tasks: null,
  task: null,
})

export const mutations = {
  SET_TASKS(state, data) {
    state.tasks = data
  },
  ADD_TASK(state, data) {
    state.tasks.push(data)
  },
  SET_TASK(state, data) {
    state.task = data
  },
  UPDATE_TASK(state, data) {
    state.tasks[data.id] = data.data
  },
  DELETE_TASK(state, id) {
    state.tasks = state.tasks.filter((task) => task.id !== id)
  },
}

export const actions = {
  async getTasks({ commit }) {
    let res = await this.$axios.get('/tasks')
    commit('SET_TASKS', res.data)
  },
  async getTaskById({ commit }, id) {
    if (id == null) {
      commit('SET_TASK', null)
    } else {
      let res = await this.$axios.get('/tasks/' + id)
      commit('SET_TASK', res.data)
    }
  },
  async addTask({ commit }, payload) {
    let res = await this.$axios.post('/tasks', payload)
    commit('ADD_TASK', res.data)
  },
  async updateTask({ commit }, payload) {
    // let res = await this.$axios.put('/tasks/' + payload.id, payload.data)
    commit('UPDATE_TASK', payload)
  },
  deleteTask({ commit }, id) {
    commit('DELETE_TASK', id)
  },
}

export const getters = {
  tasks: (state) => {
    return state.tasks
  },
  task: (state) => {
    return state.task
  },
  uniqueStatus: (state) => {
    return [
      ...new Map(state?.tasks?.map((task) => [task.status, task])).values(),
    ]
  },
}
