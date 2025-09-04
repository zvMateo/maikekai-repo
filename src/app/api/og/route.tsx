import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Maikekai Surf Hotel'
    const description = searchParams.get('description') || 'Pura Vida Surf Experience en Costa Rica'
    const site = searchParams.get('site') || 'Maikekai Surf'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0E3244',
            backgroundImage: 'linear-gradient(135deg, #0E3244 0%, #2B96CB 50%, #55ACD8 100%)',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            }}
          />
          
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '60px',
              maxWidth: '1000px',
              zIndex: 1,
            }}
          >
            {/* Logo/Title */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginBottom: '20px',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-2px',
              }}
            >
              {title}
            </div>
            
            {/* Description */}
            <div
              style={{
                fontSize: '32px',
                color: '#E8F4FD',
                marginBottom: '40px',
                lineHeight: '1.4',
                maxWidth: '800px',
              }}
            >
              {description}
            </div>
            
            {/* Site Name */}
            <div
              style={{
                fontSize: '24px',
                color: '#55ACD8',
                fontWeight: '600',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {site}
            </div>
          </div>
          
          {/* Wave Decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(to top, rgba(85, 172, 216, 0.3) 0%, transparent 100%)',
              zIndex: 0,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
