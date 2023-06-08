function suaThucDon(){
    var textareas = document.getElementsByTagName("textarea");
    for (var textarea of textareas){
    textarea.readOnly = false;
    }
    var nhapTuanHoc = document.getElementById("nhapTuanHoc");
    nhapTuanHoc.readOnly = true;
    var lapLai = document.getElementById("lapLai");
    lapLai.disabled = true;
    var luuButton = document.getElementById("luuButton");
    luuButton.hidden = false;
    var huySuaThucDon = document.getElementById("huySuaButton");
    huySuaThucDon.hidden = false;
}
function huySuaThucDon(){
    var textareas = document.getElementsByTagName("textarea");
    for (var textarea of textareas){
        textarea.readOnly = true;
    }
    var nhapTuanHoc = document.getElementById("nhapTuanHoc");
    nhapTuanHoc.readOnly = false;
    var lapLai = document.getElementById("lapLai");
    lapLai.disabled = false;
    var luuButton = document.getElementById("luuButton");
    luuButton.hidden = true;
    var huySuaThucDon = document.getElementById("huySuaButton");
    huySuaThucDon.hidden = true;
    var stuan_hoc = document.getElementById("tuanHoc").innerText;
    var tuanHoc = parseInt(stuan_hoc);
    location.replace("/thuc_don/"+tuanHoc);
}

function lapLaiThucDonChoCaThang(){
    var tuan_hoc = document.getElementById("tuanHoc");
    var tuanHoc = tuan_hoc.innerText;
    if (confirm("Lặp lại thực đơn tuần "+tuanHoc+" cho cả tháng")==true) {

        fetch('/api/loop_for_month', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: tuanHoc
        })
            .then(function (response) {
                // Xử lý kết quả trả về ở đây
                console.log(response);
                alert("Thực hiện thành công!");
            })
            .catch(function (error) {
                // Xử lý lỗi ở đây
                console.log("Đã xảy ra lỗi trong quá trình gửi yêu cầu.");
            });
    } else{
        alert("Đã hủy lặp lại thực đơn cho cả tháng!");
    }
}
function luuThucDon(){
    if (confirm("Lưu thực đơn")==true) {
        var ngays = document.getElementsByClassName("ngay");
        let ngayList = [];
        for (var ngay of ngays)
            ngayList.push(ngay.textContent);

        var sangs = document.getElementsByClassName("sang");
        let sangList = [];
        for (var sang of sangs) {
            sangList.push(sang.value);
        }

        var truas = document.getElementsByClassName("trua");
        let truaList = [];
        for (var trua of truas) {
            truaList.push(trua.value);
        }

        var chieus = document.getElementsByClassName("chieu");
        let chieuList = [];
        for (var chieu of chieus) {
            chieuList.push(chieu.value);
        }

        var myData = {
            "ngayList": ngayList,
            "sangList": sangList,
            "truaList": truaList,
            "chieuList": chieuList
        }
        fetch('/api/mydata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData)
        })
            .then(function (response) {
                // Xử lý kết quả trả về ở đây
                console.log(response);
            })
            .catch(function (error) {
                // Xử lý lỗi ở đây
                console.log("Đã xảy ra lỗi trong quá trình gửi yêu cầu.");
            });
        var stuan_hoc = document.getElementById("tuanHoc").innerText;
        var tuanHoc = parseInt(stuan_hoc);
        alert("Thực hiện thành công!");
        location.reload();
    }
}
function hienThiThucDonCuaTH(){
    var stuanHoc = document.getElementById("nhapTuanHoc").value;
    var tuanHoc = parseInt(stuanHoc);
    if (tuanHoc<1 || tuanHoc>37) {
        alert("Tuần học này không tồn tại!");
        return 0;
    }
    location.replace("/thuc_don/"+tuanHoc);
}