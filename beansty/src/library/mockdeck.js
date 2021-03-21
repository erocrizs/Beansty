const mockdeck = (id) => ({
  id,
  name: 'Test Deck ' + id,
  description: 'This is a test deck for testing',
  passing: 0.6,
  cards: [
    {
      question: 'What is 1 + 1?',
      type: 'text',
      answer: '2',
      score: 1
    },
    {
      question: 'What kind of question is this?',
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
      question: 'Which numbers add up to 10?',
      type: 'checkbox',
      options: [
        '5 + 6',
        '3 + 7',
        '2 + 8'
      ],
      answer: [1, 2],
      score: 1
    },
    {
      question: 'Arrange these into alphabetical order.',
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