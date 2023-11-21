interface ImgsList {
  [key: string]: string
}

const imgPreloader = (url: string) => {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.src = url
    image.onload = (e) => {
      resolve(true)
    }
    image.onerror = () => {
      reject()
    }
  })
}

export const imagesPreloader = async (
  imgs: ImgsList,
): Promise<{ status: boolean }> => {
  let promiseArr: any[] = []
  Object.keys(imgs).forEach((key) => {
    promiseArr.push(imgPreloader(imgs[key]))
  })
  try {
    await Promise.allSettled(promiseArr)
    return {
      status: true,
    }
  } catch (err) {
    console.log(err)
    return {
      status: false,
    }
  }
}
