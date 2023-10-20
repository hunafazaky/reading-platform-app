export const state = () => ({
  data: [
    {
      id: 0,
      name: 'Teknologi',
    },
    {
      id: 1,
      name: 'Kesehatan',
    },
    {
      id: 2,
      name: 'Olahraga',
    },
    {
      id: 3,
      name: 'Travel',
    },
    {
      id: 4,
      name: 'Otomotif',
    },
    {
      id: 5,
      name: 'Sains',
    },
    {
      id: 6,
      name: 'Sejarah',
    },
    {
      id: 7,
      name: 'Ekonomi',
    },
    {
      id: 8,
      name: 'Sosial',
    },
    {
      id: 9,
      name: 'Budaya',
    },
    {
      id: 10,
      name: 'Agama',
    },
    {
      id: 11,
      name: 'Politik',
    },
    {
      id: 12,
      name: 'Aksi',
    },
    {
      id: 13,
      name: 'Romansa',
    },
    {
      id: 14,
      name: 'Fiksi Ilmiah',
    },
    {
      id: 15,
      name: 'Fantasi',
    },
    {
      id: 16,
      name: 'Horor',
    },
    {
      id: 17,
      name: 'Drama',
    },
  ],
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false,
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}
