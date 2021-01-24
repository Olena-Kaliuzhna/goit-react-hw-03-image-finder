import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./Searchbar/Searchbar";
import imageApi from "../services/ImageApi";
import ImageGalerry from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import LoaderSpin from "./Loader/Loader";
import Modal from "./Modal/Modal";
import s from "./App.module.css";

class App extends Component {
  state = {
    query: null,
    images: [],
    page: 1,
    isLoading: false,
    openModal: false,
    modalImage: null,
    alt: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImg();
    }
  }

  onSearch = (query) => {
    this.setState({ query, images: [], page: 1, error: null });
  };

  fetchImg = async () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    imageApi
      .fetchImages(query, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return this.setState({
            error: `Не удалось найти картинку по запросу ${query}`,
          });
        }
        this.setState(({ images, page }) => ({
          images: [...images, ...hits],
          page: page,
        }));
      })
      .catch((error) => this.setState({ error: "Побробуйте снова" }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
    this.scrolling();
  };

  scrolling = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 150,
        behavior: "smooth",
      });
    }, 1000);
  };

  onOpenModal = (e) => {
    e.preventDefault();
    this.setState({
      openModal: true,
      modalImage: e.target.dataset.largeimg,
      alt: e.target.alt,
    });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { images, isLoading, openModal, modalImage, alt, error } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSearch} />
        {isLoading && <LoaderSpin />}
        {images.length > 0 && !error && (
          <>
            <ImageGalerry openModal={this.onOpenModal} images={images} />
            <Button fetchImages={this.onLoadMore} />
          </>
        )}

        {openModal && (
          <Modal onClose={this.closeModal} src={modalImage} alt={alt}></Modal>
        )}
        {error && <p className={s.error}>{error}</p>}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
export default App;
