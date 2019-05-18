export default (arr)=>{
    let quickSort = (arr) =>{
        let len = arr.length;
        if(len<2){
            return arr
        }else{
            let flag = arr[0];
            let left = [];
            let right = [];
            for(let i=1,temp;i<len;i++){
                temp = arr[i];
                if(temp<flag){
                    left.push(temp);
                }else{
                    right.push(temp)
                }
            }
            return quickSort(left).concat(flag,quickSort(right));
        }
    }
    return quickSort(arr);
}