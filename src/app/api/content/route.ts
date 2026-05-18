import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')
    
    const where: any = {}
    
    if (type) {
      where.type = type
    }
    
    if (featured === 'true') {
      where.isFeatured = true
    }
    
    if (published === 'true') {
      where.isPublished = true
    }
    
    const content = await db.content.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
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
      category, 
      thumbnailUrl, 
      videoUrl, 
      imageUrl, 
      content: contentText, 
      tags, 
      isPublished = false, 
      isFeatured = false,
      authorId 
    } = data
    
    const content = await db.content.create({
      data: {
        title,
        description,
        type,
        category,
        thumbnailUrl,
        videoUrl,
        imageUrl,
        content: contentText,
        tags: tags ? JSON.stringify(tags) : null,
        isPublished,
        isFeatured,
        authorId
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
    
    return NextResponse.json(content, { status: 201 })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    )
  }
}