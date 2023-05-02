
import PropTypes from 'prop-types';

import { ImageList } from 'components/ImageList/ImageList';

import Css from '../ImageList/Card.module.css';

export function ImageInfo({ imageList }) {
  return (
    <div>
      <ul className={Css.gallery}>
        {imageList.map(image => {
          console.log(image.id)
          return (
            <ImageList
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
            />
          );
        })}
      </ul>
    </div>
  );
}

ImageInfo.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
