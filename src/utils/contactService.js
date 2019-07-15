import tokenService from './tokenService'

const BASE_URL = '/api/contacts/'

function create(contact, user) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            // Add this header - don't forget the space after Bearer
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify({contact, user})
    }
    return fetch(BASE_URL + 'create', options).then(res => res.json());
}

function index(user) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify({user})
    }
    return fetch(BASE_URL + 'all', options).then(res => res.json())
}

export default {
    create,
    index
}
