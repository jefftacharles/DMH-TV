import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const executives = await db.executiveMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })
    
    return NextResponse.json(executives)
  } catch (error) {
    console.error('Error fetching executives:', error)
    return NextResponse.json(
      { error: 'Failed to fetch executives' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, position, bio, email, phone, order = 0 } = data
    
    // First create or find the user
    let user = await db.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      user = await db.user.create({
        data: {
          email,
          name,
          role: 'executive'
        }
      })
    }
    
    const executive = await db.executiveMember.create({
      data: {
        userId: user.id,
        name,
        position,
        bio,
        email,
        phone,
        order
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })
    
    return NextResponse.json(executive, { status: 201 })
  } catch (error) {
    console.error('Error creating executive:', error)
    return NextResponse.json(
      { error: 'Failed to create executive' },
      { status: 500 }
    )
  }
}