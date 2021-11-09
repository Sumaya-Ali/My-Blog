 import * as t from "../types";

 export const setIds = (Ids: Array<String>) =>(
{
    type: t.SET_IDS,
    payload: Ids
}
 );