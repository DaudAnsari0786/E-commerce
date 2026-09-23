import React from 'react'
  const testimonials = [
    { name: 'Sarah M.', role: 'Verified Buyer', text: 'Amazing quality and fast shipping! The denim jacket I ordered fits perfectly and looks even better in person.', avatar: 'https://i.pravatar.cc/100?img=1', rating: 5 },
    { name: 'James K.', role: 'Verified Buyer', text: 'StyleCraft has become my go-to for clothes. Prices are great, and returns are super easy. Highly recommend!', avatar: 'https://i.pravatar.cc/100?img=12', rating: 5 },
    { name: 'Priya R.', role: 'Verified Buyer', text: 'Love the variety! I found outfits for my whole family in one place. Will definitely shop here again.', avatar: 'https://i.pravatar.cc/100?img=5', rating: 5 },
  ];

const Testemonials = () => {
  return (
    <div>  {/* ===== TESTIMONIALS ===== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              What Our Customers Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Real reviews from real shoppers
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
</div>
  )
}

export default Testemonials