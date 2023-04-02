import axios from 'axios';
const ServerURL = 'http://10.0.2.2:5000';

const getData = async url => {
  try {
    var response = await fetch(`${ServerURL}/${url}`);
    var result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
};
const getToken = async () => {
  var response = await fetch(`${ServerURL}/admin/getToken`);
  var result = await response.json();
  console.log('100000', result);
  return result.token;
};

const isValidAuth = async () => {
  try {
    var token = await getToken();
    console.log('GEt Token', token);
    var response = await fetch(`${ServerURL}/admin/isUserAuth`, {
      headers: {authorization: token},
    });

    var result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
};

const postData = async (url, body) => {
  try {
    var response = await axios.post(`${ServerURL}/${url}`, body);
    var result = await response.data;
    return result;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export {ServerURL, postData, getData, isValidAuth};
