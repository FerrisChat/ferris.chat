function trimTrailingChars(s, charToTrim) {
    let regExp = new RegExp(charToTrim + "+$");
    return s.replace(regExp, "");
}

function authAndAcceptInvite() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.ferris.chat/v0/auth");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Email", document.getElementById("email").value)
    xhr.setRequestHeader("Password", document.getElementById("password").value)
    xhr.send("")
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            console.log(xhr.responseText)
            let xhr = new XMLHttpRequest();
            let code = trimTrailingChars(window.location.pathname.split("/").at(-1), "/");
            xhr.open("POST", "https://api.ferris.chat/v0/invite/" + code, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", json['token'])
            xhr.send("")
        }
    };
}
