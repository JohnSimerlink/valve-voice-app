export function getRandomUrl(urlList) {
    const randomIndex = Math.floor(urlList.length * Math.random())
    return urlList[randomIndex]

}