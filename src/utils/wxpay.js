function onBridgeReady(appId, timeStamp, nonceStr, wx_package, paySign, serial_num) {
  window.WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      'appId': appId, // 公众号名称，由商户传入
      'timeStamp': timeStamp, // 时间戳，自1970年以来的秒数
      'nonceStr': nonceStr, // 随机串
      'package': wx_package,
      'signType': 'MD5', // 微信签名方式：
      'paySign': paySign // 微信签名
    },
    function (res) {
      if (res.err_msg == 'get_brand_wcpay_request:ok' ) {
        console.log('pay ok');
        window.location.href = 'http://lily.since88.cn/Buy?serial_num=' + serial_num;
        // 使用以上方式判断前端返回,微信团队郑重提示：
        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        // mui.alert('支付成功', function () {
        //   toIndex();
        // });
      } else {
        alert('用户取消支付');
      }
    });
}

function final(appId, timeStamp, nonceStr, wx_package, paySign, serial_num) {
  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      console.log('document.addEventListener')
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      console.log('document.attachEvent')
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady(appId, timeStamp, nonceStr, wx_package, paySign, serial_num);
  }
}

export { final, onBridgeReady }
