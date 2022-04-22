import _ from 'lodash'

export const state = () => ({
  tasks: null,
  task: null,
})

export const mutations = {
  SET_TASKS(state, data) {
    state.tasks = data
  },
  ADD_TASK(state, { id, status, title, description }) {
    let newTask = {
      id: id,
      title: title,
      description: description,
    }
    state.tasks.map((task) => {
      if (task.status === status) {
        task.list.push(newTask)
      }
    })
  },
  SET_TASK(state, id) {
    let obj = {}
    state.tasks.map((task) => {
      task.list.map((t) => {
        if (t.id == id) {
          obj = {
            ...t,
            status: task.status,
            bgColor: task.bgColor,
            textColor: task.textColor
          }
          state.task = obj
        }
      })
    })
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
  getTaskById({ commit }, id) {
    if (id == null) {
      commit('SET_TASK', null)
    } else {
      // let res = await this.$axios.get('/tasks/' + id)
      commit('SET_TASK', id)
    }
  },
  addTask({ commit }, payload) {
    // let res = await this.$axios.post('/tasks', payload)
    commit('ADD_TASK', payload)
  },
  updateTask({ commit }, payload) {
    // let res = await this.$axios.put('/tasks/' + payload.id, payload.data)
    commit('UPDATE_TASK', payload)
  },
  deleteTask({ commit }, id) {
    // let res = await this.$axios.delete('/tasks/ + id)
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
