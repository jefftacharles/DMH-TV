import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    
    // Parse features JSON for each service
    const servicesWithParsedFeatures = services.map(service => ({
      ...service,
      features: service.features ? JSON.parse(service.features) : []
    }))
    
    return NextResponse.json(servicesWithParsedFeatures)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { title, description, icon, features, color, order = 0 } = data
    
    const service = await db.service.create({
      data: {
        title,
        description,
        icon,
        features: JSON.stringify(features),
        color,
        order
      }
    })
    
    return NextResponse.json({
      ...service,
      features: JSON.parse(service.features)
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}