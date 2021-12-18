
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function joinGuildOrRedirect() {
    if (getCookie("token") === "") {
        // Simulate an HTTP redirect:
        window.location.replace("https://app.ferris.chat/login");
    }
    await fetch("https://api.ferris.chat/v0/invites/" + window.location.pathname.charAt(path.length - 1) == "/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie("token")
        }
    }).then(handleInviteCallback)
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

