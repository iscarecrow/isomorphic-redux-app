import { SHOW_TITLE } from '../constants/ActionTypes';

const initialState = {
  isTitle: false,
  titleName: ''
};

export default function TitleData(state = initialState, action) {
  switch (action.type) {
    case SHOW_TITLE:
      return Object.assign({}, state, {
        isTitle: action.isTitle,
        titleName: action.titleName
      });
    default:
      return state;
  }
}