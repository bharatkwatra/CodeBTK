let employees = getemployeedata();

export function getemployeedata()
{
return fetch("http://localhost:23372/api/getcategories")
.then((resp) => resp.json())
.then(function(data) {
  let authors = data.result;
  //let employees = JSON.parse(data.result);
  return authors.map(x => ({
    ...x,
    _capicitycategory: authors[x.capacityCategory],
    _teamcost: authors[x.teamCost]
}))
})
.catch(function(error) {
  console.log(error);
});

}
