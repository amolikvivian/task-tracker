import _ from 'lodash'

export const state = () => ({})

export const getters = {
  getTasks: (state) => {
    return state.tasks
  },
  getStatusAndColors: (state) => {
    let unique = [
      ...new Map(state.tasks.map((item) => [item['status'], item])).values(),
    ]
    return _.map(unique, function (task) {
      return _.pick(task, 'status', 'bgColor', 'textColor')
    })
  },
}
