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

  const cloudbaseCandidates = [
    'https://static.cloudbase.net/cloudbase-js-sdk/latest/cloudbase.full.js',
    '/cloudbase.full.js',
    'https://unpkg.com/@cloudbase/js-sdk@2.11.0/dist/cloudbase.full.js'
  ]

  async function loadCloudbase() {
    if (window.cloudbase) return
    let lastErr
    for (const url of cloudbaseCandidates) {
      try {
        console.log('[twikoo] loading cloudbase:', url)
        await loadExternalResource(url, 'js')
        console.log('[twikoo] cloudbase loaded, typeof window.cloudbase =', typeof window.cloudbase)
        if (window.cloudbase) return
      } catch (e) {
        console.warn('[twikoo] cloudbase load failed:', url, e)
        lastErr = e
      }
    }
    throw lastErr || new Error('cloudbase sdk load failed')
  }

  /**
   * ✅ 核心：hook cloudbase.init，让 Twikoo 创建的实例也被打补丁
   */
  function hookCloudbaseInitForTwikoo() {
    const cb = window.cloudbase
    if (!cb?.init || cb.__twikooInitHooked) return

    const originalInit = cb.init.bind(cb)

    cb.init = function patchedInit(options) {
      const app = originalInit(options)

      // 只 patch 一次 auth()，避免重复包裹
      if (app && typeof app.auth === 'function' && !app.__twikooAuthPatched) {
        const originalAuth = app.auth.bind(app)

        app.auth = function patchedAuth(...args) {
          const auth = originalAuth(...args)

          try {
            const hasAnonymousAuthProvider = typeof auth?.anonymousAuthProvider === 'function'
            const hasSignInAnonymously = typeof auth?.signInAnonymously === 'function'

            if (!hasAnonymousAuthProvider && hasSignInAnonymously) {
              auth.anonymousAuthProvider = () => ({
                signIn: () => auth.signInAnonymously()
              })
              console.log('[twikoo] patched anonymousAuthProvider on twikoo auth instance')
            }
          } catch (e) {
            console.warn('[twikoo] patch auth instance failed:', e)
          }

          return auth
        }

        app.__twikooAuthPatched = true
      }

      return app
    }

    cb.__twikooInitHooked = true
    console.log('[twikoo] cloudbase.init hooked for twikoo')
  }

  async function loadTwikooOnce() {
    if (initedRef.current || loadingRef.current) return
    loadingRef.current = true

    try {
      console.log('[twikoo] envId from siteConfig:', envId)
      if (!envId) throw new Error('COMMENT_TWIKOO_ENV_ID is empty')
      if (!twikooCDNURL) throw new Error('COMMENT_TWIKOO_CDN_URL is empty')

      // 1) load cloudbase
      await loadCloudbase()

      // 2) hook init BEFORE loading twikoo
      hookCloudbaseInitForTwikoo()

      // 3) load twikoo
      console.log('[twikoo] loading twikoo:', twikooCDNURL)
      await loadExternalResource(twikooCDNURL, 'js')

      const twikoo = window?.twikoo
      if (!twikoo || typeof twikoo.init !== 'function') {
        throw new Error('twikoo is not loaded or twikoo.init is not a function')
      }

      // 4) init
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
    loadTwikooOnce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // 不重 init，避免重复加载
  }, [isDarkMode])

  return <div id="twikoo"></div>
}

export default Twikoo
