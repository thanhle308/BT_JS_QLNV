
const dsnv = new DanhSachNhanVien();

// Tạo hàm viết ngắn gọn cho cú pháp 
function getELE(id) {
    return document.getElementById(id);
}


function setLocalStorage() {
    //?lưu mảng SV xuống localStorage
    //? dữ liệu của localStorage hay BE là dữ liệu JSON
    //?input: array (mangSV) => JSON

    //localStorage, JSON: đối tượng cung cấp sẵn của JS
    //stringify : array, object => JSON
    //setItem("tên local", JSON)
    localStorage.setItem("dsNhanVien", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
    //? 1 .getItem("tên local") => trả kết là JSON
    //? 2. parse: JSON => mảng
    //? 3. lưu vào dssv.mangSV

    // mangSV = [] => push, for
    //!mangSV  = null/undefine => không dùng được push, for
    if (localStorage.getItem("dsNhanVien") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("dsNhanVien"));
        hienthi(dsnv.mangNV);
    }

}
// chạy khi load trang
getLocalStorage();


function themNhanVien() {
    // NhanVien(tknv,ten,email,mk,datepicker,luongcb,position,gio)

    var tknv = getELE('tknv').value;
    var ten = getELE('name').value;
    var email = getELE('email').value;
    var mk = getELE('password').value;
    var datepicker = getELE('datepicker').value;
    var luongcb = Number(getELE('luongCB').value);
    var position = getELE('chucvu').value;
    var gio = Number(getELE('gioLam').value);

    console.log(tknv, ten, email, mk, datepicker, luongcb, position, gio);

    // Hop Le ~~~~~~~~~~~~~~~~ 
    var nv = new NhanVien(tknv, ten, email, mk, datepicker, luongcb, position, gio);
    nv.tinhLuong();
    nv.xepLoai();
    dsnv.themNV(nv);

    hienthi(dsnv.mangNV);
    setLocalStorage();
    //       ~~~~~~~~~~~~~~~~~~


}

function hienthi(mang) {
    var noidung = "";
    mang.map(function (nv, index) {
        noidung += `<tr>
        <td>${nv.tknv}</td>
        <td>${nv.ten}</td>
        <td>${nv.email}</td>
        <td>${nv.datepicker}</td>
        <td>${nv.position}</td>
        <td>${nv.luong}</td>
        <td>${nv.xl}</td>
        <td>
        <button class="btn btn-danger mb-2" onclick="xoaNhanVien('${nv.tknv}')" >Xóa</button>

                <button class="btn btn-success" onclick="" >Xem</button>
        </td>
        </tr>`
    });

    getELE('tableDanhSach').innerHTML = noidung;
}

function xoaNhanVien(maNVXoa) {
    dsnv.xoaNV(maNVXoa);
    setLocalStorage();// cập nhật local
    getLocalStorage();// lấy local đã update lên hiển thị
}



