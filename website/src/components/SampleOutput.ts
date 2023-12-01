export const sampleOutput = `<html>

<body>
  <h1>Login</h1><input type="text" id="account" placeholder="Account"><input type="password" id="password" placeholder="Password" style="margin:4px"><button onclick="login()" style="margin:8px">Login</button>
</body>
<style>
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
<script>
  function login() {
    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;
    alert(JSON.stringify({
      account,
      password
    }));
  }
</script>

</html>`;