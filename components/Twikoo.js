import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'

/**
 * Twikoo (Route 1)
 * - CloudBase v1 style SDK: cloudbase.full.js (app.auth() + signInAnonymously)
 * - Twikoo client pinned to older version (no anonymousAuthProvider dependency)
 */
const Twikoo = ({ isDarkMode }) => {
  const envId = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const el = siteConfig('COMMENT_TWIKOO_ELEMENT_ID', '#twikoo')
  const twikooCDNURL =
    siteConfig('COMMENT_TWIKOO_CDN_URL') ||
    'https://s4.zstatic.net/npm/twikoo@1.5.11/dist/twikoo.min.js'
  const lang = siteConfig('LANG')

  const initedRef = useRef(false)
  const loadingRef = useRef(false)

  // ✅ 只用 v1 形态的 cloudbase.full.js（不要再引入 cloudbase.js/auth/functions 模块）
  const cloudbaseCandidates = [
    '/cloudbase.full.js',
    // 你也可以加一个兜底（可选）：自己确认能访问再放
    // 'https://static.cloudbase.net/cloudbase-js-sdk/latest/cloudbase.full.js',
  ]

  async function loadCloudbaseV1() {
    if (window.cloudbase) return
    let lastErr

    for (const url of cloudbaseCandidates) {
      try {
        console.log('[twikoo] loading cloudbase v1:', url)
        await loadExternalResource(url, 'js')
        console.log('[twikoo] cloudbase loaded:', typeof window.cloudbase)
        if (window.cloudbase) return
      } catch (e) {
        console.warn('[twikoo] cloudbase load failed:', url, e)
        lastErr = e
      }
    }
    throw lastErr || new Error('cloudbase sdk load failed')
  }

  async function initOnce() {
    if (initedRef.current || loadingRef.current) return
    loadingRef.current = true

    try {
      console.log('[twikoo] envId:', envId)
      if (!envId) throw new Error('COMMENT_TWIKOO_ENV_ID is empty')

      // 1) load cloudbase (v1)
      await loadCloudbaseV1()

      // v1 shape check (optional log)
      try {
        const app = window.cloudbase.init({ env: envId })
        const auth = app.auth?.()
        console.log('[twikoo] cloudbase v1 shape:', {
          hasInit: typeof window.cloudbase.init,
          authIsFunction: typeof app.auth,
          hasSignInAnonymously: typeof auth?.signInAnonymously
        })
      } catch (e) {
        console.warn('[twikoo] cloudbase v1 shape check failed:', e)
      }

      // 2) load twikoo
      console.log('[twikoo] loading twikoo:', twikooCDNURL)
      await loadExternalResource(twikooCDNURL, 'js')

      const twikoo = window?.twikoo
      if (!twikoo || typeof twikoo.init !== 'function') {
        throw new Error('twikoo is not loaded or twikoo.init is not a function')
      }

      // 3) init twikoo
      twikoo.init({
        envId,
        el,
        lang,
        // requiredFields: ['nick'], // 如果该版本支持，可打开；否则走 CSS 隐藏
      })

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

  // 不要因为暗黑模式反复 init（避免重复加载脚本/重复组件注册）
  useEffect(() => {}, [isDarkMode])

  return <div id="twikoo"></div>
}

export default Twikoo
