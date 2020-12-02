import { unsplash } from '../api'
import { toJson } from 'unsplash-js'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry from 'react-masonry-css'
import  { useEffect } from 'react'
import Photo from './Photo'

let Photos = ({ photos, dispatch }) => {

  const fetchImg = () => {
    unsplash.photos.getRandomPhoto({count: 20}).then(toJson).then(json => {
      dispatch({
        type: 'LOAD_PHOTO',
        photo: json
      })
    });
  }
  
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  useEffect(() => {
    if (photos.length === 0) {
      fetchImg()
    }
  }, [])
  
  return (
    
      <main>
        <article>
          <InfiniteScroll
            dataLength={photos}
            next={() => {fetchImg()}}
            hasMore={true}
            className='container'
          >
          <Masonry 
            className="photo-list"
            columnClassName="photo-list__item"
            breakpointCols={breakpointColumnsObj}
          >
            {photos.map(item => (
              <Photo props={item} />
            ))}
          </Masonry>
          </InfiniteScroll>
        </article>
      </main>    
  )
}

const mapStateToProps = (state) => {
  return {
    photos: state.reducer.images
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default Photos = connect(mapStateToProps, mapDispatchToProps)(Photos)