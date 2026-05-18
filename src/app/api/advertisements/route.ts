import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const advertisements = await db.advertisement.findMany({
      where: { 
        isActive: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(advertisements)
  } catch (error) {
    console.error('Error fetching advertisements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch advertisements' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { 
      title, 
      description, 
      type, 
      imageUrl, 
      targetUrl, 
      startDate, 
      endDate, 
      companyName, 
      contactEmail 
    } = data
    
    const advertisement = await db.advertisement.create({
      data: {
        title,
        description,
        type,
        imageUrl,
        targetUrl,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        companyName,
        contactEmail
      }
    })
    
    return NextResponse.json(advertisement, { status: 201 })
  } catch (error) {
    console.error('Error creating advertisement:', error)
    return NextResponse.json(
      { error: 'Failed to create advertisement' },
      { status: 500 }
    )
  }
}