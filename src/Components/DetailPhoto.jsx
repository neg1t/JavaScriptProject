import { useState } from 'react'
import { authenticationUrl, unsplash } from '../api'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { dateFormat } from '../functions'
import LikeIcon from './likeIcon'
import CrossIcon from './crossIcon'
import '../css/detail.css'

let Photo = ({
  props,
  closeWindow,
  dispatch
}) => {
  const [like, setLike]     = useState(!props.liked_by_user);
  const [openModal, setOpenModal] = useState(false);

  const autorization = () => {
    window.location.assign(authenticationUrl)
  } 

  const modalCustomStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }
  
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  }
  const likeHandler = () => {
    setLike(!like);
  }

  const likeDispatch = like ? 'LIKE' : 'UNLIKE';

  return (
    <div>
      <div  className='cross-container' >
        <CrossIcon onClick={closeWindow} />
      </div>

      <div className='photo__info-top'>
        <div className='info__user_detail'>
          <img className='user__profile-image' src={props.user.profile_image.small} alt={props.user.username} />
          <a href={props.user.links.html} target='_blank' rel="noreferrer" className="user__name">{props.user.username}</a>
        </div>
        <div className="info__likes">
          <div className="likes__button_detail"
            onClick={() => {
              if (localStorage.getItem('token')) {
                likeHandler();
                unsplash.auth.setBearerToken(localStorage.getItem('token'))
                dispatch({
                  type: likeDispatch,
                  id: props.id
                });
              } else {
                handleCloseModal()
              }
            }}>
              <Modal
                isOpen={openModal}
                onRequestClose={handleCloseModal}
                ariaHideApp={false}
                style={modalCustomStyles}
              >
                <h2>To do it you should 
                  <button className='auth-button'
                    onClick={e => {
                      e.preventDefault();
                      autorization()
                    }}
                  >authorize</button>
                </h2>
              </Modal>
            <LikeIcon class='like-icon_detail' fill={ like ? 'white' : 'red' } />
          </div>

          <span className="likes__count">{props.likes}</span>
        </div>
      </div>
      <img className='detail__photo' src={props.urls.regular} alt={props.alt_description} />
      <div className='photo__info-bottom'>
        <div className="info__date_detail">{dateFormat(props.created_at)}</div>
      </div>
    </div>
  )
}

Photo = connect(dispatch => { return { dispatch } })(Photo)

let DetailPhoto = ({ dispatch, modal, photos, chosenPhotoId }) => {

  const modalCustomStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }

  const handleCloseModal = () => {
    dispatch({
      type: 'TOGGLE_MODAL'
    })
    window.history.back()
  }

  return (
    <Modal
      isOpen={modal}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      style={modalCustomStyles}
      >
      {photos.map(i => (
        i.id === chosenPhotoId ? 
        <Photo props={i} closeWindow={handleCloseModal} /> :
        null
      ))}
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    photos: state.reducer.images,
    modal: state.reducer.modal,
    chosenPhotoId: state.reducer.chosenPhotoId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default DetailPhoto = connect(mapStateToProps, mapDispatchToProps)(DetailPhoto)