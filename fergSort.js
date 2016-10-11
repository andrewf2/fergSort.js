// The algorithm starts by getting 4 equally spaced out indices in the array, these will be the reference points
Array.prototype.getRefs = function(){
    var length = this.length -1
    var q2 = Math.floor(length * 0.5)
    var q1 = 0
    var q3 = Math.round(Math.round(q2 + length) / 2)
    var q4 = this.length-1
    var refs = [this[q1],this[q2],this[q3],this[q4]]
    this.refs = refs
    this.q1 = q1
    this.q2 = q2
    this.q3 = q3
    this.q4 = q4
    return this
}
// Once the refs are found they are then sorted. (this algorithm can quickSort or heapSort, just quickly sort these 4 reference points)
function sortRefs(arr){
    arr.getRefs()
    var refs = quickSort(arr.refs)
    arr.refs = refs
    arr[arr.q1] = arr.refs[0]
    arr[arr.q2] = arr.refs[1]
    arr[arr.q3] = arr.refs[2]
    arr[arr.q4] = arr.refs[3]
    return arr
}

function fergSort(arr){
    //the base case is as soon as the Array is two or less in length. Swap them if needed and return the array
    if(arr.length <= 2){
        if(arr[0] > arr[1]){
            var temp = arr[0]
            arr[0] = arr[1]
            arr[1] = temp
        }
        return arr
    }
    //Sort the reference points from the functions defined above
    arr = sortRefs(arr)
    //initialize the four arrays that will be used later
    var j = 0
    var q1 = []
    var q2 = []
    var q3 = []
    var q4 = []
    //go through the array and compare each point to the reference points, if less or equal then ref point1 than its going to q1 and so on and so forth
    //with all the points until each of the four arrays has collected its corresponding quadrant from the reference points
    while(j <= arr.length-1){
        if(arr[j] > arr.refs[1]){
            if(arr[j] <= arr.refs[3]){
                q3.push(arr[j])
            }else{
                q4.push(arr[j])
            }
        }else{
            if(arr[j] <= arr.refs[0]){
                q1.push(arr[j])
            }else{
                q2.push(arr[j])
            }
        }
        j++
    }
    //now that we have psuedo sorted the large array into four sepreate chunks... 
    //recursively go through the four arrays and concatentate the results to each other
    return fergSort(q1).concat(fergSort(q2).concat(fergSort(q3).concat(q4)))
}