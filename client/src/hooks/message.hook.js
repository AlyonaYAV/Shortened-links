import {useCallback} from 'react';

export const useMessage = ()=>{
//To avoid an endless reqursion - useCallback()
    return useCallback ( (text)=>{
        //if Materialize exists
        if(window.M && text){
            window.M.toast( {html: text} );
        }
    },[]);
};