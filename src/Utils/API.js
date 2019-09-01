import axios from 'axios';
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',

}

const burl = "http://localhost:8000"
//const burl = "https://do-you-wanna-bet.herokuapp.com"


export default {
    login : function(email,password) {
        return axios.post(burl + '/user/login',{'email' : email,'password' : password},{headers: headers})
    },
    signup : function(send){
        return axios.post(burl + '/user/signup',send,{headers: headers})
    },
    searchFriends: function(searchedText){
        return axios.post(burl + '/user/searchFriends',{'userName':searchedText},{headers: headers})
    },
    toggleFriend: function(idOfMyAccount, tabOfIdOfFriends){
        return axios.post(burl + '/user/toggleFriend',{'idOfMyAccount':idOfMyAccount,'updatedFields':{"friends":tabOfIdOfFriends}},{headers: headers})
    },
    createBet: function(newBet){
        return axios.post(burl + '/user/createBet',newBet,{headers: headers})
    },
    updateUserBets : function(id, props){
        return axios.post(burl + '/user/createBet',{'updatedFields' : props,'id':id,},{headers: headers})
    },
    getBetDataByID: function(id){
        return axios.post(burl + '/user/getBetDataByID',{'id':id},{headers: headers})
    },
    getFullBetDataByID: function(id){
        return axios.post(burl + '/user/getFullBetDataByID',{'id':id},{headers: headers})
    },
    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    logout : function() {
        localStorage.clear();
    },
    getUserDataByEmail :function(email){
      return axios.post(burl + '/user/getUserDataByEmail',{'email' : email,},{headers: headers})
    },
    getUserDataByID :function(id){
      return axios.post(burl + '/user/getUserDataByID',{'id' : id,},{headers: headers})
    },
    getUsersDataByID :function(tabOfId){
      return axios.post(burl + '/user/getUsersDataByID',{'tabOfId' : tabOfId,},{headers: headers})
    },
    setUserInfo:function(props, email){
      //console.log(email)
      return axios.post(burl + '/user/setUserInfo',{'updatedFields' : props,'email' : email,},{headers: headers})
    },
    newEmail:function(props, email){
      return axios.post(burl + '/user/newEmail',{'updatedFields' : props,'email' : email,},{headers: headers})
    },
    setWinner:function(bet, win){
      return axios.post(burl + '/user/setWinner',{'bet' : bet,'win' : win,},{headers: headers})
    }
}
