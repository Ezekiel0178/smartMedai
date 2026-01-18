function goToStep1() {
    document.getElementById("step-1").style.display = "flex";
    document.getElementById("step-2").style.display = "none";
    document.getElementById("step-3").style.display = "none";
    document.getElementById("step-4").style.display = "none";
    document.getElementById("step-5").style.display = "none";
    
    document.querySelector(".floatingButton").style.display = "none";
}

function goToStep2() {
userName = document.getElementById("username").value;
    if (!userName) {
        alert("Please enter your name.");
        return;
    } else {
        document.getElementById("displayName").innerText = `${userName}`;
        document.getElementById("step-1").style.display = "none";
        document.getElementById("step-2").style.display = "flex";
    }

    document.querySelector(".floatingButton").style.display = "flex";
}

function goToStep3() {
    document.querySelectorAll(".step").forEach(step => {
      step.style.display = "none";
    });

    document.getElementById("step-3").style.display = "block";
  
    document.getElementById("loaderInfo").innerText = "Analyzing your symptoms...";
    setTimeout(() => {
        document.getElementById("loaderInfo").innerText = "Cross-referencing with medical database...";
    }, 2000);

    
    setTimeout(() => {
      document.getElementById("step-3").style.display = "none";
      document.getElementById("step-4").style.display = "flex";

      goToStep4();
    }, 5000);
}


function goToStep4() {
    const symptoms = [
        {
            diagnosis: "Malaria",
            userSymptoms: ["Fever", "Headache", "Fatigue", "Dizziness", "Nausea"],
            prescription: ["Artimether tablet", "Paracetamol"],
        },

        {
            diagnosis: "Typhoid",
            userSymptoms: ["Fever", "Fatigue", "Abdominal-pain", "Appetite-Loss", "Headache"],
            prescription: ["Amoxil tablet", "ciprofloxacin", "ORS(Oral Rehydration Salt)"],
        },
        
        {
            diagnosis: "Cholera",
            userSymptoms: ["Diarrhea", "Vomiting", "Dehydration", "Abdominal-pain"],
            prescription: ["flagyl", "ORS", "Zinc supplements", "doxycycline"],
        },
    ];

    // to get the checkboxes value
    // Get all checkboxes that are checked
    const checked = document.querySelectorAll('input[name="symptom"]:checked');

    // Loop through them to collect values
    let selectedSymptoms = [];

    for (let i = 0; i < checked.length; i++) {
        selectedSymptoms.push(checked[i].value);
    }

    // Track best match
    let bestMatch = null;
    let maxMatches = 0;

    for (let i = 0; i < symptoms.length; i++) {
        let matchCount = 0;

        for (let j = 0; j < symptoms[i].userSymptoms.length; j++) {
            if (selectedSymptoms.includes(symptoms[i].userSymptoms[j])) {
                matchCount++;
            }
        }

        if (matchCount > maxMatches) {
            maxMatches = matchCount;
            bestMatch = symptoms[i];
        }
    }

    // Show best match or fallback
    if (bestMatch && maxMatches > 0) {
        document.getElementById("diagnosisResult").innerHTML = `
            <div class="symptom-item">
                
                <h3>You may be having symptoms of <strong>${bestMatch.diagnosis}</strong></h3>
                <br>
                <p><strong>Prescription:</strong> ${bestMatch.prescription}</p>
                <br>
                <p>Always consult a healthcare professional before taking any medication.</p>
            </div>
        `;
    } else {
        document.getElementById("diagnosisResult").innerHTML = `
            <div class="symptom-item">
                <h3>No matching condition found</h3>
                <p>Please select more symptoms or consult a doctor.</p>
            </div>
        `;
    }
    document.getElementById("diagnosisName").innerText = userName;
    document.querySelector(".floatingButton").style.display = "flex";
}

function goToStep5() {
    document.getElementById("reportName").innerText = userName;

    const checked = document.querySelectorAll('input[name="symptom"]:checked');
    let selectedSymptoms = [];
    for (let i = 0; i < checked.length; i++) {
        selectedSymptoms.push(checked[i].value);
    }

    // Get diagnosis
    const diagnosisText = document.querySelector('#diagnosisResult h3')?.innerText || "No diagnosis found";
    const prescriptionText = document.querySelector('#diagnosisResult p')?.innerText || "No prescription available";

    // the detailed report
    const reportHTML = `
        <div class="report-content">
            <h3>Patient Name: ${userName}</h3>

            <br>

            <h3>Selected Symptoms:</h3>
            <ul style="padding-left: 20px;">
                ${selectedSymptoms.map(symptom => `<li>${symptom}</li>`).join('')}
            </ul>

            <br>

            <h3>Diagnosis: ${diagnosisText}</h3>

            <br>

            <h3>${prescriptionText}</h3>

            <br>

            <h3>Date: ${new Date().toLocaleDateString()}</h3>

            <br>
            <p><strong>Note:</strong> This diagnosis is generated by SmartMed AI based on user input. Please consult a certified doctor if symptoms persist or worsen.</p>
        </div>
    `;

    document.getElementById("finalReport").innerHTML = reportHTML;
    document.getElementById("step-4").style.display = "none";
    document.getElementById("step-5").style.display = "flex";
    document.querySelector(".floatingButton").style.display = "flex";
}

const floatingBtn = document.querySelector(".floatingButton");
const footer = document.querySelector("footer");

window.addEventListener("scroll", () => {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (footerRect.top < windowHeight) {
        // Footer is entering view
        floatingBtn.style.bottom = (windowHeight - footerRect.top + 20) + "px";
    } else {
        // Normal position
        floatingBtn.style.bottom = "20px";
    }
});



