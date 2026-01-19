import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { getServices, urlFor } from '@/sanity/lib/sanity.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services - Digital Marketing Solutions',
  description:
    'Comprehensive digital marketing services including social media marketing, SEO, content marketing, PPC advertising, branding, and web design. Tailored solutions for your business growth.',
  keywords:
    'digital marketing services, social media marketing, SEO services, content marketing, PPC advertising, branding services, web design, Colombo',
};

// Revalidate every 60 seconds
export const revalidate = 60;

// TypeScript interface
interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  icon: any;
  features: string[];
  pricing?: {
    startingPrice?: number;
    pricingNote?: string;
  };
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-24 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 animate-fade-in">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Premium Digital Solutions
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                Our Services
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed animate-fade-in-up delay-200">
                Comprehensive digital marketing solutions tailored to your needs.
                We help businesses of all sizes achieve their goals through
                strategic, data-driven approaches.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {services && services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service: Service, index: number) => (
                  <div
                    key={service._id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fade-in-up 0.6s ease-out forwards',
                      opacity: 0
                    }}
                  >
                    {/* Service Image */}
                    <div className="relative h-56 bg-gray-100 overflow-hidden">
                      {service.icon ? (
                        <Image
                          src={urlFor(service.icon).width(600).height(400).url()}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                          <span className="text-blue-600 text-6xl font-bold">
                            {service.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Service Content */}
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-6">
                        {service.shortDescription}
                      </p>

                      {/* Features List */}
                      {service.features && service.features.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                            Key Features:
                          </h3>
                          <ul className="space-y-2">
                            {service.features.slice(0, 3).map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-start text-sm text-gray-600"
                              >
                                <svg
                                  className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Pricing */}
                      {service.pricing?.startingPrice && (
                        <div className="mb-6 pb-6 border-b border-gray-200">
                          <div className="flex items-baseline justify-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
                            <span className="text-sm text-gray-600 mr-2">
                              Starting from
                            </span>
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                              ${service.pricing.startingPrice}
                            </span>
                            <span className="text-sm text-gray-600 ml-1">
                              /month
                            </span>
                          </div>
                          {service.pricing.pricingNote && (
                            <p className="text-xs text-gray-500 mt-2 text-center">
                              {service.pricing.pricingNote}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Learn More Button */}
                      <Link
                        href={`/services/${service.slug.current}`}
                        className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      >
                        <span className="flex items-center justify-center">
                          Learn More
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Services Available
                </h3>
                <p className="text-gray-600 mb-8">
                  We're currently updating our services. Check back soon!
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Not Sure Which Service Is Right for You?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let's discuss your needs and create a customized strategy that
                works for your business.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 shadow-xl"
              >
                Get Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
