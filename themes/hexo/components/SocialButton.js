import QrCode from '@/components/QrCode'
import { siteConfig } from '@/lib/config'
import { useRef, useState } from 'react'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'

/**
 * 社交联系方式按钮组
 * @returns {JSX.Element}
 * @constructor
 */
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

  // 你原来的“公众号二维码”（key 仍是 CONTACT_WEHCHAT_PUBLIC）
  const CONTACT_WEHCHAT_PUBLIC = siteConfig('CONTACT_WEHCHAT_PUBLIC')

  // ✅ 新增：QQ/微信二维码 + Steam/WeGame/洛谷
  const CONTACT_QQ_QR = siteConfig('CONTACT_QQ_QR')
  const CONTACT_WECHAT_QR = siteConfig('CONTACT_WECHAT_QR')
  const CONTACT_STEAM = siteConfig('CONTACT_STEAM')
  const CONTACT_WEGAME = siteConfig('CONTACT_WEGAME')
  const CONTACT_LUOGU = siteConfig('CONTACT_LUOGU')

  // 原来的公众号弹层控制
  const [qrCodeShow, setQrCodeShow] = useState(false)

  // ✅ 新增：QQ/微信弹层控制
  const [qqQrShow, setQqQrShow] = useState(false)
  const [wechatQrShow, setWechatQrShow] = useState(false)

  const openPopover = () => setQrCodeShow(true)
  const closePopover = () => setQrCodeShow(false)

  const emailIcon = useRef(null)

  const popBase =
    ' z-40 absolute bottom-10 -left-10 bg-white shadow-xl transition-all duration-200 text-center'

  return (
    <div className='w-full justify-center flex-wrap flex'>
      <div className='space-x-3 text-xl flex items-center text-gray-600 dark:text-gray-300 '>
        {CONTACT_GITHUB && (
          <a target='_blank' rel='noreferrer' title={'github'} href={CONTACT_GITHUB}>
            <i className='transform hover:scale-125 duration-150 fab fa-github dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_TWITTER && (
          <a target='_blank' rel='noreferrer' title={'twitter'} href={CONTACT_TWITTER}>
            <i className='transform hover:scale-125 duration-150 fab fa-twitter dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_TELEGRAM && (
          <a target='_blank' rel='noreferrer' href={CONTACT_TELEGRAM} title={'telegram'}>
            <i className='transform hover:scale-125 duration-150 fab fa-telegram dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_LINKEDIN && (
          <a target='_blank' rel='noreferrer' href={CONTACT_LINKEDIN} title={'linkIn'}>
            <i className='transform hover:scale-125 duration-150 fab fa-linkedin dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_WEIBO && (
          <a target='_blank' rel='noreferrer' title={'weibo'} href={CONTACT_WEIBO}>
            <i className='transform hover:scale-125 duration-150 fab fa-weibo dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_INSTAGRAM && (
          <a target='_blank' rel='noreferrer' title={'instagram'} href={CONTACT_INSTAGRAM}>
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
          <a target='_blank' rel='noreferrer' title={'RSS'} href={'/rss/feed.xml'}>
            <i className='transform hover:scale-125 duration-150 fas fa-rss dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_BILIBILI && (
          <a target='_blank' rel='noreferrer' title={'bilibili'} href={CONTACT_BILIBILI}>
            <i className='transform hover:scale-125 duration-150 dark:hover:text-indigo-400 hover:text-indigo-600 fab fa-bilibili' />
          </a>
        )}

        {CONTACT_YOUTUBE && (
          <a target='_blank' rel='noreferrer' title={'youtube'} href={CONTACT_YOUTUBE}>
            <i className='transform hover:scale-125 duration-150 fab fa-youtube dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {CONTACT_XIAOHONGSHU && (
          <a target='_blank' rel='noreferrer' title={'小红书'} href={CONTACT_XIAOHONGSHU}>
            <img
              className='transform hover:scale-125 duration-150 w-6'
              src='/svg/xiaohongshu.svg'
              alt='小红书'
            />
          </a>
        )}

        {CONTACT_ZHISHIXINGQIU && (
          <a target='_blank' rel='noreferrer' title={'知识星球'} href={CONTACT_ZHISHIXINGQIU}>
            <img
              className='transform hover:scale-125 duration-150 w-6'
              src='/svg/zhishixingqiu.svg'
              alt='知识星球'
            />
          </a>
        )}

        {/* ✅ QQ：悬停显示二维码（扫后打开链接） */}
        {CONTACT_QQ_QR && (
          <button
            onMouseEnter={() => setQqQrShow(true)}
            onMouseLeave={() => setQqQrShow(false)}
            aria-label={'QQ'}>
            <div id='qq-button'>
              <i className='transform hover:scale-125 duration-150 fab fa-qq dark:hover:text-indigo-400 hover:text-indigo-600' />
            </div>

            <div className='absolute'>
              <div className={(qqQrShow ? 'opacity-100 ' : ' invisible opacity-0') + popBase}>
                <div className='p-2 mt-1 w-28 h-28'>
                  {qqQrShow && <QrCode value={CONTACT_QQ_QR} />}
                </div>
              </div>
            </div>
          </button>
        )}

        {/* ✅ 微信：悬停显示二维码（扫后打开链接） */}
        {CONTACT_WECHAT_QR && (
          <button
            onMouseEnter={() => setWechatQrShow(true)}
            onMouseLeave={() => setWechatQrShow(false)}
            aria-label={'WeChat'}>
            <div id='wechat-qr-button'>
              <i className='transform hover:scale-125 duration-150 fab fa-weixin dark:hover:text-indigo-400 hover:text-indigo-600' />
            </div>

            <div className='absolute'>
              <div className={(wechatQrShow ? 'opacity-100 ' : ' invisible opacity-0') + popBase}>
                <div className='p-2 mt-1 w-28 h-28'>
                  {wechatQrShow && <QrCode value={CONTACT_WECHAT_QR} />}
                </div>
              </div>
            </div>
          </button>
        )}

        {/* ✅ Steam */}
        {CONTACT_STEAM && (
          <a target='_blank' rel='noreferrer' title={'Steam'} href={CONTACT_STEAM}>
            <i className='transform hover:scale-125 duration-150 fab fa-steam dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {/* ✅ WeGame（SVG 文件） */}
        {CONTACT_WEGAME && (
          <a target='_blank' rel='noreferrer' title={'WeGame'} href={CONTACT_WEGAME}>
            <img
              className='transform hover:scale-125 duration-150 w-6 dark:invert'
              src='/svg/wegame.svg'
              alt='WeGame'
            />
          </a>
        )}

        {/* ✅ 洛谷（SVG 文件） */}
        {CONTACT_LUOGU && (
          <a target='_blank' rel='noreferrer' title={'Luogu'} href={CONTACT_LUOGU}>
            <img
              className='transform hover:scale-125 duration-150 w-6 dark:invert'
              src='/svg/luogu.svg'
              alt='Luogu'
            />
          </a>
        )}

        {/* 你原来的公众号二维码保持不动 */}
        {CONTACT_WEHCHAT_PUBLIC && (
          <button
            onMouseEnter={openPopover}
            onMouseLeave={closePopover}
            aria-label={'微信公众号'}>
            <div id='wechat-button'>
              <i className='transform scale-105 hover:scale-125 duration-150 fab fa-weixin  dark:hover:text-indigo-400 hover:text-indigo-600' />
            </div>

            <div className='absolute'>
              <div
                id='pop'
                className={
                  (qrCodeShow ? 'opacity-100 ' : ' invisible opacity-0') +
                  ' z-40 absolute bottom-10 -left-10 bg-white shadow-xl transition-all duration-200 text-center'
                }>
                <div className='p-2 mt-1 w-28 h-28'>
                  {qrCodeShow && <QrCode value={CONTACT_WEHCHAT_PUBLIC} />}
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default SocialButton
