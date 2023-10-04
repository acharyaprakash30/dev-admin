import { push } from 'connected-react-router';
import {
    all, call, delay, fork,
    put, takeLatest
} from 'redux-saga/effects';

import actions from './actions';

import {
    singlePlaceholderItems,
    deletePlaceholderItem,
    updatePlaceholderItem
} from '../../../../api/placeholderItems/index'
import ShowMessage from '../../../../components/Toast/Toast';

const LIST_PLACEHOLDER_GROUP_ROUTE = '/dashboard/placeholders';
const DELAY_COUNTER = 250;





function* callPlaceholderItems(action) {

    try {
        let apiResponse = yield call(singlePlaceholderItems, action.id);

        let { data } = apiResponse;

        yield put({
            type: actions.FETCH_PLACEHOLDER_ITEMS_SUC,
            payload: data,
            status: 200
        });



    } catch (err) {

        if (err && err?.response) {
            yield put({
                type: actions.FETCH_PLACEHOLDER_ITEMS_FAIL,
                payload: err.reponse.data.error.message,
            });
        }


    }
}



function* callPlaceholderItemDelete(action) {

    //    

    try {

        let { status } = yield call(deletePlaceholderItem, action.id);

        const message = "Placeholder Item Deleted Successfully";


        yield put({
            type: actions.DELETE_PLACEHOLDER_ITEM_SUC,
            statusCode: status,
            id: action.id
        });

        //yield put(actions.singlePlaceholderItemsRequest(action.id));

        yield ShowMessage(status, message);

        yield delay(DELAY_COUNTER);

        yield put(push(`/dashboard/placeholder/${action.id}/show`));



    } catch (error) {

        if (error && error?.response) {

            yield put({

                type: actions.DELETE_PLACEHOLDER_ITEM_FAIL,

                message: error.response.data.error.message

            })
        }

    }
}

function* callPlaceholderItemUpdate(action) {


    try {

        let { status } = yield call(updatePlaceholderItem, action.id, action.data);


        const message = "Placeholder Item Updated Successfully";


        yield put({
            type: actions.EDIT_PLACEHOLDER_ITEM_SUC,
            statusCode: status
        });


        yield ShowMessage(status, message);

        yield put(actions.singlePlaceholderItemsRequest(action.data.placeholderId));

        yield delay(DELAY_COUNTER);

        yield put(push(`/dashboard/placeholder/${action.data.placeholderId}/show`));








    } catch (error) {



        if (error && error.response) {

            yield put({

                type: actions.EDIT_PLACEHOLDER_ITEM_FAIL,

                message: error.response.data.error.message


            })


        }

    }

}



export function* watchfetchAllPlaceholderItems() {

    yield takeLatest(actions.FETCH_PLACEHOLDER_ITEMS_REQ, callPlaceholderItems);

}

export function* watchDeletePlaceholderItem() {

    yield takeLatest(actions.DELETE_PLACEHOLDER_ITEM_REQ, callPlaceholderItemDelete);
}

export function* watctUpdatePlaceholderItem() {

    yield takeLatest(actions.EDIT_PLACEHOLDER_ITEM_REQ, callPlaceholderItemUpdate);
}




export default function* placeholderItemsSaga() {
    return yield all([
        fork(watchfetchAllPlaceholderItems),
        fork(watchDeletePlaceholderItem),
        fork(watctUpdatePlaceholderItem)

    ]);
}
