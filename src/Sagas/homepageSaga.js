import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, PUSH_DEVICE_TOKEN } from './../Constants/homepageConstain';
import Config from '../config';
import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects'
import { getData } from '../Utilities/Storage';

function* fetchData() {
    try {
        const data = yield getData('userData');
        const response = yield axios.get(`${Config.api.api_base_url}/api/homePage`, { headers: { "Authorization": `Bearer ${data}` } });
        if (response.data.success) {
            yield put({ type: FETCHING_DATA_SUCCESS, data: response.data.data })
        }
    } catch (e) {
        yield put({ type: FETCHING_DATA_FAILURE })
    }
}

function* pushDeviceToken() {
    try {
        const data = yield getData('userData');
        const device = yield getData('deviceToken');
        let token = device.token;
        let os = device.os;
        if (os == "ios") {
            console.log(token)
            const body = {
                application: "com.novapharm.tuthuoc",
                sandbox: false,
                apns_tokens: [
                    token
                ]
            }
            const ios = yield axios.post(
                `https://iid.googleapis.com/iid/v1:batchImport`,
                body,
                {
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": "key=AAAA8Z1dGjQ:APA91bHW4aUvDknaBAD1FeYLehrEhJ3_4F1VEqRbXQf0cAdxLyuCCKY8mOKUcamsJffDfL4xelQWvVKU1mvaiLdXMDeEaa-g4lVXZ8RAm7oGSgfawlcLlmSeq0wskSTLaAdNbLI6lOjN"
                    }
                });

            if (ios.status == 200) {
                console.log(ios.data.results[0].registration_token)
                token = ios.data.results[0].registration_token;
            }
        }
        console.log(token);
        const configurationObject = {
            method: 'put',
            url: `${Config.api.api_base_url}/api/device_token?device_token=${token}&device_type=${os == "ios" ? 1 : 2}`,
            headers: {
                'Authorization': `Bearer ${data}`,
                'Accept': 'application/json'
            }
        };
        const response = yield axios(configurationObject);
        if (response.data.success) {
            console.log("Push device token success!")
        }
    } catch (e) {
    }
}


function* dataSaga() {
    yield takeEvery(FETCHING_DATA, fetchData)
    yield takeEvery(PUSH_DEVICE_TOKEN, pushDeviceToken)
}

export default dataSaga