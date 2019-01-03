export default {
    name: "zh_TW",
    messages: {
        _default: function (field) {
            return "無效"
        },
        after: function (field, args) {
            return "必須要晚於 " + args[0]
        },
        alpha: function (field) {
            return "只能以字母組成"
        },
        alpha_dash: function (field) {
            return "只能以字母、數字及斜線組成"
        },
        alpha_num: function (field) {
            return "只能以字母及數字組成"
        },
        alpha_spaces: function (field) {
            return "只能以字母及空格組成"
        },
        before: function (field, args) {
            return "必須要早於 " + args[0]
        },
        between: function (field, args) {
            return "必須介於 " + args[0] + " 至 " + args[1] + "之間"
        },
        confirmed: function (field, args) {
            // return "與 " + args[0] + " 不一致"
            return "輸入不一致"
        },
        credit_card: function (field) {
            return "格式錯誤"
        },
        date_between: function (field, args) {
            return "必須在 " + args[0] + " 和 " + args[1] + " 之間"
        },
        date_format: function (field, args) {
            return "不符合 " + args[0] + " 的格式"
        },
        decimal: function (field, args) {
            void 0 === args && (args = []);
            var t = args[0];
            return void 0 === t && (t = "*"), "必須是數字，而且能夠保留 " + ("*" === t ? "" : t) + " 位小數"
        },
        digits: function (field, args) {
            return "必須是 " + args[0] + " 位數字"
        },
        dimensions: function (field, args) {
            return "圖片尺寸不正確，必須是 " + args[0] + " 像素到 " + args[1] + " 像素"
        },
        email: function (field) {
            return "必須是有效的電子郵件地址"
        },
        excluded: function (field) {
            return "所選擇的選項無效"
        },
        ext: function (field) {
            return "必須是有效的檔案"
        },
        image: function (field) {
            return "必須是一張圖片"
        },
        included: function (field) {
            return "所選擇的選項無效"
        },
        integer: function (field) {
            return "必須是整數"
        },
        ip: function (field) {
            return "必須是一個有效的 IP 位址"
        },
        length: function (field, args) {
            var t = args[0],
                r = args[1];
            return r ? "長度必須在 " + t + " 到 " + r + " 之間" : "長度必須為 " + t
        },
        max: function (field, args) {
            return "不能大於 " + args[0] + " 個字元"
        },
        max_value: function (field, args) {
            return "不得大於 " + args[0]
        },
        mimes: function (field) {
            return "必須是有效的檔案類型."
        },
        min: function (field, args) {
            return "不能小於 " + args[0] + " 個字元"
        },
        min_value: function (field, args) {
            return "不得小於 " + args[0]
        },
        numeric: function (field) {
            return "必須為一個數字"
        },
        regex: function (field) {
            return "格式錯誤"
        },
        required: function (field) {
            return "不能留空"
        },
        size: function (field, args) {
            var t, r, u, i = args[0];
            return "大小必須小於 " + (t = i, r = 1024, u = 0 == (t = Number(t) * r) ? 0 : Math.floor(Math.log(t) / Math.log(r)), 1 * (t / Math.pow(r, u)).toFixed(2) + " " + ["Byte", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][u]) + "."
        },
        url: function (field) {
            return "格式錯誤"
        }
    }
};
