
const dsnv = new DanhSachNhanVien();
const validation = new Validation();

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

    //console.log(tknv, ten, email, mk, datepicker, luongcb, position, gio);

    //Xử lý dữ liệu cho user => tăng UX
    tknv = tknv.replace(/\s/g, "");

    //isValid: kết quả cuối cùng sau khi kiểm tra hết các dữ liệu
    // true && true => true  ; true && false => false
    // & : BIT (mã nhị phân) 010101 => 1 & 1 => 1 , true (1), false(0)
    var isValid = true;
    //TODO: kiểm tra dữ liệu
    //TODO maSV: kiểm tra rỗng, mã trùng
    isValid &= validation.checkEmpty(tknv, "Tài khoản nhân viên không được để trống", "tbTKNV") && validation.checkIDNV(tknv, "Mã nhân viên không được trùng", "tbTKNV", dsnv.mangNV);
    //isValid = false
    //TODO tenSV: kiểm tra rỗng
    // isValid (mới) = isValid(mã) & checkEmpty(tenSV)

    isValid &= validation.checkEmpty(ten, "Tên nhân viên không được để trống", "tbTen") && validation.checkName(ten, "Tên nhân viên chưa đúng định dạng", "tbTen");

    isValid &= validation.checkEmail(email, "Email nhân viên chưa đúng định dạng", "tbEmail");

    isValid &= validation.checkPass(mk, "Pass phải có ít nhất 1 ký tự chữ, 1 in hoa, 1 số, 1 đặc biệt, từ 6-10 ký tự", "tbMatKhau");

    isValid &= validation.checkDate(datepicker, "Hãy nhập ngày làm cho nhân viên!", "tbNgay");

    isValid &= validation.checkLuongCB(luongcb, "Lương cơ bản không đúng định dạng", "tbLuongCB");

    isValid &= validation.checkDropdown('chucvu', "Bạn chưa chọn chức vụ", "tbChucVu");

    isValid &= validation.checkGioLam(gio, "Giờ không đúng định dạng", "tbGiolam");

    if (isValid) {
        // Hop Le ~~~~~~~~~~~~~~~~ 
        var nv = new NhanVien(tknv, ten, email, mk, datepicker, luongcb, position, gio);
        nv.tinhLuong();
        nv.xepLoai();
        dsnv.themNV(nv);

        hienthi(dsnv.mangNV);
        setLocalStorage();
        //       ~~~~~~~~~~~~~~~~~~

    }

console.log("moi ne!");
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

                <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${nv.tknv}')" >Xem</button>
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

function xemChiTiet(maNVXem) {
    console.log("chay");
    var viTri = dsnv.timVT(maNVXem);
    if (viTri > -1) {
        //tìm thấy
        console.log(dsnv.mangNV[viTri]);

        getELE("tknv").value = dsnv.mangNV[viTri].tknv;
        getELE("tknv").disabled = true;

        getELE("name").value = dsnv.mangNV[viTri].ten;
        getELE("email").value = dsnv.mangNV[viTri].email;
        getELE("password").value = dsnv.mangNV[viTri].mk;
        getELE("datepicker").value = dsnv.mangNV[viTri].datepicker;
        getELE("luongCB").value = dsnv.mangNV[viTri].luongcb;
        getELE("chucvu").value = dsnv.mangNV[viTri].position;
        getELE("gioLam").value = dsnv.mangNV[viTri].gio;
        
    }
}

function capNhatSinhVien() {
    //?1 lấy thông tin mới từ form
    //?2 tạo đối tượng sv cập nhật
    //?3 Gọi phương thức cập nhật của dssv (svCapNhat)

    var tknv = getELE('tknv').value;
    var ten = getELE('name').value;
    var email = getELE('email').value;
    var mk = getELE('password').value;
    var datepicker = getELE('datepicker').value;
    var luongcb = Number(getELE('luongCB').value);
    var position = getELE('chucvu').value;
    var gio = Number(getELE('gioLam').value);

    var svCapNhat = new NhanVien(tknv, ten, email, mk, datepicker, luongcb, position, gio);
    svCapNhat.tinhLuong();
    svCapNhat.xepLoai();

    console.log(svCapNhat);
    dsnv.capNhatNV(svCapNhat);
    setLocalStorage();
    getLocalStorage();

}

function resetForm() {
    //clear hết các trường nhập liệu, reset() chỉ dùng với thẻ form
    getELE("formQLNV").reset();
    getELE("tknv").disabled = false;
}


function timLoaiNV() {
    console.log("tim ne");
    var tuKhoaLoai = getELE("searchName").value;
    var mangKQ = dsnv.timKiemNV(tuKhoaLoai);
    hienthi(mangKQ);
}
getELE("btnTimNV").onclick = timLoaiNV;
getELE("searchName").onkeyup = timLoaiNV;

