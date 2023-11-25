export const images = {
  aliwechatLogo: "aliwechat_logo.png",
  offlineLogo: "offline_logo.jpeg",
  visamasteraeLogo: "visamasterae_logo.jpg",
  loading: "loading.gif",
}

Object.keys(images).forEach((key) => {
  images[key as keyof typeof images] = new URL(
    `./images/${images[key as keyof typeof images]}`,
    import.meta.url,
  ).href
})
