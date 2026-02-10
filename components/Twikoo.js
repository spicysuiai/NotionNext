import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'

const Twikoo = ({ isDarkMode }) => {
  const envId = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const el = siteConfig('COMMENT_TWIKOO_ELEMENT_ID', '#twikoo')
  const twikooCDNURL = siteConfig('COMMENT_TWIKOO_CDN_URL')
  const lang = siteConfig('LANG')

  const initedRef = useRef(false)
  const loadingRef = useRef(false)

  // ✅ CloudBase JS SDK (V2) - module CDN (recommended by official docs)
  const cloudbaseModuleScripts = [
    'https://static.cloudbase.net/cloudbase-js-sdk/latest/cloudbase.js',          // core
    'https://static.cloudbase.net/cloudbase-js-sdk/latest/cloudbase.auth.js',     // auth module
    'https://static.cloudbase.net/cloudbase-js-sdk/latest/cloudbase.functions.js' // functions module (twikoo needs)
  ]

  async function loadCloudbaseV2Modules() {
    // core
    if (!window.cloudbase) {
      console.log('[twikoo] loading cloudbase core:', cloudbaseModuleScripts[0])
      await loadExternalResource(cloudbaseModuleScripts[0], 'js')
    }

    // modules
    console.log('[twikoo] loading cloudbase modules:', cloudbaseModuleScripts.slice(1))
    await loadExternalResource(cloudbaseModuleScripts[1], 'js')
    await loadExternalResource(cloudbaseModuleScripts[2], 'js')

    // register modules (important!)
    if (typeof window.registerAuth === 'function') window.registerAuth(window.cloudbase)
    if (typeof window.registerFunctions === 'function') window.registerFunctions(window.cloudbase)

    // quick shape check: v2 expects app.auth to be an object (NOT app.auth())
    try {
      const app = window.cloudbase.init({ env: envId })
      console.log('[twikoo] v2 shape check:', {
        authType: typeof app.auth, // should be "object"
        hasAnonymousAuthProvider: typeof app?.auth?.anonymousAuthProvider // should be "function"
      })
    } catch (e) {
      console.warn('[twikoo] cloudbase init failed:', e)
    }
  }

  async function initOnce() {
    if (initedRef.current || loadingRef.current) return
    loadingRef.current = true

    try {
      console.log('[twikoo] envId:', envId)
      if (!envId) throw new Error('COMMENT_TWIKOO_ENV_ID is empty')
      if (!twikooCDNURL) throw new Error('COMMENT_TWIKOO_CDN_URL is empty')

      // 1) load cloudbase v2 modules
      await loadCloudbaseV2Modules()

      // 2) load twikoo
      console.log('[twikoo] loading twikoo:', twikooCDNURL)
      await loadExternalResource(twikooCDNURL, 'js')

      const twikoo = window?.twikoo
      if (!twikoo || typeof twikoo.init !== 'function') {
        throw new Error('twikoo is not loaded or twikoo.init is not a function')
      }

      // 3) init
      twikoo.init({ envId, el, lang })
      console.log('[twikoo] init success')
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

  useEffect(() => {
    // 不要因为暗黑模式反复 init
  }, [isDarkMode])

  return <div id="twikoo"></div>
}

export default Twikoo
