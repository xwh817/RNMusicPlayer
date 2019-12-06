export default class SongUtil {

  static getArtistNames(song) {
    if (song.artistNames !== undefined) {
      return song['artistNames'];
    }

    var names = '';
    var arList = null;

    if (song['ar'] !==undefined) {
      arList = song['ar'];
    } else if (song['artists'] !==undefined) {
      arList = song['artists'];
    } else {
      arList = song['song']['artists'];
    }

    if (arList != null) {
      var isFirst = true;
      arList.forEach(ar => {
        if (isFirst) {
          isFirst = false;
          names = ar['name'];
        } else {
          names += " " + ar['name'];
        }
      });
    }
    
    // 取了之后存下来，不用重复取了。
    song['artistNames'] = names;

    // 测试，不要在build里面调用相同的函数，会频繁执行。
    //console.log("getAritistNames: $names");
    return names;
  }

  static getSongImage(song, size=100, width=0, height=0) {
    var imgUrl = null;
    if (song['imageUrl'] !== undefined) {
      imgUrl = song['imageUrl'];
    } else {
      try {
        if (song['al'] !== undefined) {
          imgUrl = song['al']['picUrl'];
        } else if (song['song'] !== undefined) {// URL_NEW_SONGS里面的数据结构
          imgUrl = song['song']['album']['picUrl'];
        }
        if (imgUrl != null) {
          song['imageUrl'] = imgUrl;  // 取一次之后存下来，不用后面计算。
        }
      } catch(e) {
        console.log("getSongImage fail: " + song['name']);
        return '';
      } 
    }

    if (imgUrl == null || imgUrl.length == 0) {
      return '';
    }
    if (width > 0 && height > 0) {
      imgUrl += '?param='+width +'y' + height;
    } else if (size > 0) {
      imgUrl += `?param=${size}y${size}`;
    }

    if (imgUrl==undefined || imgUrl == null || imgUrl.length == 0) {
      console.log(`imageUrl is empty: ${song.name}`);
    }

    //console.log(`imageUrl: ${imgUrl}`);
    return imgUrl;
  }


  static getSongUrl(song) {
    return "https://music.163.com/song/media/outer/url?id="+song['id'] +".mp3";
  }

}