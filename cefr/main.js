async function get_data() {
  let json_url = 'https://script.google.com/macros/s/AKfycbzufai5BsWxN_8w6zYqqJwzH-SshpujMExL_a3aAPJTsmIvHf5P9Vaw3YUIYDoSUelV/exec';
  const res = await fetch(json_url); 
  const res_data = await res.json(); 
  console.log(res_data);
  return res_data;
}
function check_color(row) {
  let class_color = '';
  switch (row[2]) {
    case 0: class_color = 'p0_color'; break;
    case 1: class_color = 'p1_color'; break;
    case 2: class_color = 'p2_color'; break;
    case 3: class_color = 'p3_color'; break;
    case 4: class_color = 'p4_color'; break;
    case 5: class_color = 'p5_color'; break;
  }
  return class_color;
}

function gen_html(row) {
  let html_text = "";
  html_text += `<div class='my-box ${check_color(row)}'><div class='tooltip'><div class='tooltiptext'>`;
  html_text += row[5];
  html_text += ":<br>";
  html_text += row[6];
  html_text += "</div></div></div>";
  return html_text;
}

async function change_dom(res_data) {

  let ele_array = [];
  let ele_a1   = document.getElementById("A1-box");
  let ele_a2   = document.getElementById("A2-box");
  let ele_a2_1 = document.getElementById("A2-1-box");
  let ele_a2_2 = document.getElementById("A2-2-box");
  let ele_b1   = document.getElementById("B1-box");
  let ele_b1_1 = document.getElementById("B1-1-box");
  let ele_b1_2 = document.getElementById("B1-2-box");
  let ele_b2   = document.getElementById("B2-box");
  let ele_b2_1 = document.getElementById("B2-1-box");
  let ele_b2_2 = document.getElementById("B2-2-box");
  let ele_c1   = document.getElementById("C1-box");
  let ele_c2   = document.getElementById("C2-box");
  let ele_tmp;

  res_data.forEach((row) => {

    switch (row[1]) {
      case 'A1':   ele_tmp = ele_a1;   break;
      case 'A2':   ele_tmp = ele_a2;   break;
      case 'A2.1': ele_tmp = ele_a2_1; break;
      case 'A2.2': ele_tmp = ele_a2_2; break;
      case 'B1':   ele_tmp = ele_b1;   break;
      case 'B1.1': ele_tmp = ele_b1_1; break;
      case 'B1.2': ele_tmp = ele_b1_2; break;
      case 'B2':   ele_tmp = ele_b2;   break;
      case 'B2.1': ele_tmp = ele_b2_1; break;
      case 'B2.2': ele_tmp = ele_b2_2; break;
      case 'C1':   ele_tmp = ele_c1;   break;
      case 'C2':   ele_tmp = ele_c2;   break;
      default: break;
    }

    let html_text = gen_html(row);
    ele_tmp.insertAdjacentHTML("afterbegin", html_text);

  });
}

window.onload = async function() {
  let res_data = await get_data();
  await change_dom(res_data);
};