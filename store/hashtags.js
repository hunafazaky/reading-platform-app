export const state = () => ({
  data: [
    {
      id: 0,
      name: 'Teknologi'
    },
    {
      id: 1,
      name: 'Kesehatan'
    },
    {
      id: 2,
      name: 'Olahraga'
    },
    {
      id: 3,
      name: 'Travel'
    },
    {
      id: 4,
      name: 'Otomotif'
    },
    {
      id: 5,
      name: 'Sains'
    },
    {
      id: 6,
      name: 'Sejarah'
    },
    {
      id: 7,
      name: 'Ekonomi'
    },
    {
      id: 8,
      name: 'Sosial'
    },
    {
      id: 9,
      name: 'Budaya'
    },
    {
      id: 10,
      name: 'Agama'
    },
    {
      id: 11,
      name: 'Politik'
    },
    {
      id: 12,
      name: 'Aksi'
    },
    {
      id: 13,
      name: 'Romansa'
    },
    {
      id: 14,
      name: 'Fiksi Ilmiah'
    },
    {
      id: 15,
      name: 'Fantasi'
    },
    {
      id: 16,
      name: 'Horor'
    },
    {
      id: 17,
      name: 'Drama'
    }
  ]
  // data: [
  //   {
  //     id: 0,
  //     name: 'Natural Language Processing (NLP)'
  //   },
  //   {
  //     id: 1,
  //     name: 'Introduction'
  //   },
  //   {
  //     id: 2,
  //     name: 'Pre-processing'
  //   },
  //   {
  //     id: 3,
  //     name: 'Advanced NLP'
  //   },
  //   {
  //     id: 4,
  //     name: 'Algorithm'
  //   },
  //   {
  //     id: 5,
  //     name: 'Structured Representation'
  //   },
  //   {
  //     id: 6,
  //     name: 'Natural Language Understanding (NLU)'
  //   },
  //   {
  //     id: 7,
  //     name: 'Natural Language Generation (NLG)'
  //   },
  //   {
  //     id: 8,
  //     name: 'Machine Learning (ML)'
  //   },
  //   {
  //     id: 9,
  //     name: 'ML for NLP'
  //   },
  //   {
  //     id: 10,
  //     name: 'Deep Learning (DL)'
  //   },
  //   {
  //     id: 11,
  //     name: 'DL for NLP'
  //   },
  //   {
  //     id: 12,
  //     name: 'Implementation'
  //   },
  //   {
  //     id: 13,
  //     name: 'Search Engine'
  //   },
  //   {
  //     id: 14,
  //     name: 'Machine Translation'
  //   },
  //   {
  //     id: 15,
  //     name: 'Sentimen Analysis'
  //   },
  //   {
  //     id: 16,
  //     name: 'Text Sumamrization'
  //   },
  //   {
  //     id: 17,
  //     name: 'Chatbot'
  //   },
  //   {
  //     id: 18,
  //     name: 'Spelling Correction'
  //   },
  //   {
  //     id: 19,
  //     name: 'Text to Speech'
  //   },

  // ]
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
