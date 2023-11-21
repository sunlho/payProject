
export const images = {
}

Object.keys(images).forEach((key) => {
  ;(images as Record<string, string>)[key] = new URL(
    `./assets/images/${key}`,
    import.meta.url
  ).href
})
