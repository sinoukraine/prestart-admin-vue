String.prototype.format = function (e) { var t = this; if (arguments.length > 0) if (arguments.length == 1 && typeof e == "object") { for (var n in e) if (e[n] != undefined) { var r = new RegExp("({" + n + "})", "g"); t = t.replace(r, e[n]) } } else for (var i = 0; i < arguments.length; i++) if (arguments[i] != undefined) { var r = new RegExp("({)" + i + "(})", "g"); t = t.replace(r, arguments[i]) } return t };

import { API_METHODS, getFormDataFromObject } from "@/utils/helpers"
import axios from 'axios'

export async function login(query) {
    const { username, password, AppKey, MobileToken, DeviceToken, DeviceType } = query
    let url = API_METHODS.LOGIN.format(username, password, AppKey, MobileToken, DeviceToken, DeviceType)

    try {
        const response = await axios.get(url);
        if(response.data.MajorCode === '000'){
            return response.data.Data
        }else{
            //self.$alert('Invalid login or password', 'M2M Data Message', { type: 'message' })
            //response.data.method = 'login';
            //store.commit('app/SET_API_VALIDATION_ERROR', response.data)
            //this.$toast.add({severity:'error', summary: 'Error Message', detail:'Something happened', life: 3000});
                
            return false
        }
    }catch (e) {
        console.log(e)
        //this.$toast.add({severity:'error', summary: 'Error Message', detail:'Something happened', life: 3000});
                
        //self.$alert('Something happened', 'M2M Data Message', { type: 'message' })
        //store.commit('app/SET_ERROR', e)
        return false
    }

    /*
    let data = {}
    data = getFormDataFromObject(query)
    //
    try {
      const response = await axios.post(API_METHODS.LOGIN, data );
      if(response.data.MajorCode === '000'){
        return response.data.Data
      }else{
        response.data.method = 'login';
        store.commit('app/SET_API_VALIDATION_ERROR', response.data)
        return false
      }
    }catch (e) {
      console.log(e)
      store.commit('app/SET_ERROR', e)
      return false
    }*/
  }