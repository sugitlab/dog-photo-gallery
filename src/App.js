import { useState, useEffect } from 'react'
import { fetchImages } from './api'
import './App.css'

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault()
    const { breed } = event.target.elements
    props.onFormSubmit(breed.value)
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <select name="breed" defaultValue="shiba" className="select">
        <option value="shiba">Shiba</option>
        <option value="akita">Akita</option>
      </select>
      <button type="submit" className="button">
        Reload
      </button>
    </form>
  )
}

function Header() {
  return (
    <header className="header">
      <h1 className="title">Cute Dog Image</h1>
    </header>
  )
}

function Image(props) {
  return (
    <figure className="image">
      <img src={props.src} alt="cute dog" />
    </figure>
  )
}

function Loading() {
  return <div> Loading ... </div>
}

function Gallery(props) {
  const { urls } = props
  if (urls == null) {
    return <Loading />
  }
  return (
    <div className="gallery">
      {urls.map((url) => {
        return (
          <div key={url}>
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

  function reloadImages(breed) {
    fetchImages(breed).then((res) => {
      setUrls(res)
    })
  }

  return (
    <main className="main">
      <section>
        <Form onFormSubmit={reloadImages} />
      </section>
      <section>
        <Gallery urls={urls} />
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>Dog imagse are retrieved from Dog API</p>
      <p>
        <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
      </p>
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
