const mockdeck =  (id) => ({
  id,
  name: 'Test Deck ' + id,
  description: 'This is a test deck for testing',
  tags: ['Tag A', 'Tag B', 'Tag C'],
  passing: 0.6,
  cards: [
    {
      question: 'What tag does this have?',
      tags: [0],
      type: 'text',
      answer: 'Tag A',
      score: 1
    },
    {
      question: 'What kind of question is this?',
      tags: [0, 1, 2],
      type: 'radio',
      options: [
        'radio',
        'text',
        'checkbox',
        'arrange',
        'enumerate_order',
        'enumerate_unorder',
      ],
      answer: '0',
      score: 1
    },
    {
      question: 'Which tags does this have?',
      tags: [1, 2],
      type: 'checkbox',
      options: [
        'Tag A',
        'Tag B',
        'Tag C'
      ],
      answer: [1, 2],
      score: 1
    },
    {
      question: 'Arrange these into alphabetical order.',
      tags: [1],
      type: 'arrange',
      answer: [
        'crocodile',
        'elephant',
        'koala',
        'snake',
        'zebra'
      ],
      score: 1
    },
    {
      question: 'What are the names of the main characters in Tom & Jerry?',
      tags: [2],
      type: 'enumerate',
      order: false,
      answer: [
        'Tom',
        'Jerry'
      ],
      score: 1
    },
    {
      question: 'What are the nicknames of the last four demographic cohort/generations? (in order)',
      tags: [2],
      type: 'enumerate',
      order: true,
      answer: [
        'Boomers',
        'Gen Xers',
        'Millenials',
        'Zoomers'
      ],
      score: 1
    }
  ]
});

const decks = [];

for (let i = 0; i < 15; i++) {
  decks.push(mockdeck(i));
}

export default decks;