function DanhSachNhanVien(){
    // Thuộc tính
    this.mangNV = [];

    this.themNV = function (nv) {
        this.mangNV.push(nv);
    }

    this.timVT = function (maNVxoa) {
        var vt = -1;

        vt = this.mangNV.findIndex(function(nv) {
            return maNVxoa == nv.tknv;
        })
        return vt;
    }
    
    this.xoaNV = function(maNVxoa) {
        var vt = this.timVT(maNVxoa);
        if (vt != -1) {
            this.mangNV.splice(vt,1);
        }
    }

}