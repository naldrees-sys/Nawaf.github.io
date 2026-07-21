let currentLang = 'ar';

const texts = {
    ar: {
        title: "Body Health",
        subtitle: "احسب مؤشر كتلة جسمك (BMI)",
        genderLabel: "الجنس",
        male: "ذكر",
        female: "أنثى",
        weightLabel: "الوزن (كجم)",
        heightLabel: "الطول (سم)",
        calcBtn: "احسب",
        langBtn: "English",
        underweight: "نحافة",
        normal: "وزن طبيعي",
        overweight: "زيادة وزن",
        obesity: "سمنة",
        idealWeightText: "الوزن المثالي التقريبي لك: "
    },
    en: {
        title: "Body Health",
        subtitle: "Calculate your BMI",
        genderLabel: "Gender",
        male: "Male",
        female: "Female",
        weightLabel: "Weight (kg)",
        heightLabel: "Height (cm)",
        calcBtn: "Calculate",
        langBtn: "عربي",
        underweight: "Underweight",
        normal: "Normal",
        overweight: "Overweight",
        obesity: "Obesity",
        idealWeightText: "Your approximate ideal weight: "
    }
};

const langToggle = document.getElementById('langToggle');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const genderLabel = document.getElementById('genderLabel');
const maleOption = document.getElementById('maleOption');
const femaleOption = document.getElementById('femaleOption');
const weightLabel = document.getElementById('weightLabel');
const heightLabel = document.getElementById('heightLabel');
const calcBtn = document.getElementById('calcBtn');

function updateLanguage() {
    const t = texts[currentLang];
    title.textContent = t.title;
    subtitle.textContent = t.subtitle;
    genderLabel.textContent = t.genderLabel;
    maleOption.textContent = t.male;
    femaleOption.textContent = t.female;
    weightLabel.textContent = t.weightLabel;
    heightLabel.textContent = t.heightLabel;
    calcBtn.textContent = t.calcBtn;
    langToggle.textContent = t.langBtn;

    document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    updateLanguage();
});

calcBtn.addEventListener('click', () => {
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    if (!weight || !heightCm) {
        alert(currentLang === 'ar' ? "الرجاء تعبئة جميع الحقول" : "Please fill all fields");
        return;
    }

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    const t = texts[currentLang];

    let category = "";
    let resultClass = "";

    // تصنيف BMI وتحديد اللون
    if (bmi < 18.5) {
        category = t.underweight;
        resultClass = "result-warning";   // برتقالي
    } else if (bmi < 25) {
        category = t.normal;
        resultClass = "result-normal";    // أخضر
    } else if (bmi < 30) {
        category = t.overweight;
        resultClass = "result-warning";   // برتقالي
    } else {
        category = t.obesity;
        resultClass = "result-danger";    // أحمر
    }

    // حساب الوزن المثالي التقريبي حسب الجنس (معادلة تقريبية بسيطة)
    let idealWeight;
    if (gender === 'male') {
        idealWeight = 50 + 0.9 * (heightCm - 152);
    } else {
        idealWeight = 45.5 + 0.9 * (heightCm - 152);
    }
    idealWeight = Math.max(idealWeight, 40).toFixed(1);

    const resultBox = document.getElementById('result');
    document.getElementById('bmiValue').textContent = "BMI: " + bmi.toFixed(1);

    const categoryEl = document.getElementById('bmiCategory');
    categoryEl.textContent = category;

    document.getElementById('idealWeight').textContent = t.idealWeightText + idealWeight + " " + (currentLang === 'ar' ? "كجم" : "kg");

    // تنظيف وإضافة كلاس اللون
    resultBox.classList.remove('hidden', 'result-normal', 'result-warning', 'result-danger');
    resultBox.classList.add(resultClass);
});