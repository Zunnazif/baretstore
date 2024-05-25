export default async function contains() {
  let sku = document.getElementById("skuID").value;
  let submit = document.getElementById("submit");

  submit.disabled = true;
  submit.classList.remove("text-gray-400", "hover:bg-slate-600");
  submit.classList.add("text-black", "cursor-progress");
  submit.innerHTML = "Sedang Mengirim...";

  let request = await fetch(
    "https://nylaa-server.vercel.app/ebook/GetMultipleEBookBySKU",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sku,
      }),
    }
  );
  let { eBooks } = await request.json();

  let result = eBooks
    .map((item) => {
      return `
        <div style="width:396px;height:18px;max-height:18px;background-color:#f5f5f5;padding:5px;color:#222;font-family:arial;font-style:normal;font-weight:bold;font-size:13px;border:1px solid #ddd;line-height:1">
        <a href="${item.link}" style="display:inline-block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; text-decoration:none; padding:1px 0px; border:none; width:100%" target="_blank">
        <img style="vertical-align:bottom; border:none" src="https://ci5.googleusercontent.com/proxy/ORvV3xG38euXIc6bFyebnloLAfX2ANOPQZ41RiT31C946RvLzqP0EjQ99QhDAW1g9JhHIshDAV3Nbf5R6QGoKro4lbpVpP9NlapozNV-zeWTf-hQKSoTXog=s0-d-e1-ft#https://drive-thirdparty.googleusercontent.com/16/type/application/pdf">&nbsp;
        <span style="color:#15c; text-decoration:none; vertical-align:bottom">${item.sku}. ${item.bookName}</span>
        </a>
        </div><br>`;
    })
    .join("");

  return result;
}
