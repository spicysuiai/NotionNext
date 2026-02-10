import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'

/**
 * Twikoo 评论
 */

const Twikoo = ({ isDarkMode }) => {
  const envId = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const el = siteConfig('COMMENT_TWIKOO_ELEMENT_ID', '#twikoo')
  const twikooCDNURL = siteConfig('COMMENT_TWIKOO_CDN_URL')
  const lang = siteConfig('LANG')

  const initedRef = useRef(false)
  const loadingRef = useRef(false)

  // ✅ CloudBase SDK 加载候选：官方优先 + 本地 + 兜底
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
   * ✅ 方案A：给旧版 SDK 打补丁，让 Twikoo 1.6.44 能调用：
   * auth.anonymousAuthProvider().signIn()
   *
   * 你的 SDK 现在是：signInAnonymously 有，anonymousAuthProvider 没有
   */
  function patchCloudbaseAnonymousAuth(targetEnvId) {
    if (!window.cloudbase?.init) return

    try {
      const app = window.cloudbase.init({ env: targetEnvId })
      const auth = app.auth()

      const hasAnonymousAuthProvider = typeof auth.anonymousAuthProvider === 'function'
      const hasSignInAnonymously = typeof auth.signInAnonymously === 'function'

      console.log('[twikoo] cloudbase auth check:', {
        anonymousAuthProvider: typeof auth.anonymousAuthProvider,
        signInAnonymously: typeof auth.signInAnonymously
      })

      // 仅在缺失 anonymousAuthProvider 且存在 signInAnonymously 时打补丁
      if (!hasAnonymousAuthProvider && hasSignInAnonymously) {
        auth.anonymousAuthProvider = () => ({
          signIn: () => auth.signInAnonymously()
        })
        console.log('[twikoo] patched auth.anonymousAuthProvider() via signInAnonymously()')
      }
    } catch (e) {
      console.warn('[twikoo] patchCloudbaseAnonymousAuth failed:', e)
    }
  }

  async function loadTwikooOnce() {
    // 防重复：避免多次并发加载/初始化
    if (initedRef.current || loadingRef.current) return
    loadingRef.current = true

    try {
      console.log('[twikoo] envId from siteConfig:', envId)
      console.log('[twikoo] config:', {
        COMMENT_TWIKOO_ENV_ID: siteConfig('COMMENT_TWIKOO_ENV_ID'),
        COMMENT_TWIKOO_ELEMENT_ID: siteConfig('COMMENT_TWIKOO_ELEMENT_ID', '#twikoo'),
        COMMENT_TWIKOO_CDN_URL: siteConfig('COMMENT_TWIKOO_CDN_URL')
      })

      if (!envId) throw new Error('COMMENT_TWIKOO_ENV_ID is empty')
      if (!twikooCDNURL) throw new Error('COMMENT_TWIKOO_CDN_URL is empty')

      // 1) 先加载 cloudbase
      await loadCloudbase()

      // 2) 关键：在加载 twikoo 之前打补丁
      patchCloudbaseAnonymousAuth(envId)

      // 3) 再加载 twikoo
      console.log('[twikoo] loading twikoo:', twikooCDNURL)
      await loadExternalResource(twikooCDNURL, 'js')

      const twikoo = window?.twikoo
      if (!twikoo || typeof twikoo.init !== 'function') {
        throw new Error('twikoo is not loaded or twikoo.init is not a function')
      }

      // 4) init
      twikoo.init({
        envId,
        el,
        lang
        // region: 'ap-guangzhou', // 如你环境在广州可打开试试
        // path: location.pathname,
      })

      console.log('[twikoo] init success')
      initedRef.current = true
    } catch (error) {
      console.error('[twikoo] init failed:', error)
      // 失败允许下次重试（例如 CDN 抽风）
      initedRef.current = false
    } finally {
      loadingRef.current = false
    }
  }

  // 只在首次挂载时 init 一次
  useEffect(() => {
    loadTwikooOnce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // isDarkMode 变化一般不需要重 init（如果你想强制刷新 UI 再说）
  useEffect(() => {
    // 这里先留空，避免你现在被反复 init 影响排错
  }, [isDarkMode])

  return <div id="twikoo"></div>
}

export default Twikoo
