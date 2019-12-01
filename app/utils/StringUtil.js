export default class StringUtil {
    static formatTime(milliseconds) {
        let second = milliseconds / 1000;
        let h = 0, m = 0, s = parseInt(second);
        if (s > 60) {
            m = parseInt(s / 60);
            s = parseInt(s % 60);
        }
        // 补零
        let zero = function (v) {
            return (v >> 0) < 10 ? "0" + v : v;
        };

        let strTime = zero(m) + ":" + zero(s);
        if (h > 0) {
            strTime = zero(h) + ":" + strTime;
        }

        return strTime;
    }


}