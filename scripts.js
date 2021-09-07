var select = document.getElementById("select-sec");
var output = document.getElementById("output");
async function translateNow() {
  var query = document.getElementById("query").value;
  let dropdown_value = select.value;
  console.log("dropdown_value:", dropdown_value);
  if (query.length > 0) {
    let res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: query,
        source: "en",
        target: dropdown_value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    let data = await res.json();
    console.log(data.translatedText);
    //   let inp = document.createElement("input");
    output.innerHTML = `${data.translatedText}`;
  }
  //   output.append(inp);
}

{
  /* <select>
  <option selected value="0">
    Pure CSS Select
  </option>
  <option value="1">No Wrapper</option>
  <option value="2">No JS</option>
  <option value="3">Nice!</option>
</select>; */
}

async function languageData() {
  let lang = await fetch(`https://libretranslate.de/languages`);
  let lang_data = await lang.json();
  //   console.log(lang_data);
  lang_data.forEach((element) => {
    let option = document.createElement("option");
    option.setAttribute("value", element.code);
    option.innerText = element.name;
    select.append(option);
  });
}

languageData();

function myFunction() {
  output.select();
  output.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(output.value);
  alert("Copied the text: " + output.value);
}
