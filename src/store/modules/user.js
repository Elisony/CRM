// const str = 'http://cs.xhfwy.com/public/index.php/client/v3';
const str = 'https://xhfwy3.sanhedao.com.cn/public/index.php/client/v3';

import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        Login({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/user/login', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //验证码
        getCode({commit}, data) {
            return new Promise((relove, reject) => {
                axios.get(str + '/user/verfiy', {responseType: 'arraybuffer'})
                    .then(data => {
                        relove(data.data)
                    })
            })
        },
        //个人信息
        myPersonal({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/home/showall', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //个人收益
        myProfit({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/home/show', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //文章删除
        deleteData({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/content/del', data)
                    .then(data => {
                        console.log(data)
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //视频删除
        videoDeleteData({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/video/del', data)
                    .then(data => {
                        console.log(data)
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //文章添加
        articleEdit({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/content/add', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data.message);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //视频上传
        uploadVideo({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/video/add', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data.message);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //文章修改
        UpdataEdit({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/content/edit', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data.message);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //视频修改
        UpdataVideo({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/video/edit', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data.message);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //文章列表
        articleList({commit}, data) {
            return new Promise((rselove, rejsect) => {
                axios.post(str + '/content/showall', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            rselove(data.data);
                        } else {
                            rejsect(data.message);
                        }
                    })
            })
        },
        //视频列表
        videoList({commit}, data) {
            return new Promise((rselove, rejsect) => {
                axios.post(str + '/video/showall', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            rselove(data.data);
                        } else {
                            rejsect(data.message);
                        }
                    })
            })
        },
        //文章详情
        articleDetails({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/content/show', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data.data);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //视频详情
        videoDetails({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/video/show', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data.data);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },
        //文章分类
        articleClass({commit}, data) {
            return new Promise((relove, reject) => {
                axios.post(str + '/content/cate', data)
                    .then(data => {
                        var data = data.data;
                        if (Number(data.code) == 10000) {
                            relove(data.data);
                        } else {
                            reject(data.message);
                        }
                    })
            })
        },

    }
}

export default user
