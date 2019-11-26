export default class ViewUtil {
    static getRandomColor() {
        let r = Math.floor(Math.random() * 100) + 155;
        let g = Math.floor(Math.random() * 100) + 155;
        let b = Math.floor(Math.random() * 100) + 155;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}