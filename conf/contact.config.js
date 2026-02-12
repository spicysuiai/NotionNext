/**
 * 社交按钮相关的配置统一放这
 */
module.exports = {
  // 邮箱（保持你原逻辑）
  CONTACT_EMAIL:
    (process.env.NEXT_PUBLIC_CONTACT_EMAIL &&
      btoa(unescape(encodeURIComponent(process.env.NEXT_PUBLIC_CONTACT_EMAIL)))) ||
    '2473107977@qq.com',

  CONTACT_WEIBO: process.env.NEXT_PUBLIC_CONTACT_WEIBO || '',
  CONTACT_TWITTER: process.env.NEXT_PUBLIC_CONTACT_TWITTER || '',
  CONTACT_GITHUB: process.env.NEXT_PUBLIC_CONTACT_GITHUB || '',
  CONTACT_TELEGRAM: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || '',
  CONTACT_LINKEDIN: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || '',
  CONTACT_INSTAGRAM: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || '',
  CONTACT_BILIBILI: process.env.NEXT_PUBLIC_CONTACT_BILIBILI || '',
  CONTACT_YOUTUBE: process.env.NEXT_PUBLIC_CONTACT_YOUTUBE || '',
  CONTACT_XIAOHONGSHU: process.env.NEXT_PUBLIC_CONTACT_XIAOHONGSHU || '',
  CONTACT_ZHISHIXINGQIU: process.env.NEXT_PUBLIC_CONTACT_ZHISHIXINGQIU || '',

  // ✅ QQ：只作为“是否显示QQ图标”的开关（二维码用图片弹窗，不需要链接）
  CONTACT_QQ: process.env.NEXT_PUBLIC_CONTACT_QQ || '',

  // ✅ Steam / WeGame / 洛谷：跳转链接
  CONTACT_STEAM: process.env.NEXT_PUBLIC_CONTACT_STEAM || '',
  CONTACT_WEGAME: process.env.NEXT_PUBLIC_CONTACT_WEGAME || '',
  CONTACT_LUOGU: process.env.NEXT_PUBLIC_CONTACT_LUOGU || ''
}
