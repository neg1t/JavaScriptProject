import {unsplash} from '../../api'

const initialState = {
  images: [],
  modal: false,
  chosenPhotoId: '',
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LIKE': {
      unsplash.photos.likePhoto(action.id)
      const photos = [...state.images]
      const photoIndex = photos.findIndex(el => {
        return el.id === action.id
      })
      photos[photoIndex].likes++
      photos[photoIndex].liked_by_user = true
      return {
        ...state,
        images: photos,
      }
    }
    case 'UNLIKE': {
      unsplash.photos.unlikePhoto(action.id)
      const photos = [...state.images]
      const photoIndex = photos.findIndex(el => {
        return el.id === action.id
      })
      photos[photoIndex].likes--
      photos[photoIndex].liked_by_user = false
      return {
        ...state,
        images: photos,
      }
    }
    case 'LOAD_PHOTO': {
      return {
        ...state,
        images: [...state.images, ...action.photo]
      }
    }
    case 'TOGGLE_MODAL' : {
      return {
        ...state,
        modal: !state.modal
      }
    }
    case 'CHOSE_PHOTO' : {
      return {
        ...state,
        chosenPhotoId: action.id
      }
    }
    default: 
      return state;
  }
}

export default reducer;