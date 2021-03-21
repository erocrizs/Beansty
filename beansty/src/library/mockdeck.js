const mockdeck = (id) => ({
  id,
  name: 'Test Deck ' + id,
  description: 'This is a test deck for testing',
  passing: 0.6,
  cards: [
    {
      id: 0,
      question: 'What is 1 + 1?',
      type: 'text',
      answer: '2',
      point: 1
    },
    {
      id: 1,
      question: 'What kind of question is this?',
      type: 'radio',
      options: [
        'Choose',
        'Text',
        'Checkbox',
        'Arrange',
        'Ordered List',
        'Unordered List'
      ],
      answer: '0',
      point: 1
    },
    {
      id: 2,
      question: 'Which numbers add up to 10?',
      type: 'checkbox',
      options: [
        '5 + 6',
        '3 + 7',
        '2 + 8'
      ],
      answer: [1, 2],
      point: 1
    },
    {
      id: 3,
      question: 'Arrange these into alphabetical order.',
      type: 'arrange',
      answer: [
        'crocodile',
        'elephant',
        'koala',
        'snake',
        'zebra'
      ],
      point: 1
    },
    {
      id: 4,
      question: 'What are the names of the main characters in Tom & Jerry?',
      type: 'list',
      order: false,
      answer: [
        'Tom',
        'Jerry'
      ],
      point: 1
    },
    {
      id: 5,
      question: 'What are the nicknames of the last four demographic cohort/generations? (in order)',
      type: 'list',
      order: true,
      answer: [
        'Boomers',
        'Gen Xers',
        'Millenials',
        'Zoomers'
      ],
      point: 1
    }
  ]
});

const decks = [];

for (let i = 0; i < 15; i++) {
  decks.push(mockdeck(i));
}

export default decks;