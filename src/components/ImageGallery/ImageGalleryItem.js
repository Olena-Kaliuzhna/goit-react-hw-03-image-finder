import React from "react";
import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";

function ImageGalleryItem({ tags, src, dataLargeImg, openModal }) {
  return (
    <li className={s.ImageGalleryItem} onClick={openModal}>
      <img
        src={src}
        alt={tags}
        data-largeimg={dataLargeImg}
        className={s.GalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  dataLargeImg: PropTypes.string.isRequired,
  openModal: PropTypes.func,
};

export default ImageGalleryItem;
