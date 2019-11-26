import HttpUtil from '../utils/HttpUtil';

    const URL_ROOT = 'http://music.turingmao.com';

    const URL_PLAY_LIST = URL_ROOT + '/top/playlist?cat=';
    const URL_PLAY_LIST_DETAIL = '$URL_ROOT/playlist/detail?id=';
    const URL_NEW_SONGS = '$URL_ROOT/personalized/newsong';
    const URL_TOP_SONGS = URL_ROOT + '/top/list?idx=';
    const URL_SONG_DETAIL = '$URL_ROOT/song/detail?ids=';
    const URL_GET_LYRIC = '$URL_ROOT/lyric?id=';
  
    const URL_MV_FIRST = '$URL_ROOT/mv/first';
    const URL_MV_TOP = '$URL_ROOT/top/mv';
    const URL_MV_PERSONAL = '$URL_ROOT/personalized/mv';
    const URL_MV_DETAIL = '$URL_ROOT/mv/detail?mvid=';
    const URL_MV_AREA = '$URL_ROOT/mv/all?area=';
    const URL_MV_163 = '$URL_ROOT/mv/exclusive/rcmd'; // 网易出品mv
  
    const URL_SEARCH = '$URL_ROOT/search?keywords=';
  
    const URL_GET_TOPLIST =
        '$URL_ROOT/toplist/detail'; // 获取排行和摘要，或者/toplist
  
    const URL_TOP_ARTISTS = '$URL_ROOT/toplist/artist';
    const URL_ARTIST_DETAIL = '$URL_ROOT/artists?id=';
  
export default class MusicApi {

    static getPlayList(cat) {
        return HttpUtil.get(URL_PLAY_LIST + cat)
        .then(data=>data['playlists']);
    }
    
  static getTopSongs(listId) {
    console.log(URL_TOP_SONGS + listId);
    return HttpUtil.get(URL_TOP_SONGS + listId)
    .then(data=>data['playlist']['tracks']);
  }


}