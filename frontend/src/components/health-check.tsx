'use client'

import { useGetHealthQuery } from '@/lib/api'
import { Card } from './common/Card'
import { Loading } from './common/Loading'

export function HealthCheck() {
  const { data, error, isLoading } = useGetHealthQuery()

  if (isLoading) return <Loading />
  
  if (error) {
    return (
      <Card className="bg-red-100 text-red-800">
        Error: Unable to connect to backend
      </Card>
    )
  }
  
  return (
    <Card className="bg-green-100 text-green-800">
      Backend Status: {data?.status}
    </Card>
  )
} 