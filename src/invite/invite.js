function trimTrailingChars(s, charToTrim) {
    let regExp = new RegExp(charToTrim + "+$");
    return s.replace(regExp, "");
}

async function handleInviteCallback(response) {
    let status = response.status;
    let alert_str = "";
    let alert_image_url = "https://http.cat/" + status;
    if (status == 409) {
        alert_str = "you were already in this guild!";
    } else if (status == 201) {
        alert_str = "joined this guild successfully!"
    } else if (status == 410) {
        alert_str = "this invite just expired as you used it :("
    } else if (status == 500) {
        alert_str = "oopsie we did a fucky wucky: " + await response.json()["reason"]
    } else if (status == 404) {
        alert_str = "are you sure that invite exists? 404";
    }
    else {
        alert_str = "something unknown happened: " + await response.text()
    }

    document.getElementById("response_status_text").innerText = alert_str;
    document.getElementById("response_status_image").setAttribute("src", alert_image_url);
}

async function handleAuthCallback(response) {
    let status = response.status;
    if (status != 200) {
        document.getElementById("response_status_text").innerText = "failed to fetch your user token";
        document.getElementById("response_status_image").setAttribute("src", "https://http.cat" + status);
    }

    let json = await response.json()

    let code = trimTrailingChars(window.location.pathname.split("/").at(-1), "/");
    await fetch("https://api.ferris.chat/v0/invite" + code, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': json['token']
        }
    }).then(handleInviteCallback)
}

async function authAndAcceptInvite() {
    await fetch("https://api.ferris.chat/v0/auth", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Email': document.getElementById("email_field").value,
                'Password': document.getElementById("password_field").value
            }
        }
    )
        .then(handleAuthCallback)
}

let loginButton = document.getElementById("login_button");
if (loginButton === null) {
    alert("login button is null: this is a bug");
} else {
    loginButton.onclick = async () => {
        await authAndAcceptInvite()
    }
}
;
