const prefix = document.querySelector("#prefix");
const country = document.querySelector("#country");
const phone = document.querySelector("#phone"); 
const resluyr = document.querySelector("#out-country")
const outnames = document.querySelector("#outname")
const button = document.querySelector("#getNumberBtn");
const checkBtn = document.querySelector("#checkBtn")
const Operator = document.querySelector("#out-operator")
function setPrefixAndMax() {
    const selected = country.options[country.selectedIndex];
    prefix.value = selected.value;               // prefix set
    phone.maxLength = selected.dataset.length;   // max length set
    resluyr.innerHTML = selected.value;         // show prefix
}

setPrefixAndMax();

// jab user country select kare
country.addEventListener("change", setPrefixAndMax);


// const outname = document.querySelector("#outname")

const getnhphone = Number(phone.value.trim())
// const urk = "https://truecaller.wasdark336.workers.dev/index.cpp?key=dark&number=918789968980"


outname.innerHTML = getnhphone
checkBtn.addEventListener("click", () => {
    const usrnnumber = phone.value.trim();
    if (!usrnnumber) {
        outnames.innerHTML = "Please enter a phone number!";
        return;
    }

    const prudix = prefix.value.replace("+", "");    
    const fullnumber = prudix + usrnnumber;

    const url = "https://truecaller.wasdark336.workers.dev/index.cpp?key=dark&number=" + fullnumber;
    const proxy = "https://cors-anywhere.herokuapp.com/";

    outnames.innerHTML = "Loading...";

    fetch(proxy + url, { 
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
            Operator.innerHTML = tyeshd
        } catch (err) {
            outnames.innerHTML = `invalid number response: ${text}`;
        }
    })
    .catch(err => {
        outnames.innerHTML = `Error: ${err}`;
    });
    phone.value = ""
});
