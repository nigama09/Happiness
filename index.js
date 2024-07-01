let themeButton = document.getElementById("theme-button")

const toggleDarkMode=() =>{
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);


let count = 3
const addSignature = (person) => {
  
  const signatureContainer = document.querySelector(".signatures");
  const newSignature = document.createElement("p");
  newSignature.textContent = `🖊️ ${person.name} from ${person.org} signed up!`;
  signatureContainer.appendChild(newSignature);
  // Update signature counter
  let count = parseInt(document.getElementById("counter").textContent.split(" ")[1]);
  count++;
  document.getElementById("counter").textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
  
}

const signNowButton = document.getElementById("sign-now-button");
//signNowButton.addEventListener("click", addSignature);


const validateForm = () => {

  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-petition").elements;

  const person = {
    name: petitionInputs[0].value,
    org: petitionInputs[1].value,
    email: petitionInputs[2].value
  };

  // TODO: Loop through all inputs
    for(let i=0;i<petitionInputs.length;i++){
      if (petitionInputs[i].value.length < 2) {  
        petitionInputs[i].classList.add('error');
        containsErrors = true;
      }
      else {
        petitionInputs[i].classList.remove('error');
      }
    }

  const email= document.getElementById('email')
  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
  } else {
    email.classList.remove('error');
  }


if(!containsErrors){
  
  for(let i=0;i<petitionInputs.length;i++){
    petitionInputs[i].value = "";
    containsErrors = false;
  }
  addSignature(person);
  toggleModal(person);
}


}

signNowButton.addEventListener('click', validateForm);


let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
  
}

let revealableContainers = document.querySelectorAll(".revealable");

let reveal = () =>{
  for(let i=0;i<revealableContainers.length;i++){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if(topOfRevealableContainer < windowHeight - animation.revealDistance){
      revealableContainers[i].classList.add('active');
    }
    else{
      revealableContainers[i].classList.remove('active');
    }
  }
}


window.addEventListener('scroll', reveal);

let scaleFactor=1;
let modalImage=document.querySelector("#modal-image");

let scaleImage = () =>{
  if(scaleFactor===1){
    scaleFactor=0.8;
  }
  else{
    scaleFactor=1;
  }
  modalImage.style.transform=`scale(${scaleFactor})`;
}

let toggleModal=(person) =>{  
  modal=document.querySelector("#thanks-modal");
  modalContent=document.querySelector("#thanks-modal-content");
  modal.style.display = "flex";
  modalContent.textContent = `Thank you ${person.name} from ${person.org} for joining!`;

   let intervalId= setInterval(scaleImage,500);
  setTimeout(() => {
    modal.style.display = "none"; clearInterval(intervalId);
  }, 4000)
    
}

let closeModalButton=document.querySelector("#close-modal-button");
const hideModal = () => {
  let modal = document.querySelector(".modal");
  modal.style.display = "none";
};
closeModalButton.addEventListener("click", hideModal);




