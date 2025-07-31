
const medData = {
  "Hydrocortisone (100mg/Vial)": {
    instruction: "IVP：1vial加入2mL N/S (1mL=50mg) 配置， 取實際dose, IVP>30 sec<br>IVD：1vial加入2mL N/S (1mL=50mg) 配置，先抽0.1mL，稀釋成1mL(1mL=5mg)，取實際dose，再稀釋5倍(1mL=1mg)，建議用1.5mL N/S drip 30 mins",
    formula: dose => dose / 1
  },
  "Famotidine (10mg/mL)": {
    instruction: "IVP：建議稀釋1:1後緩慢IV push，IVP>2min",
    formula: dose => dose / 10
  },
  "Cefepime (500mg/Vial)": {
    instruction: "以2mL N/S配置",
    formula: dose => (dose / 200) * 2
  },
  "Oxacillin (500mg/Vial)": {
    instruction: "建議以5mL N/S配置",
    formula: dose => dose / 100
  }
};

function onMedicationChange() {
  const med = document.getElementById("medSelect").value;
  document.getElementById("nicuInstruction").innerHTML = medData[med].instruction;
  calculateDose();
}

function calculateDose() {
  const med = document.getElementById("medSelect").value;
  const dose = parseFloat(document.getElementById("doseInput").value);
  if (!isNaN(dose)) {
    const mL = medData[med].formula(dose);
    document.getElementById("result").innerHTML = `👉 稀釋後應給 ${mL.toFixed(2)} mL`;
  } else {
    document.getElementById("result").innerHTML = "";
  }
}

window.onload = () => {
  const select = document.getElementById("medSelect");
  for (const med in medData) {
    const option = document.createElement("option");
    option.value = med;
    option.textContent = med;
    select.appendChild(option);
  }
  onMedicationChange();
};
