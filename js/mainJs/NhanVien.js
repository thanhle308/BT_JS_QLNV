function NhanVien(tknv,ten,email,mk,datepicker,luongcb,position,gio) {
    // Thuộc tính
    this.tknv = tknv;
    this.ten = ten;
    this.email = email;
    this.mk = mk;
    this.datepicker = datepicker;
    this.luongcb = luongcb;
    this.position = position;
    this.gio = gio;

    this.luong = "";
    this.xl = "";
    // Phuơng thức
    this.tinhLuong = function () {
        if (this.position == 1) {
            this.luong = (this.luongcb);
        } else if (this.position == 2) {
            this.luong = (this.luongcb * 2);
        } else {
            this.luong = (this.luongcb * 3);
        }
    }
    this.xepLoai = function () {
        if (this.gio < 160) {
            this.xl = "Nhân viên trung bình";
        } else if ((this.gio >= 160) && (this.gio < 176)) {
            this.xl = "Nhân viên khá";
        } else if ((this.gio >= 176) && (this.gio < 192)) {
            this.xl = "Nhân viên giỏi";
        } else if (this.gio >= 192) {
            this.xl = "Nhân viên xuất sắc";
        }
    }
}