var randId = new Date().getTime() + Math.floor(Math.random(9999999));
    const uuid = randId;
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form;
    var $ = layui.jquery
    var layer = layui.layer
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });
    //监听提交
    form.on('submit(formDemo)', function (data) {
        $.ajax({
            url: 'http://localhost:8848/user',
            type: 'GET',
            dataType: 'JSON',
            xhrFields:{
                withCredentials:true
            },
            crossDomain: true,
            contentType: "application/json;charset=utf-8",
            data: data.field,
            success: function (res) {
                if(res.code == 200){
                    layer.msg(res.msg)
                    console.log(res.data.uid)
                    sessionStorage.setItem("uid", res.data.uid);
                    // console.log(sessionStorage.getItem("uid"))
                    window.location.href = "http://localhost:8080/?uid="+res.data.uid;
                }else{
                    layer.msg(res.msg,{icon:2},function () {
                        changeCode();
                    })

                }

            }
        })
        return false;
    });

    document.getElementById('Uuid').value = uuid;
    
    $('#codeImg').attr('src',"http://localhost:8848/code?date="+new Date() + "&uuid=" + uuid);


});



function changeCode(){
    // window.localStorage
    var img = document.getElementById("codeImg");
    img.src = "http://localhost:8848/code?date="+new Date() + "&uuid=" + uuid;
}