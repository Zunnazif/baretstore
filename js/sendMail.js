import contains from "./contains.js";
let form = document.getElementById("form");
let submit = document.getElementById("submit");
let alertBorder = document.getElementById("alert-border");
let sending = document.getElementById("sending");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nameTo = document
    .getElementById("nameTo")
    .value.split(" ")
    .map((item) => {
      return item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase();
    })
    .join(" ");
  let sendTo = document.getElementById("email").value;
  let contain = await contains();

  if (alertBorder.classList.contains("left-0")) {
    alertBorder.classList.remove("left-0");
  }
  alertBorder.classList.add("-left-full");

  let bodyFecth = {
    nameFrom: "Nylaa Store",
    sendFrom: "nylaa.store10@gmail.com",
    password: "iduu yjyv cfhk oybp",
    nameTo: nameTo,
    sendTo: sendTo,
    subject: "E-Book",
    bodyHTML: `<b>Hallo kak ${nameTo}, terima kasih sudah order...<br>semoga suka dengan buku nya &#128521; dan rezeki kakak sekeluarga lancar selalu,<br></b><br><br>${contain}<br><b>Happy reading</b>`,
  };
  let request = await fetch(
    "https://nylaa-server.vercel.app/email/SendToEmail",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyFecth),
    }
  );
  let response = await request.json();

  if (response.isSucceeded) {
    alertBorder.classList.remove("-left-full");

    alertBorder.classList.add("left-0");

    sending.innerHTML = response.response;
    submit.disabled = false;
    submit.classList.add("text-gray-400", "hover:bg-slate-600");
    submit.classList.remove("text-black", "cursor-progress");
    submit.innerHTML = "Kirim";
    document.getElementById("nameTo").value = "";
    document.getElementById("email").value = "";
    document.getElementById("skuID").value = "";
  }
});
