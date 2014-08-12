$(function () {

    // 右边终端效果
    var html = '(● ◡ ●)ﾉ♥ 嗨，欢迎光临！我叫李江华，你想了解我的什么呢？\n用法：\n　　1.　简洁版简历\n　　2.　文艺版简历\n　　3.　github版简历\n　　4.　获取纸质简历（PDF格式，中文）\n　　5.　Getting paper resume（PDF，English）\n　　6.　给我留言\n　　7.　回到博客首页\n请输入你想了解的编号：\n';
    var jqconsole = $('#console').jqconsole(html, 'Ξ ~/ByronleeStyle git:(master) ▶ ', 'I like you! and you?');

    var startPrompt = function () {
        // Start the prompt with history enabled.
        jqconsole.Prompt(true, function (input) {
            // Output input with the class jqconsole-output.
            switch (input) {
                case "1":
                    window.open("https://gist.github.com/Byronlee/b00a1a24c67f1f6c49d5")
                    break;
                case "2":
                    window.open("/resume/show.html")
                    break;
                case "3":
                    window.open("http://resume.github.io/?Byronlee")
                    break;
                case "4":
                    window.location.href="https://raw.githubusercontent.com/Byronlee/byronlee.github.io/master/resume/%E4%B8%AA%E4%BA%BA%E7%AE%80%E5%8E%86%E6%9D%8E%E6%B1%9F%E5%8D%8E%EF%BC%88%E4%B8%AD%E6%96%87%EF%BC%89.pdf"
                    break;
                case "5":
                    window.location.href="https://raw.githubusercontent.com/Byronlee/byronlee.github.io/master/resume/Byronlee's%20resume%EF%BC%88English%EF%BC%89.pdf"
                    break;
                case "6":
                    alert("Please Email To Me: lbyronlee@gmail.com")
                    break;
                case "7":
                    window.open("/")
                    break;
                default:
                    jqconsole.Write(html, 'jqconsole-output');
            }

            startPrompt();
        });
    };
    startPrompt();


    // 左面黑客效果
    var TheMatrix = {
        height: window.screen.height,    //浏览器高
        width: window.screen.width * 0.32,    //浏览器宽
        speed: 35,    //下降速度

        createDIV: setInterval(function () {    //生成div
            var div = document.createElement("div");
            var posy = 0;
            div.style.left = Math.round(Math.random() * TheMatrix.width) + "px";
            div.style.fontSize = Math.round(Math.random() * 50) + "px";
            div.style.opacity = Math.random().toFixed(1);
            div.innerHTML = Math.round(Math.random() * 100000000000000000);
            document.getElementById("heike").appendChild(div);
            var moveDIV = setInterval(function () {
                //alert(posy);
                div.innerHTML = Math.round(Math.random() * 100000000000000000);
                div.style.top = posy - TheMatrix.height + "px";
                posy += TheMatrix.speed;
                if (parseInt(div.style.top) > TheMatrix.height) {
                    document.getElementById("heike").removeChild(div);
                    clearInterval(moveDIV);
                }
            }, 20);
        }, 25)
    }
    //x  setInterval(TheMatrix.createDIV(),50);

});
  
