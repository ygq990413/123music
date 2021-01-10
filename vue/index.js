window.addEventListener("load",function () {
    var arr = [];
    var img = [];
    var vm = new Vue({
        el: "#app",
        data: {
            query: "",
            songs: [], // 歌曲
            songUrl: "",
            img: "img/封面.jpg",
            message1: "./img/上一曲(1).png",
            message2: "./img/下一曲(1).png",
            message3: "./img/暂停.png",
            flag: 1, // true为播放
            cd: "cd",
            playimg: "./img/播放.png",
        },
        methods: {
            querySong: function () {
                var that = this;
                axios.get("json/date.json").then(function (response) {
                    console.log(response)
                    // console.log(response.data.jj[1].url)
                    if (that.query == "林俊杰") {
                        that.songs = response.data.林俊杰;
                        // 图片切换为林俊杰
                        this.img = "img/林俊杰.png";
                        for (let i = 0; i<that.songs.length; i++){
                            // console.log(that.songs[i]);
                            // 复制歌曲数组
                            arr[i] = that.songs[i].url;
                            // 复制专辑图片数组
                            img[i] = that.songs[i].img;
                            // 复制播放图片数组
                        }
                        // 歌曲数组
                        // console.log("歌曲数组为" + arr); // 只是显示不出来，实际是拷贝了的
                    } else if (that.query == "wyt") {
                        that.songs = response.data.wyt;
                    }
                })
            },
            songPlay: function (url,img) {
                this.songUrl = url;
                this.img = img;
                this.message3 = "./img/播放(黑).png";
                this.cd = "run";
                $(".rod").attr("class","rod2");
            },
            playred: function(index){
                $("li img")[index].src = "./img/播放(1).png";
            },
            playblank: function(index){
                $("li img")[index].src = "./img/播放.png";
            },
            palypre1 : function () {
                this.message1 = "./img/上一曲(2).png";
            },
            palypre2 : function () {
                this.message1 = "./img/上一曲(1).png";
            },
            palynext1 : function () {
                this.message2 = "./img/下一曲(2).png";
            },
            palynext2 : function () {
                this.message2 = "./img/下一曲(1).png";
            },
            paly : function (flag) {
                if (flag === 1){
                    // 暂停图片
                    this.message3 = "./img/暂停.png";
                    this.cd = "cd";
                    this.flag = 0;
                }else {
                    // 播放图片
                    this.message3 = "./img/播放(黑).png";
                    this.cd = "run";
                    this.flag = 1;
                }
            }
        },
    })
    // 音频播放与暂停
    var playsong = document.querySelector(".playsong");
    var audio = document.querySelector("audio");
    var rod = document.querySelector(".rod");
    var flag = 1;
    playsong.addEventListener("click", function () {
        if (flag === 1){
            // console.log(audio.paused)
            audio.pause();
            rod.className = "rod3";

            flag = 0;
        }else{
            // console.log(audio.paused)
            audio.play();
            rod.className = "rod2";

            flag = 1;
        }
    })

    var presong = document.querySelector(".presong");
    var nextsong = document.querySelector(".nextsong");
    var photo = document.querySelector(".photo");
    var index = 0;
    var i = 0;

    // 下一曲切换
    nextsong.addEventListener("click",function () {
        console.log(audio.getAttribute("src"));// 获取当前歌曲地址
        for (i = 0; i<arr.length; i++){
            if (audio.getAttribute("src") === arr[i]){
                index = i+1;
                // 如果是最好一首歌曲则回到第一首循环
                if (index === arr.length){
                    index = 0;
                }
            }
        }
        // 歌曲库未导入，不切换专辑图片
        if(arr[0] === undefined){
            return ;
        }
        // 然后把+1了的歌曲地址赋值给播放条
        audio.setAttribute("src",arr[index]);
        // 把+1的专辑图片地址赋值给封面
        photo.setAttribute("src",img[index]);

        // 播放盘转动
        $(".cd").attr("class","run");
        // 播放杠滑下
        rod.className = "rod2";
        // 播放暂停图片变为暂停
        playsong.setAttribute("src","./img/播放(黑).png");
    });

    // 上一曲切换
    presong.addEventListener("click",function () {
        console.log(audio.getAttribute("src"));// 获取当前歌曲地址
        for (i = 0; i<arr.length; i++){
            if (audio.getAttribute("src") === arr[i]){
                index = i-1;
                console.log(index)
                // 如果是第一首歌曲则一直第一首
                if (index === -1){
                    index = 0;
                }
            }
        }
        // 歌曲库未导入，不切换专辑图片
        if(arr[0] === undefined){
            return ;
        }
        // 然后把-1了的歌曲地址赋值给播放条
        audio.setAttribute("src",arr[index]);
        // 把-1的专辑图片地址赋值给封面
        photo.setAttribute("src",img[index]);

        // 播放盘转动
        $(".cd").attr("class","run");
        // 播放杠滑下
        rod.className = "rod2";
        // 播放暂停图片变为暂停
        playsong.setAttribute("src","./img/播放(黑).png");

    })

    // 播放暂停图片变色切换
    playsong.addEventListener("mouseenter",function () {
        playsong.getAttribute("src"); // 当前图片地址
        if(playsong.getAttribute("src") === "./img/暂停.png"){
            playsong.setAttribute("src","./img/暂停(红).png")
        }
        if(playsong.getAttribute("src") === "./img/播放(黑).png"){
            playsong.setAttribute("src","./img/播放(红).png")
        }
    })
    playsong.addEventListener("mouseout",function () {
        playsong.getAttribute("src"); // 当前图片地址
        if(playsong.getAttribute("src") === "./img/暂停(红).png"){
            playsong.setAttribute("src","./img/暂停.png")
        }
        if(playsong.getAttribute("src") === "./img/播放(红).png"){
            playsong.setAttribute("src","./img/播放(黑).png")
        }
    })
})