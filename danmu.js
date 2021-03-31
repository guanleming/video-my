//把所有视频路径封装成数组
let arr = ['./video/02.MP4', './video/01.MP4', './video/03.MP4', "./video/video.webm"]

let all_ = document.getElementById("max");
let menu_ = document.getElementById("menu");
//获取暂停开始按钮
let play_ = document.querySelector(".play_menu");
let pause_ = document.querySelector(".pause_menu");

//获取视频video
let video_ = document.getElementById("video");

//获取开始时间、总时间
let now_time = document.querySelector(".now_time");
let all_time = document.querySelector(".all_time");
console.log(all_time);

//获取下一个视频
let next_ = document.querySelector(".next_move_");
console.log(next_);

//获取全屏按钮
let full_menu = document.querySelector('.full_menu')


//菜单隐藏显示
all_.addEventListener("mouseover", function () {
    menu_.style.display = "block";
})
all_.addEventListener("mouseleave", function () {
    menu_.style.display = "none";
});

//获取速度按钮
let two_double = document.querySelector(".two_double");
let one_double = document.querySelector(".one_double");

//获取音量按钮、音量条
let yin_open = document.querySelector(".yinliang_menu");
let yin_close = document.querySelector(".jingyin");


let yinliang = document.querySelector(".yinliang");
let ylt = document.querySelector('.jiajian');

//进度条
let jpplaybar = document.querySelector(".jp-play-bar");
console.log(jpplaybar);
//点击进度条
let jpseekbar = document.querySelector(".jp-seek-bar");
console.log(jpseekbar);

let pross = document.querySelector('.pross');
console.log(pross);
var barleft = 0;

//音量
let all_jjbar = document.querySelector('.all-bar');
let jj_bar = document.querySelector(".jj-bar");
let jj_span = document.querySelector('.jj-span');
let all_h = all_jjbar.offsetHeight
console.log(all_h);

//播放暂停
video.addEventListener("canplay", function () {
    play_.addEventListener("click", function () {
        video_.play();
        this.style.display = "none";
        pause_.style.display = "block";
    })
    pause_.addEventListener("click", function () {
        video_.pause();
        this.style.display = "none";
        play_.style.display = "block";
    })
    //总时间
    //获取媒体总时间(只能读取，不能赋值)duration
    //获取到的时间为秒数，进行分钟转换
    all_time.innerHTML = formatDate(video.duration);

    //更新时间 timeupdate(事件)  currentTime(属性)  :  开始播放到现在所用的时间
    video.addEventListener("timeupdate", function () {
        // console.log(video.currentTime);
        //当前时间
        now_time.innerHTML = formatDate(video.currentTime);
        if (now_time.innerHTML == all_time.innerHTML) {
            play_.style.display = "block";
            pause_.style.display = "none";
        }

        //进度条
        jpplaybar.style.width = (video.currentTime / video.duration) * 100 + '%';

    });
    // 点击进度条
    jpseekbar.addEventListener("click", function (e) {
        e = e || window.event;
        let currentW = jpseekbar.offsetWidth;
        let currentX = e.offsetX;
        console.log(currentW, currentX);
        //进度条
        jpplaybar.style.width = (currentX / currentW) * 100 + '%';
        //更新时间
        video.currentTime = (currentX / currentW) * video.duration;

        pross.onmousemove = function (event) {
            var event = event || window.event;
            barleft = currentW - currentX;
            console.log(barleft);
            jpplaybar.style.width = barleft;
        }

    });

    //bo调用函数
    if (jpplaybar.style.width == 100 + 'px') {
        nex()
    }

    //全屏模式
    full_menu.addEventListener('click', function () {
        video.webkitRequestFullscreen();
    })

    //倍速播放
    two_double.addEventListener('click', function () {
        this.style.color = "red";
        video.playbackRate = 2;
        one_double.style.color = "white";
    })
    one_double.addEventListener('click', function () {
        video.playbackRate = 1;
        this.style.color = "red";
        two_double.style.color = "white";

    })


    //音量功能
    yinliang.addEventListener("mouseover", function () {
        ylt.style.display = "block";
    })
    yinliang.addEventListener("mouseleave", function () {
        ylt.style.display = "none";
    })

    yin_open.addEventListener('click', function () {
        this.style.display = "none";
        yin_close.style.display = "block";
        video_.muted = true;
        jj_bar.style.height = 0;
    })
    yin_close.addEventListener('click', function () {
        this.style.display = "none";
        yin_open.style.display = "block";
        video_.muted = false;
        jj_bar.style.height = 50+'%';
    })

    //音量调节
    all_jjbar.addEventListener("click", function (e) {
        e = e || window.event;
        let currentW = all_jjbar.offsetHeight;
        let currentH = e.offsetY;
        console.log(currentW, currentH);
        var song = currentH / currentW * 100 + '%';
        console.log(song);
        jj_bar.style.height = song;
        video.volume = currentH / currentW;
        if(jj_bar.style.height >= 1+'%'){
            yin_close.style.display = "none";
            yin_open.style.display = "block";
        }
    })
})

//点击下一首
let i = 0;
function nex() {
    next_.addEventListener("click", function () {
        i++;
        if (i >= 4) {
            i = 0;
        }
        video_.src = arr[i];
        video_.pause();
        play_.style.display = "block";
        pause_.style.display = "none";
        one_double.style.color = "white";
        two_double.style.color = "white";
        jpplaybar.style.width = "0%"

    })
}
nex();


//封装时间函数
//格式化时间
function formatDate(t) {
    var m = Math.floor(t / 60);
    m = m < 10 ? '0' + m : m;
    var s = Math.floor(t % 60);
    s = s < 10 ? '0' + s : s;
    return m + ":" + s;
}



//封装弹幕功能
function $(str) {
    return document.getElementById(str);
}
function send() {
    var aa = $('box');
    var h = aa.offsetHeight;
    console.log(h);
    var word = $('txt').value;
    var span = document.createElement('span');
    var top = parseInt(Math.random() * h) - 20;
    var color1 = parseInt(Math.random() * 256);
    var color2 = parseInt(Math.random() * 256);
    var color3 = parseInt(Math.random() * 256);
    var color = "rgb(" + color1 + "," + color2 + "," + color3 + ")";
    top = top < 0 ? 0 : top;
    span.style.position = 'absolute';
    span.style.top = top + "px";
    span.style.color = color;
    span.style.left = '500px';
    span.style.fontSize = '24px';
    span.style.whiteSpace = 'nowrap';

    var nub = (Math.random() * 20) + 1;

    aa.style.overflow = "hidden"
    span.setAttribute('speed', nub);
    span.speed = nub;
    span.innerHTML = word;
    $('box').appendChild(span);
    $('txt').value = "";
}
setInterval(move, 200);
function move() {
    var spanArray = $('box').children;
    for (var i = 0; i < spanArray.length; i++) {
        spanArray[i].style.left =
            parseInt(spanArray[i].style.left) - spanArray[i].speed + 'px';

    }
}