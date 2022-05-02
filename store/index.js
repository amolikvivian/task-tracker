export const state = () => ({
  user: null,
  tasks: null,
  currentTask: null,
  tasksByStatus: null,
  currentStatusId: null,
})

export const mutations = {
  SET_USER(state, data) {
    state.user = data
  },
  SET_TASKS(state, data) {
    state.tasks = data
  },
  SET_CURRENT_TASK(state, data) {
    state.currentTask = data
  },
  SET_TASKS_BY_STATUS(state, data) {
    state.tasksByStatus = data
  },
  SET_CURRENT_STATUS_ID(state, data) {
    state.currentStatusId = data
  },
}

export const actions = {
  setUser({ commit }, payload) {
    commit('SET_USER', payload)
  },
  async getTasks({ commit, state }) {
    try {
      this.$axios.setToken(state.user.token, 'Bearer')
      const res = await this.$axios.get('/tasks/all')
      commit('SET_TASKS', res.data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async updateTaskList({ state }, payload) {
    let status_id = payload.status_id
    try {
      this.$axios.setToken(state.user.token, 'Bearer')
      const res = await this.$axios.post(
        '/tasks/set',
        { tasks: payload.list },
        {
          params: {
            status_id,
          },
        }
      )
    } catch (e) {
      console.log(e)
    }
  },
  async addStatus({ commit, state }, payload) {
    try {
      this.$axios.setToken(state.user.token, 'Bearer')
      const res = await this.$axios.post('/status/add', payload)
      commit('SET_TASKS', res.data)
    } catch (e) {
      console.log(e)
    }
  },
  async addTask({ state }, payload) {
    let task = {
      title: payload.title,
      desc: payload.desc,
      t_id: payload.t_id,
    }
    let status_id = payload.status_id
    try {
      this.$axios.setToken(state.user.token, 'Bearer')
      const res = await this.$axios.post('/task/add', task, {
        params: {
          status_id,
        },
      })
    } catch (e) {
      console.log(e)
    }
  },
  async getTaskById({ commit, state }, payload) {
    try {
      this.$axios.setToken(state.user.token, 'Bearer')
      const res = await this.$axios.post(`/get-task/${payload.t_id}`, {
        status_id: payload.status_id,
      })
      commit('SET_CURRENT_TASK', res.data)
    } catch (e) {
      console.log(e)
    }
  },
  async deleteTask({ state }, payload) {
    try {
      this.$axios.setToken(state.user.token, 'Bearer')
      const res = await this.$axios.post('/task/delete', payload)
    } catch (e) {
      console.log(e)
    }
  },
  async deleteStatus({ state }, payload) {
    try {
      this.$axios.setToken(state.user.token, 'Bearer')
      const res = await this.$axios.post('/status/delete', payload)
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  },
}

export const getters = {
  tasks: (state) => {
    return state.tasks
  },

  currentTask: (state) => {
    return state.currentTask
  },
  currentStatusId: (state) => {
    return state.currentStatusId
  },

  statusList: (state) => {
    return [...new Map(state.tasks.map((task) => [task.label, task])).values()]
  },
  tasksByStatus: (state) => {
    return state.tasksByStatus
  },
}
