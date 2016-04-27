import * as types from '../constants/ActionTypes';

export function showTitle(isTitle,titleName) {
  return {
    type: types.SHOW_TITLE,
    isTitle:isTitle,
    titleName:titleName
  };
}