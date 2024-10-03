'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Twitter } from 'lucide-react'

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <footer style={{
      position: 'relative',
      width: '100%',
      padding: '0.75rem 0', // Reduced padding
      overflow: 'hidden',
      background: 'linear-gradient(to right, #8B5CF6, #EC4899, #EF4444)'
    }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.4" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '15px 15px', // Reduced background pattern size
        }}
        animate={{
          backgroundPosition: [
            `${mousePosition.x / 5}px ${mousePosition.y / 5}px`,
            `${mousePosition.x / 10}px ${mousePosition.y / 10}px`,
          ],
        }}
        transition={{ type: 'spring', damping: 10, stiffness: 50 }}
      />
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{
          color: 'white',
          fontSize: '0.875rem', // Reduced font size
          fontWeight: 600,
        }}>
          by KEISH using tesseract.js
        </p>
        <a
          href="https://x.com/bourhan_ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: '0.5rem',
            color: 'white',
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#BFDBFE'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          <Twitter size={20} /> {/* Reduced icon size */}
        </a>
      </div>
    </footer>
  )
}

export default Footer
