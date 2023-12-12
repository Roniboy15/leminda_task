import axios from "axios"

export const API_URL = "http://localhost:3001";
export const TOKEN_KEY = "auth_token";

// for Get only
export const doApiGet = async(_url) => {

  try{
    let resp = await axios({
      url:_url,
      method: "GET",
      headers: {
        "x-api-key": localStorage[TOKEN_KEY]
      }
    })
    return resp.data;
  }
  catch(err){
    console.log(err);
    throw err;
  }
}

export const doApiPost = async(_url, _body = {}) => {

  console.log(JSON.stringify(_body));

  try {
      let resp = await axios({
          url: _url,
          method: 'POST',
          data: JSON.stringify(_body),
          headers: {
              "x-api-key": localStorage[TOKEN_KEY],
              'Content-Type': "application/json"
          }
      })
      return resp;
  } catch (err) {
      throw err;
  }
}

// For Delete , put , post , patch
export const doApiMethod = async(_url, _method, _body = {}) => {
  try{
    let resp = await axios({
      url:_url,
      method: _method,
      data:_body ,
      headers: {
        "x-api-key": localStorage[TOKEN_KEY]
      }
    })
    return resp.data;
  }
  catch(err){
    console.log(err);
   throw err;
  }
}