class Lyric {
  constructor(str) {
    this.lyric = str;
    this.items = [];
    this.build();
  }
  build() {
    if (this.lyric == null || this.lyric.length == 0) {
      return;
    }

    let lines = this.lyric.split('\n');
    let index = 0;
    lines.forEach((line) => {
      let strs = line.split(']');
      if (strs.length >= 2) {   // 可能一行多句歌词的情况
        let content = strs[strs.length -1];

        for(let i=0; i<strs.length -1; i++) {
          let time = strs[i].replace('[', '');
          let position = this._getPositon(time);
          if(position>=0) { // 如果时间戳不正确就丢掉
            this.items[index] = new LyricItem(index, position, content);
            index++;
          } else {
            //console.log('Lyric: 不解析的歌词：$line');
          }
        }
        
      }
    });

    this._sortPosition();

    this._initDuraton();

    //console.log(this.items.length);
    //console.log(this.items);
  }

  /// 对position排序，有些SB歌词时间戳居然不是有序的。
  /// 或者一行多句歌词的情况
  _sortPosition(){
    let isSorted = true; // 大部分是有序的
    for(let i=0; i<this.items.length-1; i++) {
      if (this.items[i+1].position < this.items[i].position) {
        isSorted = false;
      }
    }

    if (!isSorted) {
      console.log('歌词无序，进行排序');
      this.items.sort((left, right) => left.position - right.position);

      for(let i=0; i<this.items.length; i++) {
        this.items[i].index = i;
      }
    }

  }

  _getPositon(str) {
    let position = 0;
    try {
      let strs = str.split(':');
      if (strs.length == 2) {
        let minute = parseInt(strs[0]);
        position += minute * 60 * 1000;

        let secondStrs = strs[1].split('.');
        if (secondStrs.length == 2) {
          let millsecond = parseInt(secondStrs[0]) * 1000 + parseInt(secondStrs[1]);
          position += millsecond;
        }
      }
    } catch (e) {
      position = -1;
      //console.log(str + e.toString());
    }

    return position;
  }

  // 计算每段歌词的显示时间
  _initDuraton() {
    for(let i=0; i<this.items.length-1; i++) {
      let item = this.items[i];
      item.duration = this.items[i+1].position - item.position;
    }
    // 最后一行怎样计算长度？？
    if (this.items.length > 1) {
      let preItem = this.items[this.items.length -2];
      let lastItem = this.items[this.items.length -1];
      let duration = preItem.duration;
      if (preItem.content.length > 0) {
        duration = duration * lastItem.content.length / preItem.content.length;
      }
      lastItem.duration = duration;
    }
    
  }
}

class LyricItem {
  constructor(index, position, content) {
    this.index = index;
    this.position = position;
    this.content = content;
  }
}


export {Lyric, LyricItem};