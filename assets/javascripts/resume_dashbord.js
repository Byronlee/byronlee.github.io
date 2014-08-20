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
                    window.location.href="http://p4.dfs.kuaipan.cn/cdlnode/dl/?ud=N2MiQ4a9ArYaZQ3qg9qUYHgE31sHL9IJ4RfjJnmY6j8~0-http:@@180.97.176.115@ufa_new@~DOwXdfHQpsuGmP4Yu)obCYVum1lRH3c-0-@0-AAAAAAAAAAAAAAAAAAAAAAAAAAA-u(IlcNHEZk)Ue6XuSguwbjODUZLASKNcNBDmCNle4fs-76189d5e50250c-0-0~1&src=12285642281065905-846871-MDAyYmE1YmE2MWUzNDdhYWI1MmE1ZGNjZGUyNzkxOWQtMTg1MDI5MDQyNw-&tm=1408502218&cip=171.216.71.45&bea=YXR0YWNobWVudDtmaWxlbmFtZT3kuKrkurrnroDljobmnY7msZ/ljY7vvIjkuK3mlofvvIkucGRmOw=="
                    break;
                case "5":
                    window.location.href="http://p3.dfs.kuaipan.cn/cdlnode/dl/?ud=HDqk5(rdGAMADEzY7s3yQghq)eDYzVp70(XYmcckg4Y~0-http:@@112.84.131.18@ufa_new@~BjT5NEiNzNxc7LmVDblhfgiRHiOsIys-0-@0-AAAAAAAAAAAAAAAAAAAAAAAAAAA-sgC5yNZ0tSEFolzq8TuK(nVzvRT9YannB(G3Ex2N6TE-76189d5250260c-0-0~1&src=12285642281065903-406777-MDAyYmE1YmE2MWUzNDdhYWI1MmE1ZGNjZGUyNzkxOWQtMTg1MDI5MDQyNw-&tm=1408502224&cip=171.216.71.45&bea=YXR0YWNobWVudDtmaWxlbmFtZT1CeXJvbmxlZSdzIHJlc3VtZe+8iEVuZ2xpc2jvvIkucGRmOw=="
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
  
