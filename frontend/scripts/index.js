
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

const setToken = () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
pages.getAPI = async (api_url) => {
  try {
    return await axios(api_url);
  } catch (error) {
    console.log("Error from GET API");
  }
}

const signup = () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check for missing fields
  if (name === '' || email === '' || password === '') {
    const errorMsg = document.getElementById('signup-error');
    errorMsg.innerText = 'Please fill in all fields.';
    return;
  }

  const data = new FormData();

  data.append('name', name);
  data.append('email', email);
  data.append('password', password);

  axios.post(pages.base_url + '/register', data)
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        window.location.href = "./home.html"
        console.log("signed up successfully!");
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("token", response.data.Authorization.token);
     
      } else {
        console.log("unable to sign up");
      }
    })
}


document.getElementById('signup-btn').addEventListener('click', signup);

document.getElementById('login-btn').addEventListener('click', signin);



function signin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-pass').value;
  if (email === '' || password === '') {
    const errorMsg = document.getElementById('login-error');
    errorMsg.innerText = 'Please fill in all fields.';
    return;
  }

  const data = new FormData();
  data.append('email', email);
  data.append('password', password);

  axios.post(pages.base_url + '/login', data)
    .then(function (response) {
      console.log(response.data);
      if (response.data.status === "success") {
        console.log("logged in successfully!");
        window.location.href = "./home.html"
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("token", response.data.Authorization.token); // save the token in local storage
      }
      // getUserName(response.data.token);
      // window.location.href = "./home.html";
      else {
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
