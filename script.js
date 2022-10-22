import {c, $} from './helpers.js'
import {client} from './token.js'

const AUTH_URL = 'https://accounts.spotify.com/authorize'
const REDIRECT_URL = 'http://localhost:5501/'
const SCOPES = ['user-read-playback-state', 'app-remote-control', 'user-modify-playback-state', 'playlist-read-private', 'user-follow-modify', 'user-follow-read', 
                'user-read-currently-playing', 'user-read-playback-position', 'user-library-modify', 'playlist-modify-private', 'playlist-modify-public', 'user-top-read',
                'user-read-recently-played', 'user-read-private', 'user-library-read']
const SCOPES_PARAM = SCOPES.join('%20')

let url = AUTH_URL 
url += '?client_id=' + client.id
url += '&response_type=token'
url += '&redirect_uri=' + REDIRECT_URL
url += '&show_dialog=true'
url += '&scope=' + SCOPES_PARAM


function login() {
    window.location.href = url
}

$('#login').addEventListener('click', () => {
    login()
})

let hash = window.location.hash.substring(1)
let access_token = null

if(hash) {
    let params = hash.split('&')
    let paramsSplitUp = params.reduce((accumulator, currentValue) => {
        const [key, value] = currentValue.split('=')
        accumulator[key] = value
        return accumulator
    }, {})
    localStorage.setItem('access_token', paramsSplitUp.access_token)
    access_token = paramsSplitUp.access_token
}

$('#callAPI').addEventListener('click', () => {
    api()
})

async function api() {
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
          },
    })

    let data = await response.json() 
    c(data)
    c(data.map(x => x))

}
