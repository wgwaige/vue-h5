<template>
  <x-dialog show
    :dialog-style="{bottom:'220px',top:'initial'}">
    <div class="dialog-yht">
      <header>
        <slot name="title"></slot>
      </header>
      <div class="dialog-yht-con">
        <slot></slot>
        <div @click="$emit('close')"
          class="dialog-yht-close">✕</div>
        <div class="password-box">
          <div @touchend.stop="showKeyboardBox">
            <input class="w-input"
              v-for="item in boxVal"
              :key="item.id"
              :value="item"
              readonly="true"
              type="text"
              @touchend.stop="showKeyboardBox" />
          </div>
          <input v-show="false"
            type="text"
            :id="sipBoxId"
            readonly />
        </div>
        <!-- <div style="padding:0 0 20px;">
          <x-button :disabled="isDisabled"
            :show-loading="isLoading"
            @click.native="handleSubmit"
            style="width:100%;"
            mini
            type="primary">确认</x-button>
        </div> -->
      </div>
    </div>
  </x-dialog>
</template>
<script>
import { XDialog, XButton, base64 } from 'vux';
export default {
  components: {
    XDialog,
    XButton
  },
  data() {
    return {
      sipBoxId: 'SIPBox',
      isDisabled: true,
      keyboard: null,
      currentInputID: null,
      boxVal: ['', '', '', '', '', '']
    };
  },
  props: ['serverRandom', 'pubKey', 'pubKeySig', 'isLoading'],
  mounted() {
    this.$nextTick(() => {
      if (this.keyboard === null) {
        this.keyboard = new CFCAKeyboard(KEYBOARD_TYPE_NUMBER); // 构造输入键盘,新建一个实例
      }
      this.keyboard.bindInputBox(this.sipBoxId); // 将指定的输入框与安全键盘绑定

      // 设置最大输入长度
      if (CFCA_OK !== this.keyboard.setMaxLength(6, this.sipBoxId)) {
        alert('setMaxLength error');
      }
      // 设置最小输入长度
      if (CFCA_OK !== this.keyboard.setMinLength(6, this.sipBoxId)) {
        alert('setMinLength error');
      }
      // 设置输入框加密状态
      // if (CFCA_OK !== keyboard.setEncryptState(isEncrypted, sipboxId)) {
      //   alert('setEncryptState error');
      // }

      // 设置加密算法类型 CIPHER_TYPE_RSA或CIPHER_TYPE_SM2
      if (
        CFCA_OK !== this.keyboard.setCipherType(CIPHER_TYPE_SM2, this.sipBoxId)
      ) {
        alert('setCipherType error');
      }
      this.keyboard.setDoneCallback(this.doneCallback); // 设置完成键回调
      this.keyboard.setInputChangeCallback(this.inputChangeCallback); // 输入框内容发生变动时的通知事件
      this.showKeyboardBox();
    });
  },
  destroyed() {
    this.keyboard.hideKeyboard();
    this.currentInputID = null;
  },
  methods: {
    handleSubmit() {
      const obj = this.getEncrypt(this.sipBoxId);
      this.$emit('submit', obj);
    },
    // 完成键回调
    doneCallback(sipBoxId) {
      // console.log(this.sipBoxId + '  done!');
      this.currentInputID = null;
    },
    // 发生变动通知
    inputChangeCallback(sipBoxId, type, length) {
      if (sipBoxId === this.sipBoxId && length >= 0) {
        for (let i = 0; i < 6; i++) {
          if (i < length) {
            this.boxVal[i] = '*';
          } else {
            this.boxVal[i] = '';
          }
        }
        this.boxVal = Object.assign([], this.boxVal);
      }
      if (length === 6 && !this.isLoading) {
        this.handleSubmit();
      }
      // this.isDisabled = length < 6;
    },
    // 获取结果
    getEncrypt(sipboxId) {
      const encryptedInputValue = this.keyboard.getEncryptedInputValue(
        sipboxId
      ); // 获取输入数据的加密结果
      // const passwordStrengthLevel = this.keyboard.getWeakCipherInfo(sipboxId); // 获取当前输入密码的信息包括：是否存在小写字母，大写字母，数字，符号。 PS:该接口只可在加密情况下调用，若非加密则返回空数组
      // let errorCode = this.keyboard.getErrorCode(sipboxId).toString(16); // 获取加密结果与客户端随机数加密结果过程中的错误码
      // console.log('errorCode ' + errorCode);
      // if (parseInt(errorCode) !== CFCA_OK) {
      // console.log('加密输入数据错误: 0x' + errorCode + '\n');
      // return;
      // } else {
      // console.log('加密输入数据: ' + encryptedInputValue + '\n');
      // }
      console.log(encryptedInputValue);
      const encryptedClientRandom = this.keyboard.getEncryptedClientRandom(
        sipboxId
      ); // 获取客户端随机数加密结果
      // errorCode = this.keyboard.getErrorCode(sipboxId).toString(16);
      // if (parseInt(errorCode) !== CFCA_OK) {
      // console.log('加密客户端随机数错误: 0x' + errorCode + '\n');
      // return;
      // } else {
      // console.log('加密客户端随机数: ' + encryptedClientRandom + '\n');
      // }
      // console.log('弱密码判断:');
      // console.log('小写字母:' + passwordStrengthLevel[0]);
      // console.log('大写字母:' + passwordStrengthLevel[1]);
      // console.log('数字:' + passwordStrengthLevel[2]);
      // console.log('符号:' + passwordStrengthLevel[3]);
      return {
        encryptedInputValue: encryptedInputValue,
        encryptedClientRandom: encryptedClientRandom
      };
    },
    // 显示键盘
    showKeyboardBox() {
      // console.log(base64.encode(this.serverRandom));
      if (
        CFCA_OK !==
        this.keyboard.setServerRandom(
          base64.encode(this.serverRandom),
          this.sipBoxId
        ) // 设置服务端随机数
      ) {
        alert('setServerRandom error');
      }
      if (
        CFCA_OK !==
        this.keyboard.setPublicKey(
          CIPHER_TYPE_RSA, // 加密公钥类型
          this.pubKey, // 公钥Base64格式字符串
          this.pubKeySig, // 公钥签名Base64格式字符串
          this.sipBoxId
        )
      ) {
        alert('setPublicKey error');
      }
      this.keyboard.showKeyboard();
    }
  }
};
</script>
<style lang="less">
.dialog-yht {
  background: #fff;
  border-radius: 20px;
  padding: 0px 0px;
  position: relative;
  header {
    font-size: 14px;
    color: #2e3255;
    font-weight: normal;
    border-bottom: 1px solid #eee;
    height: 50px;
    line-height: 50px;
    padding: 0px 15px;
  }
  .dialog-yht-con {
    overflow: hidden;
    padding: 15px 15px 0px 15px;
    border-bottom: 1px solid #eee;
    h2 {
      color: #959ca9;
      font-size: 14px;
      font-weight: normal;
    }
    p {
      color: #2e3255;
      font-size: 30px;
    }
  }
  .dialog-yht-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    img {
      width: 100%;
    }
  }
  .w-input {
    text-align: center;
    width: 36px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #eee;
    font-size: 20px;
    float: left;
  }
  .password-box {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    padding: 15px 0px 20px;
    border-top: 1px solid #eee;
  }
}
</style>
