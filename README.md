## React Native Music Player

一款使用React Native实现的音乐播放器
- 其他实现方式：
  - [Flutter版](https://github.com/xwh817/flutter_music_player)
  - [Java版](https://github.com/xwh817/MyMusicPlayer)
- 关于播放源：采用了开源项目[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)，如想稳定运行请自行下载并搭建自己的服务。
- 说明：本App仅限于学习，不得用于商业用途。

- 试用apk下载地址：[react_native_music_release_1.0.apk](http://xwh817.gitee.io/files/apks/rn_music_release.apk)
- 扫描二维码下载：<img src="http://xwh817.gitee.io/files/images/rn_music/qr_download.png">

## 界面例图

| 首页 |  播放页 |
| :------: | :----: |
| ![](http://xwh817.gitee.io/files/images/rn_music/home.jpg)|  ![](http://xwh817.gitee.io/files/images/rn_music/player.jpg)    |


| 歌单 |  详情 |
| :------: | :----: |
| ![](http://xwh817.gitee.io/files/images/rn_music/playlist.jpg)|  ![](http://xwh817.gitee.io/files/images/rn_music/playlistDetail.jpg)    |


| 歌单 |  MV视频 |
| :------: | :----: |
| ![](http://xwh817.gitee.io/files/images/rn_music/playlist2.jpg)|  ![](http://xwh817.gitee.io/files/images/rn_music/mv.jpg)    |



## 技术总结
- App页面结构
  - AppContainer、createStackNavigator App页面路由导航。
  - createBottomTabNavigator 底部菜单式页面结构。
  - ScrollableTabView 类似ViewPager的滑动切换页面结构。
- 基本组件使用
  - FlatList，列表、网格数据展示。
  - Touchable组件，各种点击效果。
  - Animator动画组件，显示播放滚动动画。
  - Image，本地、网络图片组件。
  - react-native-vector-icons，各种图标库。
- 第三方组件使用
  - react-native-swiper，图片轮播图
  - async-storage，类似SharedPreferences的数据持久化。
  - react-native-easy-toast，Toast组件。
  - react-native-video，用来播放视频、音乐。
  - @react-native-community/blur，背景模糊组件（有坑，用延时解决）。
- 自定义组件
  - 对功能模块进行抽取，封装成Component，进行调用。
  - 例如：歌词显示组件、搜索栏组件。
  - 以及各种数据展示Item封装，在多个地方复用。
- 状态管理
  - 组件内部state和props的使用。
  - Redux状态管理，将业务功能抽取出来，集中由Redux进行统一管理。
- 打包发布
  - 在android目录下：gradlew assembleRelease打包项目。
  - 修改gradle，去掉不必要的abi平台对应的so文件，减小apk文件大小。