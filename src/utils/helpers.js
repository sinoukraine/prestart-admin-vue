const DOMAIN = 'https://api.m2mglobaltech.com/PreStart/V1/'

export const API_METHODS = {
  DOMAIN,

  LOGIN: DOMAIN + 'User/Auth?username={0}&password={1}&AppKey={2}&MobileToken={3}&DeviceToken={4}&DeviceType={5}',
  REMOTE_LOGIN: DOMAIN + 'service/User/ReAuth',

  USER_GET_LIST: DOMAIN + 'service/User/Query',
  USER_CREATE: DOMAIN + 'service/User/Add',
  USER_EDIT: DOMAIN + 'service/User/Edit',
  USER_DELETE: DOMAIN + 'service/User/Remove',
  USER_RESET_PASSWORD: DOMAIN + 'Service/User/ResetPassword',
  USER_RESET_MY_PASSWORD: DOMAIN + 'Service/User/ResetMyPassword',
}
//User/Auth?username=testa&password=Simon2020&AppKey=924365a6-eadd-3742-ed83-7d55f37b0503&MobileToken=832f2ce8-8864-5228-8648-1b1cb95d826e&DeviceToken=832f2ce8-8864-5228-8648-1b1cb95d826e&DeviceType=android.app.quiktrak.eu.prestart

export function toLowerCaseObjectKeys(source) {
  return Object.keys(source)
    .reduce((destination, key) => {
      destination[key.toLowerCase()] = source[key];
      return destination;
    }, {});
}

export function isObjEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}

export function getFormDataFromObject(query){
  let data = new FormData();
  if (!isObjEmpty(query)){
    const arr = Object.keys(query)
    arr.forEach(element => {
      if(Array.isArray(query[element])){
        for (let i = 0; i < query[element].length; i++) {
          if (query[element][i]) data.append(element+'[]', query[element][i])
        }
      }else{
        if (query[element]) data.append(element, query[element])
      }
    })
  }
  return data
}

export function sortArrayByObjProps(list, sortBy){
  if(list && list.length){
    list.sort(function(a,b){
      let i = 0, result = 0;
      while(i < sortBy.length && result === 0) {
        result = sortBy[i].direction*(a[ sortBy[i].prop ].toString().toUpperCase() < b[ sortBy[i].prop ].toString().toUpperCase() ? -1 : (a[ sortBy[i].prop ].toString().toUpperCase() > b[ sortBy[i].prop ].toString().toUpperCase() ? 1 : 0));
        i++;
      }
      return result;
    })
  }
  return list;
}

export function detectNavigatorAgentType(){
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;
  let ret = 'Web';
  if (/android/i.test(userAgent)) {
    ret = "Android";
  }else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    ret = "IOS";
  }
  return ret;
}