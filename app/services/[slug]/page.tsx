import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { getServiceBySlug, urlFor } from '@/sanity/lib/sanity.client';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';

// TypeScript interface
interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  fullDescription: any;
  icon: any;
  features: string[];
  pricing?: {
    startingPrice?: number;
    pricingNote?: string;
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} - Flex Agency Services`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service: Service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <svg
                className="w-4 h-4 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <Link
                href="/services"
                className="hover:text-blue-600 transition-colors"
              >
                Services
              </Link>
              <svg
                className="w-4 h-4 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-gray-900 font-medium">{service.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <section className="bg-gray-50">
          <div className="w-full">
            <div className="relative h-[500px] overflow-hidden bg-white">
              {service.icon ? (
                <Image
                  src={urlFor(service.icon).width(1920).height(600).url()}
                  alt={service.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                  <span className="text-blue-600 text-9xl font-bold">
                    {service.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Main Description */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full mr-4"></div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Service Overview
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                    {service.fullDescription ? (
                      <PortableText value={service.fullDescription} />
                    ) : (
                      <p>{service.shortDescription}</p>
                    )}
                  </div>
                </div>

                {/* Features Section */}
                {service.features && service.features.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 border border-blue-100">
                    <div className="flex items-center mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full mr-4"></div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        What's Included
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                          style={{
                            animationDelay: `${index * 50}ms`,
                            animation: 'fade-in 0.5s ease-out forwards'
                          }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <svg
                              className="w-4 h-4 text-green-600"
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
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Pricing Card */}
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 border-2 border-blue-100 hover:shadow-xl transition-shadow duration-300">
                  {service.pricing?.startingPrice ? (
                    <>
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-semibold mb-4">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Starting Price
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                            ${service.pricing.startingPrice}
                          </span>
                          <span className="text-gray-500 ml-2 text-lg">/month</span>
                        </div>
                        {service.pricing.pricingNote && (
                          <p className="text-sm text-gray-600 mt-2">
                            {service.pricing.pricingNote}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full text-blue-600 text-sm font-semibold mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Custom Solution
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        Tailored Pricing
                      </p>
                      <p className="text-gray-600">
                        Get a personalized quote based on your needs
                      </p>
                    </div>
                  )}

                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300 mb-4"
                  >
                    Get a Quote
                  </Link>

                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-300"
                  >
                    Schedule Consultation
                  </Link>
                </div>

                {/* Contact Card */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-bold text-xl mb-4 flex items-center text-gray-900">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Have Questions?
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href="mailto:info@flexagency.com"
                        className="hover:text-blue-600 transition-colors"
                      >
                        info@flexagency.com
                      </a>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a href="tel:+94771234567" className="hover:text-blue-600 transition-colors">
                        +94 77 123 4567
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let's create a customized {service.title.toLowerCase()} strategy
                for your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 shadow-xl"
                >
                  Contact Us Today
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transform transition-all duration-200 hover:scale-105"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
