export const fakeResponse = {
  events: {
    edges: [
      {
        id: 1,
        title: 'Big Concert',
        dates: [
          { start: '2020-01-31 12:30', end: '2020-01-31 14:00'},
          { start: '2020-02-01 12:30', end: '2020-02-01 14:00'}
        ],
        tags: ['music', 'free']
      },
      {
        id: 2,
        title: 'Food Exhibition',
        dates: [
          { start: '2020-05-15 23:30', end: '2020-05-15 23:59'},
          { start: '2020-06-15 23:30', end: '2020-06-15 23:59'}
        ],
        tags: ['food', 'free']
      },
      {
        id: 3,
        title: 'One day event',
        dates: [
          { start: '2020-04-15 12:30' }
        ],
        tags: ['music']
      }
    ]
  }
}
