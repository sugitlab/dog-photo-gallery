import React, { useState, useEffect, FormEventHandler } from 'react'
import { fetchImages } from './api'

type FormType = {
  onFormSubmit: (val: string) => void
}
function Form(props: FormType) {
  const [breed, setBreed] = useState<string>("shiba")
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    props.onFormSubmit(breed)
  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(event.target.value)
    setBreed(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="select is-fullwidth">
            <select name="breed" defaultValue="shiba" onChange={(event) => handleChange(event)}>
              <option value="shiba">Shiba</option>
              <option value="akita">Akita</option>
            </select>
          </div>
        </div>
        <div className="control">
          <button type="submit" className="button is-dark">
            Reload
          </button>
        </div>
      </form>
    </div>
  )
}

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Cute Dog Image</h1>
        </div>
      </div>
    </header>
  )
}

type ImageType = {
  src: string
}

function Image(props: ImageType) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog" />
        </figure>
      </div>
    </div>
  )
}

function Loading() {
  return <div> Loading ... </div>
}
type GalleryType = {
  urls: string[] | null
}
function Gallery(props: GalleryType) {
  const { urls } = props
  if (urls == null) {
    return <Loading />
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        )
      })}
    </div>
  )
}

function Main() {
  const [urls, setUrls] = useState(null)

  useEffect(() => {
    fetchImages('shiba').then((res) => {
      setUrls(res)
    })
  }, [])

  function reloadImages(breed: string) {
    fetchImages(breed).then((res) => {
      setUrls(res)
    })
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog imagse are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
