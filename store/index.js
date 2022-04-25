import _ from 'lodash'
import { v4 as uuid4 } from 'uuid'
export const state = () => ({
  tasks: null,
  task: null,
  move_task: null
})

export const mutations = {
  SET_TASKS(state, data) {
    state.tasks = data
  },
  ADD_TASK(state, { id, status_id, title, description }) {
    let newTask = {
      id: id,
      title: title,
      description: description,
    }
    state.tasks.map((task) => {
      if (task.t_id == status_id) {
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
            status_id: task.t_id,
            bgColor: task.bgColor,
            textColor: task.textColor,
          }
          state.task = obj
        }
      })
    })
  },
  UPDATE_TASK(state, data) {
    let editedTask = {
      id: data.id,
      title: data.title,
      description: data.description,
    }

    state.tasks.map((task) => {
      task.list.map((t, idx) => {
        if (t.id == data.id) {
          task.list[idx] = editedTask
        }
      })
    })
  },
  DELETE_TASK(state, data) {
    state.tasks.map((task) => {
      if (task.t_id == data.status_id) {
        task.list.splice(
          task.list.findIndex((t) => t.id == data.id),
          1
        )
      }
    })
  },
  ADD_STATUS(state, data) {
    state.tasks.push({
      t_id: uuid4(),
      status: data,
      bgColor: 'bg-purple-200',
      textColor: 'text-purple-900',
      list: [],
    })
  },
  UPDATE_STATUS(state, data) {
    const res = state.tasks[data.old_tid].list.filter((ele) => {
      return data.id !== ele.id
    })


    let obj = {
      id: data.id,
      title: data.title,
      description: data.description
    }
    
    state.tasks[data.old_tid].list = res
    state.tasks[data.new_tid].list.push(obj)
  },
  SET_MOVE_TASK(state, data) {
    state.move_task = data
  }
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
  deleteTask({ commit }, payload) {
    // let res = await this.$axios.delete('/tasks/ + id)
    commit('DELETE_TASK', payload)
  },
  newStatus({ commit }, payload) {
    commit('ADD_STATUS', payload)
  },
  updateStatus({ commit }, payload) {
    commit('UPDATE_STATUS', payload)
  },
  setMoveTask({commit}, payload) {
    commit('SET_MOVE_TASK', payload)
  }
}

export const getters = {
  tasks: (state) => {
    return state.tasks
  },
  task: (state) => {
    return state.task
  },
  tasksByStatus: (state) => (status) => {
    return state.tasks.filter((task) => task.status == status)[0].list
  },
  statusList: (state) => {
    return [...new Map(state.tasks.map((task) => [task.status, task])).values()]
  },
}
