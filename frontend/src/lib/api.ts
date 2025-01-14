import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface HealthResponse {
  status: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000' 
  }),
  endpoints: (builder) => ({
    getHealth: builder.query<HealthResponse, void>({
      query: () => 'health',
    }),
  }),
})

export const { useGetHealthQuery } = api 