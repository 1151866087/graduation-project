// components/classic/music/index.js
const audio = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String
    },
    image: {
      type: String
    },
    musicUrl: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMusic() {
      if (this.data.isPlay) {        
        audio.pause();
        this.setData({
          isPlay: false
        })
      }
      else {
        // audio.title = this.properties.title;
        audio.src = this.properties.musicUrl;
        this.setData({
          isPlay: true
        })
      }
    },
    //当重新进入页面 恢复音乐 播放或暂停
    _recoveryMusic() {
      //如果监听到的src 与 properties的musicUrl相同时 让音乐播放
      if (audio.src == this.properties.musicUrl) {
        this.setData({
          isPlay: true
        })
      }
      //如果监听到的 paused(audio的属性) 为true时 设置isPlay为false
      if (audio.paused) {
        this.setData({
          isPlay: false
        })
      }
    },
    //监听音乐
    _monitorMusic() {
      //监听音频播放事件
      audio.onPlay(() => {
        this.setData({
          isPlay: true
        })
      })
      //监听音频暂停事件
      audio.onPause(() => {
        this.setData({
          isPlay: false
        })
      })
      //监听音频停止事件
      audio.onStop(() => {
        this.setData({
          isPlay: false
        })
      })
      //监听音频自然播放至结束的事件
      audio.onEnded(() => {
        this.setData({
          isPlay: false
        })
      })
    }
  },
  //当组件触发 attached 生命周期时，会依次触发 my-behavior 中的 attached 生命周期函数和 my-component 中的 attached 生命周期函数
  attached() {
    this._recoveryMusic();
    this._monitorMusic();
  }
})
