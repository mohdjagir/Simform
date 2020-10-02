import * as Constants from '../Utils/Constant/index'

export async function callApi(methodType, apiUrl, requestBody) {
   
    let requestHeaders;

    if (methodType === Constants.METHOD_TYPE_POST) {
        requestHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        new_requestBody = JSON.stringify(requestBody)
        console.log("new_requestBody", new_requestBody)
        return await fetch(apiUrl, {
            method: methodType,
            headers: requestHeaders,
            body: new_requestBody,
        }).then((response) => {
            const statusCode = response.status;
            console.log("statusCode", statusCode);
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
            .then(([statusCode, data]) => {
                console.log("data=========", data);
                const responseObj = {
                    data: data,
                    statusCode: statusCode
                }
                return responseObj;
            })
            .catch((error) => {
                console.error(error);
            });

    }
    else if (methodType === Constants.METHOD_TYPE_GET) {
        requestHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        return await fetch(apiUrl, {
            method: methodType,
            headers: requestHeaders
        }).then((response) => {
            const statusCode = response.status;
            console.log("statusCode", statusCode);
            const data = response.json();
            console.log("data==",data)
            return Promise.all([statusCode, data]);
        })
            .then(([statusCode, data]) => {
                console.log("data get=========", data);
                var responseObj;
                if(data && data.length > 0){
                    let newData={chemical:data}
                        responseObj = {
                        data: newData,
                        statusCode: statusCode
                    }
                }else{
                        responseObj = {
                        data: data,
                        statusCode: statusCode
                    }
                }
                return responseObj;
            })
            .catch((error) => {
                console.error(error);
            });

    }
}

