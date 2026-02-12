import { siteConfig } from '@/lib/config'
import { useRef, useState } from 'react'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'

const SocialButton = () => {
  const CONTACT_GITHUB = siteConfig('CONTACT_GITHUB')
  const CONTACT_TWITTER = siteConfig('CONTACT_TWITTER')
  const CONTACT_TELEGRAM = siteConfig('CONTACT_TELEGRAM')
  const CONTACT_LINKEDIN = siteConfig('CONTACT_LINKEDIN')
  const CONTACT_WEIBO = siteConfig('CONTACT_WEIBO')
  const CONTACT_INSTAGRAM = siteConfig('CONTACT_INSTAGRAM')
  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
  const ENABLE_RSS = siteConfig('ENABLE_RSS')
  const CONTACT_BILIBILI = siteConfig('CONTACT_BILIBILI')
  const CONTACT_YOUTUBE = siteConfig('CONTACT_YOUTUBE')
  const CONTACT_XIAOHONGSHU = siteConfig('CONTACT_XIAOHONGSHU')
  const CONTACT_ZHISHIXINGQIU = siteConfig('CONTACT_ZHISHIXINGQIU')

  // QQ：仅作为显示开关（二维码是图片弹窗）
  const CONTACT_QQ = siteConfig('CONTACT_QQ')

  // 跳转链接
  const CONTACT_STEAM = siteConfig('CONTACT_STEAM')
  const CONTACT_WEGAME = siteConfig('CONTACT_WEGAME')
  const CONTACT_LUOGU = siteConfig('CONTACT_LUOGU')

  // 弹窗控制
  const [qqAddShow, setQqAddShow] = useState(false)
  const [wechatAddShow, setWechatAddShow] = useState(false)

  const emailIcon = useRef(null)

  return (
    <div className='w-full justify-center flex-wrap flex'>
      {/* 图标按钮区 */}
      <div className='space-x-3 text-xl flex items-center text-gray-600 dark:text-gray-300'>
        {CONTACT_GITHUB && (
          <a target='_blank' rel='noreferrer' title='github' href={CONTACT_GITHUB}>
            <i className='transform hover:scale-125 duration-150 fab fa-github dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_TWITTER && (
          <a target='_blank' rel='noreferrer' title='twitter' href={CONTACT_TWITTER}>
            <i className='transform hover:scale-125 duration-150 fab fa-twitter dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_TELEGRAM && (
          <a target='_blank' rel='noreferrer' title='telegram' href={CONTACT_TELEGRAM}>
            <i className='transform hover:scale-125 duration-150 fab fa-telegram dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_LINKEDIN && (
          <a target='_blank' rel='noreferrer' title='linkIn' href={CONTACT_LINKEDIN}>
            <i className='transform hover:scale-125 duration-150 fab fa-linkedin dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_WEIBO && (
          <a target='_blank' rel='noreferrer' title='weibo' href={CONTACT_WEIBO}>
            <i className='transform hover:scale-125 duration-150 fab fa-weibo dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_INSTAGRAM && (
          <a target='_blank' rel='noreferrer' title='instagram' href={CONTACT_INSTAGRAM}>
            <i className='transform hover:scale-125 duration-150 fab fa-instagram dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_EMAIL && (
          <a
            onClick={e => handleEmailClick(e, emailIcon, CONTACT_EMAIL)}
            title='email'
            className='cursor-pointer'
            ref={emailIcon}>
            <i className='transform hover:scale-125 duration-150 fas fa-envelope dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {ENABLE_RSS && (
          <a target='_blank' rel='noreferrer' title='RSS' href='/rss/feed.xml'>
            <i className='transform hover:scale-125 duration-150 fas fa-rss dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_BILIBILI && (
          <a target='_blank' rel='noreferrer' title='bilibili' href={CONTACT_BILIBILI}>
            <i className='transform hover:scale-125 duration-150 fab fa-bilibili dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_YOUTUBE && (
          <a target='_blank' rel='noreferrer' title='youtube' href={CONTACT_YOUTUBE}>
            <i className='transform hover:scale-125 duration-150 fab fa-youtube dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_XIAOHONGSHU && (
          <a target='_blank' rel='noreferrer' title='小红书' href={CONTACT_XIAOHONGSHU}>
            <img className='transform hover:scale-125 duration-150 w-6' src='/svg/xiaohongshu.svg' alt='小红书' />
          </a>
        )}

        {CONTACT_ZHISHIXINGQIU && (
          <a target='_blank' rel='noreferrer' title='知识星球' href={CONTACT_ZHISHIXINGQIU}>
            <img className='transform hover:scale-125 duration-150 w-6' src='/svg/zhishixingqiu.svg' alt='知识星球' />
          </a>
        )}

        {/* QQ：点击弹窗 */}
        {CONTACT_QQ && (
          <button onClick={() => setQqAddShow(true)} aria-label='QQ Add' title='QQ（加好友）'>
            <i className='transform hover:scale-125 duration-150 fab fa-qq dark:hover:text-indigo-400 hover:text-indigo-600' />
          </button>
        )}

        {/* 微信：点击弹窗 */}
        <button onClick={() => setWechatAddShow(true)} aria-label='WeChat Add' title='微信（加好友）'>
          <i className='transform hover:scale-125 duration-150 fab fa-weixin dark:hover:text-indigo-400 hover:text-indigo-600' />
        </button>

        {CONTACT_STEAM && (
          <a target='_blank' rel='noreferrer' title='Steam' href={CONTACT_STEAM}>
            <i className='transform hover:scale-125 duration-150 fab fa-steam dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_WEGAME && (
          <a target='_blank' rel='noreferrer' title='WeGame' href={CONTACT_WEGAME}>
            <img className='transform hover:scale-125 duration-150 w-6 dark:invert' src='/svg/wegame.svg' alt='WeGame' />
          </a>
        )}

        {CONTACT_LUOGU && (
          <a target='_blank' rel='noreferrer' title='Luogu' href={CONTACT_LUOGU}>
            <img className='transform hover:scale-125 duration-150 w-6 dark:invert' src='/svg/luogu.svg' alt='Luogu' />
          </a>
        )}
      </div>

      {/* QQ 弹窗 */}
      {qqAddShow && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={() => setQqAddShow(false)}>
          <div
            className='bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-2xl'
            onClick={e => e.stopPropagation()}>
            <div className='text-center text-sm mb-3 text-gray-700 dark:text-gray-200'>
              请使用 QQ 扫码添加我为好友
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/qq_add.png'
              alt='QQ Add QR'
              className='w-64 max-w-[80vw] h-auto rounded-lg object-contain'
            />


            <button
              className='mt-4 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-sm'
              onClick={() => setQqAddShow(false)}>
              关闭
            </button>
          </div>
        </div>
      )}

      {/* 微信弹窗 */}
      {wechatAddShow && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={() => setWechatAddShow(false)}>
          <div
            className='bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-2xl'
            onClick={e => e.stopPropagation()}>
            <div className='text-center text-sm mb-3 text-gray-700 dark:text-gray-200'>
              请使用微信扫码添加我为好友
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/wechat_add.png'
              alt='WeChat Add QR'
              className='w-64 max-w-[80vw] h-auto rounded-lg object-contain'
            />


            <button
              className='mt-4 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-sm'
              onClick={() => setWechatAddShow(false)}>
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SocialButton
