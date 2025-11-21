import React from 'react'

const teamMembers = [
  {
    name: 'Adonis Carrillo',
    title: 'Co-founder & Creative Director',
    photo: '/images/adonis.jfif'
  },
  {
    name: 'Roselle Crisostomo',
    title: 'Co-founder & Brand Experience',
    photo: '/images/roselle.jfif'
  },
  {
    name: 'James Bernard Gaguis',
    title: 'Co-founder & Technical Lead',
    photo: '/images/jb.jpg'
  },
  {
    name: 'Althea Marie Adriano',
    title: 'Co-founder & Product Research',
    photo: '/images/althea.jfif'
  }
]

export default function AboutPage() {
  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.6em] text-gold-500">Web System Technologies · Final Project</p>
          <h2 className="font-serif text-4xl">Meet the Team</h2>
          <p className="text-sm text-gray-300">
            Lunvarre is a purely front-end project experience built for our Web System Technologies subject.
          </p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 text-center flex flex-col items-center gap-4"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl">{member.name}</h3> 
                <p className="text-xs uppercase tracking-[0.3em] text-gold-400">{member.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
