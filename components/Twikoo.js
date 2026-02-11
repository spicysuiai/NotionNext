import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'

const Twikoo = ({ isDarkMode }) => {
  // ✅ 这里现在是 Twikoo 后端 URL
  const envId = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const el = siteConfig('COMMENT_TWIKOO_ELEMENT_ID', '#twikoo')
  const twikooCDNURL =
    siteConfig('COMMENT_TWIKOO_CDN_URL') ||
    'https://s4.zstatic.net/npm/twikoo@1.6.44/dist/twikoo.min.js'
  const lang = siteConfig('LANG')

  const initedRef = useRef(false)
  const loadingRef = useRef(false)

  async function initOnce() {
    if (initedRef.current || loadingRef.current) return
    loadingRef.current = true
    try {
      if (!envId) throw new Error('COMMENT_TWIKOO_ENV_ID is empty')
      if (!/^https?:\/\//.test(envId)) {
        throw new Error(`Vercel mode needs a URL like https://xxx.vercel.app . Current: ${envId}`)
      }

      await loadExternalResource(twikooCDNURL, 'js')

      const twikoo = window?.twikoo
      if (!twikoo || typeof twikoo.init !== 'function') {
        throw new Error('twikoo is not loaded or twikoo.init is not a function')
      }

      twikoo.init({
        envId,
        el,
        lang,
        path: location.pathname
      })

      initedRef.current = true
    } catch (e) {
      console.error('[twikoo] init failed:', e)
      initedRef.current = false
    } finally {
      loadingRef.current = false
    }
  }

  useEffect(() => {
    initOnce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [isDarkMode])

  return <div id="twikoo"></div>
}

export default Twikoo
