/**
 *
 * Copyright 2015-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {Toast} from 'antd-mobile'
import {BASEURL} from '../configs/AppProp';

export const request = (url, method, body) => {
    let isOk;
    return new Promise((resolve, reject) => {
        fetch(BASEURL+url, {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body
        })
            .then((response) => {
                if (response.ok) {
                    isOk = true;
                } else {
                    isOk = false;
                }
                if (response.status == 200) {
                    return response.json();
                }
                if (response.status == 404) {
                    Toast.fail("请求页面未找到!");
                }
                if (response.status == 500) {
                    Toast.fail("服务器内部错误!");
                }
                return response;
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
