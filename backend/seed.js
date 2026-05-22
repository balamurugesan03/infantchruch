const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Page = require('./models/Page');
const Event = require('./models/Event');
require('dotenv').config();

const homePageData = {
  slug: 'home',
  heroTitle: 'Infant Jesus Church',
  heroSubtitle: 'Puthenkad, Neyyattinkara Diocese — A Living Witness of Faith',
  sections: [
    {
      title: 'Our Beloved Parish',
      content: `In the global Catholic Church, the church dedicated to Infant Jesus, standing in the Puthenkad region of the Neyyattinkara Diocese, is a living witness to the faith, unity, and reliance on God. The church has stood as a beacon of spiritual strength for generations, drawing the faithful together under the loving gaze of the Infant Jesus.`,
      order: 1,
    },
    {
      title: 'A Community of Faith',
      content: `Our parish community is a family bound by faith and love. From the earliest morning Mass to the evening prayers, the church reverberates with devotion and praise. Every believer who walks through our doors is welcomed as a cherished member of this sacred family. Together we celebrate the sacraments, support one another through trials, and rejoice in God's abundant blessings.`,
      order: 2,
    },
    {
      title: 'Spiritual Heritage',
      content: `The Infant Jesus Church in Puthenkad stands as more than a building — it is a spiritual home. The devotion to the Infant Jesus has been handed down through generations, nurturing souls and transforming lives. Our rich liturgical traditions, rooted in the universal Catholic faith and enriched by the local culture of Kerala, make every celebration a deeply meaningful encounter with the divine.`,
      order: 3,
    },
  ],
  massTimes: [
    { day: 'Monday – Saturday', time: '6:30 AM', language: 'Malayalam' },
    { day: 'Sunday', time: '6:00 AM', language: 'Malayalam' },
    { day: 'Sunday', time: '8:30 AM', language: 'Malayalam' },
    { day: 'Sunday', time: '10:30 AM', language: 'English' },
    { day: 'First Friday', time: '6:30 AM', language: 'Malayalam' },
  ],
};

const aboutPageData = {
  slug: 'about',
  heroTitle: 'About Our Church',
  heroSubtitle: 'Rooted in faith, growing in love, serving in hope',
  sections: [
    {
      title: 'Our History',
      content: `The Infant Jesus Church in Puthenkad has a rich and blessed history spanning several decades. Founded by devout Catholics who settled in the region, the parish grew from humble beginnings into a vibrant faith community. Over the years, the church has been a centre of evangelisation, charitable works, and sacramental grace.`,
      order: 1,
    },
    {
      title: 'Diocese of Neyyattinkara',
      content: `Our parish falls under the Diocese of Neyyattinkara, a vibrant diocese in Kerala, South India. The diocese is committed to the spiritual growth of its faithful, the promotion of social justice, and the nurturing of vocations. Our church takes pride in being an active and contributing member of this great diocese.`,
      order: 2,
    },
    {
      title: 'Our Mission',
      content: `Guided by the Gospel values of love, service, and justice, our parish strives to be the presence of Christ in the world. We are committed to: celebrating the sacraments with devotion, forming disciples through faith education, serving the poor and marginalized, and building a community where all are welcomed and loved.`,
      order: 3,
    },
    {
      title: 'Parish Priest & Leadership',
      content: `Our parish is led by a dedicated team of priests and lay leaders who shepherd the flock with wisdom and compassion. The parish council, various ministry groups, and youth organizations work hand in hand to carry out the mission of the church in our local community.`,
      order: 4,
    },
  ],
};

const eventsData = [
  {
    title: 'Feast of the Infant Jesus',
    description: 'Annual feast celebration with Solemn High Mass, procession, and cultural programs.',
    date: new Date('2024-12-25'),
    time: '6:00 AM – 10:00 PM',
    location: 'Church Premises',
    category: 'festival',
  },
  {
    title: 'First Friday Adoration',
    description: 'Monthly Eucharistic adoration and special Mass on the first Friday.',
    date: new Date('2024-12-06'),
    time: '6:30 AM',
    location: 'Main Church',
    category: 'prayer',
  },
  {
    title: 'Christmas Midnight Mass',
    description: 'Solemn Midnight Mass to celebrate the birth of our Lord Jesus Christ.',
    date: new Date('2024-12-24'),
    time: '12:00 AM',
    location: 'Main Church',
    category: 'mass',
  },
  {
    title: 'Parish Family Day',
    description: 'Annual family gathering with games, food, and fellowship.',
    date: new Date('2025-01-15'),
    time: '9:00 AM',
    location: 'Church Grounds',
    category: 'community',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Page.deleteMany({});
    await Event.deleteMany({});

    // Create admin
    await Admin.create({
      name: 'Church Admin',
      email: 'admin@infantjesuschurch.com',
      password: 'admin123',
    });
    console.log('✅ Admin created: admin@infantjesuschurch.com / admin123');

    // Create pages
    await Page.create(homePageData);
    await Page.create(aboutPageData);
    console.log('✅ Pages seeded');

    // Create events
    await Event.insertMany(eventsData);
    console.log('✅ Events seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('Admin Login: admin@infantjesuschurch.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
