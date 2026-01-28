const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Seed Admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  })

  // Seed Hero
  await prisma.hero.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heading: "Designing <br /> <span class='italic font-light text-gray-600 dark:text-gray-400'>Timeless</span> Spaces",
      subheading: 'Architecture & Interior Design Portfolio of Komal. Crafting environments that inspire and endure.',
      backgroundImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
    },
  })

  // Seed About
  await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heading: 'Philosophy',
      subheading: 'We believe that good design is obvious. Great design is transparent.',
      content: 'With a focus on minimalism and functionality, I strive to create spaces that are not only visually stunning but also deeply livable. My approach combines architectural precision with interior warmth, resulting in holistic environments.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop',
      yearsExp: '5+',
      projectsCount: '20+',
      profileName: "Ar. Komal Amle",
      profileTitle: "Principal Architect"
    },
  })

  // Seed Contact
  await prisma.contact.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: 'hello@komal.design',
      phone: '+1 (555) 123-4567',
      address: '123 Design Avenue\nCreative District, NY 10012',
      ctaText: "Let's build something beautiful.",
      ctaSub: "Available for new projects and collaborations.",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      behance: "https://behance.net"
    },
  })

  // Seed Projects
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