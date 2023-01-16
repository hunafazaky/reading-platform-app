export const state = () => ({
  works: [
    {
      id: 1,
      cover: 'https://picsum.photos/510/300?random',
      title:
        'Welcome to Lorem Ipsum dolor sit, amet consectetur adipisicing elit.',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, laborum ad. Ut expedita tempora autem ex rerum ipsam, repellat quia natus laudantium molestias perferendis quae! Reiciendis magnam commodi cum mollitia quidem. Cum laborum sapiente esse, voluptas quas provident, aut quos atque perspiciatis, odit maxime minus in modi illo architecto unde quasi porro consequatur totam tempora. Earum, expedita ducimus ipsum fuga necessitatibus nihil aspernatur a asperiores voluptas rem eveniet quis perspiciatis error voluptatem architecto assumenda blanditiis vero consectetur sit et doloremque! Necessitatibus ea nam praesentium architecto vel exercitationem eligendi obcaecati temporibus sunt, voluptates, tempora reiciendis totam. Id accusantium optio modi omnis?',
      category: 1,
      hashtags: [5, 6, 4],
      writer_id: 1,
      reader_id: [1, 2, 3, 4, 5],
      reaction: {
        likes: 1,
        dislikes: 2,
      },
      created_at: '21 Desember 2012',
      updated_at: '21 Desember 2012',
    },
  ],
  category: [
    {
      id: 1,
      name: 'Berita',
      color: 'red',
      created_at: '21 Desember 2012',
      updated_at: '21 Desember 2012',
    },
    {
      id: 2,
      name: 'Karya Ilmiah',
      color: 'blue',
      created_at: '21 Desember 2012',
      updated_at: '21 Desember 2012',
    },
    {
      id: 3,
      name: 'Karya Fiksi',
      color: 'green',
      created_at: '21 Desember 2012',
      updated_at: '21 Desember 2012',
    },
    {
      id: 4,
      name: 'Puisi',
      color: 'purple',
      created_at: '21 Desember 2012',
      updated_at: '21 Desember 2012',
    },
    {
      id: 5,
      name: 'Resensi',
      color: 'amber',
      created_at: '21 Desember 2012',
      updated_at: '21 Desember 2012',
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
