import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create executive members
  const executives = [
    {
      name: 'Dr. Sarah Mwansa',
      position: 'Director of Digital Media',
      bio: 'Leading digital media innovation with over 15 years of experience in broadcast journalism and digital content strategy.',
      email: 'sarah.mwansa@unza.zm',
      phone: '+260 211 123456',
      order: 1
    },
    {
      name: 'James Banda',
      position: 'Head of Production',
      bio: 'Expert in video production and live broadcasting, passionate about mentoring the next generation of media professionals.',
      email: 'james.banda@unza.zm',
      phone: '+260 211 123457',
      order: 2
    },
    {
      name: 'Esther Phiri',
      position: 'Technical Director',
      bio: 'Specializing in broadcast technology and digital infrastructure, ensuring seamless delivery of all media content.',
      email: 'esther.phiri@unza.zm',
      phone: '+260 211 123458',
      order: 3
    },
    {
      name: 'Michael Mulenga',
      position: 'Content Manager',
      bio: 'Creative content strategist with expertise in digital storytelling and audience engagement across multiple platforms.',
      email: 'michael.mulenga@unza.zm',
      phone: '+260 211 123459',
      order: 4
    }
  ]

  for (const exec of executives) {
    // Create user first
    const user = await prisma.user.upsert({
      where: { email: exec.email },
      update: {},
      create: {
        email: exec.email,
        name: exec.name,
        role: 'executive'
      }
    })

    // Create executive member
    await prisma.executiveMember.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        name: exec.name,
        position: exec.position,
        bio: exec.bio,
        email: exec.email,
        phone: exec.phone,
        order: exec.order
      }
    })
  }

  // Create services
  const services = [
    {
      title: 'Live Streams',
      description: 'Real-time broadcasting of university events, lectures, and special programming',
      icon: 'Play',
      features: JSON.stringify(['HD Quality Streaming', 'Multi-platform Support', 'Interactive Chat', 'On-demand Playback']),
      color: 'bg-red-500',
      order: 1
    },
    {
      title: 'Graphic Designing',
      description: 'Professional design services for branding, marketing, and digital content',
      icon: 'Palette',
      features: JSON.stringify(['Brand Identity', 'Digital Graphics', 'Print Design', 'Motion Graphics']),
      color: 'bg-purple-500',
      order: 2
    },
    {
      title: 'Live News Broadcast',
      description: 'Up-to-date news coverage and current affairs programming',
      icon: 'Radio',
      features: JSON.stringify(['Daily News Updates', 'Investigative Journalism', 'Student Reporting', 'Community News']),
      color: 'bg-blue-500',
      order: 3
    },
    {
      title: 'Content Creation',
      description: 'Creative content production for various platforms and purposes',
      icon: 'Video',
      features: JSON.stringify(['Video Production', 'Podcast Creation', 'Documentary Making', 'Social Media Content']),
      color: 'bg-green-500',
      order: 4
    }
  ]

  for (const service of services) {
    await prisma.service.create({
      data: service
    })
  }

  // Create sample content
  const adminUser = await prisma.user.findFirst({
    where: { role: 'executive' }
  })

  if (adminUser) {
    const sampleContent = [
      {
        title: 'UNZA Graduation Ceremony 2024 - Live Stream',
        description: 'Join us for the live coverage of the University of Zambia 2024 graduation ceremony',
        type: 'live_stream',
        category: 'Events',
        thumbnailUrl: '/api/placeholder/400/225',
        videoUrl: 'https://example.com/graduation-stream',
        content: 'The University of Zambia is proud to present the 2024 graduation ceremony. Join us as we celebrate the achievements of our graduates.',
        tags: JSON.stringify(['graduation', 'ceremony', 'unza', '2024']),
        isPublished: true,
        isFeatured: true,
        authorId: adminUser.id
      },
      {
        title: 'DMH-TV Brand Identity Design',
        description: 'Complete brand identity package for DMH-TV including logo, colors, and guidelines',
        type: 'graphic_design',
        category: 'Branding',
        thumbnailUrl: '/api/placeholder/400/225',
        imageUrl: '/api/placeholder/400/225',
        content: 'A comprehensive brand identity design that captures the essence of Digital Media Hub - modern, professional, and innovative.',
        tags: JSON.stringify(['branding', 'design', 'logo', 'identity']),
        isPublished: true,
        isFeatured: false,
        authorId: adminUser.id
      },
      {
        title: 'Weekly News Digest - Episode 15',
        description: 'Latest news and updates from around the university and beyond',
        type: 'news_broadcast',
        category: 'News',
        thumbnailUrl: '/api/placeholder/400/225',
        videoUrl: 'https://example.com/news-episode-15',
        content: 'This week\'s top stories include research breakthroughs, student achievements, and upcoming events.',
        tags: JSON.stringify(['news', 'weekly', 'digest', 'episode-15']),
        isPublished: true,
        isFeatured: false,
        authorId: adminUser.id
      }
    ]

    for (const content of sampleContent) {
      await prisma.content.create({
        data: content
      })
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })