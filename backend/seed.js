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

const introductionPageData = {
  slug: 'introduction',
  heroImage: '/image.jpg',
  metadata: {
    welcomeText: 'പുത്തൻകാട് ശിശുയേശു ദൈവാലയത്തിലേക്ക് സ്വാഗതം',
    introPara1: 'നെയ്യാറ്റിൻകര രൂപതയ്ക്ക് കീഴിലുള്ള പുത്തൻകാട് ശിശുയേശു ദൈവാലയം, വിശ്വാസം, ഐക്യം, ദൈവത്തിലുള്ള ആശ്രയം എന്നിവയുടെ ജീവന്റെ സാക്ഷ്യമാണ്. തലമുറകളായി ഭക്തജനങ്ങൾ ഈ ദൈവാലയത്തിൽ ആരാധനയ്ക്കും പ്രാർഥനയ്ക്കും ഒത്തുചേർന്ന് ദൈവകൃപ അനുഭവിക്കുന്നു.',
    introPara2: 'ഈ ദൈവാലയം ഒരു സാധാരണ കെട്ടിടം മാത്രമല്ല — ഇത് ആത്മീയ ജീവിതത്തിന്റെ കേന്ദ്രമാണ്. കൂദാശകൾ, ഭക്തി കൂട്ടായ്മകൾ, സേവന പ്രവർത്തനങ്ങൾ എന്നിവ വഴി ഓരോ വിശ്വാസിയുടെ ജീവിതത്തെയും ഈ ദൈവാലയം സമ്പന്നമാക്കുന്നു.',
    blessingTitle: 'ദൈവാലയ ആശീർവാദം',
    blessingDate: '2026 മെയ് 24 ഞായറാഴ്ച വൈകുന്നേരം 4:00 ന്',
    location: 'പുത്തൻകാട്, കേരളം',
    diocese: 'നെയ്യാറ്റിൻകര',
    massTimeValue: 'രാവിലെ 6:30',
    addressValue: 'പുത്തൻകാട്',
  },
};

const churchIntroPageData = {
  slug: 'church-intro',
  heroImage: '/image.jpg',
  metadata: {
    churchTitle: 'ശിശുയേശു ദൈവാലയം, പുത്തൻകാട്',
    dioceseSubtitle: 'നെയ്യാറ്റിൻകര രൂപത · Neyyattinkara Diocese',
    introLabel: 'ആമുഖം',
    introSectionTitle: 'ദൈവാലയ പരിചയം',
    mainContent: `ആഗോള കത്തോലിക്കാ സഭയിൽ നെയ്യാറ്റിൻകര രൂപത
പുത്തൻകട പ്രദേശത്തിൽ ഉണ്ണിമിശിഹായുടെ നാമധേയത്തിൽ
നിലകൊള്ളുന്ന ദൈവാലയം തിരുസഭയുടെയും പ്രത്യേകിച്ച്
ഇടവക ജനത്തിന്റെയും ദൈവാശ്രയത്തിന്റെയും
വിശ്വസ്തതയുടെയും ഐക്യത്തിന്റെയും നേർസാക്ഷ്യമാണ്.
ഈ ദൈവാലയം കേവലം ഒരു കല്ലും ചുണ്ണാമ്പും കൊണ്ട്
നിർമ്മിച്ച കെട്ടിടം മാത്രമല്ല, മറിച്ച് തലമുറതലമുറയായി
കൈമാറി വന്ന ഭക്തിയുടെയും ത്യാഗത്തിന്റെയും
ഒരു ജീവനുള്ള ആലയമാണ്.

ഇവിടെ ദൈവകൃപ അനുഭവിച്ച് ജീവിതം നയിക്കുന്ന
അനേകം ക്രൈസ്തവ കുടുംബങ്ങൾ ഈ ദൈവാലയത്തിന്
ചുറ്റും ഒത്തുചേർന്ന് ദൈവ ജനത്തിന്റെ ഐക്യം
പ്രഘോഷിക്കുന്നു. ദൈവസ്നേഹത്തിന്റെ ഈ ഭവനത്തിലേക്ക്
നിങ്ങളെ സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.`,
    dioceseFooter: 'നെയ്യാറ്റിൻകര രൂപതയ്ക്ക് കീഴിലുള്ള ഇടവക',
    decorativeCardTitle: 'ദൈവ സന്നിധിയിൽ',
    decorativeCardText: 'ഓരോ ദിവസവും\nദൈവകൃപ അനുഭവിക്കുക',
  },
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
    await Page.create(introductionPageData);
    await Page.create(churchIntroPageData);
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
