// UserInfo class JS code

export default class UserInfo {
    constructor({ userNameSelector, userJobSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
        this._id = "";
    }

    getUserInfo() {
       const userInfo = { name: this._userName.textContent, about: this._userJob.textContent, id: this._id };
       return userInfo;
    }

    setUserInfo({ name, about, _id }) {
        this._userName.textContent = name;
        this._userJob.textContent = about;
        this._id = _id;
    }
}
