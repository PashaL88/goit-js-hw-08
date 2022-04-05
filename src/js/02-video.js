import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const currentTime = 'videoplayer-current-time';

player.on('timeupdate', throttle(currentTimeUpdate, 1000));
function currentTimeUpdate({ seconds }) {
  localStorage.setItem(currentTime, seconds);
}
player.setCurrentTime(localStorage.getItem(currentTime));
