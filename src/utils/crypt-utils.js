import JSEncrypt from '@/utils/jsencrypt'

export function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export function guid () {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

export function AESEncrypt (data, keyStr) {
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var iv = CryptoJS.enc.Utf8.parse(keyStr)
  return CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
}

export function AESDecrypt (data, keyStr) {
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var iv = CryptoJS.enc.Utf8.parse(keyStr)
  return CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8)
}

export function RSAEncodeLong (publicKey, value) {
  var pubKey = publicKey
  var val = value
      // var encrypt = new JSEncrypt();
    // encrypt.setPublicKey(publicKey);
    // var data = encrypt.encryptLong(value);
  JSEncrypt.setPublicKey(publicKey)
  var data = JSEncrypt.encryptLong(value)

  var s12 = data.substr((data.length) - 2, 2)

  if (s12 === '==') {
    return RSAEncodeLong(pubKey, val)
  }

  return data
}

export function RSAEncode (publicKey, value) {
    // var encrypt = new JSEncrypt();
    // encrypt.setPublicKey(publicKey);
    // var data = encrypt.encrypt(value);
  JSEncrypt.setPublicKey(publicKey)
  var data = JSEncrypt.encrypt(value)
  return data
}

export function RSADecode (privateKey, value) {
    // var encrypt = new JSEncrypt();
    // encrypt.setPrivateKey(privateKey);
    // var data = encrypt.decrypt(value);
  JSEncrypt.setPrivateKey(privateKey)
  var data = JSEncrypt.decrypt(value)
  return data
}

export function getLocalAESKey () {
  /*
    客户端生成的aes密钥  长度16
    */

  var guid = ''
  for (var i = 1; i <= 16; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
    if ((i === 16)) {
      guid += ''
    }
  }
  return guid
}

export function generateMixed (n) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', H, I, G, K ]

  var res = ''
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 17)
    res += chars[id]
  }
  return res
}

export function newGuid () {
  var guid = ''
  for (var i = 1; i <= 16; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
    if ((i === 16)) { guid += '' }
  }
  return guid
}
