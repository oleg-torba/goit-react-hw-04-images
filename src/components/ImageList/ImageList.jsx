import CardCss from './Card.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export function ImageList({ id, webformatURL, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={CardCss.cardItem}>
      <li className={CardCss.cardList} key={id} onClick={toggleModal}>
        <img src={webformatURL} alt="" width="280" height="240" />
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" width="600 " height="450" />
        </Modal>
      )}
    </div>
  );
}

ImageList.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
