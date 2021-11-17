function trimTrailingChars(s, charToTrim) {
    let regExp = new RegExp(charToTrim + "+$");
    return s.replace(regExp, "");
}

async function authAndAcceptInvite() {
    await fetch("https://api.ferris.chat/v0/auth", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Email': document.getElementById("email").value,
                'Password': document.getElementById("password").value
            }
        }
    )
        .then(response => async function () {
            let json = await response.json()

            let code = trimTrailingChars(window.location.pathname.split("/").at(-1), "/");
            await fetch("https://api.ferris.chat/v0/invite" + code, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': json['token']
                }
            })
        })
}

document.getElementById('login').onclick = async () => {
    await authAndAcceptInvite()
};
