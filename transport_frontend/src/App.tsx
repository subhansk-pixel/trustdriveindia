import { useEffect, useState } from 'react'
import './App.css'

const services = [
  {
    id: 'airport-pickup',
    title: 'Airport pickup',
    description: 'On-time driver support for airport arrivals, departures, and guest pickup.',
    points: ['24/7 availability', 'Punctual arrival', 'Smooth city transfer'],
    image: '/hero-slides/airport-header.jpg',
  },
  {
    id: 'valet-parking',
    title: 'Valet parking',
    description: 'Professional valet support for weddings, private events, and corporate venues.',
    points: ['Event-ready team', 'Polite handling', 'Managed vehicle flow'],
    image: '/service-images/valet-parking.jpg',
  },
  {
    id: 'temporary-driver',
    title: 'Temporary driver',
    description: 'Flexible driver booking for a few hours, a day, or short-term personal use.',
    points: ['Hourly booking', 'Local travel help', 'Quick availability'],
    image: '/hero-slides/event-header.jpg',
  },
  {
    id: 'permanent-driver',
    title: 'Permanent driver',
    description: 'Reliable long-term driver support for daily office, home, or business travel.',
    points: ['Daily commute', 'Trusted service', 'Long-term support'],
    image: '/service-images/permanent-driver.jpg',
  },
  {
    id: 'celebrity-pickup',
    title: 'Celebrity pickup & drop',
    description: 'Private and professional driver service for VIP guests and special movement.',
    points: ['Discreet handling', 'Premium support', 'Professional conduct'],
    image: '/service-images/celebrity-pickup.jpg',
  },
  {
    id: 'family-vacation',
    title: 'Family vacation drivers',
    description: 'Comfortable driver service for family outings, tours, and weekend travel.',
    points: ['Safe family travel', 'Outstation friendly', 'Relaxed journey'],
    image: '/service-images/family-vacation.jpg',
  },
]

const highlights = [
  { value: '15+', label: 'Years of experience' },
  { value: '400+', label: 'Driver partners' },
  { value: '24/7', label: 'Booking support' },
  { value: '4.8/5', label: 'Customer rating' },
]

const heroSlides = [
  {
    eyebrow: 'Airport, Event, and Family Drivers',
    title: 'Airport rides and daily drivers in Hyderabad.',
    image: '/hero-slides/airport-header.jpg',
  },
  {
    eyebrow: 'Valet and VIP Support',
    title: 'Drivers for events, pickups, and premium travel.',
    image: '/service-images/permanent-driver.jpg',
  },
  {
    eyebrow: '15+ Years of Experience',
    title: 'Temporary, permanent, and trip drivers on call.',
    image: '/hero-slides/family-header.jpg',
  },
]

const fallbackHeroImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 720'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23145c5d'/%3E%3Cstop offset='100%25' stop-color='%230f3d3e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='720' rx='36' fill='url(%23g)'/%3E%3Ccircle cx='930' cy='170' r='96' fill='rgba(255,255,255,0.12)'/%3E%3Ccircle cx='1030' cy='280' r='52' fill='rgba(255,255,255,0.08)'/%3E%3Cpath d='M165 475c62-126 178-193 320-193 120 0 222 42 302 121l75 72H165z' fill='rgba(255,255,255,0.1)'/%3E%3Crect x='120' y='138' width='264' height='40' rx='20' fill='rgba(255,255,255,0.12)'/%3E%3Crect x='120' y='208' width='464' height='72' rx='20' fill='rgba(255,255,255,0.16)'/%3E%3Crect x='120' y='304' width='356' height='28' rx='14' fill='rgba(255,255,255,0.12)'/%3E%3C/svg%3E"

const reviews = [
  {
    name: 'Rahul Kumar',
    location: 'Madhapur',
    service: 'Airport pickup',
    rating: 5,
    image: '/reviewers/rahul-kumar.jpg',
    text: 'Driver reached before time, helped with luggage, and the pickup from Rajiv Gandhi Airport was very smooth.',
  },
  {
    name: 'Sneha Reddy',
    location: 'Banjara Hills',
    service: 'Family vacation driver',
    rating: 5,
    image: '/reviewers/sneha-reddy.jpg',
    text: 'We booked for a two-day family trip and the driver was calm, careful, and very respectful with elders.',
  },
  {
    name: 'Arjun Varma',
    location: 'Gachibowli',
    service: 'Valet parking',
    rating: 4,
    image: '/reviewers/arjun-varma.jpg',
    text: 'Used their valet team for a private event. The coordination was clear and vehicle handling felt professional.',
  },
]

const fallbackProfileLogo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='32' fill='%23e8dfd2'/%3E%3Ccircle cx='32' cy='24' r='11' fill='%23145c5d' opacity='0.9'/%3E%3Cpath d='M16 52c2.8-9 10.1-14 16-14s13.2 5 16 14' fill='%23145c5d' opacity='0.9'/%3E%3C/svg%3E"

const rawPhoneNumber = import.meta.env.VITE_CONTACT_NUMBER?.trim() || ''
const phoneNumber = rawPhoneNumber || '+919326857329'
const dialNumber = phoneNumber.replace(/[^\d+]/g, '')
const whatsappNumber = phoneNumber.replace(/\D/g, '')
const whatsappMessage = encodeURIComponent(
  'Hello Trust Drive India, I need driver service in Hyderabad. Please share details.',
)
const callHref = `tel:${dialNumber}`
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
const createServiceWhatsappHref = (serviceTitle: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Trust Drive India, I need ${serviceTitle} service in Hyderabad. Please share availability and pricing.`,
  )}`

function App() {
  const [openServiceId, setOpenServiceId] = useState<string | null>(services[0]?.id ?? null)
  const [activeSlide, setActiveSlide] = useState(0)

  const previousSlide = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)
  }

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length)
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-logo-shell">
            <img className="brand-logo" src="/favicon.svg" alt="Trust Drive India logo" />
          </div>
          <div className="brand-copy">
            <p className="brand-kicker">Hyderabad Driver Service</p>
            <p className="brand-name">Trust Drive India</p>
            <p className="brand-line">Airport pickups, valet, family trips, and on-demand drivers.</p>
          </div>
        </div>
      </header>

      <main className="landing-page">
        <section className="hero-modern">
          <div className="hero-media" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.title}
                className={`hero-media-image ${index === activeSlide ? 'hero-media-image-active' : ''}`}
                src={slide.image}
                alt=""
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = fallbackHeroImage
                }}
              />
            ))}
          </div>
          <div className="hero-gradient" />

          <div className="hero-modern-content">
            <div className="hero-content-card">
              <p className="hero-badge">Hyderabad driver service</p>
              <p className="hero-tag">{heroSlides[activeSlide].eyebrow}</p>
              <h2>{heroSlides[activeSlide].title}</h2>
              <p className="hero-trust-row">4.8 rated · 15+ years experience · 400+ driver partners</p>

              <div className="hero-bottom-row">
                <div className="hero-actions">
                  <a className="primary-button" href={whatsappHref} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                  <a className="ghost-button" href={callHref}>
                    Call now
                  </a>
                </div>

                <div className="hero-controls">
                  <button
                    className="hero-nav-button"
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>
                  <div className="hero-dots" aria-label="Hero slide navigation">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        className={`hero-dot ${index === activeSlide ? 'hero-dot-active' : ''}`}
                        type="button"
                        aria-label={`Show slide ${index + 1}`}
                        onClick={() => setActiveSlide(index)}
                      />
                    ))}
                  </div>
                  <button
                    className="hero-nav-button"
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-stats-grid">
            {highlights.map((item) => (
              <article className="hero-stat-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="services-section">
          <div className="section-heading">
            <p className="eyebrow">Our services</p>
            <h3>Driver support for every need</h3>
          </div>
          <div className="services-summary-grid">
            {services.map((service) => (
              <article
                className={`services-summary-card ${openServiceId === service.id ? 'services-summary-card-open' : ''}`}
                key={service.id}
              >
                <button
                  className="services-summary-toggle"
                  type="button"
                  aria-expanded={openServiceId === service.id}
                  aria-controls={`${service.id}-panel`}
                  onClick={() =>
                    setOpenServiceId((current) => (current === service.id ? null : service.id))
                  }
                >
                  <div>
                    <p className="service-kicker">Service</p>
                    <h4>{service.title}</h4>
                  </div>
                  <span
                    className={`services-summary-icon ${openServiceId === service.id ? 'services-summary-icon-open' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {openServiceId === service.id ? (
                  <div className="services-summary-panel" id={`${service.id}-panel`}>
                    <div
                      className="service-image"
                      style={{ backgroundImage: `linear-gradient(rgba(16, 43, 44, 0.2), rgba(16, 43, 44, 0.2)), url(${service.image})` }}
                      role="img"
                      aria-label={service.title}
                    />
                    <div className="service-content">
                      <p className="service-description">{service.description}</p>
                      <div className="service-points">
                        {service.points.map((point) => (
                          <span className="service-pill" key={point}>
                            {point}
                          </span>
                        ))}
                      </div>
                      <a
                        className="service-contact-button"
                        href={createServiceWhatsappHref(service.title)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Enquire on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="trust-section">
          <div className="section-heading">
            <p className="eyebrow">Why choose us</p>
            <h3>Clean, safe, and dependable</h3>
          </div>
          <div className="trust-grid">
            <article className="trust-card">
              <h4>Fast response</h4>
              <p>Quick booking help for urgent travel and airport schedules.</p>
            </article>
            <article className="trust-card">
              <h4>Experienced drivers</h4>
              <p>Professional driver partners for personal and event travel.</p>
            </article>
            <article className="trust-card">
              <h4>Easy contact</h4>
              <p>Call or WhatsApp directly with one tap on mobile.</p>
            </article>
          </div>
        </section>

        <section className="reviews-section">
          <div className="section-heading">
            <p className="eyebrow">Customer feedback</p>
            <h3>What clients say</h3>
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-header">
                  <div className="review-person">
                    <img
                      className="review-avatar"
                      src={review.image}
                      alt={review.name}
                      onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = fallbackProfileLogo
                      }}
                    />
                    <div>
                      <p className="review-name">{review.name}</p>
                      <p className="review-meta">
                        {review.location} · {review.service}
                      </p>
                    </div>
                  </div>
                  <p className="review-rating" aria-label={`${review.rating} out of 5 stars`}>
                    {'★'.repeat(review.rating)}
                    <span>{'★'.repeat(5 - review.rating)}</span>
                  </p>
                </div>
                <p className="review-text">“{review.text}”</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <div className="sticky-contact" aria-label="Quick contact actions">
        <a className="sticky-call" href={callHref}>
          Call Now
        </a>
        <a className="sticky-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
          WhatsApp Contact
        </a>
      </div>
    </div>
  )
}

export default App
