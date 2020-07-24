let ajaxTimes = 0;
export const request = (options) => {
    ajaxTimes++;
    wx.showLoading({title: '加载中', mask: true});
    const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...options,
            url: baseURL + options.url,
            data: options.data,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if(ajaxTimes === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}