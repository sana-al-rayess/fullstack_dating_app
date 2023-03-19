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

  axios.post(pages.base_url + '/register', data)
    .then((result) => {
      console.log(result);
      if (result.data.status === "success") {
        window.location.href = "./home.html"
        console.log("Signed up successfully!");

      } else {
        document.getElementById('signup-error').innerHTML = "An error occurred. Please try again later.";
        console.log("Unable to sign up");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('signup-btn').addEventListener('click', signup);

