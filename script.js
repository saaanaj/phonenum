const prefix = document.querySelector("#prefix");
const country = document.querySelector("#country");
const phone = document.querySelector("#phone"); 
const resluyr = document.querySelector("#out-country");
const outnames = document.querySelector("#outname");
const Operator = document.querySelector("#out-operator");
const checkBtn = document.querySelector("#checkBtn");

// Set prefix and max length based on selected country
function setPrefixAndMax() {
    const selected = country.options[country.selectedIndex];
    prefix.value = selected.value;               // set prefix
    phone.maxLength = selected.dataset.length;   // set max length
    resluyr.innerHTML = selected.value;         // show prefix
}

setPrefixAndMax();
country.addEventListener("change", setPrefixAndMax);

// Check number button click
checkBtn.addEventListener("click", () => {
    const usrnnumber = phone.value.trim();
    if (!usrnnumber) {
        outnames.innerHTML = "Please enter a phone number!";
        return;
    }

    const prudix = prefix.value.replace("+", "");    
    const fullnumber = prudix + usrnnumber;

    const url = "https://truecaller.wasdark336.workers.dev/index.cpp?key=dark&number=" + fullnumber;

    // Proxy optional: CORS bypass (temporary allow needed on public proxy)
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
            if (Array.isArray(data) && data.length > 0) {
                outnames.innerHTML = `: ${data[0].name}`;
                Operator.innerHTML = `: ${data[0].type}`;
            } else {
                outnames.innerHTML = "No data found for this number";
                Operator.innerHTML = "-";
            }
        } catch (err) {
            outnames.innerHTML = `Invalid number response: ${text}`;
            Operator.innerHTML = "-";
        }
    })
    .catch(err => {
        outnames.innerHTML = `Error: ${err}`;
        Operator.innerHTML = "-";
    });

    phone.value = "";
});
