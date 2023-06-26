fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza')
.then((response)=>{
    return response.json()
})
.then((data)=>{
    console.log(data);
})