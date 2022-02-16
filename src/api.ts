export async function fetchImages(breed: string) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random/12`
  )
  const data = await response.json()
  return data.message
}
