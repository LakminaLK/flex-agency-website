// lib/sanity.client.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Query functions
export async function getProjects() {
  return client.fetch(
    `*[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      client,
      description,
      mainImage,
      category,
      completedDate,
      tools[] {
        name,
        icon
      },
      websiteUrl,
      featured
    }`
  );
}

export async function getFeaturedProjects() {
  return client.fetch(
    `*[_type == "project" && featured == true] | order(_createdAt desc) [0...3] {
      _id,
      title,
      slug,
      client,
      description,
      mainImage,
      category
    }`
  );
}

export async function getServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      _id,
      title,
      slug,
      shortDescription,
      fullDescription,
      icon,
      features,
      pricing,
      order
    }`
  );
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      client,
      description,
      mainImage,
      gallery,
      category,
      completedDate,
      tools[] {
        name,
        icon
      },
      websiteUrl
    }`,
    { slug }
  );
}

export async function getServiceBySlug(slug: string) {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      shortDescription,
      fullDescription,
      icon,
      features,
      pricing
    }`,
    { slug }
  );
}