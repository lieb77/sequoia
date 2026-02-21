'use client'

import { useState } from 'react'
import { AiOutlineLink, AiOutlineCheck } from 'react-icons/ai'
import styles from '../_styles/blog.module.css'


export function PermalinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault() // Stop navigation if you just want to copy
    
    // Construct full URL
    const fullUrl = `${window.location.origin}${url}`
    
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)

    // Hide the "toast" after 2 seconds
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <button 
        onClick={handleCopy}
        className={`u-url ${styles.permalink}`}
      >
        {copied ? <AiOutlineCheck className={styles.permalinkText}/> : <AiOutlineLink />}
        <span>{copied ? 'Link Copied!' : 'Permalink'}</span>
      </button>

      {/* The Toast Notification */}
      {copied && (
        <div className={styles.toast}>
          Copied to clipboard! 🚀
        </div>
      )}
    </div>
  )
}
