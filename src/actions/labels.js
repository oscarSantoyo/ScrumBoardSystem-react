import axios from 'axios'

export const fetchLabels=(dispatch)=>{
    axios.get('/apiuserstories/labels')
    .then(res=>res.data)
    .then(labels=>{
        dispatch(fetchedLabels(labels))})
    return {
        type:"FETCH_LABELS"
}
}

export const fetchedLabels=(labels)=>({
    type:"FETCHED_LABELS",
    labels
})
