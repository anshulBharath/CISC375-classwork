
function getCharacter(){
    let person_id = $('#person')[0].value;
    let person_name = '';
    getJSON('https://swapi.dev/api/people/' + person_id).then((data) => {
        person_name = data.name;
        return getJSON(data.homeworld);
    }).then((data) => {
        $('#results').append('<li>' + person_name + ' is from ' + data.name + '</li>')
    });

}

function changeColors(){

}

function getJSON (url) {
    return new Promise ((resolve, reject) => {
        $.getJSON(url, (data) =>{
            resolve(data);
        });
    });
}