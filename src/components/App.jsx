import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageInfo } from './ImageInfo/ImageInfo';
import { fetchImages } from 'Services/FetchImages';
import { LoadMore } from 'components/LoadMore/LoadMore';
import { ThreeDots } from 'react-loader-spinner';
import Css from './ImageList/Card.module.css';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalImages, setTotalImages] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setStatus('pending');

    try {
      const fetch = fetchImages(searchQuery, page);
      fetch.then(response => {
        if (response.hits.length > 0) {
          setTotalImages(response.totalHits);
          setStatus('resolved');
          // eslint-disable-next-line array-callback-return
          response.hits.map(image => {
            setImages(prevImages => prevImages.concat(image));
          });
        }
        setError('No found images');
        setStatus('rejected');
      });
    } catch (error) {
      setError(error);
    }
  }, [page, searchQuery]);

  function formSubmit(query) {
    if (query === searchQuery) {
      alert('Enter another query');
    }
    setSearchQuery(query.toLowerCase());
    setImages([]);
    setTotalImages(null);
    setPage(1);
    setError(null);
  }
  const totalPages = Math.ceil(totalImages / 12);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <div>
        <Searchbar onSubmit={formSubmit} />
      </div>
      {images.length > 0 && (
        <div>
          <ImageInfo imageList={images} />
        </div>
      )}

      <div className={Css.gallery}>
        <div>
          {totalPages > 1 && page !== totalPages && (
            <LoadMore onClick={loadMore} />
          )}
        </div>
        <div className={Css.spinnerStyle}>
          {status === 'pending' && <ThreeDots />}
        </div>
      </div>
    </>
  );
}
