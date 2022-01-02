// UserInfo class JS code

export default class UserInfo {
    constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
        this._id = "";
        this._avatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
       const userInfo = { name: this._userName.textContent, about: this._userJob.textContent, id: this._id, avatar: this._avatar.src };
       return userInfo;
    }

    setUserInfo({ name, about, _id, avatar }) {
        this._userName.textContent = name;
        this._userJob.textContent = about;
        this._id = _id;
        this._avatar.src = avatar;
    }

    setAvatarLink({ avatar }) {
        this._avatar.src = avatar;
    }
}
