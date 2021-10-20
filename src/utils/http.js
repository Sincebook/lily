import axios from 'axios';
// import qs from 'qs';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = data => qs.stringify(data);
/**
 *
 * @param {'get' | 'post'} method
 * @param { string } url
 * @param { any } data
 * @param errMsg
 */
function ajax(method, url, params) {
  return new Promise((reslove, reject) => {
    let ajaxParams = {};
    let ajaxMethod = {};
    if (method === 'get') {
      ajaxMethod = axios[method];
      ajaxParams = {
        params
      };
    } else if (method === 'post') {
      let formData = new FormData();
      for (let key in params) {
        formData.append(key, params[key]);
      }
      // console.log(params);
      // params = qs.stringify(params);
      ajaxMethod = axios[method];
      ajaxParams = formData;
    } else {
      // 不支持的请求
      // get和post之外的请求
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('咱不支持此请求');
      return;
    }
    ajaxMethod(url, ajaxParams).then((res) => {
      const body = res.data;
      // console.log(res);
      reslove(body);
    }, (reason) => {
      // 从服务器没有获取数据（网络层失败）
      let response = null;
      if (reason) {
        // 起码服务器有响应，只不过状态码是4/5开头的
        response = reason.response;
        switch (response.status) {
          case 401:
            // 一般情况下都是未登录
            break;
          case 403:
            // 一般情况下是TOKEN过期
            break;
          case 404:
            // 地址不存在
            break;
        }
      } else {
        // window.navigator.onLine   ==> true有网，false断网
        if (!window.navigator.onLine) {
          alert('和抱歉，网络连接已经断开，请联网后再试~~');
        }
      }
      reject(reason);
    });
  });
}
const get = (url, params, errMsg) => {
  return ajax('get', url, params, errMsg);
};

const post = (url, data, errMsg) => {
  return ajax('post', url, data, errMsg);
};
const http = {
  get: get,
  post: post
};
export default http;

// import Qs from 'qs';
// console.log(Qs.stringify({
//   page: '1',
//   aa: 'aa'
// }));
// const http = axios.create({
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   transformRequest: data => Qs.stringify(data),
//   timeout: 1000
// });

// // 响应拦截器：从服务器获取结果 ~ 自己.THEN中间做的事情  （重要）
// http.interceptors.response.use(response => {
//   // 从服务器获取到数据了，我们只把响应主体信息传递给下一个TEHN
//   return response.data;
// }, reason => {
// // 从服务器没有获取数据（网络层失败）
// let response = null;
// if (reason) {
//   // 起码服务器有响应，只不过状态码是4/5开头的
//   response = reason.response;
//   switch (response.status) {
//     case 401:
//       // 一般情况下都是未登录
//       break;
//     case 403:
//       // 一般情况下是TOKEN过期
//       break;
//     case 404:
//       // 地址不存在
//       break;
//   };
// } else {
//   // window.navigator.onLine   ==> true有网，false断网
//   if (!window.navigator.onLine) {
//     alert('和抱歉，网络连接已经断开，请联网后再试~~');
//   }
// }
//   return Promise.reject(response);
// });

// http.interceptors.request.use(config => {
//   // 真实项目中，我们一般会在登陆成功后，把从服务器获取的token信息储存在本地
//   // 以后在发送请求的时候，一般都会把token带上。
//   const token = localStorage.getItem('token');
//   token && (config.headers.Authorization = token);
//   return config;
// });

// export default http;
