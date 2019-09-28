function getQueryParam(param) {
    return (location.search.split(`${param}=`)[1]||'').split('&')[0]
}

const tokenField = document.getElementById("token");
tokenField.value = getQueryParam("token");