import { Component } from "react";
import { createPortal } from "react-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  state = {
    loading: false,
  };
  toggleLoadind() {
    this.setState((prevState) => {
      return { loading: !prevState.loading };
    });
  }
  componentDidMount() {
    this.setState({ loading: true });
    window.addEventListener("keydown", this.handleOnClose);
  }

  componentWillUnmount() {
    window.addEventListener("keydown", this.handleOnClose);
  }

  handleOnClose = (e) => {
    if (e.code !== "Escape") {
      return;
    }

    this.props.onClose();
  };
  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  handleImageLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div onClick={this.handleBackdropClick} className={s.overlay}>
        <div className={s.modal} onLoad={this.handleImageLoaded}>
          <img className={s.modalImg} src={src} alt={alt}></img>
        </div>
        {this.state.loading && (
          <Loader type="BallTriangle" color="#3f51b5" height={350} />
        )}
      </div>,
      modalRoot
    );
  }
}
