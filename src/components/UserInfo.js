// UserInfo class JS code

export default class UserInfo {
    constructor({ userNameSelector, userJobSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
    }

    getUserInfo() {
       const userInfo = { name: this._userName.textContent, about: this._userJob.textContent };
       return userInfo;
    }

    setUserInfo({ name, about }) {
        this._userName.textContent = name;
        this._userJob.textContent = about; 
    }
}