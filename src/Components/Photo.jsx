import React from 'react'
import { useState } from 'react'
import { dateFormat } from '../functions'
import LikeIcon from './likeIcon'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { authenticationUrl, unsplash } from '../api'

let Photo = ({
  dispatch,
  props
}) => {
  const [hovered, setHover] = useState(false);
  const [like, setLike]     = useState(!props.liked_by_user);
  const [openModal, setOpenModal] = useState(false)

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

  const hoverHandler = () => {
    setHover(!hovered);
  };
  const visuiallyClass = !hovered ? 'visually-hidden' : '';
  const likeDispatch = like ? 'LIKE' : 'UNLIKE';
  return (
    <li onMouseEnter={hoverHandler} onMouseLeave={hoverHandler} className="item__photo" key={props.id} >
      <div className='photo'>
        <div className={'photo__info ' + visuiallyClass} >
          <div className='photo__info-top'>
            <div className='info__user'>
              <img className='user__profile-image' src={props.user.profile_image.small} alt={props.user.username} />
              <a href={props.user.links.html} target='_blank' className="user__name" rel="noreferrer" >{props.user.username}</a>
            </div>
            <div className="info__likes">
              <div 
                className="likes__button"
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
                    setHover(false)
                  }
                }} >
                   <Modal
                      isOpen={openModal}
                      onRequestClose={handleCloseModal}
                      ariaHideApp={false}
                      style={modalCustomStyles}
                    >
                      <h2>To do it you should 
                        <button
                          className='auth-button'
                          onClick={e => {
                            e.preventDefault();
                            autorization();
                            
                          }}
                        >authorize</button>
                      </h2>
                    </Modal>
                <LikeIcon 
                  fill={ like ? 'white' : 'red' }
                  class='like-icon'
                />
              </div>
              <span className="likes__count">{props.likes}</span>
            </div>
          </div>

          <div className='photo__info-bottom'>
            <div className="info__date">{dateFormat(props.created_at)}</div>
          </div>
        </div>
        <Link
            className='photo__link'
            alt={`open full pic: ${props.alt_description}`}
            to={`/photo/${props.id}`} 
            onClick={() => {
              dispatch({
                type: 'TOGGLE_MODAL'
              })
              dispatch({
                type: 'CHOSE_PHOTO',
                id: props.id
              })
          }}/>
        <img className='photo__img' src={props.urls.small} alt={props.alt_description} />
      </div>
    </li>
  );
}

export default Photo = connect(
  state => {
    return {}
  },
  dispatch => {
    return { dispatch }
  }
)(Photo)