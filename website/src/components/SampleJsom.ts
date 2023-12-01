export const sampleCode = `{
    "name": "html",
    "children": [
        {
            "name": "body",
            "children": [
                {
                    "name": "h1",
                    "children": "Login"
                },
                {
                    "name": "input",
                    "needClosing": false,
                    "attributes": [
                        {
                            "name": "type",
                            "value": "text"
                        },
                        {
                            "name": "id",
                            "value": "account"
                        },
                        {
                            "name": "placeholder",
                            "value": "Account"
                        }
                    ]
                },
                {
                    "name": "input",
                    "needClosing": false,
                    "attributes": [
                        {
                            "name": "type",
                            "value": "password"
                        },
                        {
                            "name": "id",
                            "value": "password"
                        },
                        {
                            "name": "placeholder",
                            "value": "Password"
                        },
                        {
                            "name": "style",
                            "value": "margin:4px"
                        }
                    ]
                },
                {
                    "name": "button",
                    "children": "Login",
                    "attributes": [
                        {
                            "name": "onclick",
                            "value": "login()"
                        },
                        {
                            "name": "style",
                            "value": "margin:8px"
                        }
                    ]
                }
            ]
        },
        {
            "name": "style",
            "children": "body{margin:0;padding:0;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;}"
        },
        {
            "name": "script",
            "children": "function login(){const account = document.getElementById('account').value;const password = document.getElementById('password').value;alert(JSON.stringify({account,password}));}"
        }
    ]
}`;