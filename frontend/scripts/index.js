
const login_container = document.getElementById("login-content")
const signup_container = document.getElementById("signup-content")
const login_content_btn = document.getElementById("login-content-button");
const signup_content_btn = document.getElementById("signup-content-btn");

const registration_content = () => {
  login_container.classList.toggle("hide");
  signup_container.classList.toggle("hide");
}

login_content_btn.addEventListener("click", registration_content);
signup_content_btn.addEventListener("click", registration_content);



const pages = {};

pages.base_url = "http://127.0.0.1:8000/api";

const signup = () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = new FormData();

  data.append('name', name);
  data.append('email', email);
  data.append('password', password);

  axios.post(pages.base_url + '/login', data)
    .then((response) => {
      console.log(response.data);
      if (response.data.status === "success") {
        const jwtToken = response.data.token; // extract the JWT token from the response data
        getUserName(jwtToken); // call getUserName function and pass the token as an argument
        window.location.href = "./home.html";
      } else {
        alert("Make sure login information is correct");
      }
    })
}


document.getElementById('signup-btn').addEventListener('click', signup);

function signin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-pass').value;

  const data = new FormData();
  data.append('email', email);
  data.append('password', password);

  axios.post(pages.base_url + '/login', data)
    .then((response) => {
      console.log(response.data);
      element = response.data.token[0];
                localStorage.setItem("id", element.id);
                localStorage.setItem("name", element.name);
                localStorage.setItem("email", element.email);
      if (response.data.status === "success") {
        getUserName(response.data.token); // call getUserName function and pass the token as an argument
        window.location.href = "./home.html";
      } else {
        alert("Make sure login information is correct");
      }
    })
    .catch((error) => {
      console.error(error);
      if (error.response && error.response.status === 422) {
        document.getElementById('login-error').innerHTML = "Invalid email or password. Please try again.";
      } else {
        document.getElementById('login-error').innerHTML = "An error occurred. Please try again later.";
      }
    });
}

document.getElementById('login-btn').addEventListener('click', signin);


function getUserName(jwtToken) {
  axios.get(pages.base_url + '/user', {
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  })
    .then((response) => {
      console.log(response)
      const name = response.data.name; // extract the user's name from the response data
      // callback(name); // call the callback function and pass the user's name as an argument
      const welcomeMessage = `Welcome, ${name}!`;
      document.getElementById('welcome-message').innerHTML = welcomeMessage;
    })
    .catch((error) => {
      console.error(error);
    });
}

// function displayWelcomeMessage(name) {
//   const welcomeMessage = `Welcome, ${name}!`;
//   document.getElementById('welcome-message').innerHTML = welcomeMessage;
// }
