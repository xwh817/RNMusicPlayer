import HttpUtil from '../utils/HttpUtil';

export default class MusicApi {

  static URL_ROOT = 'http://music.turingmao.com';
  static URL_PLAY_LIST = `${this.URL_ROOT}/top/playlist?cat=`;
  static URL_PLAY_LIST_DETAIL = `${this.URL_ROOT}/playlist/detail?id=`;
  static URL_NEW_SONGS = `${this.URL_ROOT}/personalized/newsong`;
  static URL_TOP_SONGS = `${this.URL_ROOT}/top/list?idx=`;
  static URL_SONG_DETAIL = `${this.URL_ROOT}/song/detail?ids=`;
  static URL_GET_LYRIC = `${this.URL_ROOT}/lyric?id=`;

  static URL_MV_FIRST = `${this.URL_ROOT}/mv/first`;
  static URL_MV_TOP = `${this.URL_ROOT}/top/mv`;
  static URL_MV_PERSONAL = `${this.URL_ROOT}/personalized/mv`;
  static URL_MV_DETAIL = `${this.URL_ROOT}/mv/detail?mvid=`;
  static URL_MV_AREA = `${this.URL_ROOT}/mv/all?area=`;
  static URL_MV_163 = `${this.URL_ROOT}/mv/exclusive/rcmd`; // 网易出品mv

  static URL_SEARCH = `${this.URL_ROOT}/search?keywords=`;

  static URL_GET_TOPLIST =
    `${this.URL_ROOT}/toplist/detail`; // 获取排行和摘要，或者/toplist

  static URL_TOP_ARTISTS = `${this.URL_ROOT}/toplist/artist`;
  static URL_ARTIST_DETAIL = `${this.URL_ROOT}/artists?id=`;


  static getPlayList(cat) {
    return HttpUtil.get(this.URL_PLAY_LIST + cat)
      .then(data => data['playlists']);
  }

  static getTopSongs(listId) {
    return HttpUtil.get(this.URL_TOP_SONGS + listId)
      .then(data => data['playlist']['tracks']);
  }

  static getMVList(url) {
    return HttpUtil.get(url)
      .then(data => {
        if (url == this.URL_MV_PERSONAL) {
          return data.map(item => this._convertMV(item));
        } else {
          return data['data'];
        }
      });
  }

  static _convertMV(item){
    return {
      id: item['id'], 
      name: item['name'], 
      cover: item['picUrl'],
      artistNames: item['artistName']
    };
  }


  static getLyric(id) {
    return HttpUtil.get(this.URL_GET_LYRIC + id)
      .then(data => data['lrc']['lyric']);
  }

}