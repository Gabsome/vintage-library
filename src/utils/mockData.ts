import { Book, User } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publisherId: 'pub1',
    coverImage: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry.',
    genre: ['Romance', 'Classic'],
    publishedDate: '1813-01-28',
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        userId: 'user1',
        userName: 'Jane Smith',
        rating: 5,
        comment: 'A timeless classic that still resonates today.',
        date: '2023-10-15'
      }
    ],
    isFeatured: true
  },
  {
    id: '2',
    title: 'Great Expectations',
    author: 'Charles Dickens',
    publisherId: 'pub2',
    coverImage: 'https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Great Expectations follows the childhood and young adult years of Pip, a blacksmith\'s apprentice in a country village. He suddenly comes into a large fortune from a mysterious benefactor and moves to London where he enters high society.',
    genre: ['Coming-of-age', 'Classic'],
    publishedDate: '1861-08-01',
    rating: 4.5,
    reviews: []
  },
  {
    id: '3',
    title: 'Moby-Dick',
    author: 'Herman Melville',
    publisherId: 'pub1',
    coverImage: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Moby-Dick tells the adventures of wandering sailor Ishmael, and his voyage on the whaleship Pequod, commanded by Captain Ahab. Ishmael soon learns that Ahab has one purpose on this voyage: to seek out Moby Dick, a ferocious, enigmatic white sperm whale.',
    genre: ['Adventure', 'Classic'],
    publishedDate: '1851-10-18',
    rating: 4.3,
    reviews: []
  },
  {
    id: '4',
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    publisherId: 'pub3',
    coverImage: 'https://images.pexels.com/photos/2674052/pexels-photo-2674052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Wuthering Heights is a wild, passionate tale of the intense and demonic love between Catherine Earnshaw and Heathcliff, an orphan adopted by Catherine\'s father.',
    genre: ['Gothic', 'Romance', 'Classic'],
    publishedDate: '1847-12-19',
    rating: 4.2,
    reviews: []
  },
  {
    id: '5',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    publisherId: 'pub2',
    coverImage: 'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'The Picture of Dorian Gray is the story of a young man who sells his soul for eternal youth and beauty. The narrative follows Dorian Gray\'s life as his portrait ages and displays the physical manifestations of his corrupt behavior while he remains young and beautiful.',
    genre: ['Gothic', 'Philosophical', 'Classic'],
    publishedDate: '1890-07-01',
    rating: 4.6,
    reviews: []
  },
  {
    id: '6',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    publisherId: 'pub3',
    coverImage: 'https://images.pexels.com/photos/6375323/pexels-photo-6375323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Jane Eyre follows the emotions and experiences of its title character, including her growth to adulthood, and her love for Mr. Rochester, the byronic master of fictitious Thornfield Hall.',
    genre: ['Gothic', 'Romance', 'Classic'],
    publishedDate: '1847-10-16',
    rating: 4.7,
    reviews: []
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'reader',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'pub1',
    name: 'Vintage Classics Publishing',
    email: 'classics@publisher.com',
    role: 'publisher',
    bio: 'Dedicated to bringing timeless literature to modern audiences.',
    avatar: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const featuredBook = mockBooks.find(book => book.isFeatured);