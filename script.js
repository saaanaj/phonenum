const prefix = document.querySelector("#prefix");
const country = document.querySelector("#country");
const phone = document.querySelector("#phone"); 
const resluyr = document.querySelector("#out-country");
const outnames = document.querySelector("#outname");
const button = document.querySelector("#getNumberBtn");
const checkBtn = document.querySelector("#checkBtn");
const Operator = document.querySelector("#out-operator");

function setPrefixAndMax() {
    const selected = country.options[country.selectedIndex];
    prefix.value = selected.value;               // prefix set
    phone.maxLength = selected.dataset.length;   // max length set
    resluyr.innerHTML = selected.value;         // show prefix
}

setPrefixAndMax();

// jab user country select kare
country.addEventListener("change", setPrefixAndMax);

// show current input number (optional)
outnames.innerHTML = phone.value.trim();

checkBtn.addEventListener("click", () => {
    const usrnnumber = phone.value.trim();
    if (!usrnnumber) {
        outnames.innerHTML = "Please enter a phone number!";
        return;
    }

    const prudix = prefix.value.replace("+", "");    
    const fullnumber = prudix + usrnnumber;

    const url = "https://truecaller.wasdark336.workers.dev/index.cpp?key=dark&number=" + fullnumber;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    outnames.innerHTML = "Loading...";

    fetch(proxyUrl, { 
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            const dataopsj = `: ${data[0].name}`;
            const tyeshd = `: ${data[0].type}`;
            outnames.innerHTML = dataopsj;
            Operator.innerHTML = tyeshd;
        } catch (err) {
            outnames.innerHTML = `invalid number response: ${text}`;
        }
    })
    .catch(err => {
        outnames.innerHTML = `Error: ${err}`;
    });

    phone.value = "";
});
