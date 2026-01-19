import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disabled for real-time updates
  token: process.env.SANITY_API_TOKEN, // Optional: for authenticated requests
})
