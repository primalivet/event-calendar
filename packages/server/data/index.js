module.exports = {
  fakeUsers: [
    {
      id: 1,
      username: 'john'
    },
    {
      id: 2,
      username: 'jane'
    },
    {
      id: 3,
      username: 'frank'
    },
    {
      id: 4,
      username: 'fiona'
    }
  ],
  fakeUserConnections: [
    { userId: 1, friendId: 2 },
    { userId: 2, friendId: 1 },
    { userId: 3, friendId: 1 },
    { userId: 1, friendId: 3 },
    { userId: 4, friendId: 2 },
    { userId: 2, friendId: 4 }
  ],
  fakeEvents: [
    {
      id: 1,
      title: 'Big Concert',
      dates: [
        { start: '2019-01-31 12:30', end: '2019-01-31 14:00' },
        { start: '2019-02-01 12:30', end: '2019-02-01 14:00' }
      ],
      tags: ['music', 'free'],
      createdByUserId: 1
    },
    {
      id: 2,
      title: 'Small Concert',
      dates: [
        { start: '2019-02-31 12:30', end: '2019-02-31 14:00' },
        { start: '2020-03-01 12:30', end: '2020-03-01 14:00' }
      ],
      tags: ['music', 'free'],
      createdByUserId: 1
    },
    {
      id: 3,
      title: 'Food Exhibition',
      dates: [
        { start: '2020-05-15 23:30', end: '2020-05-15 23:59' },
        { start: '2020-06-15 23:30', end: '2020-06-15 23:59' }
      ],
      tags: ['food', 'free'],
      createdByUserId: 2
    },
    {
      id: 4,
      title: 'One day event',
      dates: [
        { start: '2020-04-15 12:30' }
      ],
      tags: ['music'],
      createdByUserId: 2
    },
    {
      id: 5,
      title: 'Teather',
      dates: [
        { start: '2020-05-27 23:30', end: '2020-05-27 23:59' },
        { start: '2020-06-12 23:30', end: '2020-06-12 23:59' }
      ],
      tags: ['culture'],
      createdByUserId: 3
    },
    {
      id: 6,
      title: 'Sightseeing',
      dates: [
        { start: '2020-12-15 23:30', end: '2020-12-15 23:59' },
        { start: '2020-12-15 23:30', end: '2020-13-15 23:59' }
      ],
      tags: ['sightseeing'],
      createdByUserId: 4
    }
  ]
}
